import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { MAJORS, arrangePlan, evaluate, finishedEntries, getMajor, percentComplete, suggestNext, yearStatus } from "./majors.ts";
import { describePrereqs, missingPrereqs } from "./prereqs.ts";

const csEng = getMajor("cs-eng")!;
const csLsa = getMajor("cs-lsa")!;
const everyOffered = () => true;
const statusOf = (major: typeof csEng, completed: string[], id: string) =>
  evaluate(major, { completed, openProgress: {} }).find((s) => s.requirement.id === id)!;

test("every plan entry points at a real requirement, and every requirement is planned", () => {
  for (const major of MAJORS) {
    const ids = new Set(major.requirements.map((r) => r.id));
    const planned = new Set(major.plan.flat().flatMap((e) => (e.req ? [e.req] : [])));
    for (const id of planned) assert.ok(ids.has(id), `${major.id}: ${id}`);
    for (const id of ids) assert.ok(planned.has(id), `${major.id}: ${id} not in plan`);
    assert.equal(major.plan.length, 8, major.id);
  }
});

test("the CS-Eng plan matches the official FA26 term totals", () => {
  const totals = csEng.plan.map((term) => term.reduce((sum, e) => sum + (e.credits ?? 0), 0));
  assert.deepEqual(totals, [17, 17, 16, 16, 16, 16, 16, 14]);
  assert.equal(totals.reduce((a, b) => a + b), 128);
});

test("the CS-Eng plan allocates exactly each requirement's credits", () => {
  for (const r of csEng.requirements) {
    const planned = csEng.plan.flat().filter((e) => e.req === r.id).reduce((s, e) => s + (e.credits ?? 0), 0);
    const expected = r.id === "capstone" ? 4 : r.unit === "credits" ? r.target : r.credits;
    assert.equal(planned, expected, r.id);
  }
});

test("any listed alternative satisfies a requirement", () => {
  assert.ok(statusOf(csEng, ["eecs-183"], "engr-101").done);
  assert.ok(statusOf(csEng, ["math-217"], "math-214").done);
  assert.ok(!statusOf(csEng, ["math-115"], "math-214").done);
});

test("an option with several courses needs all of them", () => {
  assert.ok(!statusOf(csEng, ["physics-140"], "physics-140").done);
  assert.ok(statusOf(csEng, ["physics-140", "physics-141"], "physics-140").done);
});

test("one course can't satisfy two requirements", () => {
  const major = csLsa as typeof csEng;
  assert.ok(statusOf(major, ["math-115"], "math-1").done);
  assert.ok(!statusOf(major, ["math-115"], "math-2").done);
  assert.ok(statusOf(major, ["math-115", "math-116"], "math-2").done);
});

test("open requirements track reported progress", () => {
  const statuses = evaluate(csEng, { completed: [], openProgress: { ulcs: 8 } });
  const ulcs = statuses.find((s) => s.requirement.id === "ulcs")!;
  assert.equal(ulcs.progress, 8);
  assert.ok(!ulcs.done);
  assert.ok(evaluate(csEng, { completed: [], openProgress: { ulcs: 15 } }).find((s) => s.requirement.id === "ulcs")!.done);
});

test("percent complete runs from 0 to 100", () => {
  assert.equal(percentComplete(evaluate(csEng, { completed: [], openProgress: {} })), 0);
  const allDone = {
    completed: csEng.requirements.flatMap((r) => r.anyOf?.[0] ?? []),
    openProgress: Object.fromEntries(csEng.requirements.filter((r) => r.target).map((r) => [r.id, r.target!])),
  };
  assert.equal(percentComplete(evaluate(csEng, allDone)), 100);
});

test("a new student is pointed at first-term courses", () => {
  const ids = suggestNext(csEng, { completed: [], openProgress: {} }, everyOffered).suggestions.map((s) => s.requirement.id);
  assert.ok(ids.includes("math-115"));
  assert.ok(ids.includes("engr-101"));
  assert.ok(!ids.includes("eecs-281"));
  assert.ok(!ids.includes("math-116"));
});

test("later courses in a subject wait for earlier ones", () => {
  const progress = (completed: string[]) => ({ completed, openProgress: {} });
  const next = (completed: string[]) => suggestNext(csEng, progress(completed), everyOffered, 20).suggestions.map((s) => s.requirement.id);
  assert.ok(!next(["eecs-183"]).includes("eecs-281"));
  assert.ok(next(["eecs-183", "eecs-203", "eecs-280"]).includes("eecs-281"));
});

test("completed requirements aren't suggested, and unoffered ones are reported", () => {
  const result = suggestNext(csEng, { completed: ["math-115"], openProgress: {} }, (id) => id !== "math-116");
  assert.ok(!result.suggestions.some((s) => s.requirement.id === "math-115"));
  assert.ok(result.notOffered.some((r) => r.id === "math-116"));
});

test("a finished degree has nothing left to suggest", () => {
  const allDone = {
    completed: csEng.requirements.flatMap((r) => r.anyOf?.[0] ?? []),
    openProgress: Object.fromEntries(csEng.requirements.filter((r) => r.target).map((r) => [r.id, r.target!])),
  };
  assert.deepEqual(suggestNext(csEng, allDone, everyOffered).suggestions, []);
});

test("published prerequisites gate suggestions", () => {
  const next = (completed: string[]) => suggestNext(csEng, { completed, openProgress: {} }, everyOffered, 30);
  const ids = (completed: string[]) => next(completed).suggestions.map((s) => s.requirement.id);
  assert.ok(!ids(["math-115"]).includes("eecs-280"));
  assert.ok(next(["math-115"]).blocked.some((b) => b.requirement.id === "eecs-280"));
  assert.ok(ids(["math-115", "eecs-183"]).includes("eecs-280"));
  // 370 and 376 open up with 203 and 280, without waiting for 281.
  const after = ids(["math-115", "eecs-183", "eecs-203", "eecs-280"]);
  for (const id of ["eecs-281", "eecs-370", "eecs-376"]) assert.ok(after.includes(id), id);
});

test("a blocked course's unverifiable alternatives aren't offered", () => {
  const result = suggestNext(getMajor("cs-lsa")!, { completed: [], openProgress: {} }, everyOffered, 30);
  assert.ok(!result.suggestions.some((s) => s.requirement.id === "eecs-203"));
  assert.ok(result.blocked.some((b) => b.requirement.id === "eecs-203"));
  // Once EECS 203 is open, the listed alternatives can appear beside it.
  const open = suggestNext(getMajor("cs-lsa")!, { completed: ["math-115"], openProgress: {} }, everyOffered, 30);
  const discrete = open.suggestions.find((s) => s.requirement.id === "eecs-203")!;
  assert.deepEqual(discrete.options[0], ["eecs-203"]);
});

test("prerequisite logic reads AND of ORs", () => {
  assert.deepEqual(missingPrereqs("eecs-281", ["math-465"]), [["eecs-280"]]);
  assert.deepEqual(missingPrereqs("eecs-281", ["eecs-203", "eecs-280"]), []);
  assert.deepEqual(missingPrereqs("stats-250", []), [], "unknown isn't blocked");
  assert.equal(describePrereqs("eecs-281"), "(EECS 203 or MATH 465 or MATH 565) and EECS 280");
  assert.equal(describePrereqs("stats-250"), null);
});

test("moving a course changes the plan and suggestions keep following it", () => {
  const key = "0:0"; // MATH 115
  const terms = arrangePlan(csEng, { layout: { [key]: 3 } });
  assert.ok(!terms[0].some((e) => e.key === key));
  assert.ok(terms[3].some((e) => e.key === key));
  const ids = suggestNext(csEng, { completed: [], openProgress: {}, layout: { [key]: 3 } }, everyOffered).suggestions.map((s) => s.requirement.id);
  assert.ok(!ids.includes("math-115"));
});

test("a fifth year adds two empty terms, and moved courses can use it", () => {
  assert.equal(arrangePlan(csEng, {}).length, 8);
  const five = arrangePlan(csEng, { extraYear: true });
  assert.equal(five.length, 10);
  assert.deepEqual(five[9], []);
  assert.ok(arrangePlan(csEng, { layout: { "7:0": 9 } })[9].length === 1);
});

test("reported credits check off plan slots in order", () => {
  const progress = { completed: [], openProgress: { breadth: 8 } };
  const terms = arrangePlan(csEng, progress);
  const finished = finishedEntries(terms, evaluate(csEng, progress));
  const breadth = terms.flat().filter((e) => e.req === "breadth");
  assert.deepEqual(breadth.map((e) => finished.has(e.key)), [true, true, false, false]);
});

test("year status reflects finished entries", () => {
  const firstYear = csEng.plan.slice(0, 2).flat().flatMap((e) => (e.req ? [e.req] : []));
  const reqs = csEng.requirements.filter((r) => firstYear.includes(r.id));
  const progress = { completed: [...reqs.flatMap((r) => r.anyOf?.[0] ?? []), "eecs-280"], openProgress: { breadth: 8 } };
  const terms = arrangePlan(csEng, progress);
  const finished = finishedEntries(terms, evaluate(csEng, progress));
  assert.equal(yearStatus(terms.slice(0, 2), finished), "Complete");
  assert.equal(yearStatus(terms.slice(2, 4), finished), "In progress");
  assert.equal(yearStatus(terms.slice(4, 6), finished), "Not started");
});

test("every full plan is reachable from the program directory", () => {
  const directory = JSON.parse(readFileSync(new URL("../data/majors-directory.json", import.meta.url), "utf8")) as { id: string; url: string }[];
  assert.ok(directory.length > 100);
  assert.equal(new Set(directory.map((p) => p.id)).size, directory.length);
  for (const major of MAJORS) assert.ok(directory.some((p) => p.id === major.id), major.id);
  for (const p of directory) assert.match(p.url, /^https:\/\/[a-z.]*umich\.edu\//, p.id);
});

test("only near-term courses are reported as not offered", () => {
  const result = suggestNext(getMajor("cs-lsa")!, { completed: [], openProgress: {} }, () => false, 30);
  assert.ok(!result.notOffered.some((r) => r.id === "eecs-376"));
  assert.ok(result.notOffered.some((r) => r.id === "math-1"));
});

test("a sequence suggests its next course, not all of them", () => {
  const biology = getMajor("lsa-biology")!;
  const next = (completed: string[]) => suggestNext(biology, { completed, openProgress: {} }, everyOffered, 30).suggestions.find((s) => s.requirement.id === "intro-bio")!.options;
  assert.deepEqual(next([]), [["biology-171"], ["biology-195"], ["biology-191"]]);
  assert.ok(next(["biology-171"]).some((o) => o[0] === "biology-172"));
  assert.ok(next(["biology-171"]).every((o) => o.length === 1));
});

test("core required courses exist in the real Winter 2027 or catalog data", () => {
  const catalog = JSON.parse(readFileSync(new URL("../data/catalog.json", import.meta.url), "utf8")) as { id: string }[];
  const schedule = JSON.parse(readFileSync(new URL("../data/schedule/WN2027.json", import.meta.url), "utf8")) as { courses: { id: string }[] };
  const known = new Set([...catalog.map((c) => c.id), ...schedule.courses.map((c) => c.id)]);
  // Official lists include AP-only and rarely offered courses that aren't in
  // our data, but every requirement should have at least one real option.
  // Subjects missing from the catalog (FTVM, RCDRAMA, ...) can't be checked
  // for courses not offered this term.
  const catalogSubjects = new Set(catalog.map((c) => c.id.split("-")[0]));
  // These are on official major pages but not in our catalog data.
  const unchecked = (id: string) => !catalogSubjects.has(id.split("-")[0]) || ["biophys-495", "pubpol-315"].includes(id);
  for (const major of MAJORS) {
    for (const r of major.requirements) {
      if (r.anyOf) assert.ok(r.anyOf.some((ids) => ids.every((id) => known.has(id) || unchecked(id))), `${major.id}: ${r.id}`);
    }
  }
  for (const id of ["eecs-280", "eecs-281", "math-115", "econ-101", "stats-250"]) assert.ok(known.has(id));
});
