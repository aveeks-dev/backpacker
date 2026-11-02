// Degree requirements and four-year layouts, transcribed from official U-M
// pages (each major links its source). Add a major here only from a published
// source: a wrong requirement can cost a student a semester.
// Imports must stay relative so plain Node can run the tests.

import { codeOf, hasKnownPrereqs, missingPrereqs } from "./prereqs.ts";

export type Requirement = {
  id: string;
  label: string;
  group: string;
  note?: string;
  credits?: number;
  // Course requirement: satisfied by any option; an option is a set of courses
  // that must all be complete (e.g. PHYSICS 140 + 141).
  anyOf?: string[][];
  // Open requirement: the student picks from a list and reports progress.
  target?: number;
  unit?: "credits" | "course";
  browse?: string; // where to look for eligible courses
};

export type PlanEntry = { label: string; credits?: number; req?: string };

export type Major = {
  id: string;
  name: string;
  school: string;
  sourceUrl: string;
  sourceLabel: string;
  planIsOfficial: boolean;
  planSourceUrl?: string;
  notes: string[];
  requirements: Requirement[];
  plan: PlanEntry[][]; // terms in order
};

const one = (...ids: string[]) => ids.map((id) => [id]);

const CS_ENG: Major = {
  id: "cs-eng",
  name: "Computer Science",
  school: "College of Engineering (B.S.E.)",
  sourceUrl: "https://bulletin.engin.umich.edu/eecs/",
  sourceLabel: "Engineering Bulletin, FA26 CS-Eng Sample Schedule",
  planIsOfficial: true,
  planSourceUrl: "https://bulletin.engin.umich.edu/wp-content/uploads/sites/306/2026/05/FA26-CS-Eng-Sample-Schedule_5.7.26.pdf",
  notes: [
    "128 credits total. This is the sample for students starting in Fall 2026; students starting in Winter 2027 have a separate WN27 sample.",
    "Students admitted Fall 2023 or later must be selected for the CS major before declaring.",
    "A C or higher is required in science, engineering, and math courses, with no Pass/Fail.",
    "The plan is only a sample. You don't have to follow it exactly, apart from prerequisite chains.",
  ],
  requirements: [
    { id: "math-115", group: "Required of all engineers", label: "Calculus I", credits: 4, anyOf: one("math-115") },
    { id: "math-116", group: "Required of all engineers", label: "Calculus II", credits: 4, anyOf: one("math-116") },
    { id: "math-214", group: "Required of all engineers", label: "Linear algebra", credits: 4, anyOf: one("math-214", "math-217", "math-417", "math-419", "rob-101") },
    { id: "math-215", group: "Required of all engineers", label: "Calculus III or differential equations", credits: 4, anyOf: one("math-215", "math-216") },
    { id: "engr-100", group: "Required of all engineers", label: "Introduction to Engineering", credits: 4, anyOf: one("engr-100") },
    { id: "engr-101", group: "Required of all engineers", label: "Introduction to Computers", credits: 4, anyOf: one("engr-101", "engr-151", "eecs-180", "eecs-183", "rob-102") },
    { id: "chem", group: "Required of all engineers", label: "Chemistry with lab", credits: 5, anyOf: [["chem-125", "chem-126", "chem-130"], ["chem-210", "chem-211"]] },
    { id: "physics-140", group: "Required of all engineers", label: "Physics I with lab", credits: 5, anyOf: [["physics-140", "physics-141"]] },
    { id: "physics-240", group: "Required of all engineers", label: "Physics II with lab", credits: 5, anyOf: [["physics-240", "physics-241"]] },
    { id: "breadth", group: "Required of all engineers", label: "Intellectual Breadth", target: 16, unit: "credits", browse: "https://bulletin.engin.umich.edu/rules/graduation/" },
    { id: "eecs-203", group: "CS program", label: "Discrete Mathematics", credits: 4, anyOf: one("eecs-203", "math-465", "math-565") },
    { id: "eecs-280", group: "CS program", label: "Programming and Elementary Data Structures", credits: 4, anyOf: one("eecs-280") },
    { id: "eecs-281", group: "CS program", label: "Data Structures and Algorithms", credits: 4, anyOf: one("eecs-281") },
    { id: "eecs-370", group: "CS program", label: "Introduction to Computer Organization", credits: 4, anyOf: one("eecs-370") },
    { id: "eecs-376", group: "CS program", label: "Foundations of Computer Science", credits: 4, anyOf: one("eecs-376") },
    { id: "stats", group: "CS program", label: "Statistics", credits: 3, anyOf: one("stats-250", "datasci-101", "stats-280", "stats-412", "stats-426", "eecs-301", "econ-451", "to-301", "ioe-265") },
    { id: "tc-300", group: "CS program", label: "Technical communication", credits: 1, anyOf: one("tchnclcm-300") },
    { id: "ethics", group: "CS program", label: "Ethics and professionalism", credits: 2, note: "ENGR 499-002 and approved special topics sections also count.", anyOf: one("eecs-496", "eecs-295", "compfor-111", "cse-543", "comm-349") },
    { id: "capstone", group: "Capstone", label: "Approved CS capstone", target: 1, unit: "course", note: "4 credits. Approved list is in the CS Program Guide.", browse: "https://cse.engin.umich.edu/academics/undergraduate/" },
    { id: "tc-497", group: "Capstone", label: "Capstone technical communication", credits: 2, note: "Same or later semester as the capstone.", anyOf: one("tchnclcm-497") },
    { id: "ulcs", group: "Electives", label: "Upper-level CS technical electives", target: 15, unit: "credits", note: "12 credits of ULCS and 3 of Expanded ULCS, from the Program Guide lists.", browse: "/courses?department=EECS&level=400&offered=1" },
    { id: "flex", group: "Electives", label: "Flexible technical electives", target: 10, unit: "credits", note: "At most 4 credits of directed or independent study.", browse: "https://cse.engin.umich.edu/academics/undergraduate/" },
    { id: "general", group: "Electives", label: "General electives", target: 16, unit: "credits", browse: "/courses?offered=1" },
  ],
  plan: [
    [{ label: "MATH 115", credits: 4, req: "math-115" }, { label: "ENGR 101", credits: 4, req: "engr-101" }, { label: "Chemistry with lab", credits: 5, req: "chem" }, { label: "Intellectual Breadth", credits: 4, req: "breadth" }],
    [{ label: "MATH 116", credits: 4, req: "math-116" }, { label: "ENGR 100", credits: 4, req: "engr-100" }, { label: "PHYSICS 140 + 141", credits: 5, req: "physics-140" }, { label: "Intellectual Breadth", credits: 4, req: "breadth" }],
    [{ label: "PHYSICS 240 + 241", credits: 5, req: "physics-240" }, { label: "EECS 203", credits: 4, req: "eecs-203" }, { label: "EECS 280", credits: 4, req: "eecs-280" }, { label: "General elective", credits: 3, req: "general" }],
    [{ label: "MATH 214", credits: 4, req: "math-214" }, { label: "EECS 281", credits: 4, req: "eecs-281" }, { label: "Intellectual Breadth", credits: 4, req: "breadth" }, { label: "Flexible technical elective", credits: 4, req: "flex" }],
    [{ label: "MATH 215 or 216", credits: 4, req: "math-215" }, { label: "EECS 370", credits: 4, req: "eecs-370" }, { label: "EECS 376", credits: 4, req: "eecs-376" }, { label: "Intellectual Breadth", credits: 4, req: "breadth" }],
    [{ label: "Statistics", credits: 3, req: "stats" }, { label: "TCHNCLCM 300", credits: 1, req: "tc-300" }, { label: "Upper-level CS elective", credits: 4, req: "ulcs" }, { label: "Flexible technical elective", credits: 4, req: "flex" }, { label: "General elective", credits: 4, req: "general" }],
    [{ label: "Ethics and professionalism", credits: 2, req: "ethics" }, { label: "CS capstone", credits: 4, req: "capstone" }, { label: "TCHNCLCM 497", credits: 2, req: "tc-497" }, { label: "Upper-level CS elective", credits: 4, req: "ulcs" }, { label: "General elective", credits: 4, req: "general" }],
    [{ label: "Upper-level CS electives", credits: 7, req: "ulcs" }, { label: "Flexible technical elective", credits: 2, req: "flex" }, { label: "General electives", credits: 5, req: "general" }],
  ],
};

const LSA_FILLER: PlanEntry = { label: "LSA requirements and electives" };

const CS_LSA: Major = {
  id: "cs-lsa",
  name: "Computer Science",
  school: "LSA",
  sourceUrl: "https://lsa.umich.edu/lsa/academics/majors-minors/computer-science-major.html",
  sourceLabel: "LSA major requirements, effective Winter 2026",
  planIsOfficial: false,
  notes: [
    "Before declaring: EECS 203 (or MATH 465/565), EECS 280, and one approved math course. The second math course can come after.",
    "A C or better is required in every course used for the major. At least 26 credits must be upper-level.",
    "The department keeps the approved statistics, capstone, and elective lists, so check with them.",
  ],
  requirements: [
    { id: "math-1", group: "Prerequisites", label: "Approved math course", anyOf: one("math-115", "math-116", "math-214", "math-215", "math-216") },
    { id: "math-2", group: "Prerequisites", label: "Second approved math course", anyOf: one("math-115", "math-116", "math-214", "math-215", "math-216") },
    { id: "eecs-203", group: "Prerequisites", label: "Discrete Mathematics", anyOf: one("eecs-203", "math-465", "math-565") },
    { id: "eecs-280", group: "Prerequisites", label: "Programming and Elementary Data Structures", anyOf: one("eecs-280") },
    { id: "eecs-281", group: "Core", label: "Data Structures and Algorithms", anyOf: one("eecs-281") },
    { id: "eecs-370", group: "Core", label: "Introduction to Computer Organization", anyOf: one("eecs-370") },
    { id: "eecs-376", group: "Core", label: "Foundations of Computer Science", anyOf: one("eecs-376") },
    { id: "stats", group: "Core", label: "Probability and statistics", target: 1, unit: "course", note: "Approved list comes from the department.", browse: "https://cse.engin.umich.edu/academics/undergraduate/" },
    { id: "capstone", group: "Capstone", label: "EECS 443 senior thesis or approved design course", target: 1, unit: "course", note: "Doesn't count as an upper-level elective.", browse: "https://cse.engin.umich.edu/academics/undergraduate/" },
    { id: "electives", group: "Electives", label: "Upper-level CS technical electives", target: 15, unit: "credits", note: "Approved list comes from the department.", browse: "/courses?department=EECS&level=400&offered=1" },
  ],
  plan: [
    [{ label: "First approved math course", req: "math-1" }, { label: "Intro programming if you need it, such as EECS 183" }, LSA_FILLER],
    [{ label: "Second approved math course", req: "math-2" }, LSA_FILLER],
    [{ label: "EECS 203", req: "eecs-203" }, { label: "EECS 280", req: "eecs-280" }, LSA_FILLER],
    [{ label: "EECS 281", req: "eecs-281" }, { label: "Probability and statistics", req: "stats" }, LSA_FILLER],
    [{ label: "EECS 370", req: "eecs-370" }, { label: "EECS 376", req: "eecs-376" }, LSA_FILLER],
    [{ label: "Upper-level CS elective", req: "electives" }, LSA_FILLER],
    [{ label: "Upper-level CS electives", req: "electives" }, { label: "Capstone", req: "capstone" }, LSA_FILLER],
    [{ label: "Upper-level CS elective", req: "electives" }, LSA_FILLER],
  ],
};

const DS_LSA: Major = {
  id: "ds-lsa",
  name: "Data Science",
  school: "LSA",
  sourceUrl: "https://lsa.umich.edu/lsa/academics/majors-minors/data-science-major.html",
  sourceLabel: "LSA major requirements, effective Fall 2024",
  planIsOfficial: false,
  notes: [
    "To declare you need the intro data science, intro programming, Calculus I, and Calculus II prerequisites. Linear algebra and Calculus III can come after.",
    "42 credits minimum, not counting prerequisites, each with a C or higher. Add electives from any category until you reach 42.",
    "EECS allows two attempts each at EECS 203, 280, and 281.",
  ],
  requirements: [
    { id: "intro-ds", group: "Prerequisites", label: "Intro data science", anyOf: one("datasci-101", "stats-206", "stats-250", "stats-280", "ioe-265", "econ-451") },
    { id: "intro-prog", group: "Prerequisites", label: "Intro programming", anyOf: one("eecs-180", "eecs-183", "engr-101", "engr-151") },
    { id: "calc-1", group: "Prerequisites", label: "Calculus I", anyOf: one("math-115", "math-120", "math-185", "math-295") },
    { id: "calc-2", group: "Prerequisites", label: "Calculus II", anyOf: one("math-116", "math-121", "math-156", "math-186", "math-296") },
    { id: "calc-3", group: "Prerequisites", label: "Multivariable calculus", anyOf: one("math-215", "math-205", "math-285") },
    { id: "linear", group: "Prerequisites", label: "Linear algebra", anyOf: one("math-214", "math-217") },
    { id: "eecs-203", group: "Core", label: "Discrete Mathematics", credits: 4, anyOf: one("eecs-203", "math-465") },
    { id: "eecs-280", group: "Core", label: "Programming and Elementary Data Structures", credits: 4, anyOf: one("eecs-280") },
    { id: "eecs-281", group: "Core", label: "Data Structures and Algorithms", credits: 4, anyOf: one("eecs-281") },
    { id: "theory", group: "Core", label: "Statistical theory", credits: 3, anyOf: one("stats-412", "stats-425", "math-425", "stats-426") },
    { id: "regression", group: "Core", label: "Applied Regression Analysis", credits: 4, anyOf: one("stats-413", "datasci-413") },
    { id: "ml", group: "Core", label: "Machine learning and data mining", credits: 4, anyOf: one("eecs-445", "stats-415") },
    { id: "data-mgmt", group: "Core", label: "Data management", credits: 4, anyOf: one("eecs-484", "eecs-485") },
    { id: "adv-stats", group: "Categories", label: "Advanced statistical analysis", anyOf: one("stats-306", "datasci-306", "stats-315", "datasci-315", "stats-415", "stats-426", "stats-449", "stats-451", "datasci-451", "stats-470", "stats-480", "stats-485", "datasci-485", "stats-531", "datasci-531") },
    { id: "applications", group: "Categories", label: "Applications elective", target: 1, unit: "course", note: "Approved list is linked from the LSA major page.", browse: "https://lsa.umich.edu/stats/undergraduate-students/undergraduate-programs/majordatascience/data-science-electives.html" },
    { id: "adv-tech", group: "Categories", label: "Advanced technical elective", target: 1, unit: "course", note: "Approved list is linked from the LSA major page.", browse: "https://lsa.umich.edu/stats/undergraduate-students/undergraduate-programs/majordatascience/data-science-electives.html" },
    { id: "capstone", group: "Capstone", label: "Data science capstone", target: 1, unit: "course", note: "At least 3 credits. Can't also count in another category.", browse: "https://lsa.umich.edu/stats/undergraduate-students/undergraduate-programs/majordatascience/data-science-electives.html" },
  ],
  plan: [
    [{ label: "Calculus I", req: "calc-1" }, { label: "Intro programming", req: "intro-prog" }, LSA_FILLER],
    [{ label: "Calculus II", req: "calc-2" }, { label: "Intro data science", req: "intro-ds" }, LSA_FILLER],
    [{ label: "EECS 203", req: "eecs-203" }, { label: "EECS 280", req: "eecs-280" }, { label: "Linear algebra", req: "linear" }, LSA_FILLER],
    [{ label: "EECS 281", req: "eecs-281" }, { label: "Multivariable calculus", req: "calc-3" }, LSA_FILLER],
    [{ label: "Statistical theory", req: "theory" }, { label: "Applied Regression Analysis", req: "regression" }, LSA_FILLER],
    [{ label: "Machine learning", req: "ml" }, { label: "Advanced statistical analysis", req: "adv-stats" }, LSA_FILLER],
    [{ label: "Data management", req: "data-mgmt" }, { label: "Applications elective", req: "applications" }, LSA_FILLER],
    [{ label: "Advanced technical elective", req: "adv-tech" }, { label: "Capstone", req: "capstone" }, LSA_FILLER],
  ],
};

const ECON_LSA: Major = {
  id: "econ-lsa",
  name: "Economics",
  school: "LSA",
  sourceUrl: "https://lsa.umich.edu/lsa/academics/majors-minors/economics-major.html",
  sourceLabel: "LSA major requirements, effective Winter 2027",
  planIsOfficial: false,
  notes: [
    "Finish the prerequisites with a C or better before declaring, then meet an Economics advisor.",
    "30 credits minimum, with a 2.0 GPA or better in the major. ECON 401 and 402 need a C- or better and must be taken on the Ann Arbor campus.",
    "MATH 120 can't replace MATH 115. MATH 116 is required for ECON 451; MATH 215 and 217 are required for ECON 453.",
  ],
  requirements: [
    { id: "econ-101", group: "Prerequisites", label: "Principles of Microeconomics", anyOf: one("econ-101") },
    { id: "econ-102", group: "Prerequisites", label: "Principles of Macroeconomics", anyOf: one("econ-102") },
    { id: "math", group: "Prerequisites", label: "Calculus I or an approved substitute", anyOf: one("math-115", "econ-210", "math-116", "math-121", "math-156", "math-185", "math-186", "math-205", "math-215", "math-276", "math-285", "math-295", "math-296") },
    { id: "econ-401", group: "Core", label: "Intermediate Microeconomic Theory", anyOf: one("econ-401") },
    { id: "econ-402", group: "Core", label: "Intermediate Macroeconomic Theory", note: "Take ECON 401 first.", anyOf: one("econ-402") },
    { id: "stats", group: "Core", label: "Statistics", anyOf: one("datasci-101", "stats-206", "stats-250", "stats-280", "stats-426", "econ-451", "econ-453") },
    { id: "econometrics", group: "Core", label: "Econometrics", anyOf: one("econ-251", "econ-452", "econ-454") },
    { id: "electives", group: "Electives", label: "Upper-level ECON electives", target: 15, unit: "credits", note: "300 and 400 level, with at least 9 credits in 400-level courses that require ECON 401 or 402.", browse: "/courses?department=ECON&offered=1" },
  ],
  plan: [
    [{ label: "ECON 101", req: "econ-101" }, { label: "MATH 115 or substitute", req: "math" }, LSA_FILLER],
    [{ label: "ECON 102", req: "econ-102" }, LSA_FILLER],
    [{ label: "Statistics", req: "stats" }, LSA_FILLER],
    [{ label: "ECON 401", req: "econ-401" }, { label: "Econometrics", req: "econometrics" }, LSA_FILLER],
    [{ label: "ECON 402", req: "econ-402" }, LSA_FILLER],
    [{ label: "Upper-level ECON elective", req: "electives" }, LSA_FILLER],
    [{ label: "Upper-level ECON electives", req: "electives" }, LSA_FILLER],
    [{ label: "Upper-level ECON electives", req: "electives" }, LSA_FILLER],
  ],
};

export const MAJORS: Major[] = [CS_ENG, CS_LSA, DS_LSA, ECON_LSA];

export function getMajor(id: string | null | undefined): Major | undefined {
  return MAJORS.find((m) => m.id === id);
}

export type Progress = {
  completed: string[];
  openProgress: Record<string, number>;
  // Student's rearrangement of the plan: entry key -> term index.
  layout?: Record<string, number>;
  extraYear?: boolean;
};

export type PlacedEntry = PlanEntry & { key: string };

const TERMS_PER_YEAR = 2;

/** The major's plan with the student's moves applied. Entry keys stay stable. */
export function arrangePlan(major: Major, progress: Partial<Progress>): PlacedEntry[][] {
  const moved = Object.values(progress.layout ?? {});
  const termCount = Math.max(major.plan.length + (progress.extraYear ? TERMS_PER_YEAR : 0), ...moved.map((t) => t + 1));
  const terms: PlacedEntry[][] = Array.from({ length: termCount }, () => []);
  major.plan.forEach((term, t) =>
    term.forEach((entry, i) => {
      const key = `${t}:${i}`;
      terms[progress.layout?.[key] ?? t].push({ ...entry, key });
    }),
  );
  return terms;
}

/**
 * Which plan entries are finished. Reported credits on an open requirement
 * fill its entries in plan order, so 8 Breadth credits check off two 4-credit
 * slots. Entries without credits finish when their requirement does.
 */
export function finishedEntries(terms: PlacedEntry[][], statuses: RequirementStatus[]): Set<string> {
  const byId = new Map(statuses.map((s) => [s.requirement.id, s]));
  const used = new Map<string, number>();
  const finished = new Set<string>();
  for (const entry of terms.flat()) {
    const status = entry.req ? byId.get(entry.req) : undefined;
    if (!status) continue;
    if (status.done) {
      finished.add(entry.key);
    } else if (entry.credits && status.requirement.unit === "credits") {
      const total = (used.get(entry.req!) ?? 0) + entry.credits;
      used.set(entry.req!, total);
      if (total <= status.progress) finished.add(entry.key);
    }
  }
  return finished;
}

export type YearStatus = "Complete" | "In progress" | "Not started";

export function yearStatus(terms: PlacedEntry[][], finished: Set<string>): YearStatus {
  const required = terms.flat().filter((e) => e.req);
  const done = required.filter((e) => finished.has(e.key)).length;
  if (required.length === 0 || done === 0) return "Not started";
  return done === required.length ? "Complete" : "In progress";
}

export type RequirementStatus = {
  requirement: Requirement;
  done: boolean;
  usedCourses: string[];
  progress: number; // open requirements: amount reported, capped at target
};

/**
 * Checks every requirement. A course only counts once ("no double-counting"):
 * requirements are matched in order, and a matched course isn't reused, so two
 * math requirements need two different math courses.
 */
export function evaluate(major: Major, progress: Progress): RequirementStatus[] {
  const available = new Set(progress.completed);
  return major.requirements.map((requirement) => {
    if (requirement.anyOf) {
      const option = requirement.anyOf.find((ids) => ids.every((id) => available.has(id)));
      if (option) option.forEach((id) => available.delete(id));
      return { requirement, done: !!option, usedCourses: option ?? [], progress: 0 };
    }
    const target = requirement.target ?? 0;
    const amount = Math.min(progress.openProgress[requirement.id] ?? 0, target);
    return { requirement, done: amount >= target, usedCourses: [], progress: amount };
  });
}

export function percentComplete(statuses: RequirementStatus[]): number {
  if (statuses.length === 0) return 0;
  const sum = statuses.reduce((total, { requirement, done, progress }) => {
    if (done) return total + 1;
    return requirement.target ? total + progress / requirement.target : total;
  }, 0);
  return Math.round((sum / statuses.length) * 100);
}

/** Every course the major can name, for loading offering data. */
export function majorCourseIds(major: Major): string[] {
  return Array.from(new Set(major.requirements.flatMap((r) => r.anyOf?.flat() ?? [])));
}

export type Suggestion = {
  requirement: Requirement;
  // Course options offered this term. Empty for an open requirement.
  options: string[][];
};

export type BlockedSuggestion = { requirement: Requirement; missing: string[][] };

export type SuggestionResult = {
  suggestions: Suggestion[];
  // Next-up requirements with no offered option this term.
  notOffered: Requirement[];
  // Next-up requirements whose published prerequisites aren't met yet.
  blocked: BlockedSuggestion[];
};

const subjectOf = (courseId: string) => courseId.split("-")[0];

/**
 * Suggests next-term courses in the student's plan order. Courses with
 * published prerequisites are checked against them. Other subjects stay
 * conservative: only the earliest unfinished plan term per subject is
 * suggested, so MATH 116 waits for MATH 115. Open requirements fill what's
 * left, and only once their plan term is close.
 */
export function suggestNext(
  major: Major,
  progress: Progress,
  isOffered: (courseId: string) => boolean,
  maxCourses = 4,
): SuggestionResult {
  const statuses = new Map(evaluate(major, progress).map((s) => [s.requirement.id, s]));
  const remaining = arrangePlan(major, progress).flatMap((term, termIndex) =>
    term
      .filter((e) => e.req && !statuses.get(e.req)?.done)
      .map((e) => ({ requirement: statuses.get(e.req!)!.requirement, termIndex })),
  );
  if (remaining.length === 0) return { suggestions: [], notOffered: [], blocked: [] };

  const seen = new Set<string>();
  const unique = remaining.filter(({ requirement }) => !seen.has(requirement.id) && !!seen.add(requirement.id));
  const earliestTerm = unique[0].termIndex;
  const firstTermBySubject = new Map<string, number>();
  for (const { requirement, termIndex } of unique) {
    if (!requirement.anyOf) continue;
    const subject = subjectOf(requirement.anyOf[0][0]);
    if (!firstTermBySubject.has(subject)) firstTermBySubject.set(subject, termIndex);
  }

  const suggestions: Suggestion[] = [];
  const notOffered: Requirement[] = [];
  const blocked: BlockedSuggestion[] = [];
  for (const { requirement, termIndex } of unique) {
    if (suggestions.length >= maxCourses) break;
    if (requirement.anyOf) {
      const known = requirement.anyOf[0].every(hasKnownPrereqs);
      if (!known && firstTermBySubject.get(subjectOf(requirement.anyOf[0][0])) !== termIndex) continue;
      const unlocked = requirement.anyOf.filter((ids) => ids.every((id) => missingPrereqs(id, progress.completed).length === 0));
      if (unlocked.length === 0) {
        // Only mention what's coming up soon, not the whole degree.
        if (termIndex <= earliestTerm + 2 && blocked.length < 3) {
          blocked.push({ requirement, missing: missingPrereqs(requirement.anyOf[0][0], progress.completed) });
        }
        continue;
      }
      const options = unlocked.filter((ids) => ids.every(isOffered));
      if (options.length > 0) suggestions.push({ requirement, options });
      else notOffered.push(requirement);
    } else if (termIndex <= earliestTerm + 1) {
      suggestions.push({ requirement, options: [] });
    }
  }
  return { suggestions, notOffered, blocked };
}

export const courseCode = codeOf;
