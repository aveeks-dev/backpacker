import coursesData from "@/data/courses.json";

export type Day = "M" | "T" | "W" | "Th" | "F";
export const DAYS: Day[] = ["M", "T", "W", "Th", "F"];
export const DAY_LABELS: Record<Day, string> = { M: "Mon", T: "Tue", W: "Wed", Th: "Thu", F: "Fri" };

export type Meeting = {
  days: Day[];
  start: string;
  end: string;
};

export type Section = {
  id: string;
  number: string;
  professor: string;
  meetings: Meeting[];
  enrolled: number;
  capacity: number;
};

export type GradeDistribution = {
  median: string;
  mean: number;
  aPercent: number;
  bPercent: number;
  cOrLowerPercent: number;
};

export type Course = {
  id: string;
  code: string;
  title: string;
  department: string;
  credits: number;
  description: string;
  prereqs: string[];
  fulfills: string[];
  workloadHoursPerWeek: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  studentRating: number;
  grades: GradeDistribution;
  sections: Section[];
  tags: string[];
};

const courses = coursesData as Course[];

export function getAllCourses(): Course[] {
  return courses;
}

export function getCourse(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getDepartments(): string[] {
  return Array.from(new Set(courses.map((c) => c.department))).sort();
}

export function getAllFulfills(): string[] {
  return Array.from(new Set(courses.flatMap((c) => c.fulfills))).sort();
}

export type FulfillsGroup = { label: string; options: string[] };

export function getFulfillsGroups(): FulfillsGroup[] {
  const all = getAllFulfills();
  const lsa = all.filter((f) => f.startsWith("LSA "));
  const eng = all.filter((f) => f.startsWith("Engineering"));
  const ross = all.filter((f) => f.startsWith("Ross"));
  const major = all.filter(
    (f) =>
      f.endsWith("Major") ||
      f.endsWith("Major Core") ||
      f.endsWith("Major Elective") ||
      f === "CS Theory" ||
      f === "Data Science Core",
  );
  const usedSet = new Set([...lsa, ...eng, ...ross, ...major]);
  const other = all.filter((f) => !usedSet.has(f));

  const groups: FulfillsGroup[] = [];
  if (lsa.length) groups.push({ label: "LSA Distribution", options: lsa });
  if (eng.length) groups.push({ label: "Engineering", options: eng });
  if (ross.length) groups.push({ label: "Ross BBA", options: ross });
  if (major.length) groups.push({ label: "Major / Concentration", options: major });
  if (other.length) groups.push({ label: "Other", options: other });
  return groups;
}

export type CourseFilters = {
  q?: string;
  department?: string;
  credits?: string;
  maxWorkload?: string;
  fulfills?: string;
};

export function filterCourses(all: Course[], filters: CourseFilters): Course[] {
  return all.filter((c) => {
    if (filters.department && c.department !== filters.department) return false;
    if (filters.credits && c.credits !== Number(filters.credits)) return false;
    if (filters.maxWorkload && c.workloadHoursPerWeek > Number(filters.maxWorkload)) return false;
    if (filters.fulfills && !c.fulfills.includes(filters.fulfills)) return false;
    if (filters.q) {
      const q = filters.q.toLowerCase();
      const haystack = `${c.code} ${c.title} ${c.description} ${c.tags.join(" ")}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export type SortKey =
  | "code-asc"
  | "workload-asc"
  | "workload-desc"
  | "difficulty-asc"
  | "difficulty-desc"
  | "median-desc"
  | "rating-desc";

export const SORT_LABELS: Record<SortKey, string> = {
  "code-asc": "Course code (A→Z)",
  "workload-asc": "Workload — light first",
  "workload-desc": "Workload — heavy first",
  "difficulty-asc": "Difficulty — easy first",
  "difficulty-desc": "Difficulty — hard first",
  "median-desc": "Median grade — high first",
  "rating-desc": "Rating — high first",
};

export function sortCourses(list: Course[], key: SortKey): Course[] {
  const sorted = [...list];
  sorted.sort((a, b) => {
    switch (key) {
      case "workload-asc": return a.workloadHoursPerWeek - b.workloadHoursPerWeek;
      case "workload-desc": return b.workloadHoursPerWeek - a.workloadHoursPerWeek;
      case "difficulty-asc": return a.difficulty - b.difficulty;
      case "difficulty-desc": return b.difficulty - a.difficulty;
      case "median-desc": return b.grades.mean - a.grades.mean;
      case "rating-desc": return b.studentRating - a.studentRating;
      case "code-asc":
      default: return a.code.localeCompare(b.code);
    }
  });
  return sorted;
}

export function isSortKey(value: string | undefined): value is SortKey {
  return !!value && value in SORT_LABELS;
}
