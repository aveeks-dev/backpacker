// Degree requirements and four-year layouts, transcribed from official U-M
// pages (each major links its source). Add a major here only from a published
// source: a wrong requirement can cost a student a semester.
// Imports must stay relative so plain Node can run the tests.

import { ENGINEERING_PLANS } from "./engineering-plans.ts";
import { EXTRA_MAJORS } from "./majors-extra.ts";
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
  // Option courses are taken over several terms, so suggest one at a time.
  sequential?: boolean;
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

const INTRO_BIOLOGY: string[][] = [
  ["biology-171", "biology-172", "biology-173"],
  ["biology-171", "biology-174", "biology-173"],
  ["biology-171", "biology-172", "biology-196"],
  ["biology-171", "biology-174", "biology-196"],
  ["biology-195", "biology-173"],
  ["biology-195", "biology-196"],
  ["biology-191", "biology-192", "biology-173"],
  ["biology-191", "biology-192", "biology-196"],
];

const BIOLOGY: Major = {
  id: "lsa-biology",
  name: "Biology",
  school: "LSA",
  sourceUrl: "https://lsa.umich.edu/lsa/academics/majors-minors/biology-major.html",
  sourceLabel: "LSA major requirements, effective Winter 2027",
  planIsOfficial: false,
  notes: [
    "30 credits minimum with a 2.0 GPA or better in the major. To declare, finish the intro biology sequence and one term in residence.",
    "Courses used for the major can't be Pass/Fail, and intro biology must be taken for a grade.",
    "This major excludes several other biology-related majors and minors; see the source page.",
  ],
  requirements: [
    { id: "intro-bio", group: "Prerequisites", label: "Intro biology sequence", anyOf: INTRO_BIOLOGY, sequential: true },
    { id: "chem-1", group: "Prerequisites", label: "Organic chemistry I with lab", anyOf: [["chem-210", "chem-211"]] },
    { id: "chem-2", group: "Prerequisites", label: "Organic chemistry II with lab", anyOf: [["chem-215", "chem-216"]] },
    { id: "quant", group: "Prerequisites", label: "Quantitative analysis courses", target: 4, unit: "course", note: "Four from calculus, physics, programming, statistics, BIOLOGY 131 or 202, BIOPHYS/PHYSICS 290, or EARTH 468. They can't also count as major electives.", browse: "https://lsa.umich.edu/lsa/academics/majors-minors/biology-major.html" },
    { id: "group-1", group: "Biology groups", label: "Group I: MCDB elective", anyOf: one("biology-205", "biology-207", "biology-225", "biology-230", "biology-272") },
    { id: "group-2", group: "Biology groups", label: "Group II: EEB elective", anyOf: one("biology-207", "biology-230", "biology-252", "biology-255", "biology-256", "biology-281", "biology-282", "biology-288", "eeb-381") },
    { id: "genetics", group: "Required", label: "Genetics", anyOf: one("biology-305") },
    { id: "biochem", group: "Required", label: "Biochemistry", anyOf: one("mcdb-310", "biolchem-415", "chem-351") },
    { id: "evolution", group: "Required", label: "Evolution", anyOf: one("eeb-390", "eeb-391", "eeb-392") },
    { id: "upper", group: "Electives", label: "Upper-level EEB or MCDB elective", target: 1, unit: "course", note: "300 or 400 level, with listed exclusions on the source page.", browse: "/courses?department=MCDB&offered=1" },
    { id: "labs", group: "Electives", label: "Courses with labs", target: 3, unit: "course", note: "These can overlap with other major requirements. The approved list is on the source page.", browse: "https://lsa.umich.edu/lsa/academics/majors-minors/biology-major.html" },
    { id: "additional", group: "Electives", label: "Additional courses to reach 30 credits", target: 30, unit: "credits", note: "Enter your total major credits. Use 200-level or higher BIOLOGY, EEB, and MCDB courses, with listed exclusions.", browse: "/courses?department=BIOLOGY&offered=1" },
  ],
  plan: [
    [{ label: "BIOLOGY 171", req: "intro-bio" }, { label: "Quantitative course", req: "quant" }, LSA_FILLER],
    [{ label: "Rest of intro biology", req: "intro-bio" }, { label: "Quantitative course", req: "quant" }, LSA_FILLER],
    [{ label: "CHEM 210 + 211", req: "chem-1" }, { label: "Group I elective", req: "group-1" }, { label: "Quantitative course", req: "quant" }, LSA_FILLER],
    [{ label: "CHEM 215 + 216", req: "chem-2" }, { label: "Group II elective", req: "group-2" }, { label: "Quantitative course", req: "quant" }, LSA_FILLER],
    [{ label: "BIOLOGY 305", req: "genetics" }, { label: "Course with lab", req: "labs" }, LSA_FILLER],
    [{ label: "Biochemistry", req: "biochem" }, { label: "Course with lab", req: "labs" }, LSA_FILLER],
    [{ label: "Evolution", req: "evolution" }, { label: "Upper-level elective", req: "upper" }, { label: "Course with lab", req: "labs" }, LSA_FILLER],
    [{ label: "Courses to reach 30 credits", req: "additional" }, LSA_FILLER],
  ],
};

const NEUROSCIENCE: Major = {
  id: "lsa-neuroscience",
  name: "Neuroscience",
  school: "LSA",
  sourceUrl: "https://lsa.umich.edu/lsa/academics/majors-minors/neuroscience-major.html",
  sourceLabel: "LSA major requirements, effective Winter 2027",
  planIsOfficial: false,
  notes: [
    "32 credits minimum. You don't have to finish every prerequisite before declaring.",
    "An advisor must approve your plan for the major. Meet one during your first or second year.",
    "This major excludes several other biology and neuroscience majors; see the source page.",
  ],
  requirements: [
    { id: "intro-bio", group: "Prerequisites", label: "Intro biology sequence", anyOf: INTRO_BIOLOGY, sequential: true },
    { id: "chem-1", group: "Prerequisites", label: "Organic chemistry I with lab", anyOf: [["chem-210", "chem-211"]] },
    { id: "chem-2", group: "Prerequisites", label: "Organic chemistry II with lab", anyOf: [["chem-215", "chem-216"]] },
    { id: "stats", group: "Prerequisites", label: "Statistics", anyOf: one("stats-250", "stats-280") },
    { id: "quant", group: "Prerequisites", label: "Quantitative courses", target: 2, unit: "course", note: "Two from calculus, physics, BIOPHYS/PHYSICS 290, programming, or a later STATS course.", browse: "https://lsa.umich.edu/lsa/academics/majors-minors/neuroscience-major.html" },
    { id: "cellular", group: "Core", label: "Cellular and Molecular Neuroscience", anyOf: one("mcdb-322") },
    { id: "behavioral", group: "Core", label: "Intro to Behavioral Neuroscience", anyOf: one("psych-230") },
    { id: "physiology", group: "Core", label: "Human/Animal Physiology", anyOf: one("biology-225") },
    { id: "genetics", group: "Core", label: "Genetics", anyOf: one("biology-305") },
    { id: "biochem", group: "Core", label: "Biochemistry", anyOf: one("mcdb-310", "biolchem-415", "chem-351") },
    { id: "group-a", group: "Electives", label: "Group A: molecular and cellular", target: 1, unit: "course", browse: "https://lsa.umich.edu/lsa/academics/majors-minors/neuroscience-major.html" },
    { id: "group-b", group: "Electives", label: "Group B: behavioral and cognitive", target: 2, unit: "course", browse: "https://lsa.umich.edu/lsa/academics/majors-minors/neuroscience-major.html" },
    { id: "group-c", group: "Electives", label: "Group C: additional elective", target: 1, unit: "course", browse: "https://lsa.umich.edu/lsa/academics/majors-minors/neuroscience-major.html" },
    { id: "labs", group: "Electives", label: "Group D: labs", target: 2, unit: "course", note: "At least 4 credits total, including at least one methods-based lab.", browse: "https://lsa.umich.edu/lsa/academics/majors-minors/neuroscience-major.html" },
  ],
  plan: [
    [{ label: "BIOLOGY 171", req: "intro-bio" }, { label: "Quantitative course", req: "quant" }, LSA_FILLER],
    [{ label: "Rest of intro biology", req: "intro-bio" }, { label: "Quantitative course", req: "quant" }, LSA_FILLER],
    [{ label: "CHEM 210 + 211", req: "chem-1" }, { label: "PSYCH 230", req: "behavioral" }, { label: "Statistics", req: "stats" }, LSA_FILLER],
    [{ label: "CHEM 215 + 216", req: "chem-2" }, { label: "MCDB 322", req: "cellular" }, LSA_FILLER],
    [{ label: "BIOLOGY 225", req: "physiology" }, { label: "BIOLOGY 305", req: "genetics" }, LSA_FILLER],
    [{ label: "Biochemistry", req: "biochem" }, { label: "Group A elective", req: "group-a" }, LSA_FILLER],
    [{ label: "Group B electives", req: "group-b" }, { label: "Lab", req: "labs" }, LSA_FILLER],
    [{ label: "Group C elective", req: "group-c" }, { label: "Lab", req: "labs" }, LSA_FILLER],
  ],
};

const POLSCI_INTRO = one("polsci-101", "polsci-111", "polsci-140", "polsci-160");

const POLITICAL_SCIENCE: Major = {
  id: "lsa-political-science",
  name: "Political Science",
  school: "LSA",
  sourceUrl: "https://lsa.umich.edu/lsa/academics/majors-minors/political-science-major.html",
  sourceLabel: "LSA major requirements, effective Fall 2024",
  planIsOfficial: false,
  notes: [
    "At least 30 credits of POLSCI at the 300 level or above, beyond the prerequisites.",
    "Include two 400-level courses, or one 400-level course and one upper-level writing course in POLSCI.",
    "Take at least one course in four of five subfields: theory, American, comparative, world politics, and methods. Prerequisites can count.",
    "At least 12 credits, including both 400-level courses, must be on the Ann Arbor campus.",
  ],
  requirements: [
    { id: "intro-1", group: "Prerequisites", label: "Intro political science course", anyOf: POLSCI_INTRO },
    { id: "intro-2", group: "Prerequisites", label: "Second intro political science course", anyOf: POLSCI_INTRO },
    { id: "upper", group: "Major courses", label: "POLSCI credits at the 300 level or above", target: 30, unit: "credits", note: "At most 8 experiential and independent study credits, and only 4 from POLSCI 399.", browse: "/courses?department=POLSCI&offered=1" },
  ],
  plan: [
    [{ label: "Intro POLSCI course", req: "intro-1" }, LSA_FILLER],
    [{ label: "Second intro POLSCI course", req: "intro-2" }, LSA_FILLER],
    [LSA_FILLER],
    [{ label: "300-level POLSCI", credits: 3, req: "upper" }, LSA_FILLER],
    [{ label: "300-level POLSCI", credits: 6, req: "upper" }, LSA_FILLER],
    [{ label: "300-level POLSCI", credits: 7, req: "upper" }, LSA_FILLER],
    [{ label: "400-level POLSCI", credits: 7, req: "upper" }, LSA_FILLER],
    [{ label: "400-level POLSCI", credits: 7, req: "upper" }, LSA_FILLER],
  ],
};

const PSYCHOLOGY: Major = {
  id: "lsa-psychology-general-social-science",
  name: "Psychology",
  school: "LSA",
  sourceUrl: "https://lsa.umich.edu/lsa/academics/majors-minors/psychology-general-social-science-major.html",
  sourceLabel: "LSA major requirements, effective Fall 2025",
  planIsOfficial: false,
  notes: [
    "32 credits minimum, not counting prerequisites. Add PSYCH courses if you finish the requirements below 32.",
    "Intro psychology needs a C or better; statistics needs a C- or better, or P.",
    "At least 24 credits must be in residence, including 12 at the 300 level or above.",
  ],
  requirements: [
    { id: "intro", group: "Prerequisites", label: "Intro psychology", anyOf: one("psych-111", "psych-112", "psych-114") },
    { id: "stats", group: "Prerequisites", label: "Statistics", anyOf: one("datasci-101", "stats-250", "stats-280") },
    { id: "breadth-1", group: "Breadth", label: "Group I", anyOf: one("psych-220", "psych-235", "psych-240") },
    { id: "breadth-2", group: "Breadth", label: "Group II", anyOf: one("psych-250", "psych-270") },
    { id: "breadth-3", group: "Breadth", label: "Group III", anyOf: one("psych-280", "psych-290", "psych-291") },
    { id: "labs", group: "Labs", label: "Lab courses", target: 2, unit: "course", note: "Two methods labs, or one methods and one experiential lab, at least 3 credits each. Or complete the thesis research sequence.", browse: "/courses?department=PSYCH&level=300&offered=1" },
    { id: "electives", group: "Electives", label: "Upper-level electives", target: 4, unit: "course", note: "At least 12 credits, with two or more at the 300 level and one or more at the 400 level.", browse: "/courses?department=PSYCH&level=300&offered=1" },
  ],
  plan: [
    [{ label: "Intro psychology", req: "intro" }, LSA_FILLER],
    [{ label: "Statistics", req: "stats" }, LSA_FILLER],
    [{ label: "Group I", req: "breadth-1" }, LSA_FILLER],
    [{ label: "Group II", req: "breadth-2" }, LSA_FILLER],
    [{ label: "Group III", req: "breadth-3" }, { label: "300-level elective", req: "electives" }, LSA_FILLER],
    [{ label: "Lab", req: "labs" }, { label: "300-level elective", req: "electives" }, LSA_FILLER],
    [{ label: "Lab", req: "labs" }, { label: "Upper-level elective", req: "electives" }, LSA_FILLER],
    [{ label: "400-level elective", req: "electives" }, LSA_FILLER],
  ],
};

const ENGINEERING_CORE = CS_ENG.requirements.filter((r) => r.group === "Required of all engineers");

const MECHANICAL: Major = {
  id: "engineering-mechanical-engineering",
  name: "Mechanical Engineering",
  school: "College of Engineering (B.S.E.)",
  sourceUrl: "https://bulletin.engin.umich.edu/depts/me-2/",
  sourceLabel: "Engineering Bulletin, Mechanical Engineering",
  planIsOfficial: false,
  notes: [
    "128 credits total, with 45 credits of ME core. Minimum grades vary by course; see the ME Bachelor's Degree website.",
    "The all-engineer requirements here come from the College's CS sample schedule. Confirm any differences with ME Academic Services.",
    "The Bulletin's linked ME sample schedule is from 2020, so this order is Backpacker's suggestion, not an official plan.",
  ],
  requirements: [
    ...ENGINEERING_CORE,
    { id: "design", group: "ME core", label: "Design and manufacturing I", anyOf: one("mecheng-250") },
    { id: "design-2", group: "ME core", label: "Design and manufacturing II", anyOf: one("mecheng-350") },
    { id: "design-3", group: "ME core", label: "Senior design", credits: 4, anyOf: one("mecheng-450", "mecheng-455") },
    { id: "solids", group: "ME core", label: "Mechanics of solids", anyOf: one("mecheng-211") },
    { id: "materials", group: "ME core", label: "Mechanical behavior of materials", anyOf: one("mecheng-382") },
    { id: "dynamics", group: "ME core", label: "Dynamics", anyOf: one("mecheng-240") },
    { id: "controls", group: "ME core", label: "Modeling and control", anyOf: one("mecheng-360") },
    { id: "thermo", group: "ME core", label: "Thermodynamics", anyOf: one("mecheng-235") },
    { id: "fluids", group: "ME core", label: "Fluid mechanics", anyOf: one("mecheng-320") },
    { id: "heat", group: "ME core", label: "Heat transfer", anyOf: one("mecheng-335") },
    { id: "lab-1", group: "ME core", label: "Laboratory I", anyOf: one("mecheng-395") },
    { id: "lab-2", group: "ME core", label: "Senior laboratory", anyOf: one("mecheng-495") },
    { id: "eecs", group: "ME program", label: "Circuits", credits: 4, note: "EECS 314 needs a D or better and can't be Pass/Fail.", anyOf: one("eecs-314", "eecs-215") },
    { id: "te-400", group: "ME program", label: "400-level technical elective", target: 3, unit: "credits", note: "A 400-level or higher MECHENG course.", browse: "/courses?department=MECHENG&level=400&offered=1" },
    { id: "te-core", group: "ME program", label: "Core technical electives", target: 6, unit: "credits", note: "Two MECHENG electives with a mechanical engineering prerequisite.", browse: "https://bulletin.engin.umich.edu/depts/me-2/" },
    { id: "adv-math", group: "ME program", label: "Advanced math", target: 3, unit: "credits", browse: "https://bulletin.engin.umich.edu/depts/me-2/" },
    { id: "specialization", group: "ME program", label: "Specialization elective", target: 3, unit: "credits", browse: "https://bulletin.engin.umich.edu/depts/me-2/" },
    { id: "econ", group: "ME program", label: "Economics or finance course", target: 3, unit: "credits", browse: "https://bulletin.engin.umich.edu/depts/me-2/" },
  ],
  plan: [
    [{ label: "MATH 115", req: "math-115" }, { label: "ENGR 101", req: "engr-101" }, { label: "Chemistry with lab", req: "chem" }, { label: "Intellectual Breadth", credits: 4, req: "breadth" }],
    [{ label: "MATH 116", req: "math-116" }, { label: "ENGR 100", req: "engr-100" }, { label: "PHYSICS 140 + 141", req: "physics-140" }, { label: "Intellectual Breadth", credits: 4, req: "breadth" }],
    [{ label: "Linear algebra", req: "math-214" }, { label: "PHYSICS 240 + 241", req: "physics-240" }, { label: "MECHENG 211", req: "solids" }, { label: "MECHENG 235", req: "thermo" }],
    [{ label: "MATH 215 or 216", req: "math-215" }, { label: "MECHENG 240", req: "dynamics" }, { label: "MECHENG 250", req: "design" }, { label: "Circuits", req: "eecs" }],
    [{ label: "MECHENG 320", req: "fluids" }, { label: "MECHENG 350", req: "design-2" }, { label: "MECHENG 360", req: "controls" }, { label: "MECHENG 382", req: "materials" }],
    [{ label: "MECHENG 335", req: "heat" }, { label: "MECHENG 395", req: "lab-1" }, { label: "Advanced math", req: "adv-math" }, { label: "Economics or finance", req: "econ" }, { label: "Intellectual Breadth", credits: 4, req: "breadth" }],
    [{ label: "Senior design", req: "design-3" }, { label: "Core technical electives", req: "te-core" }, { label: "Specialization elective", req: "specialization" }, { label: "Intellectual Breadth", credits: 4, req: "breadth" }],
    [{ label: "MECHENG 495", req: "lab-2" }, { label: "400-level technical elective", req: "te-400" }, { label: "General electives" }],
  ],
};

const STATS_ADVANCED = one("stats-315", "datasci-315", "stats-406", "stats-415", "stats-430", "stats-449", "stats-451", "datasci-451", "stats-470", "stats-480", "stats-526", "math-526");

const STATISTICS: Major = {
  id: "lsa-statistics",
  name: "Statistics",
  school: "LSA",
  sourceUrl: "https://lsa.umich.edu/lsa/academics/majors-minors/statistics-major.html",
  sourceLabel: "LSA major requirements, effective Fall 2023",
  planIsOfficial: false,
  notes: [
    "29 credits minimum. Build your plan with a Statistics undergraduate advisor.",
    "To declare, you need one statistics class and Calculus II. Prerequisites can be Pass/Fail.",
    "At least 15 major credits must be on the Ann Arbor campus.",
  ],
  requirements: [
    { id: "calc-3", group: "Prerequisites", label: "Multivariable calculus", anyOf: one("math-215", "math-205", "math-285") },
    { id: "linear", group: "Prerequisites", label: "Linear algebra", anyOf: one("math-214", "math-217") },
    { id: "prog", group: "Prerequisites", label: "Intro programming", anyOf: one("eecs-183") },
    { id: "intro", group: "Prerequisites", label: "Intro statistics", anyOf: one("stats-250", "datasci-101", "stats-206", "stats-280", "stats-412") },
    { id: "applied", group: "Core", label: "Applied statistics", anyOf: one("stats-413", "datasci-413") },
    { id: "prob", group: "Core", label: "Probability", anyOf: one("stats-425", "math-425") },
    { id: "theory", group: "Core", label: "Theoretical statistics", anyOf: one("stats-426") },
    { id: "computing", group: "Core", label: "Statistical computing", anyOf: one("stats-306", "datasci-306") },
    { id: "adv-1", group: "Advanced", label: "Advanced statistics course", anyOf: STATS_ADVANCED },
    { id: "adv-2", group: "Advanced", label: "Second advanced statistics course", anyOf: STATS_ADVANCED },
    { id: "adv-3", group: "Advanced", label: "Third advanced statistics course", anyOf: STATS_ADVANCED },
    { id: "capstone", group: "Advanced", label: "Capstone", anyOf: one("stats-485", "datasci-485") },
    { id: "electives", group: "Electives", label: "Total credits toward the 29-credit major", target: 29, unit: "credits", note: "Enter your total. Advisor-approved electives fill what the courses above don't.", browse: "/courses?department=STATS&offered=1" },
  ],
  plan: [
    [{ label: "Intro statistics", req: "intro" }, LSA_FILLER],
    [{ label: "EECS 183", req: "prog" }, LSA_FILLER],
    [{ label: "Multivariable calculus", req: "calc-3" }, { label: "Statistical computing", req: "computing" }, LSA_FILLER],
    [{ label: "Linear algebra", req: "linear" }, LSA_FILLER],
    [{ label: "Probability", req: "prob" }, { label: "Applied statistics", req: "applied" }, LSA_FILLER],
    [{ label: "Theoretical statistics", req: "theory" }, { label: "Advanced statistics", req: "adv-1" }, LSA_FILLER],
    [{ label: "Advanced statistics", req: "adv-2" }, { label: "Advanced statistics", req: "adv-3" }, LSA_FILLER],
    [{ label: "Capstone", req: "capstone" }, { label: "Remaining electives", req: "electives" }, LSA_FILLER],
  ],
};

const COMMUNICATION: Major = {
  id: "lsa-communication-studies",
  name: "Communication and Media",
  school: "LSA",
  sourceUrl: "https://lsa.umich.edu/lsa/academics/majors-minors/communication-and-media-major.html",
  sourceLabel: "LSA major requirements, effective Fall 2024",
  planIsOfficial: false,
  notes: [
    "28 credits minimum. COMM 101 and 102 each need a C- or higher.",
    "At most 12 credits can be 200-level, and at most 3 can be independent study or research.",
    "See an advisor during the first term of senior year. See the source page for campus residency rules.",
  ],
  requirements: [
    { id: "comm-101", group: "Prerequisites", label: "COMM 101", anyOf: one("comm-101") },
    { id: "comm-102", group: "Prerequisites", label: "COMM 102", anyOf: one("comm-102") },
    { id: "action", group: "Major", label: "Communication in Action", target: 1, unit: "course", note: "COMM 350-399, COMM 452/492, or an approved course of at least 3 credits.", browse: "/courses?department=COMM&level=300&offered=1" },
    { id: "seminars", group: "Major", label: "400-level seminars", target: 2, unit: "course", note: "At least 6 credits in the department. COMM 441 and 442 don't count. These also count toward the 25 advanced credits.", browse: "/courses?department=COMM&level=400&offered=1" },
    { id: "advanced", group: "Major", label: "Advanced COMM credits", target: 25, unit: "credits", note: "From COMM 200-499.", browse: "/courses?department=COMM&offered=1" },
  ],
  plan: [
    [{ label: "COMM 101", req: "comm-101" }, LSA_FILLER],
    [{ label: "COMM 102", req: "comm-102" }, LSA_FILLER],
    [{ label: "Advanced COMM", credits: 3, req: "advanced" }, LSA_FILLER],
    [{ label: "Advanced COMM", credits: 4, req: "advanced" }, LSA_FILLER],
    [{ label: "Advanced COMM", credits: 6, req: "advanced" }, { label: "Communication in Action", req: "action" }, LSA_FILLER],
    [{ label: "Advanced COMM", credits: 6, req: "advanced" }, LSA_FILLER],
    [{ label: "400-level seminar", req: "seminars" }, { label: "Advanced COMM", credits: 3, req: "advanced" }, LSA_FILLER],
    [{ label: "400-level seminar", req: "seminars" }, { label: "Advanced COMM", credits: 3, req: "advanced" }, LSA_FILLER],
  ],
};

const ENGLISH_LIST = "https://lsa.umich.edu/english/undergraduate/english-major.html";

const ENGLISH: Major = {
  id: "lsa-english",
  name: "English",
  school: "LSA",
  sourceUrl: "https://lsa.umich.edu/lsa/academics/majors-minors/english-major.html",
  sourceLabel: "LSA major requirements, effective Fall 2026",
  planIsOfficial: false,
  notes: [
    "27 credits of ENGLISH with a C- or better. There's no prerequisite to declare.",
    "At most two 200-level courses can count, and courses can't double-count across categories.",
    "The department publishes which courses meet each requirement every year.",
  ],
  requirements: [
    { id: "found-200", group: "Foundations and Methods", label: "200-level course", target: 1, unit: "course", browse: ENGLISH_LIST },
    { id: "found-300", group: "Foundations and Methods", label: "300- or 400-level course", target: 1, unit: "course", browse: ENGLISH_LIST },
    { id: "region-1", group: "Regions", label: "Americas, UK, Australia, New Zealand, or Ireland", target: 1, unit: "course", browse: ENGLISH_LIST },
    { id: "region-2", group: "Regions", label: "Africa, Asia, Middle East, or Pacific Islands", target: 1, unit: "course", browse: ENGLISH_LIST },
    { id: "time", group: "Time", label: "Courses from two time periods", target: 2, unit: "course", note: "Two of: Medieval and Early Modern; 18th and 19th Centuries; Modern and Contemporary.", browse: ENGLISH_LIST },
    { id: "total", group: "Electives", label: "Total credits toward the 27-credit major", target: 27, unit: "credits", note: "Enter your total. Electives fill what the courses above don't.", browse: "/courses?department=ENGLISH&offered=1" },
  ],
  plan: [
    [LSA_FILLER],
    [{ label: "200-level Foundations course", req: "found-200" }, LSA_FILLER],
    [{ label: "Foundations 300/400-level", req: "found-300" }, LSA_FILLER],
    [{ label: "Regions course", req: "region-1" }, LSA_FILLER],
    [{ label: "Regions course", req: "region-2" }, LSA_FILLER],
    [{ label: "Time course", req: "time" }, LSA_FILLER],
    [{ label: "Time course", req: "time" }, LSA_FILLER],
    [{ label: "Remaining electives", req: "total" }, LSA_FILLER],
  ],
};

const HISTORY_LIST = "https://lsa.umich.edu/history/undergraduates.html";

const HISTORY: Major = {
  id: "lsa-history",
  name: "History",
  school: "LSA",
  sourceUrl: "https://lsa.umich.edu/lsa/academics/majors-minors/history-major.html",
  sourceLabel: "LSA major requirements, effective Fall 2022",
  planIsOfficial: false,
  notes: [
    "Ten history courses, none below the 200 level. At least five must be upper-level and five in residence.",
    "Take HISTORY 202 in your first term after declaring. There's no prerequisite to declare.",
    "Requirements can overlap: one course may count for a region, pre-1800, and the colloquium.",
  ],
  requirements: [
    { id: "doing", group: "Required", label: "Doing History", anyOf: one("history-202") },
    { id: "survey", group: "Required", label: "Two-part survey sequence", target: 2, unit: "course", note: "From the department's approved pairings, or your own with approval.", browse: HISTORY_LIST },
    { id: "regions", group: "Distribution", label: "Courses in four regions", target: 4, unit: "course", note: "From North America, Latin America, Europe, Middle East/Central Asia, Africa, Asia, and Transregional/Global.", browse: HISTORY_LIST },
    { id: "pre-1800", group: "Distribution", label: "Pre-1800 course", target: 1, unit: "course", note: "Survey sequence courses don't count here.", browse: HISTORY_LIST },
    { id: "colloquium", group: "Required", label: "Junior-senior colloquium", note: "Honors students take HISTORY 499 instead.", anyOf: one("history-491", "history-496", "history-497", "history-499") },
    { id: "total", group: "Total", label: "Total history courses", target: 10, unit: "course", browse: "/courses?department=HISTORY&offered=1" },
  ],
  plan: [
    [LSA_FILLER],
    [{ label: "History course", req: "total" }, LSA_FILLER],
    [{ label: "HISTORY 202", req: "doing" }, { label: "Survey course", req: "survey" }, LSA_FILLER],
    [{ label: "Survey course", req: "survey" }, { label: "Region course", req: "regions" }, LSA_FILLER],
    [{ label: "Region course", req: "regions" }, { label: "Pre-1800 course", req: "pre-1800" }, LSA_FILLER],
    [{ label: "Region course", req: "regions" }, LSA_FILLER],
    [{ label: "Colloquium", req: "colloquium" }, { label: "Region course", req: "regions" }, LSA_FILLER],
    [{ label: "Remaining history courses", req: "total" }, LSA_FILLER],
  ],
};

const ORGSTUDY_SITE = "https://lsa.umich.edu/orgstudies";

const ORG_STUDIES: Major = {
  id: "lsa-organizational-studies",
  name: "Organizational Studies",
  school: "LSA",
  sourceUrl: "https://lsa.umich.edu/lsa/academics/majors-minors/organizational-studies-major.html",
  sourceLabel: "LSA major requirements, effective Fall 2025",
  planIsOfficial: false,
  notes: [
    "This major is competitive: you apply, usually during sophomore year, with at least two prerequisites finished and the third in progress.",
    "34 credits minimum. Many upper-level courses have their own prerequisites.",
    "Cluster rules limit 200-level and non-Ann Arbor courses; see the source page.",
  ],
  requirements: [
    { id: "econ", group: "Prerequisites", label: "Economics", anyOf: one("econ-101") },
    { id: "psych", group: "Prerequisites", label: "Psychology", anyOf: one("psych-111", "psych-112", "psych-114", "psych-115") },
    { id: "soc", group: "Prerequisites", label: "Sociology", anyOf: one("soc-100", "soc-102", "soc-195", "soc-300") },
    { id: "os-305", group: "Core", label: "Inside Organizations", anyOf: one("orgstudy-305") },
    { id: "os-310", group: "Core", label: "Formal Organizations and Environments", anyOf: one("orgstudy-310") },
    { id: "capstone", group: "Core", label: "Senior capstone research", note: "Honors majors take ORGSTUDY 497 and 498.", anyOf: [["orgstudy-410"], ["orgstudy-497", "orgstudy-498"]] },
    { id: "cluster-a", group: "Clusters", label: "Cluster A: organizations and individuals", target: 2, unit: "course", browse: ORGSTUDY_SITE },
    { id: "cluster-b", group: "Clusters", label: "Cluster B: organizations and society", target: 2, unit: "course", browse: ORGSTUDY_SITE },
    { id: "cluster-any", group: "Clusters", label: "Any cluster", target: 3, unit: "course", note: "Two of your seven cluster courses must be 300/400-level ORGSTUDY courses in Ann Arbor.", browse: ORGSTUDY_SITE },
  ],
  plan: [
    [{ label: "Economics", req: "econ" }, LSA_FILLER],
    [{ label: "Psychology", req: "psych" }, LSA_FILLER],
    [{ label: "Sociology", req: "soc" }, LSA_FILLER],
    [{ label: "Apply to the major" }, LSA_FILLER],
    [{ label: "ORGSTUDY 305", req: "os-305" }, { label: "Cluster A course", req: "cluster-a" }, LSA_FILLER],
    [{ label: "ORGSTUDY 310", req: "os-310" }, { label: "Cluster B course", req: "cluster-b" }, { label: "Cluster A course", req: "cluster-a" }],
    [{ label: "Cluster B course", req: "cluster-b" }, { label: "Any cluster", req: "cluster-any" }, LSA_FILLER],
    [{ label: "Capstone", req: "capstone" }, { label: "Remaining cluster courses", req: "cluster-any" }, LSA_FILLER],
  ],
};

const PHILOSOPHY: Major = {
  id: "lsa-philosophy",
  name: "Philosophy",
  school: "LSA",
  sourceUrl: "https://lsa.umich.edu/lsa/academics/majors-minors/philosophy-major.html",
  sourceLabel: "LSA major requirements, effective Winter 2022",
  planIsOfficial: false,
  notes: [
    "25 credits minimum, each course with a C- or better. At least 16 credits must be in residence.",
    "No course can meet more than one requirement. PHIL 288 or 289 can count as the prerequisite or a requirement, not both.",
    "Required courses aren't offered every term, so plan ahead.",
  ],
  requirements: [
    { id: "prereq", group: "Prerequisites", label: "100- or 200-level PHIL course", target: 1, unit: "course", note: "Not PHIL 180, 183, 201, or 296.", browse: "/courses?department=PHIL&level=100&offered=1" },
    { id: "formal", group: "Requirements", label: "Formal methods", anyOf: one("phil-296", "phil-303", "phil-305", "phil-413", "phil-414") },
    { id: "history-1", group: "Requirements", label: "History of philosophy", anyOf: one("phil-288", "phil-289", "phil-388", "phil-389") },
    { id: "history-2", group: "Requirements", label: "Second history of philosophy course", anyOf: one("phil-288", "phil-289", "phil-323", "phil-371", "phil-385", "phil-386", "phil-388", "phil-389", "phil-391", "phil-392", "phil-393", "phil-405", "phil-406", "phil-433", "phil-458", "phil-460", "phil-461", "phil-462", "phil-463", "phil-464", "phil-466", "phil-467", "phil-474", "phil-492") },
    { id: "value", group: "Requirements", label: "Value", anyOf: one("phil-361", "phil-362", "phil-366", "phil-367", "ppe-300") },
    { id: "mind", group: "Requirements", label: "Mind and reality", anyOf: one("phil-345", "phil-381", "phil-383") },
    { id: "level-400", group: "Additional", label: "400-level courses", target: 2, unit: "course", note: "Not PHIL 419, 455, 498, or 499.", browse: "/courses?department=PHIL&level=400&offered=1" },
    { id: "level-300", group: "Additional", label: "Course at the 300 level or higher", target: 1, unit: "course", browse: "/courses?department=PHIL&level=300&offered=1" },
  ],
  plan: [
    [{ label: "Intro PHIL course", req: "prereq" }, LSA_FILLER],
    [LSA_FILLER],
    [{ label: "Formal methods", req: "formal" }, LSA_FILLER],
    [{ label: "History of philosophy", req: "history-1" }, LSA_FILLER],
    [{ label: "Value", req: "value" }, LSA_FILLER],
    [{ label: "Mind and reality", req: "mind" }, { label: "History of philosophy", req: "history-2" }, LSA_FILLER],
    [{ label: "400-level course", req: "level-400" }, { label: "300+ course", req: "level-300" }, LSA_FILLER],
    [{ label: "400-level course", req: "level-400" }, LSA_FILLER],
  ],
};

const SOCIOLOGY: Major = {
  id: "lsa-sociology",
  name: "Sociology",
  school: "LSA",
  sourceUrl: "https://lsa.umich.edu/lsa/academics/majors-minors/sociology-major.html",
  sourceLabel: "LSA major requirements, effective Winter 2023",
  planIsOfficial: false,
  notes: [
    "33 credits of SOC at the 200 level or above, not counting the intro course. Each needs a C- or better, with no Pass/Fail.",
    "First- and second-year students should take SOC 100 or 102; juniors and seniors should take SOC 300 or 302.",
    "At least 14 elective credits must be at the 300 level or above.",
  ],
  requirements: [
    { id: "intro", group: "Prerequisites", label: "Intro sociology", anyOf: one("soc-100", "soc-102", "soc-300", "soc-302") },
    { id: "stats", group: "Required", label: "Statistics", anyOf: one("soc-210", "stats-250", "stats-280") },
    { id: "methods", group: "Required", label: "Research methods", note: "Must be taken in Ann Arbor.", anyOf: one("soc-310") },
    { id: "theory", group: "Required", label: "Sociological theory", note: "Must be taken in Ann Arbor.", anyOf: one("soc-305") },
    { id: "total", group: "Electives", label: "Total credits toward the 33-credit major", target: 33, unit: "credits", note: "Enter your total, including the required courses above.", browse: "/courses?department=SOC&offered=1" },
  ],
  plan: [
    [{ label: "Intro sociology", req: "intro" }, LSA_FILLER],
    [LSA_FILLER],
    [{ label: "Statistics", req: "stats" }, LSA_FILLER],
    [{ label: "SOC courses", credits: 6, req: "total" }, LSA_FILLER],
    [{ label: "Research methods", req: "methods" }, { label: "SOC courses", credits: 6, req: "total" }, LSA_FILLER],
    [{ label: "Sociological theory", req: "theory" }, { label: "SOC courses", credits: 6, req: "total" }, LSA_FILLER],
    [{ label: "300+ SOC courses", credits: 7, req: "total" }, LSA_FILLER],
    [{ label: "300+ SOC courses", credits: 8, req: "total" }, LSA_FILLER],
  ],
};

const PHYSICS: Major = {
  id: "lsa-physics",
  name: "Physics",
  school: "LSA",
  sourceUrl: "https://lsa.umich.edu/lsa/academics/majors-minors/physics-major.html",
  sourceLabel: "LSA major requirements, effective Fall 2026",
  planIsOfficial: false,
  notes: [
    "35 credits minimum. You don't have to finish the intro sequence before declaring.",
    "Recommended math: MATH 115 or 185, 116 or 186, 215 or 285, and 216, 286, or 316. These aren't listed as requirements, but you're expected to know this material.",
    "Take PHYSICS 316 by the end of sophomore year if you can, and PHYSICS 401 and 405 before 453.",
  ],
  requirements: [
    { id: "intro-1", group: "Prerequisites", label: "Intro physics I with lab", anyOf: [["physics-140", "physics-141"], ["physics-160", "physics-141"], ["physics-160", "physics-161"]] },
    { id: "intro-2", group: "Prerequisites", label: "Intro physics II with lab", anyOf: [["physics-240", "physics-241"], ["physics-260", "physics-241"], ["physics-260", "physics-261"]] },
    { id: "p-316", group: "Intermediate", label: "Mathematical Methods", anyOf: one("physics-316") },
    { id: "p-390", group: "Intermediate", label: "Introduction to Modern Physics", anyOf: one("physics-390") },
    { id: "p-391", group: "Intermediate", label: "Modern Physics Lab", anyOf: one("physics-391") },
    { id: "p-401", group: "Advanced", label: "Intermediate Mechanics", anyOf: one("physics-401") },
    { id: "p-405", group: "Advanced", label: "Intermediate Electricity and Magnetism", anyOf: one("physics-405") },
    { id: "p-406", group: "Advanced", label: "Statistical and Thermal Physics", anyOf: one("physics-406") },
    { id: "p-441", group: "Advanced", label: "Advanced Laboratory I", anyOf: one("physics-441") },
    { id: "p-453", group: "Advanced", label: "Quantum Mechanics", anyOf: one("physics-453") },
    { id: "electives", group: "Electives", label: "Elective courses", target: 4, unit: "course", note: "At least 12 credits, from the list on the source page.", browse: "https://lsa.umich.edu/lsa/academics/majors-minors/physics-major.html" },
  ],
  plan: [
    [{ label: "Calculus I (recommended)" }, LSA_FILLER],
    [{ label: "Intro physics I with lab", req: "intro-1" }, { label: "Calculus II (recommended)" }, LSA_FILLER],
    [{ label: "Intro physics II with lab", req: "intro-2" }, { label: "Multivariable calculus (recommended)" }, LSA_FILLER],
    [{ label: "PHYSICS 316", req: "p-316" }, { label: "Differential equations (recommended)" }, LSA_FILLER],
    [{ label: "PHYSICS 390", req: "p-390" }, { label: "PHYSICS 391", req: "p-391" }, { label: "PHYSICS 401", req: "p-401" }, LSA_FILLER],
    [{ label: "PHYSICS 405", req: "p-405" }, { label: "Elective", req: "electives" }, LSA_FILLER],
    [{ label: "PHYSICS 453", req: "p-453" }, { label: "PHYSICS 441", req: "p-441" }, { label: "Elective", req: "electives" }, LSA_FILLER],
    [{ label: "PHYSICS 406", req: "p-406" }, { label: "Remaining electives", req: "electives" }, LSA_FILLER],
  ],
};

const ANTHROPOLOGY: Major = {
  id: "lsa-anthropology",
  name: "Anthropology",
  school: "LSA",
  sourceUrl: "https://lsa.umich.edu/lsa/academics/majors-minors/anthropology-major.html",
  sourceLabel: "LSA major requirements, effective Fall 2023",
  planIsOfficial: false,
  notes: [
    "32 credits minimum at the 200 level or above, with at least one course at the 400 level or above.",
    "No prerequisites, but ANTHRCUL 101 is recommended.",
    "At most 6 credits of independent research. At least 20 credits must be in residence. The source page lists major exclusions.",
  ],
  requirements: [
    { id: "archaeology", group: "Subfields", label: "Anthropological archaeology", anyOf: one("anthrarc-282", "anthrarc-386") },
    { id: "biological", group: "Subfields", label: "Biological anthropology", anyOf: one("anthrbio-201") },
    { id: "linguistic", group: "Subfields", label: "Linguistic anthropology", anyOf: one("anthrcul-272", "anthrcul-374") },
    { id: "sociocultural", group: "Subfields", label: "Sociocultural anthropology", anyOf: one("anthrcul-222", "anthrcul-226", "anthrcul-230", "anthrcul-330") },
    { id: "level-400", group: "Electives", label: "Course at the 400 level or above", target: 1, unit: "course", browse: "/courses?department=ANTHRCUL&level=400&offered=1" },
    { id: "total", group: "Electives", label: "Total credits toward the 32-credit major", target: 32, unit: "credits", note: "Enter your total. Use ANTHRARC, ANTHRBIO, or ANTHRCUL courses.", browse: "/courses?department=ANTHRCUL&offered=1" },
  ],
  plan: [
    [{ label: "ANTHRCUL 101 (recommended)" }, LSA_FILLER],
    [{ label: "Biological anthropology", req: "biological" }, LSA_FILLER],
    [{ label: "Sociocultural anthropology", req: "sociocultural" }, LSA_FILLER],
    [{ label: "Archaeology", req: "archaeology" }, LSA_FILLER],
    [{ label: "Linguistic anthropology", req: "linguistic" }, LSA_FILLER],
    [{ label: "Anthropology electives", credits: 8, req: "total" }, LSA_FILLER],
    [{ label: "Anthropology electives", credits: 8, req: "total" }, LSA_FILLER],
    [{ label: "400-level course", req: "level-400" }, LSA_FILLER],
  ],
};

const AMCULT: Major = {
  id: "lsa-american-culture",
  name: "American Culture",
  school: "LSA",
  sourceUrl: "https://lsa.umich.edu/lsa/academics/majors-minors/american-culture-major.html",
  sourceLabel: "LSA major requirements, effective Winter 2014",
  planIsOfficial: false,
  notes: [
    "28 credits minimum, with no prerequisites. At most 9 credits at the 200 level can count.",
    "One course can meet more than one breadth requirement, depending on its content.",
    "This requirement version is from 2014, the newest on the LSA page. Confirm with an advisor.",
  ],
  requirements: [
    { id: "core", group: "Required", label: "Practices of American Culture", anyOf: one("amcult-300") },
    { id: "capstone", group: "Required", label: "Capstone Seminar", anyOf: one("amcult-498") },
    { id: "pre-20th", group: "Breadth", label: "Pre-Twentieth-Century United States", target: 1, unit: "course", browse: "/courses?department=AMCULT&offered=1" },
    { id: "transnational", group: "Breadth", label: "Transnationalism, Diaspora, and/or Empire", target: 1, unit: "course", browse: "/courses?department=AMCULT&offered=1" },
    { id: "gender", group: "Breadth", label: "Women, Gender, and/or Sexuality", target: 1, unit: "course", browse: "/courses?department=AMCULT&offered=1" },
    { id: "ethnic", group: "Breadth", label: "Ethnic and/or Indigenous Studies", target: 1, unit: "course", browse: "/courses?department=AMCULT&offered=1" },
    { id: "total", group: "Electives", label: "Total credits toward the 28-credit major", target: 28, unit: "credits", note: "Enter your total. Use 200-level or higher AMCULT, LATINOAM, ASIANPAM, NATIVEAM, or ARABAM courses.", browse: "/courses?department=AMCULT&offered=1" },
  ],
  plan: [
    [LSA_FILLER],
    [{ label: "Breadth course", req: "pre-20th" }, LSA_FILLER],
    [{ label: "Breadth course", req: "transnational" }, LSA_FILLER],
    [{ label: "AMCULT 300", req: "core" }, LSA_FILLER],
    [{ label: "Breadth course", req: "gender" }, LSA_FILLER],
    [{ label: "Breadth course", req: "ethnic" }, LSA_FILLER],
    [{ label: "Electives", credits: 14, req: "total" }, LSA_FILLER],
    [{ label: "AMCULT 498", req: "capstone" }, { label: "Electives", credits: 14, req: "total" }, LSA_FILLER],
  ],
};

const HISTORY_OF_ART: Major = {
  id: "lsa-history-of-art",
  name: "History of Art",
  school: "LSA",
  sourceUrl: "https://lsa.umich.edu/lsa/academics/majors-minors/history-of-art-major.html",
  sourceLabel: "LSA major requirements, effective Fall 2023",
  planIsOfficial: false,
  notes: [
    "30 credits minimum: 24 in History of Art plus 6 cognate credits. There are no prerequisites.",
    "Your courses must cover at least three of five time periods and three of six regions. Three courses can be enough.",
    "An advisor must approve your cognates. At least 15 credits must be in residence.",
  ],
  requirements: [
    { id: "level-200", group: "History of Art", label: "200-level credits", target: 6, unit: "credits", browse: "/courses?department=HISTART&level=200&offered=1" },
    { id: "seminar", group: "History of Art", label: "Seminar", target: 1, unit: "course", note: "3 credits. Counts toward the 12 upper-level credits.", browse: "/courses?department=HISTART&offered=1" },
    { id: "level-300", group: "History of Art", label: "Credits at the 300 level or higher", target: 12, unit: "credits", browse: "/courses?department=HISTART&level=300&offered=1" },
    { id: "additional", group: "History of Art", label: "Additional credits at the 200 level or higher", target: 6, unit: "credits", browse: "/courses?department=HISTART&offered=1" },
    { id: "studio", group: "Cognates", label: "Studio course", target: 1, unit: "course", note: "At least 3 credits, approved by an advisor.", browse: "/courses?department=ARTDES&offered=1" },
    { id: "cognate", group: "Cognates", label: "Related advisor-approved course", target: 1, unit: "course", note: "At least 3 credits.", browse: "/courses?offered=1" },
  ],
  plan: [
    [{ label: "200-level HISTART", credits: 3, req: "level-200" }, LSA_FILLER],
    [{ label: "200-level HISTART", credits: 3, req: "level-200" }, LSA_FILLER],
    [{ label: "Studio course", req: "studio" }, LSA_FILLER],
    [{ label: "Additional HISTART", credits: 3, req: "additional" }, LSA_FILLER],
    [{ label: "Upper-level HISTART", credits: 3, req: "level-300" }, { label: "Additional HISTART", credits: 3, req: "additional" }, LSA_FILLER],
    [{ label: "Upper-level HISTART", credits: 3, req: "level-300" }, { label: "Related course", req: "cognate" }, LSA_FILLER],
    [{ label: "Upper-level HISTART", credits: 3, req: "level-300" }, LSA_FILLER],
    [{ label: "Upper-level HISTART", credits: 3, req: "level-300" }, { label: "Seminar", req: "seminar" }, LSA_FILLER],
  ],
};

const LINGUISTICS: Major = {
  id: "lsa-linguistics",
  name: "Linguistics",
  school: "LSA",
  sourceUrl: "https://lsa.umich.edu/lsa/academics/majors-minors/linguistics-major.html",
  sourceLabel: "LSA major requirements, effective Fall 2023",
  planIsOfficial: false,
  notes: [
    "30 credits, all at the 300 level or higher except one of LING 209 or 210.",
    "No prerequisites, but LING 111, 209, or 210 are recommended. Take LING 313, 315, and 316 as soon as you can.",
    "At most 9 credits of independent study and experiential courses can count.",
  ],
  requirements: [
    { id: "l-313", group: "Core", label: "Sound Patterns", anyOf: one("ling-313") },
    { id: "l-315", group: "Core", label: "Introduction to Syntax", anyOf: one("ling-315") },
    { id: "l-316", group: "Core", label: "Aspects of Meaning", anyOf: one("ling-316") },
    { id: "l-497", group: "Core", label: "Capstone Seminar", note: "Needs LING 313, 315, and 316 first, unless the instructor allows taking them together.", anyOf: one("ling-497") },
    { id: "electives", group: "Electives", label: "Elective credits", target: 18, unit: "credits", note: "300+ LING courses, approved cognates, and one of LING 209 or 210.", browse: "/courses?department=LING&offered=1" },
  ],
  plan: [
    [{ label: "LING 111, 209, or 210 (recommended)" }, LSA_FILLER],
    [LSA_FILLER],
    [{ label: "LING 313", req: "l-313" }, LSA_FILLER],
    [{ label: "LING 315", req: "l-315" }, LSA_FILLER],
    [{ label: "LING 316", req: "l-316" }, { label: "Electives", credits: 3, req: "electives" }, LSA_FILLER],
    [{ label: "Electives", credits: 6, req: "electives" }, LSA_FILLER],
    [{ label: "Electives", credits: 6, req: "electives" }, LSA_FILLER],
    [{ label: "LING 497", req: "l-497" }, { label: "Electives", credits: 3, req: "electives" }, LSA_FILLER],
  ],
};

const MICROBIOLOGY: Major = {
  id: "lsa-microbiology",
  name: "Microbiology",
  school: "LSA",
  sourceUrl: "https://lsa.umich.edu/lsa/academics/majors-minors/microbiology-major.html",
  sourceLabel: "LSA major requirements, effective Winter 2027",
  planIsOfficial: false,
  notes: [
    "31 credits minimum. Courses used for the major can't be Pass/Fail.",
    "Only one of MCDB 436 and MICRBIOL 440 counts toward the major.",
    "This major has exclusions with other biology majors; see the source page.",
  ],
  requirements: [
    { id: "intro-bio", group: "Prerequisites", label: "Intro biology sequence", anyOf: INTRO_BIOLOGY, sequential: true },
    { id: "chem-1", group: "Prerequisites", label: "Organic chemistry I with lab", anyOf: [["chem-210", "chem-211"]] },
    { id: "chem-2", group: "Prerequisites", label: "Organic chemistry II with lab", anyOf: [["chem-215", "chem-216"]] },
    { id: "quant", group: "Prerequisites", label: "Quantitative analysis courses", target: 4, unit: "course", note: "Four from calculus, physics, programming, statistics, BIOLOGY 202, or BIOPHYS/PHYSICS 290. They can't also count as electives.", browse: "https://lsa.umich.edu/lsa/academics/majors-minors/microbiology-major.html" },
    { id: "micro", group: "Core", label: "Microbiology", anyOf: one("biology-207") },
    { id: "genetics", group: "Core", label: "Genetics", anyOf: one("biology-305") },
    { id: "biochem", group: "Core", label: "Biochemistry", anyOf: one("mcdb-310", "biolchem-415", "chem-351") },
    { id: "lab-1", group: "Advanced lab", label: "Lab 1", anyOf: one("mcdb-429", "eeb-447") },
    { id: "lab-2", group: "Advanced lab", label: "Lab 2", target: 1, unit: "course", note: "Independent research (3 credits), MCDB 306, EPID 504 or 545, BIOLCHEM 416, or the other Lab 1 course.", browse: "https://lsa.umich.edu/lsa/academics/majors-minors/microbiology-major.html" },
    { id: "specified", group: "Electives", label: "Specified electives", target: 4, unit: "course", note: "At least 12 credits from Group 1 on the source page.", browse: "https://lsa.umich.edu/lsa/academics/majors-minors/microbiology-major.html" },
    { id: "total", group: "Electives", label: "Total credits toward the 31-credit major", target: 31, unit: "credits", note: "Enter your total. Group 2 electives fill what's left.", browse: "https://lsa.umich.edu/lsa/academics/majors-minors/microbiology-major.html" },
  ],
  plan: [
    [{ label: "BIOLOGY 171", req: "intro-bio" }, { label: "Quantitative course", req: "quant" }, LSA_FILLER],
    [{ label: "Rest of intro biology", req: "intro-bio" }, { label: "Quantitative course", req: "quant" }, LSA_FILLER],
    [{ label: "CHEM 210 + 211", req: "chem-1" }, { label: "Quantitative course", req: "quant" }, LSA_FILLER],
    [{ label: "CHEM 215 + 216", req: "chem-2" }, { label: "BIOLOGY 207", req: "micro" }, { label: "Quantitative course", req: "quant" }],
    [{ label: "BIOLOGY 305", req: "genetics" }, { label: "Specified elective", req: "specified" }, LSA_FILLER],
    [{ label: "Biochemistry", req: "biochem" }, { label: "Lab 1", req: "lab-1" }, { label: "Specified elective", req: "specified" }],
    [{ label: "Lab 2", req: "lab-2" }, { label: "Specified elective", req: "specified" }, LSA_FILLER],
    [{ label: "Specified elective", req: "specified" }, { label: "Remaining electives", req: "total" }, LSA_FILLER],
  ],
};

const CHEM_LIST = "https://lsa.umich.edu/lsa/academics/majors-minors/chemistry-maj.html";

const CHEMISTRY: Major = {
  id: "lsa-chemistry",
  name: "Chemistry",
  school: "LSA",
  sourceUrl: CHEM_LIST,
  sourceLabel: "LSA major requirements, effective Winter 2024",
  planIsOfficial: false,
  notes: [
    "40 core credits minimum. Prerequisites must be taken for a grade.",
    "Choose electives with a Chemistry advisor, using 300-level or higher CHEM courses. At most 4 credits of CHEM 399/398 count.",
    "This major excludes some other chemistry-related majors; see the source page.",
  ],
  requirements: [
    { id: "gen-chem", group: "Prerequisites", label: "General chemistry", note: "Or 5 credits of chemistry electives if you place into CHEM 210 or have AP credit.", anyOf: [["chem-125", "chem-126", "chem-130"]] },
    { id: "physics-1", group: "Prerequisites", label: "Physics I with lab", anyOf: [["physics-140", "physics-141"], ["physics-150", "physics-151"], ["physics-160", "physics-161"], ["physics-139"]] },
    { id: "physics-2", group: "Prerequisites", label: "Physics II with lab", anyOf: [["physics-240", "physics-241"], ["physics-250", "physics-251"], ["physics-260", "physics-261"], ["physics-239"]] },
    { id: "calc-1", group: "Prerequisites", label: "Calculus I", anyOf: one("math-115", "math-120") },
    { id: "calc-2", group: "Prerequisites", label: "Calculus II", anyOf: one("math-116", "math-121") },
    { id: "adv-math", group: "Prerequisites", label: "Advanced math for chemists", anyOf: [["chem-262"], ["math-215", "math-216"], ["math-215", "math-217"]] },
    { id: "organic", group: "Introductory", label: "Organic chemistry with lab", anyOf: [["chem-210", "chem-211"]] },
    { id: "c-241", group: "Introductory", label: "CHEM 241 and 242", anyOf: [["chem-241", "chem-242"]] },
    { id: "pchem-intro", group: "Introductory", label: "CHEM 230 and 261, or CHEM 260", anyOf: [["chem-260"], ["chem-230", "chem-261"]] },
    { id: "inorganic", group: "Introductory", label: "CHEM 302 or 303", anyOf: one("chem-302", "chem-303") },
    { id: "lectures", group: "Advanced", label: "Advanced lecture courses", target: 3, unit: "course", note: "Three of CHEM 215, 351, 402, 447, and CHEM 461 or 463.", browse: "/courses?department=CHEM&level=400&offered=1" },
    { id: "labs", group: "Advanced", label: "Advanced lab courses", target: 3, unit: "course", note: "Three of CHEM 216, 436, 462, 482, 483.", browse: "/courses?department=CHEM&level=400&offered=1" },
    { id: "total", group: "Electives", label: "Total core credits", target: 40, unit: "credits", note: "Enter your total. Electives fill what's left.", browse: CHEM_LIST },
  ],
  plan: [
    [{ label: "General chemistry", req: "gen-chem" }, { label: "Calculus I", req: "calc-1" }, LSA_FILLER],
    [{ label: "Organic chemistry with lab", req: "organic" }, { label: "Calculus II", req: "calc-2" }, LSA_FILLER],
    [{ label: "Physics I with lab", req: "physics-1" }, { label: "CHEM 230/261 or 260", req: "pchem-intro" }, LSA_FILLER],
    [{ label: "Physics II with lab", req: "physics-2" }, { label: "CHEM 241 and 242", req: "c-241" }, { label: "Advanced lecture", req: "lectures" }],
    [{ label: "Advanced math", req: "adv-math" }, { label: "CHEM 302 or 303", req: "inorganic" }, { label: "Advanced lab", req: "labs" }, LSA_FILLER],
    [{ label: "Advanced lecture", req: "lectures" }, { label: "Advanced lab", req: "labs" }, LSA_FILLER],
    [{ label: "Advanced lecture", req: "lectures" }, { label: "Advanced lab", req: "labs" }, LSA_FILLER],
    [{ label: "Remaining electives", req: "total" }, LSA_FILLER],
  ],
};

const BHS_URL = "https://lsa.umich.edu/lsa/academics/majors-minors/general-biology-major.html";

const BIO_HEALTH: Major = {
  id: "lsa-general-biology",
  name: "Biology, Health, and Society",
  school: "LSA",
  sourceUrl: BHS_URL,
  sourceLabel: "LSA major requirements, effective Winter 2027",
  planIsOfficial: false,
  notes: [
    "24 credits minimum, not counting prerequisites and intro science. Test credit can't meet major requirements.",
    "Courses used for the major can't be Pass/Fail. At most 3 credits of independent research count.",
    "This major excludes some other biology majors; see the source page.",
  ],
  requirements: [
    { id: "intro-bio", group: "Prerequisites", label: "Intro biology sequence", anyOf: INTRO_BIOLOGY, sequential: true },
    { id: "chem", group: "Prerequisites", label: "Organic chemistry with lab", anyOf: [["chem-210", "chem-211"]] },
    { id: "quant", group: "Prerequisites", label: "Quantitative analysis courses", target: 3, unit: "course", note: "Three from calculus, physics, programming, statistics, and others on the source page. They can't also count as major electives.", browse: BHS_URL },
    { id: "group-a", group: "Groups", label: "Group A: gateway biology", target: 2, unit: "course", note: "BIOLOGY 205, 207, 225, 230, 252, 255, 256, 272, 288, or 290. At least 6 credits.", browse: "/courses?department=BIOLOGY&level=200&offered=1" },
    { id: "group-b", group: "Groups", label: "Group B: health and society", target: 2, unit: "course", note: "At least 6 credits, from the list on the source page.", browse: BHS_URL },
    { id: "group-c", group: "Groups", label: "Group C: core biology", target: 2, unit: "course", note: "Two of genetics, biochemistry, evolution, or ecology. At least 6 credits.", browse: BHS_URL },
    { id: "group-d", group: "Groups", label: "Group D: biology elective", target: 1, unit: "course", note: "BIOLOGY, EEB, or MCDB at the 200 to 400 level, with listed exclusions.", browse: BHS_URL },
    { id: "lab", group: "Lab", label: "Course with a lab", target: 1, unit: "course", note: "Can overlap with other major requirements.", browse: BHS_URL },
    { id: "total", group: "Total", label: "Total credits toward the 24-credit major", target: 24, unit: "credits", note: "Enter your total.", browse: BHS_URL },
  ],
  plan: [
    [{ label: "BIOLOGY 171", req: "intro-bio" }, { label: "Quantitative course", req: "quant" }, LSA_FILLER],
    [{ label: "Rest of intro biology", req: "intro-bio" }, { label: "Quantitative course", req: "quant" }, LSA_FILLER],
    [{ label: "CHEM 210 + 211", req: "chem" }, { label: "Quantitative course", req: "quant" }, LSA_FILLER],
    [{ label: "Group A course", req: "group-a" }, { label: "Group B course", req: "group-b" }, LSA_FILLER],
    [{ label: "Group A course", req: "group-a" }, { label: "Group B course", req: "group-b" }, LSA_FILLER],
    [{ label: "Group C course", req: "group-c" }, { label: "Course with a lab", req: "lab" }, LSA_FILLER],
    [{ label: "Group C course", req: "group-c" }, { label: "Group D course", req: "group-d" }, LSA_FILLER],
    [{ label: "Courses to reach 24 credits", req: "total" }, LSA_FILLER],
  ],
};

const EARTH_URL = "https://lsa.umich.edu/lsa/academics/majors-minors/earth-and-environmental-sciences-major.html";
const EARTH_CORE = one("earth-305", "earth-313", "earth-314", "earth-315", "earth-325", "earth-331", "earth-351", "earth-352", "earth-442");

const EARTH: Major = {
  id: "lsa-earth-and-environmental-sciences",
  name: "Earth and Environmental Sciences",
  school: "LSA",
  sourceUrl: EARTH_URL,
  sourceLabel: "LSA major requirements, effective Fall 2023",
  planIsOfficial: false,
  notes: [
    "This checklist covers the main major, 30 credits beyond prerequisites. The Earth Sciences and Environmental Sciences sub-plans need 38 credits and have different requirements; see the source page.",
    "The field course is at Camp Davis, Wyoming. EARTH 440 needs EARTH 305 and 351 first; EARTH 450 needs EARTH 313 and 325 first.",
  ],
  requirements: [
    { id: "cat-1", group: "Prerequisites", label: "Intro geoscience with lab", anyOf: [["earth-116"], ["earth-119", "earth-118"], ["earth-120"]] },
    { id: "cat-2", group: "Prerequisites", label: "Intro environmental science or oceanography with lab", anyOf: [["earth-202"], ["earth-219", "earth-218"], ["earth-222", "earth-223"]] },
    { id: "math", group: "Prerequisites", label: "Calculus", anyOf: one("math-115", "earth-132") },
    { id: "welcome", group: "Prerequisites", label: "Welcome to EARTH", anyOf: one("earth-295") },
    { id: "science", group: "Prerequisites", label: "Supporting science courses", target: 2, unit: "course", note: "Two of four options: chemistry, physics, biology, or math/chemistry/physics/programming. See the source page.", browse: EARTH_URL },
    { id: "core-1", group: "Core", label: "Core course", anyOf: EARTH_CORE },
    { id: "core-2", group: "Core", label: "Second core course", anyOf: EARTH_CORE },
    { id: "core-3", group: "Core", label: "Third core course", anyOf: EARTH_CORE },
    { id: "core-4", group: "Core", label: "Fourth core course", anyOf: EARTH_CORE },
    { id: "field", group: "Field and writing", label: "Field course", note: "A marine field course may count, with advisor approval.", anyOf: one("earth-440", "earth-450") },
    { id: "writing", group: "Field and writing", label: "Upper-level writing", note: "Or the department's writing program.", anyOf: one("earth-333", "earth-380") },
    { id: "electives", group: "Electives", label: "EARTH credits at the 300 level or higher", target: 9, unit: "credits", browse: "/courses?department=EARTH&level=300&offered=1" },
  ],
  plan: [
    [{ label: "Intro geoscience", req: "cat-1" }, { label: "Calculus", req: "math" }, LSA_FILLER],
    [{ label: "Intro environmental science", req: "cat-2" }, { label: "Supporting science", req: "science" }, LSA_FILLER],
    [{ label: "EARTH 295", req: "welcome" }, { label: "Supporting science", req: "science" }, LSA_FILLER],
    [{ label: "Core course", req: "core-1" }, LSA_FILLER],
    [{ label: "Core course", req: "core-2" }, { label: "Upper-level writing", req: "writing" }, LSA_FILLER],
    [{ label: "Core course", req: "core-3" }, { label: "Core course", req: "core-4" }, LSA_FILLER],
    [{ label: "Field course", req: "field" }, { label: "Electives", credits: 4, req: "electives" }, LSA_FILLER],
    [{ label: "Electives", credits: 5, req: "electives" }, LSA_FILLER],
  ],
};

const MCDB_URL = "https://lsa.umich.edu/lsa/academics/majors-minors/molecular-cellular-and-developmental-biology-major.html";

const MCDB: Major = {
  id: "lsa-cell-and-molecular-biology",
  name: "Molecular, Cellular, and Developmental Biology",
  school: "LSA",
  sourceUrl: MCDB_URL,
  sourceLabel: "LSA major requirements, effective Winter 2027",
  planIsOfficial: false,
  notes: [
    "31 credits minimum, not counting prerequisites and intro science.",
    "At most 3 credits of MCDB 400 count, completed in one term to meet the lab or advanced course requirement.",
    "This major has exclusions with other biology majors; see the source page.",
  ],
  requirements: [
    { id: "intro-bio", group: "Prerequisites", label: "Intro biology sequence", anyOf: INTRO_BIOLOGY, sequential: true },
    { id: "chem-1", group: "Prerequisites", label: "Organic chemistry I with lab", anyOf: [["chem-210", "chem-211"]] },
    { id: "chem-2", group: "Prerequisites", label: "Organic chemistry II with lab", anyOf: [["chem-215", "chem-216"]] },
    { id: "quant", group: "Prerequisites", label: "Quantitative analysis courses", target: 4, unit: "course", note: "Four from calculus, physics, programming, statistics, and others on the source page. They can't also count as major electives.", browse: MCDB_URL },
    { id: "cell", group: "Core", label: "Cell or developmental biology", anyOf: one("biology-272", "biology-205") },
    { id: "genetics", group: "Core", label: "Genetics", anyOf: one("biology-305") },
    { id: "biochem", group: "Core", label: "Biochemistry", anyOf: one("mcdb-310", "biolchem-415", "chem-351") },
    { id: "cell-mol", group: "Core", label: "Cellular or molecular biology", anyOf: one("mcdb-427", "mcdb-428") },
    { id: "lab-1", group: "Group I: advanced labs", label: "Advanced MCDB lab", anyOf: one("mcdb-306", "mcdb-400", "mcdb-423", "mcdb-424", "mcdb-429") },
    { id: "lab-2", group: "Group I: advanced labs", label: "Second advanced MCDB lab", anyOf: one("mcdb-306", "mcdb-400", "mcdb-423", "mcdb-424", "mcdb-429") },
    { id: "advanced", group: "Group II: advanced courses", label: "Advanced MCDB courses", target: 2, unit: "course", note: "From the list on the source page.", browse: "/courses?department=MCDB&level=400&offered=1" },
    { id: "total", group: "Group III: electives", label: "Total credits toward the 31-credit major", target: 31, unit: "credits", note: "Enter your total. See the source page for eligible electives.", browse: MCDB_URL },
  ],
  plan: [
    [{ label: "BIOLOGY 171", req: "intro-bio" }, { label: "Quantitative course", req: "quant" }, LSA_FILLER],
    [{ label: "Rest of intro biology", req: "intro-bio" }, { label: "Quantitative course", req: "quant" }, LSA_FILLER],
    [{ label: "CHEM 210 + 211", req: "chem-1" }, { label: "Quantitative course", req: "quant" }, LSA_FILLER],
    [{ label: "CHEM 215 + 216", req: "chem-2" }, { label: "Cell or developmental biology", req: "cell" }, { label: "Quantitative course", req: "quant" }],
    [{ label: "BIOLOGY 305", req: "genetics" }, LSA_FILLER],
    [{ label: "Biochemistry", req: "biochem" }, { label: "Advanced lab", req: "lab-1" }, LSA_FILLER],
    [{ label: "MCDB 427 or 428", req: "cell-mol" }, { label: "Advanced lab", req: "lab-2" }, { label: "Advanced course", req: "advanced" }],
    [{ label: "Advanced course", req: "advanced" }, { label: "Remaining electives", req: "total" }, LSA_FILLER],
  ],
};

const BCN_URL = "https://lsa.umich.edu/lsa/academics/majors-minors/biopsychology-cognition-and-neuroscience-major.html";

const BCN: Major = {
  id: "lsa-biophyschology-cognition-and-neuroscience-bcn",
  name: "Biopsychology, Cognition, and Neuroscience (BCN)",
  school: "LSA",
  sourceUrl: BCN_URL,
  sourceLabel: "LSA major requirements, effective Fall 2024",
  planIsOfficial: false,
  notes: [
    "32 letter-graded credits minimum. 100-level courses can't count.",
    "At least 24 credits must be in residence, including 12 at the 300 level or above.",
    "Students in this major can't also major in Psychology. See the source page for other exclusions.",
  ],
  requirements: [
    { id: "intro", group: "Prerequisites", label: "Intro psychology", note: "C or better.", anyOf: one("psych-111", "psych-112", "psych-114") },
    { id: "stats", group: "Prerequisites", label: "Statistics", note: "C- or better, or P.", anyOf: one("datasci-101", "stats-250", "stats-280") },
    { id: "bio", group: "Core", label: "Biopsychology", anyOf: one("psych-230") },
    { id: "cog", group: "Core", label: "Cognitive Psychology", anyOf: one("psych-240") },
    { id: "breadth", group: "Breadth", label: "Breadth course", anyOf: one("psych-235", "psych-250", "psych-270", "psych-280", "psych-290", "psych-291") },
    { id: "labs", group: "Labs", label: "Lab courses", target: 2, unit: "course", note: "At least 5 credits total, with at least one methods-based and at most one non-PSYCH course.", browse: "/courses?department=PSYCH&level=300&offered=1" },
    { id: "cognate", group: "Electives", label: "Cognate course", target: 1, unit: "course", note: "From the BCN Major Worksheet, or a 300-400 level PSYCH course not on the advanced list.", browse: BCN_URL },
    { id: "advanced", group: "Electives", label: "Advanced courses", target: 4, unit: "course", note: "At least 12 credits, with two at the 300 level and one at the 400 level.", browse: "/courses?department=PSYCH&level=300&offered=1" },
  ],
  plan: [
    [{ label: "Intro psychology", req: "intro" }, LSA_FILLER],
    [{ label: "Statistics", req: "stats" }, LSA_FILLER],
    [{ label: "PSYCH 230", req: "bio" }, LSA_FILLER],
    [{ label: "PSYCH 240", req: "cog" }, { label: "Breadth course", req: "breadth" }, LSA_FILLER],
    [{ label: "Lab", req: "labs" }, { label: "300-level advanced course", req: "advanced" }, LSA_FILLER],
    [{ label: "Lab", req: "labs" }, { label: "300-level advanced course", req: "advanced" }, LSA_FILLER],
    [{ label: "Cognate", req: "cognate" }, { label: "Advanced course", req: "advanced" }, LSA_FILLER],
    [{ label: "400-level advanced course", req: "advanced" }, LSA_FILLER],
  ],
};

const FTVM_URL = "https://lsa.umich.edu/lsa/academics/majors-minors/film-television-and-media-major.html";

const FTVM: Major = {
  id: "lsa-screen-arts-and-cultures",
  name: "Film, Television, and Media",
  school: "LSA",
  sourceUrl: FTVM_URL,
  sourceLabel: "LSA major requirements, effective Fall 2025",
  planIsOfficial: false,
  notes: [
    "32 credits minimum. Apply for entry after finishing the intro course with a C- or better.",
    "Of the 7 elective credits, one course must be a 3-credit studies course.",
  ],
  requirements: [
    { id: "intro", group: "Prerequisites", label: "Intro to Film, Television, and Media", anyOf: one("ftvm-150", "rchums-150", "ftvm-236", "rchums-236") },
    { id: "h-352", group: "History", label: "Film History: Origins to the French New Wave", anyOf: one("ftvm-352") },
    { id: "history-2", group: "History", label: "Second history course", anyOf: one("ftvm-353", "ftvm-354", "ftvm-355", "ftvm-356") },
    { id: "t-272", group: "Theory", label: "Classical Film Theory", anyOf: one("ftvm-272") },
    { id: "theory-2", group: "Theory", label: "Second theory course", anyOf: one("ftvm-372", "ftvm-375", "ftvm-376", "ftvm-461") },
    { id: "p-290", group: "Production", label: "Intro to Media Production", anyOf: one("ftvm-290") },
    { id: "production", group: "Production", label: "Production or writing courses", target: 2, unit: "course", note: "From the list on the source page.", browse: "/courses?department=FTVM&level=300&offered=1" },
    { id: "studies", group: "Studies", label: "Studies course", target: 1, unit: "course", note: "National, regional, or transnational cinema, or a 300/400-level television or digital media course.", browse: FTVM_URL },
    { id: "electives", group: "Electives", label: "300- or 400-level FTVM credits", target: 7, unit: "credits", browse: "/courses?department=FTVM&level=300&offered=1" },
  ],
  plan: [
    [{ label: "Intro course", req: "intro" }, LSA_FILLER],
    [{ label: "FTVM 272", req: "t-272" }, LSA_FILLER],
    [{ label: "FTVM 290", req: "p-290" }, LSA_FILLER],
    [{ label: "FTVM 352", req: "h-352" }, LSA_FILLER],
    [{ label: "Second history course", req: "history-2" }, { label: "Production or writing", req: "production" }, LSA_FILLER],
    [{ label: "Second theory course", req: "theory-2" }, { label: "Production or writing", req: "production" }, LSA_FILLER],
    [{ label: "Studies course", req: "studies" }, { label: "Elective", credits: 3, req: "electives" }, LSA_FILLER],
    [{ label: "Electives", credits: 4, req: "electives" }, LSA_FILLER],
  ],
};

const WGS_URL = "https://lsa.umich.edu/lsa/academics/majors-minors/womens-and-gender-studies-major.html";

const WGS: Major = {
  id: "lsa-womens-studies",
  name: "Women's and Gender Studies",
  school: "LSA",
  sourceUrl: WGS_URL,
  sourceLabel: "LSA major requirements, effective Fall 2020",
  planIsOfficial: false,
  notes: [
    "33 credits, with at least 25 at the 300 level or above.",
    "Only one course can double-count across the four thematic areas. At most 6 independent study credits count.",
    "Your two cognates normally come from one department, and neither can be cross-listed with WGS.",
    "At least 14 WGS credits must be in residence. The source page lists exclusions.",
  ],
  requirements: [
    { id: "intro", group: "Prerequisites", label: "WGS 240", note: "C- or above.", anyOf: one("wgs-240", "womenstd-240") },
    { id: "theory", group: "Required", label: "Feminist Thought", anyOf: one("wgs-330", "womenstd-330") },
    { id: "theme-1", group: "Thematic areas", label: "LGBTQ and Sexuality Studies", target: 1, unit: "course", browse: "/courses?department=WGS&offered=1" },
    { id: "theme-2", group: "Thematic areas", label: "Gender, Race, and Ethnicity in the U.S.", target: 1, unit: "course", browse: "/courses?department=WGS&offered=1" },
    { id: "theme-3", group: "Thematic areas", label: "Gender in a Global Context", target: 1, unit: "course", browse: "/courses?department=WGS&offered=1" },
    { id: "theme-4", group: "Thematic areas", label: "Gender, Culture, and Representation", target: 1, unit: "course", browse: "/courses?department=WGS&offered=1" },
    { id: "practice", group: "Required", label: "Practice course", note: "Approved WGS 313 topic and SOC 225 topics also count; check with an advisor.", anyOf: one("wgs-350", "wgs-351", "wgs-404", "wgs-425") },
    { id: "total", group: "Electives", label: "Total WGS credits, up to 27", target: 27, unit: "credits", note: "Enter your total, not counting prerequisites or cognates.", browse: "/courses?department=WGS&offered=1" },
    { id: "cognates", group: "Cognates", label: "Upper-level cognate courses", target: 2, unit: "course", note: "6 credits total.", browse: "/courses?offered=1" },
  ],
  plan: [
    [{ label: "WGS 240", req: "intro" }, LSA_FILLER],
    [LSA_FILLER],
    [{ label: "WGS 330", req: "theory" }, LSA_FILLER],
    [{ label: "Thematic area course", req: "theme-1" }, LSA_FILLER],
    [{ label: "Thematic area course", req: "theme-2" }, { label: "Cognate", req: "cognates" }, LSA_FILLER],
    [{ label: "Thematic area course", req: "theme-3" }, { label: "Cognate", req: "cognates" }, LSA_FILLER],
    [{ label: "Thematic area course", req: "theme-4" }, { label: "Practice course", req: "practice" }, LSA_FILLER],
    [{ label: "Remaining electives", req: "total" }, LSA_FILLER],
  ],
};

const ASIAN_STUDIES: Major = {
  id: "lsa-asian-studies",
  name: "Asian Studies",
  school: "LSA",
  sourceUrl: "https://lsa.umich.edu/lsa/academics/majors-minors/asian-studies-major.html",
  sourceLabel: "LSA major requirements, effective Winter 2027",
  planIsOfficial: false,
  notes: [
    "34 credits minimum. When you declare, choose one sub-major: Asian Religions, or Chinese, Japanese, Korean, South Asian, or Southeast Asian Studies.",
    "Fourth-term proficiency in an Asian language is required. Those credits don't count toward the major.",
    "A department advisor must approve your courses. At least 5 courses must be in residence.",
  ],
  requirements: [
    { id: "language", group: "Language", label: "Terms of an Asian language", target: 4, unit: "course", note: "Or show fourth-term proficiency. Enter the terms you've finished.", browse: "/courses?department=ASIANLAN&offered=1" },
    { id: "intro", group: "Core", label: "Introduction to Asian Studies", anyOf: one("asian-235") },
    { id: "seminar", group: "Core", label: "Junior/Senior Research Seminar", anyOf: one("asian-381") },
    { id: "electives", group: "Electives", label: "Sub-major electives", target: 8, unit: "course", note: "At least four must be 300-level or above ASIAN or ASIANLAN, and one must be 400-level or above. One optional cognate can come from outside the department.", browse: "/courses?department=ASIAN&offered=1" },
  ],
  plan: [
    [{ label: "Asian language", req: "language" }, LSA_FILLER],
    [{ label: "Asian language", req: "language" }, { label: "ASIAN 235", req: "intro" }, LSA_FILLER],
    [{ label: "Asian language", req: "language" }, { label: "Elective", req: "electives" }, LSA_FILLER],
    [{ label: "Asian language", req: "language" }, { label: "Elective", req: "electives" }, LSA_FILLER],
    [{ label: "Electives", req: "electives" }, LSA_FILLER],
    [{ label: "ASIAN 381", req: "seminar" }, { label: "Electives", req: "electives" }, LSA_FILLER],
    [{ label: "Upper-level electives", req: "electives" }, LSA_FILLER],
    [{ label: "400-level elective", req: "electives" }, LSA_FILLER],
  ],
};

const ASTRONOMY: Major = {
  id: "lsa-astronomy-and-astrophysics",
  name: "Astronomy and Astrophysics",
  school: "LSA",
  sourceUrl: "https://lsa.umich.edu/lsa/academics/majors-minors/astronomy-and-astrophysics-major.html",
  sourceLabel: "LSA major requirements, effective Fall 2026",
  planIsOfficial: false,
  notes: [
    "35 credits minimum. Finish the physics and math requirements as soon as you can.",
    "Apart from the prerequisites and physics coursework, major courses must be in residence. Transfer students should meet an advisor.",
    "The source page lists major exclusions.",
  ],
  requirements: [
    { id: "calc-1", group: "Prerequisites: math through MATH 216", label: "Calculus I", anyOf: one("math-115") },
    { id: "calc-2", group: "Prerequisites: math through MATH 216", label: "Calculus II", anyOf: one("math-116") },
    { id: "calc-3", group: "Prerequisites: math through MATH 216", label: "Calculus III", anyOf: one("math-215") },
    { id: "diffeq", group: "Prerequisites: math through MATH 216", label: "Differential equations", anyOf: one("math-216") },
    { id: "physics-1", group: "Prerequisites", label: "Physics I with lab", anyOf: [["physics-140", "physics-141"], ["physics-160", "physics-161"]] },
    { id: "physics-2", group: "Prerequisites", label: "Physics II with lab", anyOf: [["physics-240", "physics-241"], ["physics-260", "physics-261"]] },
    { id: "physics-3", group: "Prerequisites", label: "PHYSICS 340 or 360", anyOf: one("physics-340", "physics-360") },
    { id: "p-316", group: "Prerequisites", label: "Mathematical Methods", anyOf: one("physics-316") },
    { id: "prog", group: "Prerequisites", label: "Programming with Python", note: "Or an equivalent approved by an Astronomy advisor.", anyOf: one("compfor-131", "si-101") },
    { id: "a-201", group: "Astronomy core", label: "ASTRO 201", anyOf: one("astro-201") },
    { id: "a-361", group: "Astronomy core", label: "ASTRO 361", anyOf: one("astro-361") },
    { id: "a-399", group: "Astronomy core", label: "ASTRO 399", anyOf: one("astro-399") },
    { id: "a-402", group: "Astronomy core", label: "ASTRO 402", anyOf: one("astro-402") },
    { id: "a-404", group: "Astronomy core", label: "ASTRO 404", anyOf: one("astro-404") },
    { id: "a-429", group: "Astronomy core", label: "ASTRO 429", anyOf: one("astro-429") },
    { id: "p-390", group: "Physics core", label: "PHYSICS 390", anyOf: one("physics-390") },
    { id: "p-391", group: "Physics core", label: "PHYSICS 391", anyOf: one("physics-391") },
    { id: "p-401", group: "Physics core", label: "PHYSICS 401", anyOf: one("physics-401") },
    { id: "p-405", group: "Physics core", label: "PHYSICS 405", anyOf: one("physics-405") },
    { id: "electives", group: "Electives", label: "Astronomy electives", target: 2, unit: "course", note: "Two of ASTRO 401, 403, 405, 406, 416, 461, or a 500-level ASTRO course with permission.", browse: "/courses?department=ASTRO&level=400&offered=1" },
  ],
  plan: [
    [{ label: "MATH 115", req: "calc-1" }, { label: "Programming", req: "prog" }, LSA_FILLER],
    [{ label: "MATH 116", req: "calc-2" }, { label: "Physics I with lab", req: "physics-1" }, { label: "ASTRO 201", req: "a-201" }],
    [{ label: "MATH 215", req: "calc-3" }, { label: "Physics II with lab", req: "physics-2" }, { label: "ASTRO 361", req: "a-361" }],
    [{ label: "MATH 216", req: "diffeq" }, { label: "PHYSICS 340 or 360", req: "physics-3" }, { label: "PHYSICS 316", req: "p-316" }],
    [{ label: "PHYSICS 390", req: "p-390" }, { label: "PHYSICS 391", req: "p-391" }, { label: "PHYSICS 401", req: "p-401" }, { label: "ASTRO 399", req: "a-399" }],
    [{ label: "PHYSICS 405", req: "p-405" }, { label: "ASTRO 402", req: "a-402" }, LSA_FILLER],
    [{ label: "ASTRO 404", req: "a-404" }, { label: "Astronomy elective", req: "electives" }, LSA_FILLER],
    [{ label: "ASTRO 429", req: "a-429" }, { label: "Astronomy elective", req: "electives" }, LSA_FILLER],
  ],
};

const SPANISH: Major = {
  id: "lsa-spanish",
  name: "Spanish",
  school: "LSA",
  sourceUrl: "https://lsa.umich.edu/lsa/academics/majors-minors/spanish-major.html",
  sourceLabel: "LSA major requirements, effective Winter 2026",
  planIsOfficial: false,
  notes: [
    "At least 10 courses and 30 credits beyond the prerequisite, each at least 3 credits.",
    "At most one independent study and one internship count. One approved cognate taught in English is allowed.",
    "At least 5 courses must be in residence or through an affiliated study abroad program.",
  ],
  requirements: [
    { id: "prereq", group: "Prerequisites", label: "SPANISH 277 or 278", note: "SPANISH 278 is for eligible heritage language learners. RC students: see the source page.", anyOf: one("spanish-277", "spanish-278") },
    { id: "mid", group: "Major", label: "Courses numbered 279 to 399", target: 4, unit: "course", note: "Four or five courses. Up to three terms of RCLANG 324 can count.", browse: "/courses?department=SPANISH&level=300&offered=1" },
    { id: "upper", group: "Major", label: "400-level courses", target: 5, unit: "course", note: "Five or six courses.", browse: "/courses?department=SPANISH&level=400&offered=1" },
    { id: "total", group: "Major", label: "Total major courses", target: 10, unit: "course", browse: "/courses?department=SPANISH&offered=1" },
  ],
  plan: [
    [LSA_FILLER],
    [{ label: "SPANISH 277 or 278", req: "prereq" }, LSA_FILLER],
    [{ label: "279-399 course", req: "mid" }, LSA_FILLER],
    [{ label: "279-399 course", req: "mid" }, LSA_FILLER],
    [{ label: "279-399 courses", req: "mid" }, LSA_FILLER],
    [{ label: "400-level courses", req: "upper" }, LSA_FILLER],
    [{ label: "400-level courses", req: "upper" }, LSA_FILLER],
    [{ label: "400-level courses", req: "upper" }, { label: "Any remaining courses", req: "total" }, LSA_FILLER],
  ],
};

const FRENCH: Major = {
  id: "lsa-french-and-francophone-studies",
  name: "French and Francophone Studies",
  school: "LSA",
  sourceUrl: "https://lsa.umich.edu/lsa/academics/majors-minors/french-and-francophone-studies-major.html",
  sourceLabel: "LSA major requirements, effective Winter 2027",
  planIsOfficial: false,
  notes: [
    "At least 30 FRENCH credits beyond the prerequisite. At least 15 must be in residence or through an affiliated study abroad program.",
    "At most two courses can be taught in English. At most 6 credits can be professional or internship courses.",
    "You can also meet the prerequisite through the placement test.",
  ],
  requirements: [
    { id: "prereq", group: "Prerequisites", label: "FRENCH 230 or 232, or RCLANG 290 or 310", note: "C- or higher.", anyOf: one("french-230", "french-232", "rclang-290", "rclang-310") },
    { id: "f-235", group: "Major", label: "FRENCH 235 or RCLANG 320", anyOf: one("french-235", "rclang-320") },
    { id: "f-270", group: "Major", label: "FRENCH 270-299 courses", target: 2, unit: "course", browse: "/courses?department=FRENCH&level=200&offered=1" },
    { id: "lit", group: "Major", label: "Literature and culture course", target: 1, unit: "course", note: "FRENCH 350-379, in Ann Arbor. Counts toward the upper-level credits.", browse: "/courses?department=FRENCH&level=300&offered=1" },
    { id: "upper", group: "Major", label: "Credits at the 300 level or above", target: 18, unit: "credits", browse: "/courses?department=FRENCH&level=300&offered=1" },
    { id: "total", group: "Major", label: "Total credits toward the 30-credit major", target: 30, unit: "credits", note: "Enter your total.", browse: "/courses?department=FRENCH&offered=1" },
  ],
  plan: [
    [LSA_FILLER],
    [{ label: "FRENCH 230 or 232", req: "prereq" }, LSA_FILLER],
    [{ label: "FRENCH 235", req: "f-235" }, LSA_FILLER],
    [{ label: "FRENCH 270-299", req: "f-270" }, LSA_FILLER],
    [{ label: "FRENCH 270-299", req: "f-270" }, { label: "Literature and culture", req: "lit" }, LSA_FILLER],
    [{ label: "300+ FRENCH", credits: 6, req: "upper" }, LSA_FILLER],
    [{ label: "300+ FRENCH", credits: 6, req: "upper" }, LSA_FILLER],
    [{ label: "300+ FRENCH", credits: 6, req: "upper" }, { label: "Any remaining credits", req: "total" }, LSA_FILLER],
  ],
};

const BIOCHEM_URL = "https://lsa.umich.edu/lsa/academics/majors-minors/biochemistry-major.html";

const BIOCHEMISTRY: Major = {
  id: "lsa-biochemistry-bs",
  name: "Biochemistry",
  school: "LSA",
  sourceUrl: BIOCHEM_URL,
  sourceLabel: "LSA major requirements, effective Winter 2026",
  planIsOfficial: false,
  notes: [
    "37 credits minimum (B.S.). You're strongly encouraged to take CHEM 351, though MCDB 310 or BIOLCHEM 415 can replace it.",
    "This major has exclusions with other science majors; see the source page.",
  ],
  requirements: [
    { id: "bio", group: "Prerequisites", label: "Intro biology", anyOf: [["biology-171", "biology-172"], ["biology-171", "biology-174"], ["biology-192"], ["biology-195"]], sequential: true },
    { id: "chem-1", group: "Prerequisites", label: "Organic chemistry I with lab", anyOf: [["chem-210", "chem-211"]] },
    { id: "chem-2", group: "Prerequisites", label: "Organic chemistry II", anyOf: one("chem-215") },
    { id: "calc-1", group: "Prerequisites", label: "Calculus I", anyOf: one("math-115", "math-120") },
    { id: "calc-2", group: "Prerequisites", label: "Calculus II", anyOf: one("math-116", "math-121") },
    { id: "adv-math", group: "Prerequisites", label: "MATH 215 or CHEM 262", anyOf: one("math-215", "chem-262") },
    { id: "physics", group: "Prerequisites", label: "Two-term physics sequence with labs", target: 2, unit: "course", note: "See the source page for the accepted first- and second-term options.", browse: BIOCHEM_URL },
    { id: "genetics", group: "Core", label: "Genetics", anyOf: one("biology-305") },
    { id: "pchem", group: "Core", label: "CHEM 260, or CHEM 230 and 261", anyOf: [["chem-260"], ["chem-230", "chem-261"]] },
    { id: "inorganic", group: "Core", label: "CHEM 302, 303, 241, or 245", anyOf: one("chem-302", "chem-303", "chem-241", "chem-245") },
    { id: "lab", group: "Core", label: "CHEM 216 or 242, or 246 and 247", anyOf: [["chem-216"], ["chem-242"], ["chem-246", "chem-247"]] },
    { id: "biochem", group: "Core", label: "Biochemistry", anyOf: one("chem-351", "mcdb-310", "biolchem-415") },
    { id: "c-352", group: "Core", label: "CHEM 352 or 353", anyOf: one("chem-352", "chem-353") },
    { id: "c-451", group: "Core", label: "CHEM 451", anyOf: one("chem-451") },
    { id: "c-452", group: "Core", label: "CHEM 452", anyOf: one("chem-452") },
    { id: "c-453", group: "Core", label: "CHEM 453", anyOf: one("chem-453") },
    { id: "electives", group: "Electives", label: "Approved elective credits", target: 6, unit: "credits", note: "From the list on the source page.", browse: BIOCHEM_URL },
    { id: "research", group: "Electives", label: "Advanced lab or undergraduate research", target: 1, unit: "course", browse: BIOCHEM_URL },
  ],
  plan: [
    [{ label: "BIOLOGY 171", req: "bio" }, { label: "Calculus I", req: "calc-1" }, LSA_FILLER],
    [{ label: "CHEM 210 + 211", req: "chem-1" }, { label: "Calculus II", req: "calc-2" }, { label: "Rest of intro biology", req: "bio" }],
    [{ label: "CHEM 215", req: "chem-2" }, { label: "Physics", req: "physics" }, { label: "MATH 215 or CHEM 262", req: "adv-math" }],
    [{ label: "CHEM 216 or 242", req: "lab" }, { label: "Physics", req: "physics" }, { label: "CHEM 260, or 230 and 261", req: "pchem" }],
    [{ label: "CHEM 351", req: "biochem" }, { label: "BIOLOGY 305", req: "genetics" }, { label: "CHEM 302, 303, 241, or 245", req: "inorganic" }],
    [{ label: "CHEM 352 or 353", req: "c-352" }, { label: "Elective", credits: 3, req: "electives" }, LSA_FILLER],
    [{ label: "CHEM 451", req: "c-451" }, { label: "CHEM 453", req: "c-453" }, { label: "Advanced lab or research", req: "research" }],
    [{ label: "CHEM 452", req: "c-452" }, { label: "Elective", credits: 3, req: "electives" }, LSA_FILLER],
  ],
};

const AAS_GATEWAY = one("aas-200", "aas-201", "aas-202");

const AAS: Major = {
  id: "lsa-afroamerican-and-african-studies",
  name: "Afroamerican and African Studies",
  school: "LSA",
  sourceUrl: "https://lsa.umich.edu/lsa/academics/majors-minors/afroamerican-and-african-studies-major.html",
  sourceLabel: "LSA major requirements, effective Fall 2025",
  planIsOfficial: false,
  notes: [
    "28 credits minimum, with no prerequisites. The source page lists major exclusions.",
    "You also need at least one AAS upper-level writing course, which can count toward other major requirements.",
    "Choose electives with a DAAS advisor or faculty. The DAAS website lists courses by theme.",
  ],
  requirements: [
    { id: "gateway-1", group: "Gateway", label: "Gateway course", anyOf: AAS_GATEWAY },
    { id: "gateway-2", group: "Gateway", label: "Second gateway course", anyOf: AAS_GATEWAY },
    { id: "comparative", group: "Major", label: "Comparative or global courses", target: 2, unit: "course", note: "From AAS 304, 309, 322, 323, 324, 346, 357, 359, 362, 365, 381, 384, or 441.", browse: "/courses?department=AAS&level=300&offered=1" },
    { id: "electives", group: "Major", label: "AAS electives", target: 4, unit: "course", note: "Two must be at the 300 or 400 level.", browse: "/courses?department=AAS&offered=1" },
    { id: "ulwr", group: "Major", label: "AAS upper-level writing course", target: 1, unit: "course", note: "Can also count toward other requirements here.", browse: "/courses?department=AAS&level=300&offered=1" },
    { id: "action", group: "Major", label: "DAAS-In-Action", anyOf: one("aas-498") },
  ],
  plan: [
    [{ label: "Gateway course", req: "gateway-1" }, LSA_FILLER],
    [{ label: "Gateway course", req: "gateway-2" }, LSA_FILLER],
    [{ label: "AAS elective", req: "electives" }, LSA_FILLER],
    [{ label: "AAS elective", req: "electives" }, LSA_FILLER],
    [{ label: "Comparative or global course", req: "comparative" }, LSA_FILLER],
    [{ label: "Comparative or global course", req: "comparative" }, { label: "Upper-level writing", req: "ulwr" }, LSA_FILLER],
    [{ label: "300+ AAS elective", req: "electives" }, LSA_FILLER],
    [{ label: "AAS 498", req: "action" }, { label: "300+ AAS elective", req: "electives" }, LSA_FILLER],
  ],
};

const CLCIV_URL = "https://lsa.umich.edu/lsa/academics/majors-minors/classical-civilization-major.html";

const CLASSICAL_CIV: Major = {
  id: "lsa-classical-civilization",
  name: "Classical Civilization",
  school: "LSA",
  sourceUrl: CLCIV_URL,
  sourceLabel: "LSA major requirements, effective Fall 2024",
  planIsOfficial: false,
  notes: [
    "24 credits minimum: eight courses of at least 3 credits each. Greek or Latin is recommended, not required.",
    "Three of your six courses must come from one cluster: Language, Literature and Reception; History and Archaeology; or Religion and Philosophy.",
    "Honors thesis students may have a different capstone arrangement; see the source page.",
  ],
  requirements: [
    { id: "prereq", group: "Prerequisites", label: "Intro course", note: "At least 4 credits.", anyOf: one("clciv-101", "clciv-202", "history-200", "history-201", "gtbooks-191", "clarch-221", "clarch-222", "archam-221", "archam-222") },
    { id: "level-200", group: "Major", label: "200-level CLCIV course", target: 1, unit: "course", browse: "/courses?department=CLCIV&level=200&offered=1" },
    { id: "six", group: "Major", label: "Classical Civilization courses", target: 6, unit: "course", note: "At least 18 credits, with three or more at the 300 level and two or more at the 400 level.", browse: "/courses?department=CLCIV&offered=1" },
    { id: "capstone", group: "Major", label: "Capstone Seminar", note: "Register for section 001 (2 credits) and section 002 (1 credit).", anyOf: one("clciv-480") },
  ],
  plan: [
    [{ label: "Intro course", req: "prereq" }, LSA_FILLER],
    [{ label: "200-level CLCIV", req: "level-200" }, LSA_FILLER],
    [{ label: "Classical Civilization course", req: "six" }, LSA_FILLER],
    [{ label: "300-level course", req: "six" }, LSA_FILLER],
    [{ label: "300-level course", req: "six" }, LSA_FILLER],
    [{ label: "300-level course", req: "six" }, LSA_FILLER],
    [{ label: "400-level course", req: "six" }, LSA_FILLER],
    [{ label: "400-level course", req: "six" }, { label: "CLCIV 480", req: "capstone" }, LSA_FILLER],
  ],
};

const GERMAN: Major = {
  id: "lsa-german",
  name: "German",
  school: "LSA",
  sourceUrl: "https://lsa.umich.edu/lsa/academics/majors-minors/german-major.html",
  sourceLabel: "LSA major requirements, effective Winter 2017",
  planIsOfficial: false,
  notes: [
    "30 credits beyond GERMAN 232. AP/IB, placement, or transfer credit can meet the prerequisite.",
    "At least 15 credits must be in residence or through an affiliated study abroad program.",
    "This requirement version is from 2017, the newest on the LSA page. Confirm with an advisor.",
  ],
  requirements: [
    { id: "prereq", group: "Prerequisites", label: "GERMAN 230 or 232, or RCLANG 291", anyOf: one("german-230", "german-232", "rclang-291") },
    { id: "g-325", group: "Major", label: "GERMAN 325 or 326", anyOf: one("german-325", "german-326") },
    { id: "level-300", group: "Major", label: "Other 300-level courses", target: 3, unit: "course", browse: "/courses?department=GERMAN&level=300&offered=1" },
    { id: "g-425", group: "Major", label: "GERMAN 425 or 426", anyOf: one("german-425", "german-426") },
    { id: "level-400", group: "Major", label: "Other 400-level courses", target: 3, unit: "course", browse: "/courses?department=GERMAN&level=400&offered=1" },
    { id: "additional", group: "Major", label: "Additional courses at the 300 level or higher", target: 2, unit: "course", note: "Keep going until you reach 30 credits.", browse: "/courses?department=GERMAN&level=300&offered=1" },
  ],
  plan: [
    [LSA_FILLER],
    [{ label: "GERMAN 230 or 232", req: "prereq" }, LSA_FILLER],
    [{ label: "GERMAN 325 or 326", req: "g-325" }, LSA_FILLER],
    [{ label: "300-level courses", req: "level-300" }, LSA_FILLER],
    [{ label: "300-level courses", req: "level-300" }, LSA_FILLER],
    [{ label: "GERMAN 425 or 426", req: "g-425" }, { label: "400-level course", req: "level-400" }, LSA_FILLER],
    [{ label: "400-level courses", req: "level-400" }, { label: "Additional course", req: "additional" }, LSA_FILLER],
    [{ label: "400-level course", req: "level-400" }, { label: "Additional course", req: "additional" }, LSA_FILLER],
  ],
};

const ITALIAN: Major = {
  id: "lsa-italian",
  name: "Italian",
  school: "LSA",
  sourceUrl: "https://lsa.umich.edu/lsa/academics/majors-minors/italian-major.html",
  sourceLabel: "LSA major requirements, effective Winter 2026",
  planIsOfficial: false,
  notes: [
    "30 credits in Italian courses numbered 235 and above. ITALIAN 410 doesn't count toward the major.",
    "Three credits may come from an advisor-approved cognate.",
    "At least 15 credits must be in residence or through an affiliated study abroad program, including one 300- or 400-level course in Italian at Ann Arbor.",
  ],
  requirements: [
    { id: "prereq", group: "Prerequisites", label: "Intermediate Italian", note: "Or the equivalent.", anyOf: one("italian-230", "italian-232", "italian-233", "italian-410") },
    { id: "language", group: "Major", label: "Credits taught in Italian", target: 12, unit: "credits", note: "Include one course at the 200 level beyond 233, one at the 300 level, and one at the 400 level.", browse: "/courses?department=ITALIAN&offered=1" },
    { id: "total", group: "Major", label: "Total credits toward the 30-credit major", target: 30, unit: "credits", note: "Enter your total.", browse: "/courses?department=ITALIAN&offered=1" },
  ],
  plan: [
    [LSA_FILLER],
    [{ label: "Intermediate Italian", req: "prereq" }, LSA_FILLER],
    [{ label: "200-level in Italian", credits: 3, req: "language" }, LSA_FILLER],
    [{ label: "Italian courses", credits: 3, req: "language" }, LSA_FILLER],
    [{ label: "300-level in Italian", credits: 3, req: "language" }, LSA_FILLER],
    [{ label: "Italian courses", credits: 6, req: "total" }, LSA_FILLER],
    [{ label: "400-level in Italian", credits: 3, req: "language" }, LSA_FILLER],
    [{ label: "Italian courses", credits: 12, req: "total" }, LSA_FILLER],
  ],
};

const JUDAIC: Major = {
  id: "lsa-judaic-studies",
  name: "Judaic Studies",
  school: "LSA",
  sourceUrl: "https://lsa.umich.edu/lsa/academics/majors-minors/judaic-studies-major.html",
  sourceLabel: "LSA major requirements, effective Fall 2021",
  planIsOfficial: false,
  notes: [
    "28 credits minimum at the 200 level or above, with no prerequisites. Courses need a Judaic listing or advisor approval.",
    "At least 15 credits must be in residence. At most one independent study course counts without approval.",
    "An optional Hebrew sub plan has its own language requirement; see the source page.",
  ],
  requirements: [
    { id: "core", group: "Core", label: "Core course", anyOf: one("judaic-205", "judaic-210", "judaic-281") },
    { id: "level-400", group: "Upper level", label: "400-level course", target: 1, unit: "course", browse: "/courses?department=JUDAIC&level=400&offered=1" },
    { id: "upper", group: "Upper level", label: "Credits at the 300 or 400 level", target: 15, unit: "credits", browse: "/courses?department=JUDAIC&level=300&offered=1" },
    { id: "total", group: "Total", label: "Total credits toward the 28-credit major", target: 28, unit: "credits", note: "Enter your total.", browse: "/courses?department=JUDAIC&offered=1" },
  ],
  plan: [
    [LSA_FILLER],
    [{ label: "Core course", req: "core" }, LSA_FILLER],
    [{ label: "Judaic electives", credits: 6, req: "total" }, LSA_FILLER],
    [{ label: "Judaic electives", credits: 7, req: "total" }, LSA_FILLER],
    [{ label: "Upper-level courses", credits: 4, req: "upper" }, LSA_FILLER],
    [{ label: "Upper-level courses", credits: 4, req: "upper" }, LSA_FILLER],
    [{ label: "Upper-level courses", credits: 4, req: "upper" }, LSA_FILLER],
    [{ label: "400-level course", req: "level-400" }, { label: "Upper-level courses", credits: 3, req: "upper" }, LSA_FILLER],
  ],
};

const LATINO_STUDIES: Major = {
  id: "lsa-latina-latino-studies",
  name: "Latina/Latino Studies",
  school: "LSA",
  sourceUrl: "https://lsa.umich.edu/lsa/academics/majors-minors/latina-latino-studies-major.html",
  sourceLabel: "LSA major requirements, effective Winter 2019",
  planIsOfficial: false,
  notes: [
    "30 credits, with no prerequisites.",
    "When declaring, pick a track: comparative ethnic studies, gender and sexuality, migration and transnationalism, community engagement and social action, or arts and media. Four to six of your courses should fit it.",
    "If you're considering graduate study in a specific discipline, the program suggests also majoring in that department.",
  ],
  requirements: [
    { id: "language", group: "Language", label: "Terms of Spanish or an approved language", target: 4, unit: "course", note: "Or show fourth-term proficiency. Enter the terms you've finished.", browse: "/courses?department=SPANISH&offered=1" },
    { id: "intro", group: "Major", label: "Introduction to Latina/o Studies", anyOf: one("amcult-213") },
    { id: "courses", group: "Major", label: "Latina/o Studies courses", target: 6, unit: "course", note: "Two must be at the 300 level or above.", browse: "/courses?department=LATINOAM&offered=1" },
    { id: "capstone", group: "Major", label: "Capstone", note: "Or an equivalent approved by the program advisor.", anyOf: one("amcult-498") },
  ],
  plan: [
    [{ label: "Language", req: "language" }, LSA_FILLER],
    [{ label: "Language", req: "language" }, { label: "AMCULT 213", req: "intro" }, LSA_FILLER],
    [{ label: "Language", req: "language" }, { label: "Latina/o Studies course", req: "courses" }, LSA_FILLER],
    [{ label: "Language", req: "language" }, { label: "Latina/o Studies course", req: "courses" }, LSA_FILLER],
    [{ label: "Latina/o Studies course", req: "courses" }, LSA_FILLER],
    [{ label: "Latina/o Studies course", req: "courses" }, LSA_FILLER],
    [{ label: "300+ Latina/o Studies course", req: "courses" }, LSA_FILLER],
    [{ label: "300+ Latina/o Studies course", req: "courses" }, { label: "AMCULT 498", req: "capstone" }, LSA_FILLER],
  ],
};

const PPE_URL = "https://lsa.umich.edu/lsa/academics/majors-minors/philosophy-politics-and-economics-major.html";

const PPE: Major = {
  id: "lsa-philosophy-political-science-economics",
  name: "Philosophy, Politics, and Economics",
  school: "LSA",
  sourceUrl: PPE_URL,
  sourceLabel: "LSA major requirements, effective Fall 2025",
  planIsOfficial: false,
  notes: [
    "This major is selective: you apply, with applications open for a limited time in the Winter term. Winter of sophomore year is best.",
    "33 credits minimum across 12 courses. Admission depends on a C- or better in all prerequisites, and a C or better in calculus.",
    "One philosophy course must count toward normative theory or your theme. Write a rationale for your theme and get it approved by your PPE advisor.",
  ],
  requirements: [
    { id: "phil", group: "Prerequisites", label: "100- or 200-level PHIL course", target: 1, unit: "course", note: "Not PHIL 180, 183, 201, or 296.", browse: "/courses?department=PHIL&level=100&offered=1" },
    { id: "polsci", group: "Prerequisites", label: "Intro political science", anyOf: one("polsci-101", "polsci-111", "polsci-140", "polsci-160") },
    { id: "econ-101", group: "Prerequisites", label: "ECON 101", anyOf: one("econ-101") },
    { id: "econ-102", group: "Prerequisites", label: "ECON 102", anyOf: one("econ-102") },
    { id: "calc", group: "Prerequisites", label: "Calculus", anyOf: one("math-115", "math-116", "math-121", "math-156", "math-176", "math-185", "math-186", "math-215", "math-285", "math-295", "math-296", "econ-210") },
    { id: "e-401", group: "Core", label: "Intermediate Microeconomics", anyOf: one("econ-401") },
    { id: "p-300", group: "Core", label: "Introduction to Political Economy", anyOf: one("ppe-300") },
    { id: "capstone", group: "Core", label: "Senior Seminar in Political Economy", note: "Honors students take PPE 401 and 402.", anyOf: [["ppe-400"], ["ppe-401", "ppe-402"]] },
    { id: "stats", group: "Distribution", label: "Statistics", anyOf: one("stats-250", "stats-280", "stats-426", "polsci-300", "econ-404", "econ-405", "econ-453") },
    { id: "formal", group: "Distribution", label: "Other formal methods", target: 1, unit: "course", note: "Statistics, logic, decision theory, or game theory, from the source page's list.", browse: PPE_URL },
    { id: "normative", group: "Distribution", label: "Normative theory", target: 2, unit: "course", note: "300- or 400-level courses from the source page's list.", browse: PPE_URL },
    { id: "pol-econ", group: "Distribution", label: "Political economy", target: 2, unit: "course", note: "From the source page's list.", browse: PPE_URL },
    { id: "theme", group: "Theme", label: "Theme courses", target: 3, unit: "course", note: "Can use core list courses not already counted for the core.", browse: PPE_URL },
  ],
  plan: [
    [{ label: "ECON 101", req: "econ-101" }, { label: "Calculus", req: "calc" }, LSA_FILLER],
    [{ label: "ECON 102", req: "econ-102" }, { label: "Intro political science", req: "polsci" }, LSA_FILLER],
    [{ label: "Intro PHIL course", req: "phil" }, { label: "Statistics", req: "stats" }, LSA_FILLER],
    [{ label: "Apply to the major" }, { label: "PPE 300", req: "p-300" }, LSA_FILLER],
    [{ label: "ECON 401", req: "e-401" }, { label: "Formal methods", req: "formal" }, LSA_FILLER],
    [{ label: "Normative theory", req: "normative" }, { label: "Political economy", req: "pol-econ" }, LSA_FILLER],
    [{ label: "Normative theory", req: "normative" }, { label: "Political economy", req: "pol-econ" }, { label: "Theme courses", req: "theme" }],
    [{ label: "Remaining theme courses", req: "theme" }, { label: "PPE 400", req: "capstone" }, LSA_FILLER],
  ],
};

const DRAMA_URL = "https://lsa.umich.edu/lsa/academics/majors-minors/drama-major.html";

const DRAMA: Major = {
  id: "lsa-drama",
  name: "Drama",
  school: "LSA",
  sourceUrl: DRAMA_URL,
  sourceLabel: "LSA major requirements, effective Winter 2024",
  planIsOfficial: false,
  notes: [
    "35 credits minimum, with no prerequisites.",
    "Other electives need approval from the Drama Program head.",
  ],
  requirements: [
    { id: "foundation", group: "Major", label: "Foundational course", anyOf: one("rcdrama-281", "rcdrama-282") },
    { id: "electives", group: "Major", label: "Approved elective credits", target: 27, unit: "credits", note: "From the list on the source page.", browse: DRAMA_URL },
    { id: "capstone", group: "Major", label: "Capstone", note: "Usually RCDRAMA 481.", anyOf: one("rcdrama-481", "rccore-307", "rccore-406", "rcdrama-483") },
  ],
  plan: [
    [{ label: "Elective", credits: 3, req: "electives" }, LSA_FILLER],
    [{ label: "Foundational course", req: "foundation" }, LSA_FILLER],
    [{ label: "Elective", credits: 4, req: "electives" }, LSA_FILLER],
    [{ label: "Elective", credits: 4, req: "electives" }, LSA_FILLER],
    [{ label: "Electives", credits: 4, req: "electives" }, LSA_FILLER],
    [{ label: "Electives", credits: 4, req: "electives" }, LSA_FILLER],
    [{ label: "Electives", credits: 4, req: "electives" }, LSA_FILLER],
    [{ label: "Capstone", req: "capstone" }, { label: "Electives", credits: 4, req: "electives" }, LSA_FILLER],
  ],
};

const HOBB_URL = "https://lsa.umich.edu/lsa/academics/majors-minors/human-origins-biology-and-behavior-major.html";

const HOBB: Major = {
  id: "lsa-human-origins-biology-and-behavior",
  name: "Human Origins, Biology, and Behavior",
  school: "LSA",
  sourceUrl: HOBB_URL,
  sourceLabel: "LSA major requirements, effective Fall 2023",
  planIsOfficial: false,
  notes: [
    "32 credits minimum at the 200 level and above. At most 6 credits of independent research count.",
    "At least 20 credits must be in residence. The source page lists major exclusions.",
  ],
  requirements: [
    { id: "intro", group: "Prerequisites", label: "How Humans Evolved", anyOf: one("anthrbio-201") },
    { id: "bio", group: "Prerequisites", label: "Intro biology sequence", anyOf: [["biology-171", "biology-172", "biology-173"], ["biology-195", "biology-173"]], sequential: true },
    { id: "group-paleo", group: "Anthropology", label: "Paleoanthropology and morphology", target: 1, unit: "course", browse: HOBB_URL },
    { id: "group-ecology", group: "Anthropology", label: "Ecology and behavior", target: 1, unit: "course", browse: HOBB_URL },
    { id: "group-adaptation", group: "Anthropology", label: "Human adaptation", target: 1, unit: "course", browse: HOBB_URL },
    { id: "group-evolution", group: "Anthropology", label: "Evolution and genetics", target: 1, unit: "course", browse: HOBB_URL },
    { id: "anthro-fifth", group: "Anthropology", label: "Fifth anthropology course", target: 1, unit: "course", note: "At least two of your five must be at the 400 level or above. A course can't count in two groups.", browse: HOBB_URL },
    { id: "biology", group: "Biology", label: "Biology courses", target: 3, unit: "course", note: "Cover both groups: molecular, cellular, and developmental; and ecology, evolution, and behavior.", browse: HOBB_URL },
    { id: "total", group: "Total", label: "Total credits toward the 32-credit major", target: 32, unit: "credits", note: "Enter your total.", browse: HOBB_URL },
  ],
  plan: [
    [{ label: "BIOLOGY 171", req: "bio" }, LSA_FILLER],
    [{ label: "Rest of intro biology", req: "bio" }, { label: "ANTHRBIO 201", req: "intro" }, LSA_FILLER],
    [{ label: "Biology course", req: "biology" }, LSA_FILLER],
    [{ label: "Ecology and behavior", req: "group-ecology" }, { label: "Biology course", req: "biology" }, LSA_FILLER],
    [{ label: "Paleoanthropology", req: "group-paleo" }, LSA_FILLER],
    [{ label: "Human adaptation", req: "group-adaptation" }, { label: "Biology course", req: "biology" }, LSA_FILLER],
    [{ label: "Evolution and genetics", req: "group-evolution" }, LSA_FILLER],
    [{ label: "Fifth anthropology course", req: "anthro-fifth" }, { label: "Courses to reach 32 credits", req: "total" }, LSA_FILLER],
  ],
};

const LACS_URL = "https://lsa.umich.edu/lsa/academics/majors-minors/latin-american-and-caribbean-studies-major.html";

const LACS: Major = {
  id: "lsa-latin-american-and-caribbean-studies",
  name: "Latin American and Caribbean Studies",
  school: "LSA",
  sourceUrl: LACS_URL,
  sourceLabel: "LSA major requirements, effective Fall 2016",
  planIsOfficial: false,
  notes: [
    "30 credits minimum, with at least 20 at the 300-400 level. Language courses don't count toward the 30.",
    "Up to 4 credits of Quechua or Nahuatl can count as electives. Study abroad needs advisor approval.",
    "This requirement version is from 2016, the newest on the LSA page. Confirm with an advisor.",
  ],
  requirements: [
    { id: "language", group: "Language", label: "Spanish or Portuguese proficiency", note: "Or the equivalent. Get this done early.", anyOf: one("spanish-277", "rclang-294", "portug-232") },
    { id: "anthro", group: "Areas of study", label: "Anthropology", note: "Or an approved upper-level course on Latin America.", anyOf: one("anthrcul-319", "anthrcul-414") },
    { id: "history", group: "Areas of study", label: "History", note: "Or an approved upper-level course on Latin America.", anyOf: one("history-347", "history-348") },
    { id: "lit", group: "Areas of study", label: "Literature", note: "Or an approved upper-level course in Latin American literature.", anyOf: one("spanish-381", "spanish-382") },
    { id: "politics", group: "Areas of study", label: "Politics and economy", note: "Or an approved upper-level course on Latin American politics or economy.", anyOf: one("spanish-438") },
    { id: "total", group: "Electives", label: "Total credits toward the 30-credit major", target: 30, unit: "credits", note: "Enter your total. Electives can come from any department with Latin America and Caribbean content.", browse: "/courses?department=LACS&offered=1" },
  ],
  plan: [
    [LSA_FILLER],
    [{ label: "Language proficiency", req: "language" }, LSA_FILLER],
    [{ label: "LACS electives", credits: 6, req: "total" }, LSA_FILLER],
    [{ label: "Anthropology", req: "anthro" }, LSA_FILLER],
    [{ label: "History", req: "history" }, LSA_FILLER],
    [{ label: "Literature", req: "lit" }, LSA_FILLER],
    [{ label: "Politics and economy", req: "politics" }, LSA_FILLER],
    [{ label: "Remaining electives", credits: 24, req: "total" }, LSA_FILLER],
  ],
};

const MENAS_URL = "https://lsa.umich.edu/lsa/academics/majors-minors/middle-eastern-and-north-african-studies-major.html";

const MENAS: Major = {
  id: "lsa-middle-eastern-and-north-african-studies",
  name: "Middle Eastern and North African Studies",
  school: "LSA",
  sourceUrl: MENAS_URL,
  sourceLabel: "LSA major requirements, effective Fall 2016",
  planIsOfficial: false,
  notes: [
    "30 credits minimum at the 200 level and above, approved by the undergraduate advisor.",
    "MIDEAST 200 and an intro to Islam course (ISLAM 216, MIDEAST 216, or RELIGION 204) are strongly recommended.",
    "This requirement version is from 2016, the newest on the LSA page. Confirm with an advisor.",
  ],
  requirements: [
    { id: "lang-1", group: "Prerequisites", label: "First-year language sequence", note: "Or the equivalent.", anyOf: [["arabic-101", "arabic-102"], ["armenian-101", "armenian-102"], ["hebrew-101", "hebrew-102"], ["persian-101", "persian-102"], ["turkish-101", "turkish-102"]], sequential: true },
    { id: "lang-2", group: "Language", label: "Terms of language beyond first year", target: 2, unit: "course", note: "One year of Arabic, Armenian, Hebrew, Persian, or Turkish.", browse: "/courses?offered=1" },
    { id: "capstone", group: "Core", label: "MENAS 493", anyOf: one("menas-493") },
    { id: "social", group: "Core", label: "Anthropology, Sociology, or Women's Studies", target: 1, unit: "course", note: "300 or 400 level, advisor approved.", browse: MENAS_URL },
    { id: "h-443", group: "Core", label: "HISTORY 443", anyOf: one("history-443") },
    { id: "pre-1800", group: "Core", label: "Pre-1800 Middle East history", target: 1, unit: "course", note: "300 or 400 level, advisor approved.", browse: MENAS_URL },
    { id: "polsci", group: "Core", label: "Political science", anyOf: one("polsci-351", "polsci-352", "polsci-353") },
    { id: "electives", group: "Electives", label: "Approved electives", target: 2, unit: "course", browse: MENAS_URL },
  ],
  plan: [
    [{ label: "First-year language", req: "lang-1" }, LSA_FILLER],
    [{ label: "First-year language", req: "lang-1" }, LSA_FILLER],
    [{ label: "Second-year language", req: "lang-2" }, LSA_FILLER],
    [{ label: "Second-year language", req: "lang-2" }, LSA_FILLER],
    [{ label: "HISTORY 443", req: "h-443" }, { label: "Political science", req: "polsci" }, LSA_FILLER],
    [{ label: "Pre-1800 history", req: "pre-1800" }, { label: "Elective", req: "electives" }, LSA_FILLER],
    [{ label: "Anthropology, Sociology, or Women's Studies", req: "social" }, { label: "Elective", req: "electives" }, LSA_FILLER],
    [{ label: "MENAS 493", req: "capstone" }, LSA_FILLER],
  ],
};

const POLISH: Major = {
  id: "lsa-polish",
  name: "Polish",
  school: "LSA",
  sourceUrl: "https://lsa.umich.edu/lsa/academics/majors-minors/polish-major.html",
  sourceLabel: "LSA major requirements, effective Winter 2013",
  planIsOfficial: false,
  notes: [
    "27 credits minimum, with at least 15 at the 300 level or above and 15 in residence or an affiliated study abroad program.",
    "Talk to the Polish advisor before studying abroad.",
    "This requirement version is from 2013, the newest on the LSA page. Confirm with an advisor.",
  ],
  requirements: [
    { id: "prereq", group: "Prerequisites", label: "First- and second-year Polish", note: "Or the equivalent.", anyOf: [["polish-121", "polish-122", "polish-221", "polish-222"]], sequential: true },
    { id: "language", group: "Major", label: "Polish language credits", target: 6, unit: "credits", note: "6-12 credits of POLISH 321, 322, 421, 422, or equivalent.", browse: "/courses?department=POLISH&offered=1" },
    { id: "lit", group: "Major", label: "Polish literature credits", target: 6, unit: "credits", note: "6-9 credits of POLISH 325, 326, 432.", browse: "/courses?department=POLISH&offered=1" },
    { id: "culture", group: "Major", label: "Polish culture credits", target: 6, unit: "credits", note: "6-9 credits of POLISH 214, 215, 314, 450, or SLAVIC 490.", browse: "/courses?department=POLISH&offered=1" },
    { id: "electives", group: "Major", label: "Elective credits", target: 3, unit: "credits", note: "3-9 credits from the source page's list.", browse: "https://lsa.umich.edu/lsa/academics/majors-minors/polish-major.html" },
    { id: "total", group: "Total", label: "Total credits toward the 27-credit major", target: 27, unit: "credits", note: "Enter your total.", browse: "/courses?department=POLISH&offered=1" },
  ],
  plan: [
    [{ label: "POLISH 121", req: "prereq" }, LSA_FILLER],
    [{ label: "POLISH 122", req: "prereq" }, LSA_FILLER],
    [{ label: "POLISH 221", req: "prereq" }, LSA_FILLER],
    [{ label: "POLISH 222", req: "prereq" }, LSA_FILLER],
    [{ label: "Language", credits: 3, req: "language" }, { label: "Literature", credits: 3, req: "lit" }, LSA_FILLER],
    [{ label: "Language", credits: 3, req: "language" }, { label: "Literature", credits: 3, req: "lit" }, LSA_FILLER],
    [{ label: "Culture", credits: 3, req: "culture" }, { label: "Elective", credits: 3, req: "electives" }, LSA_FILLER],
    [{ label: "Culture", credits: 3, req: "culture" }, { label: "Courses to reach 27 credits", req: "total" }, LSA_FILLER],
  ],
};

const ROMANCE_URL = "https://lsa.umich.edu/lsa/academics/majors-minors/romance-languages-and-literatures-major.html";

const ROMANCE: Major = {
  id: "lsa-romance-languages-and-literatures",
  name: "Romance Languages and Literatures",
  school: "LSA",
  sourceUrl: ROMANCE_URL,
  sourceLabel: "LSA major requirements, effective Winter 2027",
  planIsOfficial: false,
  notes: [
    "At least 39 credits. Pick two principal languages from French, Italian, Portuguese, Spanish, or Catalan.",
    "All 33 language credits must be taught in the target language. Up to 9 can be in a third language.",
    "Upper-level means 300+ in French and Italian, 281+ in Portuguese, and 400+ in Spanish and Catalan.",
  ],
  requirements: [
    { id: "prereq", group: "Prerequisites", label: "Prerequisites in your principal languages", target: 2, unit: "course", note: "FRENCH 230/232, RCLANG 290/310; ITALIAN 230/232/233/410; PORTUG 232/280; or SPANISH 277/278, RCLANG 324.", browse: ROMANCE_URL },
    { id: "lang-1", group: "Languages", label: "First principal language credits", target: 12, unit: "credits", note: "At least 6 upper-level.", browse: "/courses?department=SPANISH&offered=1" },
    { id: "lang-2", group: "Languages", label: "Second principal language credits", target: 12, unit: "credits", note: "At least 6 upper-level.", browse: "/courses?department=FRENCH&offered=1" },
    { id: "lang-rest", group: "Languages", label: "Remaining language credits", target: 9, unit: "credits", note: "In a principal or third language, for 33 total.", browse: "/courses?department=ITALIAN&offered=1" },
    { id: "romling", group: "Required", label: "Introduction to the Romance Languages", note: "Check with your advisor about when it's offered.", anyOf: one("romling-300") },
    { id: "seminar", group: "Required", label: "Seminar in RLL", anyOf: one("romlang-498") },
  ],
  plan: [
    [{ label: "First language prerequisite", req: "prereq" }, LSA_FILLER],
    [{ label: "Second language prerequisite", req: "prereq" }, LSA_FILLER],
    [{ label: "First language", credits: 3, req: "lang-1" }, { label: "Second language", credits: 3, req: "lang-2" }, LSA_FILLER],
    [{ label: "First language", credits: 3, req: "lang-1" }, { label: "Second language", credits: 3, req: "lang-2" }, LSA_FILLER],
    [{ label: "First language", credits: 3, req: "lang-1" }, { label: "Second language", credits: 3, req: "lang-2" }, { label: "ROMLING 300", req: "romling" }],
    [{ label: "First language", credits: 3, req: "lang-1" }, { label: "Second language", credits: 3, req: "lang-2" }, LSA_FILLER],
    [{ label: "Remaining language credits", credits: 6, req: "lang-rest" }, LSA_FILLER],
    [{ label: "Remaining language credits", credits: 3, req: "lang-rest" }, { label: "ROMLANG 498", req: "seminar" }, LSA_FILLER],
  ],
};

const STP_URL = "https://lsa.umich.edu/lsa/academics/majors-minors/social-theory-and-practice-major.html";

const STP: Major = {
  id: "lsa-social-theory-and-practice",
  name: "Social Theory and Practice",
  school: "LSA",
  sourceUrl: STP_URL,
  sourceLabel: "LSA major requirements, effective Winter 2026",
  planIsOfficial: false,
  notes: [
    "30 credits minimum, in the Residential College. Design your major proposal in RCSTP 290.",
    "RCSTP 260 and 290 are ideally taken together, usually in the second semester of sophomore year.",
    "Confirm your gateway course with the STP advisor. The Residential College website has a checklist.",
  ],
  requirements: [
    { id: "r-260", group: "Prerequisites", label: "Theorizing Knowledge in the Social Sciences", anyOf: one("rcstp-260") },
    { id: "r-290", group: "Prerequisites", label: "Designing your STP Major Proposal", anyOf: one("rcstp-290") },
    { id: "gateway", group: "Prerequisites", label: "Social science gateway course", target: 1, unit: "course", note: "RCSTP 101 or an approved 200-level course.", browse: "/courses?department=RCSTP&offered=1" },
    { id: "theory", group: "Core", label: "RCSTP theory course", anyOf: one("rcstp-301", "rcstp-302") },
    { id: "methods", group: "Core", label: "Research methods", note: "Other options may count; check with your advisor.", anyOf: one("stats-250", "qmss-201", "soc-210", "soc-310") },
    { id: "theory-2", group: "Self-designed courses", label: "Second social theory course", target: 1, unit: "course", note: "At least 3 credits.", browse: STP_URL },
    { id: "practicum", group: "Self-designed courses", label: "Community-engaged learning or practicum", target: 1, unit: "course", note: "At least 3 credits.", browse: STP_URL },
    { id: "electives", group: "Self-designed courses", label: "Electives", target: 4, unit: "course", note: "Your 18 self-designed credits include at least six upper-level courses.", browse: STP_URL },
    { id: "capstone", group: "Capstone", label: "STP Capstone", note: "Fall of senior year.", anyOf: one("rcstp-490") },
  ],
  plan: [
    [LSA_FILLER],
    [{ label: "Gateway course", req: "gateway" }, LSA_FILLER],
    [{ label: "Research methods", req: "methods" }, LSA_FILLER],
    [{ label: "RCSTP 260", req: "r-260" }, { label: "RCSTP 290", req: "r-290" }, LSA_FILLER],
    [{ label: "RCSTP 301 or 302", req: "theory" }, { label: "Elective", req: "electives" }, LSA_FILLER],
    [{ label: "Second theory course", req: "theory-2" }, { label: "Elective", req: "electives" }, LSA_FILLER],
    [{ label: "RCSTP 490", req: "capstone" }, { label: "Practicum", req: "practicum" }, { label: "Elective", req: "electives" }],
    [{ label: "Elective", req: "electives" }, LSA_FILLER],
  ],
};

export const MAJORS: Major[] = [CS_ENG, CS_LSA, DS_LSA, ECON_LSA, BIOLOGY, NEUROSCIENCE, POLITICAL_SCIENCE, PSYCHOLOGY, MECHANICAL, STATISTICS, COMMUNICATION, ENGLISH, HISTORY, ORG_STUDIES, PHILOSOPHY, SOCIOLOGY, PHYSICS, ANTHROPOLOGY, AMCULT, HISTORY_OF_ART, LINGUISTICS, MICROBIOLOGY, CHEMISTRY, BIO_HEALTH, EARTH, MCDB, BCN, FTVM, WGS, ASIAN_STUDIES, ASTRONOMY, SPANISH, FRENCH, BIOCHEMISTRY, AAS, CLASSICAL_CIV, GERMAN, ITALIAN, JUDAIC, LATINO_STUDIES, PPE, DRAMA, HOBB, LACS, MENAS, POLISH, ROMANCE, STP, ...EXTRA_MAJORS, ...ENGINEERING_PLANS];

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

/** The next unfinished course of each option, without repeats. */
function nextInSequence(options: string[][], completed: string[]): string[][] {
  const done = new Set(completed);
  const next = options.flatMap((ids) => ids.filter((id) => !done.has(id)).slice(0, 1));
  return Array.from(new Set(next)).map((id) => [id]);
}

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
      const mainBlocked = requirement.anyOf[0].some((id) => missingPrereqs(id, progress.completed).length > 0);
      // Unknown prerequisites aren't the same as none: when the usual course is
      // blocked, don't offer an alternative we can't check (MATH 465 instead of
      // EECS 203 for a new student).
      const unlocked = requirement.anyOf.filter((ids) =>
        ids.every((id) => (mainBlocked ? hasKnownPrereqs(id) : true) && missingPrereqs(id, progress.completed).length === 0),
      );
      if (unlocked.length === 0) {
        // Only mention what's coming up soon, not the whole degree.
        if (termIndex <= earliestTerm + 2 && blocked.length < 3) {
          blocked.push({ requirement, missing: missingPrereqs(requirement.anyOf[0][0], progress.completed) });
        }
        continue;
      }
      const candidates = requirement.sequential ? nextInSequence(unlocked, progress.completed) : unlocked;
      const options = candidates.filter((ids) => ids.every(isOffered));
      if (options.length > 0) suggestions.push({ requirement, options });
      else if (termIndex <= earliestTerm + 2) notOffered.push(requirement);
    } else if (termIndex <= earliestTerm + 1) {
      suggestions.push({ requirement, options: [] });
    }
  }
  return { suggestions, notOffered, blocked };
}

export const courseCode = codeOf;
