import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import type { ScheduleCourse, ScheduleSection } from "./registrar.ts";
import { buildBundles, generateSchedules } from "./scheduler.ts";

function section(number: string, component: string, days: string, start: string, end: string): ScheduleSection {
  const dayList = days.match(/Th|Su|[MTWFS]/g) as ScheduleSection["meetings"][number]["days"];
  return {
    classNumber: `${component}${number}`,
    number,
    component,
    instructors: [],
    meetings: [{ days: dayList, start, end, location: "" }],
  };
}

function course(id: string, sections: ScheduleSection[]): ScheduleCourse {
  return { id, code: id.toUpperCase(), title: id, department: id.split("-")[0].toUpperCase(), credits: "4", sections };
}

const numbers = (sections: ScheduleSection[][]) => sections.map((alt) => alt.map((s) => s.number).join("+"));

test("linked sections: lecture 010 only pairs with labs 011-019", () => {
  const math = course("math-215", [
    section("010", "LEC", "MWF", "09:00", "10:00"),
    section("011", "LAB", "Th", "10:00", "11:00"),
    section("020", "LEC", "MWF", "12:00", "13:00"),
    section("021", "LAB", "T", "08:00", "09:00"),
  ]);
  const combos = buildBundles(math).flatMap((b) => numbers(b.alternatives));
  assert.deepEqual(combos.sort(), ["010+011", "020+021"]);
});

test("unlinked sections: lectures 001-002 pair with every lab", () => {
  const eecs = course("eecs-281", [
    section("001", "LEC", "TTh", "10:30", "12:00"),
    section("002", "LEC", "TTh", "12:00", "13:30"),
    section("011", "LAB", "M", "11:30", "13:30"),
    section("012", "LAB", "F", "13:30", "15:30"),
  ]);
  assert.equal(buildBundles(eecs).length, 4);
});

test("sections with identical times merge into one bundle", () => {
  const eecs = course("eecs-281", [
    section("001", "LEC", "TTh", "10:30", "12:00"),
    section("016", "LAB", "W", "16:30", "18:30"),
    section("017", "LAB", "W", "16:30", "18:30"),
  ]);
  const bundles = buildBundles(eecs);
  assert.equal(bundles.length, 1);
  assert.deepEqual(numbers(bundles[0].alternatives), ["001+016", "001+017"]);
});

test("exam (MID) sections are ignored", () => {
  const econ = course("econ-101", [
    section("100", "LEC", "MW", "10:00", "11:30"),
    section("101", "DIS", "M", "13:00", "14:00"),
    section("199", "MID", "M", "18:00", "20:00"),
  ]);
  assert.deepEqual(numbers(buildBundles(econ).flatMap((b) => b.alternatives)), ["100+101"]);
});

test("a lecture that overlaps its own lab is dropped", () => {
  const c = course("x-100", [
    section("001", "LEC", "M", "10:00", "11:00"),
    section("011", "LAB", "M", "10:30", "11:30"),
  ]);
  assert.equal(buildBundles(c).length, 0);
});

test("generateSchedules avoids conflicts and allows back-to-back classes", () => {
  const a = course("a-100", [section("001", "LEC", "MW", "10:00", "11:00"), section("002", "LEC", "MW", "11:00", "12:00")]);
  const b = course("b-100", [section("001", "LEC", "MW", "10:30", "11:30"), section("002", "LEC", "MW", "12:00", "13:00")]);
  const { schedules } = generateSchedules([a, b]);
  const picks = schedules.map((s) => s.bundles.map((x) => x.alternatives[0][0].number).join(","));
  assert.deepEqual(picks.sort(), ["001,002", "002,002"]);
});

test("hard limits and preferences shape the results", () => {
  const a = course("a-100", [
    section("001", "LEC", "MWF", "08:00", "09:00"),
    section("002", "LEC", "MWF", "13:00", "14:00"),
  ]);
  const b = course("b-100", [
    section("001", "LEC", "TTh", "10:00", "11:30"),
    section("002", "LEC", "MW", "14:00", "15:30"),
  ]);
  const noEarly = generateSchedules([a, b], { preferences: { earliestStart: "09:00" } });
  assert.ok(noEarly.schedules.every((s) => s.stats.earliestStart >= 9 * 60));

  const noFriday = generateSchedules([a, b], { preferences: { daysOff: ["F"] } });
  assert.deepEqual(noFriday.impossible, ["a-100"]);

  // Fewest days on campus: a-002 + b-002 uses MWF only.
  const compact = generateSchedules([a, b], { preferences: { minimizeDays: true } });
  assert.equal(compact.schedules[0].stats.days, 3);
  assert.deepEqual(compact.schedules[0].bundles.map((x) => x.alternatives[0][0].number), ["002", "002"]);
});

test("allowedSections pins a course to chosen sections", () => {
  const a = course("a-100", [section("001", "LEC", "M", "09:00", "10:00"), section("002", "LEC", "T", "09:00", "10:00")]);
  const { schedules } = generateSchedules([a], { allowedSections: { "a-100": ["002"] } });
  assert.equal(schedules.length, 1);
  assert.equal(schedules[0].bundles[0].alternatives[0][0].number, "002");
});

test("real Winter 2027 data: a typical CS semester generates quickly", () => {
  const { courses } = JSON.parse(readFileSync(new URL("../data/schedule/WN2027.json", import.meta.url), "utf8")) as {
    courses: ScheduleCourse[];
  };
  const pick = ["eecs-281", "eecs-370", "math-215", "econ-101"].map((id) => courses.find((c) => c.id === id)!);
  const started = performance.now();
  const result = generateSchedules(pick, { preferences: { minimizeGaps: true, preferLateStart: true } });
  const ms = performance.now() - started;

  assert.ok(result.schedules.length > 0);
  assert.ok(ms < 2000, `took ${ms.toFixed(0)}ms`);
  // No two chosen meetings overlap.
  for (const s of result.schedules.slice(0, 10)) {
    const ivs = s.bundles.flatMap((b) => b.intervals);
    for (let i = 0; i < ivs.length; i++)
      for (let j = i + 1; j < ivs.length; j++)
        if (ivs[i].day === ivs[j].day) assert.ok(ivs[i].end <= ivs[j].start || ivs[j].end <= ivs[i].start);
  }
  console.log(`real data: ${result.explored} schedules found${result.truncated ? " (capped)" : ""} in ${ms.toFixed(0)}ms`);
});
