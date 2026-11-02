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

export const MAJORS: Major[] = [CS_ENG, CS_LSA, DS_LSA, ECON_LSA, BIOLOGY, NEUROSCIENCE, POLITICAL_SCIENCE, PSYCHOLOGY, MECHANICAL, STATISTICS, COMMUNICATION, ENGLISH, HISTORY, ORG_STUDIES, PHILOSOPHY, SOCIOLOGY];

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
      else notOffered.push(requirement);
    } else if (termIndex <= earliestTerm + 1) {
      suggestions.push({ requirement, options: [] });
    }
  }
  return { suggestions, notOffered, blocked };
}

export const courseCode = codeOf;
