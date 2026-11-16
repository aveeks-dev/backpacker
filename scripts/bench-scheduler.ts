// Times the schedule generator on real Winter 2027 sections.
//
//   npm run bench
//   npm run bench -- econ-101 eecs-281 math-215 eecs-370
//
// Each run builds every course's section bundles and enumerates every
// conflict-free schedule, as the Schedule page does. A few warm-up runs come
// first so the timings reflect optimized code, then the median of the rest.

import { readFileSync } from "node:fs";
import { cpus } from "node:os";
import { dirname, join } from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";
import type { ScheduleCourse } from "../lib/registrar.ts";
import { generateSchedules } from "../lib/scheduler.ts";

const DEFAULT_COURSES = ["econ-101", "eecs-281", "math-215", "eecs-370"];
const WARMUP = 3;
const RUNS = 20;
// High enough that the default courses are enumerated completely.
const MAX_EXPLORED = 2_000_000;

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const schedule = JSON.parse(readFileSync(join(root, "data", "schedule", "WN2027.json"), "utf8")) as {
  term: string;
  courses: ScheduleCourse[];
};

const ids = process.argv.slice(2).length ? process.argv.slice(2) : DEFAULT_COURSES;
const courses = ids.map((id) => {
  const course = schedule.courses.find((c) => c.id === id);
  if (!course) {
    console.error(`${id} isn't on the ${schedule.term} schedule.`);
    process.exit(1);
  }
  return course;
});

const run = () => generateSchedules(courses, { preferences: { preferLateStart: true, minimizeGaps: true }, maxExplored: MAX_EXPLORED });

for (let i = 0; i < WARMUP; i++) run();
const times: number[] = [];
let result = run();
for (let i = 0; i < RUNS; i++) {
  const start = performance.now();
  result = run();
  times.push(performance.now() - start);
}
times.sort((a, b) => a - b);
const pick = (q: number) => times[Math.min(times.length - 1, Math.floor(q * times.length))].toFixed(1);

console.log(`Courses: ${courses.map((c) => c.code).join(", ")} (${schedule.term})`);
console.log(`Valid schedules: ${result.explored.toLocaleString()}${result.truncated ? "+ (stopped at the cap)" : ""}`);
console.log(`Time over ${RUNS} runs after ${WARMUP} warm-ups: min ${pick(0)} ms, median ${pick(0.5)} ms, p90 ${pick(0.9)} ms`);
console.log(`Machine: ${cpus()[0]?.model.trim() ?? "unknown CPU"}, Node ${process.version}`);
