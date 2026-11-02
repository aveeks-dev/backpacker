// Server-only course data: the Atlas catalog merged with the current term's
// Registrar schedule. Client components should fetch from /api/courses
// instead of importing this module, which would bundle all the data.

import catalogData from "@/data/catalog.json";
import scheduleData from "@/data/schedule/WN2027.json";
import type { ScheduleCourse, ScheduleSection } from "./registrar";

export const CURRENT_TERM = { id: "WN2027", label: "Winter 2027" };

export type Course = {
  id: string;
  code: string;
  title: string;
  department: string;
  school: string | null; // null when the course isn't offered this term
  credits: string | null; // null when the course isn't offered this term
  sections: ScheduleSection[]; // this term's sections; empty if not offered
};

export type CourseSummary = Pick<Course, "id" | "code" | "title" | "credits"> & { offered: boolean };

type CatalogEntry = { id: string; code: string; title: string; department: string };

function compareCodes(a: Course, b: Course): number {
  return a.department.localeCompare(b.department) || a.code.localeCompare(b.code, undefined, { numeric: true });
}

function buildCourses(): Course[] {
  const byId = new Map<string, Course>();
  for (const c of catalogData as CatalogEntry[]) {
    byId.set(c.id, { ...c, school: null, credits: null, sections: [] });
  }
  for (const s of (scheduleData as { courses: ScheduleCourse[] }).courses) {
    const existing = byId.get(s.id);
    if (existing) {
      // Keep the catalog title; the Registrar abbreviates ("Data Struct&Algor").
      existing.school = s.school;
      existing.credits = s.credits;
      existing.sections = s.sections;
    } else {
      byId.set(s.id, { id: s.id, code: s.code, title: s.title, department: s.department, school: s.school, credits: s.credits, sections: s.sections });
    }
  }
  return [...byId.values()].sort(compareCodes);
}

const courses = buildCourses();
const courseById = new Map(courses.map((c) => [c.id, c]));

export function getAllCourses(): Course[] {
  return courses;
}

export function getCourse(id: string): Course | undefined {
  return courseById.get(id);
}

export function getCoursesById(ids: string[]): Course[] {
  return ids.map((id) => courseById.get(id)).filter((c): c is Course => !!c);
}

export function isOffered(course: Course): boolean {
  return course.sections.length > 0;
}

export function toSummary(c: Course): CourseSummary {
  return { id: c.id, code: c.code, title: c.title, credits: c.credits, offered: isOffered(c) };
}

export function getDepartments(): string[] {
  return Array.from(new Set(courses.map((c) => c.department))).sort();
}

export function getSchools(): string[] {
  return Array.from(new Set(courses.flatMap((c) => (c.school ? [c.school] : [])))).sort();
}

export type CourseFilters = {
  q?: string;
  school?: string;
  department?: string;
  credits?: string;
  level?: string;
  offered?: string; // "1" = only courses offered this term
};

function normalize(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "");
}

export function matchesQuery(course: Course, q: string): boolean {
  const needle = normalize(q);
  return normalize(`${course.code} ${course.title}`).includes(needle);
}

export function filterCourses(all: Course[], filters: CourseFilters): Course[] {
  const level = filters.level ? parseInt(filters.level, 10) : null;
  return all.filter((c) => {
    if (filters.offered === "1" && !isOffered(c)) return false;
    if (filters.school && c.school !== filters.school) return false;
    if (filters.department && c.department !== filters.department) return false;
    if (filters.credits && c.credits !== filters.credits) return false;
    if (level !== null) {
      const lvl = getCourseLevelGroup(c);
      if (level >= 600 ? lvl < 600 : lvl !== level) return false;
    }
    if (filters.q && !matchesQuery(c, filters.q)) return false;
    return true;
  });
}

/** Search for pickers: exact code-prefix matches first, then title matches. */
export function searchCourses(q: string, { offeredOnly = false, limit = 8 } = {}): Course[] {
  const needle = normalize(q);
  if (!needle) return [];
  const pool = offeredOnly ? courses.filter(isOffered) : courses;
  const codeHits = pool.filter((c) => normalize(c.code).startsWith(needle));
  const rest = pool.filter((c) => !normalize(c.code).startsWith(needle) && matchesQuery(c, q));
  return [...codeHits, ...rest].slice(0, limit);
}

// ---------------------------------------------------------------------
// Course level helpers
// ---------------------------------------------------------------------

export function getCourseLevel(course: Course): number {
  const m = course.code.match(/\b(\d{2,4})/);
  if (!m) return 0;
  return Math.floor(parseInt(m[1], 10) / 100) * 100;
}

export function getCourseLevelGroup(course: Course): number {
  const lvl = getCourseLevel(course);
  return lvl >= 600 ? 600 : lvl;
}

export function levelLabel(level: number): string {
  if (level === 0) return "Unnumbered";
  if (level <= 100) return "100 — Introductory";
  if (level <= 200) return "200 — Lower division";
  if (level <= 300) return "300 — Upper division";
  if (level <= 400) return "400 — Advanced undergrad";
  if (level <= 500) return "500 — Capstone / Grad";
  return "600+ — Graduate";
}

export function getSimilarCourses(course: Course, n = 6): Course[] {
  const target = getCourseLevel(course);
  return courses
    .filter((c) => c.id !== course.id && c.department === course.department)
    .map((c) => ({ c, d: Math.abs(getCourseLevel(c) - target) + (isOffered(c) ? 0 : 1000) }))
    .sort((a, b) => a.d - b.d || compareCodes(a.c, b.c))
    .slice(0, n)
    .map((x) => x.c);
}

/** Distinct instructors across a course's sections, in section order. */
export function getInstructors(course: Course): string[] {
  return Array.from(new Set(course.sections.flatMap((s) => s.instructors)));
}
