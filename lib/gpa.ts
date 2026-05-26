import type { Course, GradeLetter } from "./courses";

const GPA_POINTS: Record<GradeLetter, number> = {
  "A+": 4.0,
  "A": 4.0,
  "A-": 3.7,
  "B+": 3.3,
  "B": 3.0,
  "B-": 2.7,
  "C+": 2.3,
  "C": 2.0,
  "C-": 1.7,
  "D+": 1.3,
  "D": 1.0,
  "D-": 0.7,
  "E": 0.0,
};

export function letterToPoints(letter: GradeLetter): number {
  return GPA_POINTS[letter];
}

export function expectedGpaForCourse(course: Course): number | null {
  if (!course.grades) return null;
  let total = 0;
  let sumPct = 0;
  for (const [letter, pct] of Object.entries(course.grades.buckets)) {
    if (pct === undefined) continue;
    total += GPA_POINTS[letter as GradeLetter] * pct;
    sumPct += pct;
  }
  return sumPct > 0 ? total / sumPct : null;
}

export type SemesterForecast = {
  expected: number;
  p25: number;
  p75: number;
  best: number;
  worst: number;
  totalCredits: number;
  coursesWithData: number;
  coursesTotal: number;
};

export function semesterGpaForecast(coursesIn: Course[]): SemesterForecast | null {
  const valid = coursesIn.filter((c) => c.grades && c.credits > 0);
  if (valid.length === 0) return null;
  const totalCredits = valid.reduce((s, c) => s + c.credits, 0);
  if (totalCredits === 0) return null;

  // Expected (deterministic)
  let eSum = 0;
  for (const c of valid) {
    const e = expectedGpaForCourse(c) ?? 0;
    eSum += e * c.credits;
  }
  const expected = eSum / totalCredits;

  // Monte Carlo for percentiles (deterministic seed via LCG so SSR & client agree)
  const trials = 2000;
  let seed = 0;
  for (const c of valid) for (const ch of c.id) seed = (seed * 31 + ch.charCodeAt(0)) | 0;
  seed = Math.abs(seed) || 1;
  const rng = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const samples: number[] = new Array(trials);
  for (let t = 0; t < trials; t++) {
    let sum = 0;
    for (const c of valid) {
      const letter = sampleLetter(c.grades!.buckets, rng);
      sum += GPA_POINTS[letter] * c.credits;
    }
    samples[t] = sum / totalCredits;
  }
  samples.sort((a, b) => a - b);

  return {
    expected,
    p25: samples[Math.floor(trials * 0.25)],
    p75: samples[Math.floor(trials * 0.75)],
    best: samples[trials - 1],
    worst: samples[0],
    totalCredits,
    coursesWithData: valid.length,
    coursesTotal: coursesIn.length,
  };
}

function sampleLetter(
  buckets: Partial<Record<GradeLetter, number>>,
  rng: () => number,
): GradeLetter {
  const total = Object.values(buckets).reduce((s, v) => s + (v ?? 0), 0);
  let r = rng() * total;
  for (const [letter, pct] of Object.entries(buckets)) {
    r -= pct ?? 0;
    if (r <= 0) return letter as GradeLetter;
  }
  return "B";
}

export function gpaToLetter(gpa: number): string {
  if (gpa >= 3.85) return "A";
  if (gpa >= 3.5) return "A-";
  if (gpa >= 3.15) return "B+";
  if (gpa >= 2.85) return "B";
  if (gpa >= 2.5) return "B-";
  if (gpa >= 2.15) return "C+";
  if (gpa >= 1.85) return "C";
  if (gpa >= 1.5) return "C-";
  if (gpa >= 1.15) return "D+";
  if (gpa >= 0.85) return "D";
  if (gpa >= 0.5) return "D-";
  return "E";
}
