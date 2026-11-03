import { test } from "node:test";
import assert from "node:assert/strict";
import type { ScheduleCourse, ScheduleSection } from "./registrar.ts";
import { generateSchedules } from "./scheduler.ts";
import {
  blockItems,
  buildIcs,
  conflictingKeys,
  courseStatus,
  creditRange,
  pairsWithPicks,
  pickSection,
  sectionItems,
  unpickSection,
  weekStats,
} from "./calendar.ts";

function section(number: string, component: string, days: string, start: string, end: string): ScheduleSection {
  const dayList = days.match(/Th|Su|[MTWFS]/g) as ScheduleSection["meetings"][number]["days"];
  return { classNumber: `${component}${number}`, number, component, instructors: ["Smith"], meetings: [{ days: dayList, start, end, location: "1670 BBB" }] };
}

const math: ScheduleCourse = {
  id: "math-215", code: "MATH 215", title: "Calculus III", department: "MATH", school: "LSA", credits: "4",
  sections: [
    section("010", "LEC", "MWF", "09:00", "10:00"),
    section("011", "LAB", "Th", "10:00", "11:00"),
    section("020", "LEC", "MWF", "12:00", "13:00"),
    section("021", "LAB", "T", "08:00", "09:00"),
  ],
};

test("picking a section replaces the other section of that component", () => {
  let picks = pickSection(math, {}, math.sections[0]);
  picks = pickSection(math, picks, math.sections[2]);
  assert.deepEqual(picks, { "math-215": ["020"] });
  picks = pickSection(math, picks, math.sections[3]);
  assert.deepEqual(picks["math-215"].sort(), ["020", "021"]);
  assert.deepEqual(unpickSection("math-215", unpickSection("math-215", picks, "020"), "021"), {});
});

test("linked sections only pair with their own lecture", () => {
  const picks = { "math-215": ["010"] };
  assert.ok(pairsWithPicks(math, picks, math.sections[1]));
  assert.ok(!pairsWithPicks(math, picks, math.sections[3]));
  assert.deepEqual(courseStatus(math, picks), { missing: ["LAB"], linked: true });
  assert.deepEqual(courseStatus(math, { "math-215": ["010", "021"] }), { missing: [], linked: false });
});

test("overlaps between different things are conflicts, back-to-back isn't", () => {
  const lec = sectionItems("math-215", math.sections[0]);
  const practice = blockItems({ id: "b1", label: "Practice", days: ["M"], start: "09:30", end: "11:00" });
  const lunch = blockItems({ id: "b2", label: "Lunch", days: ["W"], start: "10:00", end: "11:00" });
  const keys = conflictingKeys([...lec, ...practice, ...lunch]);
  assert.deepEqual([...keys].sort(), ["b1-M", "math-215-010-0-M"]);
});

test("week stats count class time and days, not personal blocks", () => {
  const items = [...sectionItems("math-215", math.sections[0]), ...blockItems({ id: "b", label: "Work", days: ["Su"], start: "10:00", end: "14:00" })];
  assert.deepEqual(weekStats(items), { classMinutes: 180, days: 3 });
});

test("credit ranges", () => {
  assert.deepEqual(creditRange("4"), [4, 4]);
  assert.deepEqual(creditRange("1-3"), [1, 3]);
  assert.deepEqual(creditRange(null), [0, 0]);
});

test("the generator keeps classes out of busy times", () => {
  const free = generateSchedules([math]).schedules.length;
  const busy = generateSchedules([math], { preferences: { busy: [{ day: "W", start: "08:30", end: "09:30" }] } });
  assert.equal(free, 2);
  assert.equal(busy.schedules.length, 1);
  assert.equal(busy.schedules[0].bundles[0].alternatives[0][0].number, "020");
});

test("the .ics file repeats weekly through the term and skips breaks", () => {
  const ics = buildIcs(
    [{ title: "MATH 215 Lecture", location: "1670 BBB", description: "Calculus III, section 010", days: ["M", "W", "F"], start: "09:00", end: "10:00" }],
    undefined,
    new Date("2026-11-03T12:00:00Z"),
  );
  // Long lines are folded with CRLF and a space; unfold them to compare.
  const lines = ics.replace(/\r\n /g, "").split("\r\n");
  // Classes begin Wednesday January 13, so that's the first MWF meeting.
  assert.ok(lines.includes("DTSTART;TZID=America/Detroit:20270113T090000"));
  assert.ok(lines.includes("DTEND;TZID=America/Detroit:20270113T100000"));
  assert.ok(lines.includes("RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR;UNTIL=20270428T035959Z"));
  // MLK Day and the spring break weekdays.
  assert.ok(lines.includes("EXDATE;TZID=America/Detroit:20270118T090000,20270308T090000,20270310T090000,20270312T090000"));
  assert.ok(lines.includes("DESCRIPTION:Calculus III\\, section 010"));
  assert.ok(ics.startsWith("BEGIN:VCALENDAR\r\n") && ics.endsWith("END:VCALENDAR\r\n"));
  assert.ok(ics.split("\r\n").every((l) => l.length <= 75));
});

test("a Tuesday-Thursday class starts on the first Thursday", () => {
  const ics = buildIcs([{ title: "EECS 281", location: "", description: "", days: ["T", "Th"], start: "10:30", end: "12:00" }]);
  assert.match(ics, /DTSTART;TZID=America\/Detroit:20270114T103000/);
  assert.match(ics.replace(/\r\n /g, ""), /EXDATE;TZID=America\/Detroit:20270309T103000,20270311T103000/);
});
