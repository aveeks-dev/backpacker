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

export type GradeLetter =
  | "A+" | "A" | "A-"
  | "B+" | "B" | "B-"
  | "C+" | "C" | "C-"
  | "D+" | "D" | "D-"
  | "E";

export const GRADE_LETTERS: GradeLetter[] = [
  "A+", "A", "A-",
  "B+", "B", "B-",
  "C+", "C", "C-",
  "D+", "D", "D-",
  "E",
];

export type GradeDistribution = {
  median: string;
  mean: number;
  buckets: Partial<Record<GradeLetter, number>>;
};

export type DataQuality = "curated" | "estimated" | "catalog-only";

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
  grades: GradeDistribution | null;
  sections: Section[];
  tags: string[];
  dataQuality: DataQuality;
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
  hasData?: string;
};

export function filterCourses(all: Course[], filters: CourseFilters): Course[] {
  return all.filter((c) => {
    if (filters.department && c.department !== filters.department) return false;
    if (filters.credits && c.credits !== Number(filters.credits)) return false;
    if (filters.maxWorkload && c.workloadHoursPerWeek > Number(filters.maxWorkload)) return false;
    if (filters.fulfills && !c.fulfills.includes(filters.fulfills)) return false;
    if (filters.hasData === "curated" && c.dataQuality !== "curated") return false;
    if (filters.q) {
      const q = filters.q.toLowerCase().replace(/\s+/g, "");
      const haystack = `${c.code} ${c.title} ${c.tags.join(" ")}`.toLowerCase().replace(/\s+/g, "");
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
  | "median-asc"
  | "rating-desc";

export const SORT_LABELS: Record<SortKey, string> = {
  "code-asc": "Course code (A→Z)",
  "workload-asc": "Workload — light first",
  "workload-desc": "Workload — heavy first",
  "difficulty-asc": "Difficulty — easy first",
  "difficulty-desc": "Difficulty — hard first",
  "median-desc": "Median grade — high first",
  "median-asc": "Median grade — low first",
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
      case "median-desc": return (b.grades?.mean ?? 0) - (a.grades?.mean ?? 0);
      case "median-asc": return (a.grades?.mean ?? 0) - (b.grades?.mean ?? 0);
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

// ---------------------------------------------------------------------
// Department averages (for comparative context on detail page)
// ---------------------------------------------------------------------

export type DeptAverages = {
  workload: number;
  difficulty: number;
  meanGpa: number;
  rating: number;
  count: number;
};

let _deptAvgsCache: Record<string, DeptAverages> | null = null;

export function getDepartmentAverages(): Record<string, DeptAverages> {
  if (_deptAvgsCache) return _deptAvgsCache;
  const acc: Record<string, { wSum: number; dSum: number; gSum: number; rSum: number; n: number }> = {};
  for (const c of courses) {
    const k = c.department;
    if (!acc[k]) acc[k] = { wSum: 0, dSum: 0, gSum: 0, rSum: 0, n: 0 };
    acc[k].wSum += c.workloadHoursPerWeek;
    acc[k].dSum += c.difficulty;
    if (c.grades) acc[k].gSum += c.grades.mean;
    acc[k].rSum += c.studentRating;
    acc[k].n += 1;
  }
  const out: Record<string, DeptAverages> = {};
  for (const [k, v] of Object.entries(acc)) {
    out[k] = {
      workload: v.wSum / v.n,
      difficulty: v.dSum / v.n,
      meanGpa: v.gSum / v.n,
      rating: v.rSum / v.n,
      count: v.n,
    };
  }
  _deptAvgsCache = out;
  return out;
}

// ---------------------------------------------------------------------
// Grade letter helpers
// ---------------------------------------------------------------------

export function gradeLetterColor(letter: GradeLetter): string {
  if (letter.startsWith("A")) return "bg-emerald-500";
  if (letter.startsWith("B")) return "bg-emerald-300";
  if (letter.startsWith("C")) return "bg-amber-400";
  if (letter.startsWith("D")) return "bg-orange-400";
  return "bg-rose-400"; // E
}

export function difficultyLabel(d: number): string {
  if (d <= 1) return "Very easy";
  if (d <= 2) return "Easy";
  if (d <= 3) return "Moderate";
  if (d <= 4) return "Hard";
  return "Very hard";
}
