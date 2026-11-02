import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parseCsv, parseScheduleCsv, parseSubject, parseTimeRange, splitInstructors } from "./registrar.ts";

test("parseTimeRange infers the start's AM/PM from the end", () => {
  assert.deepEqual(parseTimeRange("10-1130AM"), { start: "10:00", end: "11:30" });
  assert.deepEqual(parseTimeRange("1130-1PM"), { start: "11:30", end: "13:00" });
  assert.deepEqual(parseTimeRange("10-12PM"), { start: "10:00", end: "12:00" });
  assert.deepEqual(parseTimeRange("12-1PM"), { start: "12:00", end: "13:00" });
  assert.deepEqual(parseTimeRange("1-230PM"), { start: "13:00", end: "14:30" });
  assert.deepEqual(parseTimeRange("830-10AM"), { start: "08:30", end: "10:00" });
  assert.deepEqual(parseTimeRange("6-9PM"), { start: "18:00", end: "21:00" });
  assert.deepEqual(parseTimeRange(" 4 - 530 pm "), { start: "16:00", end: "17:30" });
});

test("parseTimeRange rejects arranged and malformed times", () => {
  assert.equal(parseTimeRange("ARR"), null);
  assert.equal(parseTimeRange("TBA"), null);
  assert.equal(parseTimeRange(""), null);
  assert.equal(parseTimeRange("10-1130"), null);
  assert.equal(parseTimeRange("13-2PM"), null);
});

test("parseSubject and splitInstructors", () => {
  assert.equal(parseSubject("Electrical Engineering and Computer Science (EECS)"), "EECS");
  assert.equal(parseSubject("Women's and Gender Studies (WGS)"), "WGS");
  assert.equal(parseSubject("MATH"), "MATH");
  assert.deepEqual(splitInstructors("Darden, Garcia-Ramirez, Paoletti"), ["Darden", "Garcia-Ramirez", "Paoletti"]);
  assert.deepEqual(splitInstructors(""), []);
});

test("parseCsv handles quotes, commas, and CRLF", () => {
  assert.deepEqual(parseCsv('a,"b, c","d ""e"""\r\n1,2,3\r\n'), [
    ["a", "b, c", 'd "e"'],
    ["1", "2", "3"],
  ]);
});

test("parseScheduleCsv merges rows into courses and sections", () => {
  const csv = readFileSync(new URL("../scripts/fixtures/sample-schedule.csv", import.meta.url), "utf8");
  const { courses, warnings } = parseScheduleCsv(csv);

  assert.deepEqual(courses.map((c) => c.id), ["eecs-280", "eecs-281", "math-215"]);
  const eecs281 = courses.find((c) => c.id === "eecs-281")!;
  assert.equal(eecs281.code, "EECS 281");
  assert.equal(eecs281.credits, "4");
  assert.deepEqual(eecs281.sections.map((s) => `${s.number} ${s.component}`), ["001 LEC", "011 LAB", "012 LAB"]);

  // Two rows for one class number (different instructors, same time) collapse into one meeting.
  const lec = eecs281.sections[0];
  assert.deepEqual(lec.instructors, ["Darden", "Garcia-Ramirez", "Paoletti"]);
  assert.deepEqual(lec.meetings, [
    { days: ["T", "Th"], start: "10:30", end: "12:00", location: "1670 BBB" },
  ]);

  // Two rows with different patterns become two meetings.
  const math = courses.find((c) => c.id === "math-215")!;
  assert.equal(math.sections[0].meetings.length, 2);

  // "ARR" leaves the section without meetings and is not a warning.
  const arr = courses.find((c) => c.id === "eecs-280")!.sections.find((s) => s.number === "099")!;
  assert.deepEqual(arr.meetings, []);
  // So does the zero-length "1-1AM" placeholder, even with days set.
  const placeholder = courses.find((c) => c.id === "eecs-280")!.sections.find((s) => s.number === "098")!;
  assert.deepEqual(placeholder.meetings, []);
  assert.deepEqual(warnings, []);
});

test("credits come from the lecture even when a 0-unit lab row is first", () => {
  const csv = readFileSync(new URL("../scripts/fixtures/sample-schedule.csv", import.meta.url), "utf8");
  const [header, ...rows] = csv.trim().split(/\r?\n/);
  const lab = rows.find((r) => r.includes(",011,"))!;
  const reordered = [header, lab, ...rows.filter((r) => r !== lab)].join("\n");
  const eecs281 = parseScheduleCsv(reordered).courses.find((c) => c.id === "eecs-281")!;
  assert.equal(eecs281.credits, "4");
});

test("parseScheduleCsv names missing columns", () => {
  assert.throws(() => parseScheduleCsv("Subject,Title\nEECS,Foo\n"), /missing columns: Acad Group, Class Nbr/);
});
