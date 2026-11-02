// Compact definitions for majors whose roadmap order is Backpacker's own
// suggestion. List requirements in the order they should be taken; `lsa` and
// friends spread them across eight terms. Requirements still come only from
// each major's official page, linked as its source.

import type { Major, PlanEntry, Requirement } from "./majors.ts";

const LSA_PAGE = "https://lsa.umich.edu/lsa/academics/majors-minors/";

/** Course requirement. Options are course ids, or arrays of ids taken together. */
function c(group: string, label: string, options: (string | string[])[], note?: string): Requirement {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return { id, group, label, note, anyOf: options.map((o) => (Array.isArray(o) ? o : [o])) };
}

/** Requirement the student tracks themselves, from a list kept elsewhere. */
function o(group: string, label: string, target: number, unit: "credits" | "course", note?: string, browse?: string): Requirement {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return { id, group, label, target, unit, note, browse };
}

function spreadPlan(requirements: Requirement[], filler: string): PlanEntry[][] {
  const terms: PlanEntry[][] = Array.from({ length: 8 }, () => []);
  requirements.forEach((r, i) => {
    terms[Math.floor((i * 8) / requirements.length)].push({ label: r.label, req: r.id });
  });
  return terms.map((term) => [...term, { label: filler }]);
}

function major(
  id: string, name: string, school: string, sourceUrl: string, sourceLabel: string,
  notes: string[], requirements: Requirement[], filler: string,
): Major {
  const withBrowse = requirements.map((r) => (r.target && !r.browse ? { ...r, browse: sourceUrl } : r));
  return { id, name, school, sourceUrl, sourceLabel, planIsOfficial: false, notes, requirements: withBrowse, plan: spreadPlan(withBrowse, filler) };
}

function lsa(id: string, name: string, page: string, effective: string, notes: string[], requirements: Requirement[]): Major {
  return major(id, name, "LSA", `${LSA_PAGE}${page}.html`, `LSA major requirements, effective ${effective}`, notes, requirements, "LSA requirements and electives");
}

const INTRO_BIO = [
  ["biology-171", "biology-172", "biology-173"], ["biology-171", "biology-174", "biology-173"],
  ["biology-171", "biology-172", "biology-196"], ["biology-171", "biology-174", "biology-196"],
  ["biology-195", "biology-173"], ["biology-195", "biology-196"],
  ["biology-191", "biology-192", "biology-173"],
];
const PHYSICS_1 = [["physics-140", "physics-141"], ["physics-150", "physics-151"], ["physics-160", "physics-161"]];
const PHYSICS_2 = [["physics-240", "physics-241"], ["physics-250", "physics-251"], ["physics-260", "physics-261"]];

const MATH_SEQUENCE = [["math-205", "math-217"], ["math-215", "math-217"], ["math-285", "math-217"], ["math-295", "math-296"]];
const DIFF_EQ = ["math-286", "math-316"];
const MATH_NOTES = [
  "Consult a math advisor by the first term of sophomore year. An advisor must approve your plan.",
  "Each basic course needs a C- or better. A working knowledge of a programming language is recommended or required.",
];

function mathSub(id: string, name: string, effective: string, extraNotes: string[], requirements: Requirement[]): Major {
  return lsa(id, name, "mathematics-major", effective, [...MATH_NOTES, ...extraNotes], [
    c("Prerequisites", "Math sequence", MATH_SEQUENCE),
    ...requirements,
  ]);
}

function anthroSub(id: string, name: string, extra: string[], requirements: Requirement[] = []): Major {

  return lsa(id, name, "anthropology-major", "Fall 2023", [
    "This sub-major is only for declared Anthropology majors, and you can declare only one.",
    "32 credits minimum at the 200 level or above. The department website lists approved sub-major courses.",
    ...extra,
  ], [
    c("Subfields", "Anthropological archaeology", ["anthrarc-282", "anthrarc-386"]),
    c("Subfields", "Biological anthropology", ["anthrbio-201"]),
    c("Subfields", "Linguistic anthropology", ["anthrcul-272", "anthrcul-374"]),
    c("Subfields", "Sociocultural anthropology", ["anthrcul-222", "anthrcul-226", "anthrcul-230", "anthrcul-330"]),
    ...requirements,
    o("Sub-major", "Sub-major credits", 16, "credits", "16-17 credits within your electives, with at least one course at the 400 level or above."),
    o("Total", "Total credits toward the 32-credit major", 32, "credits", "Enter your total."),
  ]);
}

function sociologySub(id: string, name: string, effective: string, notes: string[], requirements: Requirement[]): Major {
  return lsa(id, name, "sociology-major", effective, [
    "This sub-major is part of the Sociology major, which needs 33 credits at the 200 level or above.",
    "At least 8 sub-major credits must be at the 300 level or above. Up to 6 credits of SOC 394, 395, and 396 can count.",
    ...notes,
  ], [
    c("Prerequisites", "Intro sociology", ["soc-100", "soc-102", "soc-300", "soc-302"]),
    c("Required", "Statistics", ["soc-210", "stats-250", "stats-280"]),
    c("Required", "Research methods", ["soc-310"]),
    c("Required", "Sociological theory", ["soc-305"]),
    ...requirements,
    o("Sub-major", "Sub-major credits", 12, "credits", "From the sub-major's list on the source page."),
    o("Total", "Total credits toward the 33-credit major", 33, "credits", "Enter your total."),
  ]);
}

function internationalSub(id: string, name: string, area: string, areaNote: string, prereqs: Requirement[] = []): Major {
  return lsa(id, name, "international-studies-major", "Fall 2025", [
    "34 credits minimum. Sixth-term language proficiency is required before graduation, so start early.",
    "Get a PICS advisor's approval for your regional course and electives, ideally before you take them.",
    "A course can only meet one requirement within the major.",
  ], [
    c("Prerequisites", "Introduction to International Studies", ["intlstd-101"], "C- or better."),
    ...prereqs,
    o("Language", "Terms of language", 6, "course", "Or show sixth-term proficiency."),
    c("Core", "Topics or core faculty lecture", ["intlstd-301", "intlstd-300", "intlstd-341"]),
    c("Core", "Research design", ["intlstd-390"]),
    o("Regional", "Regional course", 1, "course", "One world region or country related to your language."),
    o("Sub-plan", area + " courses", 4, "course", areaNote),
    o("Electives", "Advanced electives", 3, "course", "Nine credits building on your sub-plan."),
    c("Core", "Advanced Seminar", ["intlstd-401"]),
  ]);
}

export const EXTRA_MAJORS: Major[] = [
  lsa("lsa-classical-languages-and-literatures", "Classical Languages and Literatures", "classical-languages-and-literatures-major", "Fall 2024", [
    "At least 9 courses of 3 or more credits, in both Greek and Latin. Choose a primary language.",
    "Three credits of independent study can count with the advisor's written approval.",
  ], [
    c("Civilization", "Greek or Roman foundations", ["archam-221", "archam-222", "clarch-221", "clarch-222", "clciv-202", "clciv-302", "history-200", "history-201"]),
    o("Language", "Additional upper-level language courses", 3, "course", "In your primary or secondary language."),
    o("Civilization", "Upper-level civilization, archaeology, or history", 1, "course", "Greek or Roman, at least 3 credits."),
    o("Language", "400-level primary language courses", 3, "course"),
    o("Language", "400-level secondary language course", 1, "course"),
  ]),
  lsa("lsa-greek-ancient-language-and-literature", "Greek (Ancient) Language and Literature", "greek-ancient-language-and-literature-major", "Fall 2024", [
    "At least 8 courses of 3 or more credits. You can also meet the prerequisite with a placement exam.",
    "Three credits of GREEK 499 can count with the advisor's written approval.",
  ], [
    c("Prerequisites", "First-year Greek", [["greek-101", "greek-102"], "greek-103"]),
    c("Major", "Introductory course", ["archam-221", "clarch-221", "history-200"]),
    o("Major", "GREEK courses at the 300 level or above", 6, "course", "At least 4 at the 400 level or above, usually including GREEK 401 and 402."),
    o("Major", "Upper-level Greek civilization, archaeology, or history", 1, "course"),
  ]),
  lsa("lsa-greek-modern-language-and-culture", "Greek (Modern) Language and Culture", "greek-modern-language-and-culture-major", "Fall 2024", [
    "At least 9 courses. GREEKMOD 205 and 305 don't count toward the language requirement.",
    "An advisor must approve your structure course.",
  ], [
    c("Prerequisites", "First-year Modern Greek", [["greekmod-101", "greekmod-102"]]),
    c("Language", "GREEKMOD 201", ["greekmod-201"]),
    c("Language", "GREEKMOD 202", ["greekmod-202"]),
    c("Culture", "Intro to Modern Greek Culture", ["greekmod-214"]),
    c("Language", "GREEKMOD 301", ["greekmod-301"]),
    c("Language", "GREEKMOD 302", ["greekmod-302"]),
    o("Culture", "Literature and culture courses at the 300 level or above", 3, "course"),
    o("Structure", "Structure course", 1, "course", "From CLCIV, ARCHAM, CLARCH, COMPLIT, HISTORY, HISTART, or POLSCI."),
  ]),
  lsa("lsa-latin-language-and-literature", "Latin Language and Literature", "latin-language-and-literature-major", "Fall 2024", [
    "At least 8 courses of 3 or more credits. You can also meet the prerequisite with a placement exam.",
    "Three credits of LATIN 499 can count with the advisor's written approval.",
  ], [
    c("Prerequisites", "Intermediate Latin", ["latin-231", "latin-232", "latin-233", "latin-294"], "LATIN 231 must be the Honors section."),
    c("Major", "Introductory course", ["archam-222", "clarch-222", "clciv-202", "clciv-302", "history-201"]),
    o("Major", "LATIN courses at the 300 level or above", 6, "course", "At least one above LATIN 410."),
    o("Major", "Upper-level Roman civilization, archaeology, or history", 1, "course", "At least 3 credits, above CLCIV 302."),
  ]),
  lsa("lsa-translation", "Translation", "translation-maj", "Winter 2026", [
    "27 credits minimum. Finish the LSA Language Requirement first.",
    "At least 3 credits must explore translation in practice, through a practicum or the capstone.",
  ], [
    o("Prerequisites", "LSA Language Requirement", 1, "course", "Mark this when you've completed the requirement."),
    c("Core", "Core translation course", ["complit-200", "complit-250", "complit-322", "complit-323", "complit-494"]),
    c("Core", "Second core translation course", ["complit-200", "complit-250", "complit-322", "complit-323", "complit-494"]),
    o("Electives", "Upper-level language courses", 3, "course", "At least 9 credits beyond the LSA Language Requirement."),
    o("Electives", "Language and translation elective credits", 9, "credits", "200 level or above, pre-approved or approved by the Director of Undergraduate Studies."),
    c("Capstone", "Translation Capstone Seminar", ["complit-497"]),
  ]),
  lsa("lsa-near-eastern-studies", "Middle East Studies", "middle-east-studies-major", "Fall 2020", [
    "26 credits minimum at the 200 level or above, with at least two disciplinary or elective courses at the 400 level.",
    "Choose a submajor: Ancient Middle East, Arabic, Armenian, Hebrew, Persian, or Turkish Studies, and a discipline.",
    "Hebrew Studies needs three additional language terms. See the source page for each submajor's language rules.",
  ], [
    c("Prerequisites", "Introduction to the Middle East", ["mideast-200"]),
    o("Prerequisites", "First-year language terms", 2, "course", "Or proven first-year proficiency, in your submajor's language."),
    o("Language", "Additional language terms", 2, "course", "At least 6 credits."),
    o("Discipline", "Disciplinary courses", 3, "course", "At least 10 credits in one discipline, with two or more from the department."),
    o("Total", "Total credits toward the 26-credit major", 26, "credits", "Enter your total."),
  ]),
  lsa("lsa-russian-east-european-and-eurasian-studies", "Russian, East European and Eurasian Studies", "russian-east-european-and-eurasian-studies-major", "Winter 2017", [
    "30 credits minimum, with 20 at the 300 level or above.",
    "Language: show 6th-term proficiency in Russian or Polish, or 4th-term in another language of the region, excluding German.",
    "This requirement version is from 2017, the newest on the LSA page. Confirm with an advisor.",
  ], [
    o("Prerequisites", "First-year language sequence", 2, "course", "Armenian, BCS, Czech, Polish, Russian, Ukrainian, or Yiddish."),
    c("Geographic", "Geographic course", ["reees-340", "reees-395", "reees-396", "reees-397"]),
    c("Geographic", "Second geographic course", ["reees-340", "reees-395", "reees-396", "reees-397"]),
    o("Disciplinary", "Upper-level arts and culture course", 1, "course"),
    o("Disciplinary", "Upper-level history course", 1, "course"),
    o("Disciplinary", "Upper-level social science course", 1, "course"),
    o("Seminar", "400-level seminar", 1, "course", "Needs the REEES program director's approval."),
    o("Total", "Total credits toward the 30-credit major", 30, "credits", "Enter your total. Advisor-approved electives fill what's left."),
  ]),
  lsa("lsa-biotechnology-and-bioenvironmental-sciences", "Biotechnology and Bioenvironmental Sciences", "biotechnology-and-bioenvironmental-sciences-maj", "Winter 2027", [
    "30 credits minimum. Quantitative courses can't also count as major electives.",
    "Group lists are on the source page. Confirm your plan with a biology advisor.",
  ], [
    { ...c("Prerequisites", "Intro biology sequence", INTRO_BIO), sequential: true },
    c("Prerequisites", "Organic chemistry I with lab", [["chem-210", "chem-211"]]),
    c("Prerequisites", "Organic chemistry II with lab", [["chem-215", "chem-216"]]),
    o("Prerequisites", "Quantitative analysis courses", 3, "course"),
    c("Core", "Biotechnology and Bioenvironmental Science", ["biology-290"]),
    o("Core", "Two more core biology courses", 2, "course", "Two of genetics, biochemistry, and ecology."),
    c("Groups", "Gateway course", ["biology-207", "biology-225", "biology-230", "biology-256", "biology-288"]),
    c("Groups", "Second gateway course", ["biology-207", "biology-225", "biology-230", "biology-256", "biology-288"]),
    c("Groups", "Biotechnology elective", ["biophys-440", "mcdb-408", "mcdb-411", "mcdb-415", "mcdb-430", "mcdb-472", "mcdb-489"]),
    o("Groups", "Bioenvironmental sciences elective", 1, "course"),
    o("Total", "Total credits toward the 30-credit major", 30, "credits", "Enter your total."),
  ]),
  lsa("lsa-biomolecular-science-ab-or-bs", "Biomolecular Science", "biomolecular-science-major", "Fall 2025", [
    "25 credits minimum. You're strongly encouraged to take CHEM 351, though MCDB 310 or BIOLCHEM 415 can replace it.",
    "Electives total at least 9 credits, with at least one at the 400 level. The source page lists exclusions.",
  ], [
    { ...c("Prerequisites", "Intro biology", [["biology-171", "biology-172", "biology-173"], ["biology-195", "biology-173"]]), sequential: true },
    c("Prerequisites", "General chemistry", [["chem-130", "chem-125", "chem-126"], ["chem-245", "chem-246", "chem-247"]]),
    c("Prerequisites", "Calculus I", ["math-115", "math-120"]),
    c("Prerequisites", "Calculus II or statistics", ["math-116", "math-121", "stats-250", "stats-280"]),
    o("Prerequisites", "Two-term physics sequence", 2, "course", "See the source page for accepted options."),
    c("Core", "Organic chemistry with lab", [["chem-210", "chem-211"]]),
    c("Core", "CHEM 215", ["chem-215"]),
    c("Core", "CHEM 230 or 260", ["chem-230", "chem-260"]),
    c("Core", "Biochemistry", ["chem-351", "mcdb-310", "biolchem-415"]),
    c("Core", "CHEM 352 or 353", ["chem-352", "chem-353"]),
    o("Electives", "Chemistry-side elective", 1, "course"),
    o("Electives", "Biology-side elective", 1, "course"),
    o("Electives", "Third elective", 1, "course"),
  ]),
  lsa("lsa-interdisciplinary-astronomy-ba-or-bs", "Interdisciplinary Astronomy", "interdisciplinary-astronomy-major", "Fall 2026", [
    "31 credits minimum. An advisor must approve your interdisciplinary cognate plan.",
    "The source page lists major exclusions.",
  ], [
    c("Prerequisites", "MATH 115", ["math-115"]),
    c("Prerequisites", "MATH 116", ["math-116"]),
    c("Prerequisites", "MATH 215", ["math-215"]),
    c("Prerequisites", "Physics I with lab", PHYSICS_1),
    c("Prerequisites", "Physics II with lab", PHYSICS_2),
    c("Prerequisites", "PHYSICS 340 or 360", ["physics-340", "physics-360"]),
    c("Prerequisites", "Programming with Python", ["compfor-131", "si-101"], "Or an approved equivalent."),
    c("Core", "ASTRO 201", ["astro-201"]),
    c("Core", "ASTRO 361", ["astro-361"]),
    o("Electives", "Astronomy elective credits", 6, "credits", "From ASTRO 401, 402, 403, 404, 405, 406, 416, or 461."),
    o("Cognates", "Cognate credits", 15, "credits", "As part of an advisor-approved interdisciplinary plan."),
    o("Writing", "Upper-level writing", 1, "course", "ASTRO 429 or the writing requirement of your cognate plan."),
  ]),
  lsa("lsa-interdisciplinary-chemical-sciences-ics-ab-or-bs", "Interdisciplinary Chemical Sciences", "interdisciplinary-chemical-sciences-major", "Winter 2024", [
    "27 credits in Chemistry and 15 approved cognate credits. Work with an ICS advisor when you declare.",
    "Only three classes can be shared with a second major.",
  ], [
    o("Prerequisites", "Intro physics with lab", 1, "course", "See the source page for accepted options."),
    c("Prerequisites", "Calculus I", ["math-115", "math-120"]),
    c("Prerequisites", "Calculus II", ["math-116", "math-121"]),
    c("Core", "Organic chemistry with lab", [["chem-210", "chem-211"]]),
    c("Core", "Inorganic chemistry and lab", [["chem-241", "chem-242"], ["chem-245", "chem-246", "chem-247"]]),
    c("Core", "CHEM 260", ["chem-260"]),
    c("Core", "CHEM 302 or 303", ["chem-302", "chem-303"]),
    o("Electives", "CHEM elective credits", 12, "credits", "Include three courses at the 300 level or above, with one 400-level lecture."),
    o("Cognates", "Theme or cognate credits", 15, "credits", "200 level or above, with at least 6 credits at the 300 level or above."),
  ]),
  lsa("lsa-interdiscplinary-physics-ab-or-bs", "Interdisciplinary Physics", "interdisciplinary-physics-major", "Winter 2026", [
    "26 credits minimum, including at least 11 in PHYSICS courses numbered 390/391 and above.",
    "PHYSICS 390/391 and the 400-level courses each need a C- or better, with a C average or higher.",
    "An advisor must approve your interdisciplinary plan. At least 12 credits must be in residence.",
  ], [
    c("Prerequisites", "Physics I with lab", PHYSICS_1),
    c("Prerequisites", "Physics II with lab", PHYSICS_2),
    c("Prerequisites", "PHYSICS 340 or 360", ["physics-340", "physics-360"]),
    c("Prerequisites", "PHYSICS 316", ["physics-316"]),
    c("Major", "PHYSICS 390 and 391", [["physics-390", "physics-391"]]),
    o("Major", "400-level PHYSICS courses", 2, "course"),
    o("Plan", "Interdisciplinary plan credits", 15, "credits", "A coherent program approved by an advisor."),
  ]),
  mathSub("lsa-pure-mathematics", "Pure Mathematics (sub-major)", "Winter 2025", ["Knowing a programming language at the level of EECS 183 is strongly encouraged."], [
    c("Basic", "Differential equations", DIFF_EQ),
    c("Basic", "Modern algebra", ["math-312", "math-412", "math-493"]),
    c("Basic", "Analysis", ["math-351", "math-451"]),
    c("Basic", "Geometry or topology", ["math-431", "math-433", "math-490", "math-590"]),
    o("Electives", "Approved math electives", 4, "course"),
    o("Cognate", "Advanced math cognate outside the department", 1, "course"),
  ]),
  mathSub("lsa-mathematical-sciences", "Mathematical Sciences (sub-major)", "Fall 2026", ["Choose one of eight Program Options. Mathematical Biology and Mathematical Physics have extra prerequisites; see the source page."], [
    c("Prerequisites", "Programming", ["eecs-183", "eecs-280", "compfor-131", "compfor-133", "engr-101", "si-101"]),
    c("Basic", "Differential equations", DIFF_EQ),
    c("Basic", "Discrete math or modern algebra", ["math-312", "math-412", "math-465", "math-493"]),
    c("Basic", "Analysis", ["math-351", "math-354", "math-450", "math-451", "math-454"]),
    c("Basic", "Probability", ["math-425", "math-525"]),
    o("Program option", "Program Option courses", 3, "course", "From one option, listed on the department website."),
    o("Advanced", "Additional advanced courses", 2, "course", "See the source page for what qualifies."),
  ]),
  mathSub("lsa-actuarial-mathematics", "Actuarial Mathematics (sub-major)", "Fall 2026", ["At least 11 courses. Prerequisites must be taken on a graded basis."], [
    c("Prerequisites", "ECON 101", ["econ-101"]),
    c("Prerequisites", "ECON 102", ["econ-102"]),
    c("Prerequisites", "Programming", ["eecs-183", "eecs-280", "compfor-131", "compfor-133", "engr-101", "si-101"]),
    c("Basic", "Differential equations", DIFF_EQ),
    c("Basic", "Probability", ["math-425"]),
    c("Basic", "Statistics", ["stats-426"]),
    c("Basic", "Analysis", ["math-351", "math-451"]),
    c("Special", "MATH 424", ["math-424"]),
    c("Special", "MATH 520", ["math-520"]),
    c("Special", "MATH 523", ["math-523"]),
    c("Special", "Actuarial elective", ["math-423", "math-521", "math-524", "math-528"]),
    c("Special", "Second actuarial elective", ["math-423", "math-521", "math-524", "math-528"]),
    o("Additional", "Advisor-approved related courses", 2, "course"),
  ]),
  mathSub("lsa-mathematics-of-finance-and-risk-management", "Mathematics of Finance and Risk Management (sub-major)", "Fall 2026", ["At least 10 courses. Prerequisites must be taken on a graded basis."], [
    c("Prerequisites", "ECON 101", ["econ-101"]),
    c("Prerequisites", "ECON 102", ["econ-102"]),
    c("Prerequisites", "Programming", ["eecs-183", "eecs-280", "compfor-131", "compfor-133", "engr-101", "si-101"]),
    c("Basic", "Differential equations", DIFF_EQ),
    c("Basic", "Probability", ["math-525"]),
    c("Basic", "Statistics", ["stats-426"]),
    c("Basic", "Analysis", ["math-351", "math-451"]),
    c("Special", "MATH 423", ["math-423"]),
    c("Special", "MATH 472", ["math-472"]),
    c("Special", "MATH 474", ["math-474"]),
    c("Special", "MATH 526", ["math-526"]),
    o("Additional", "Advisor-approved related courses", 2, "course"),
  ]),
  lsa("lsa-honors-mathematics", "Honors Mathematics (sub-major)", "mathematics-major", "Fall 2026", [
    "At least nine courses. Honors introductory sequences like MATH 295-396 are strongly advised.",
    "Pass/Fail courses can't meet core requirements. Choose electives with an Honors advisor.",
    "MATH 295 and 296, or 217 and 297, exempt you from MATH 451, and other sequences exempt you from MATH 420; see the source page.",
  ], [
    o("Prerequisites", "Math sequence", 2, "course", "A sequence ending in 205-217, 215-217, 285-217, 295-296, or 217-297."),
    o("Basic", "Basic courses", 4, "course", "One from each of linear algebra, analysis, modern algebra, and geometry/topology, or the alternate groups on the source page."),
    o("Electives", "Honors electives", 4, "course", "A cohesive program chosen with an Honors advisor."),
    o("Cognate", "Cognate course", 1, "course"),
  ]),
  mathSub("lsa-secondary-mathematics-teaching-certificate", "Secondary Mathematics Teaching Certificate (sub-major)", "Winter 2025", ["Education courses are taken in a specified order in junior and senior years. Consult the School of Education's Office of Student Services.", "A teaching certificate advisor must approve your basic courses."], [
    c("Prerequisites", "Programming", ["eecs-183"], "Or an equivalent."),
    c("Basic", "Modern algebra or number theory", ["math-475", "math-487"]),
    c("Basic", "Geometry", ["math-431", "math-531"]),
    c("Basic", "Probability", ["math-425", "math-525"]),
    c("Basic", "Analysis", ["math-351", "math-451"]),
    c("Basic", "Secondary Mathematics", ["math-486"]),
    o("Education", "Required Education courses", 10, "course", "30 credits, listed on the source page."),
  ]),
  anthroSub("lsa-archaeology", "Archaeology (sub-major)", []),
  anthroSub("lsa-culture-and-media", "Culture and Media (sub-major)", []),
  anthroSub("lsa-medical-anthropology", "Medical Anthropology (sub-major)", ["You can't also elect the Medical Anthropology minor."], [c("Sub-major", "Medical Anthropology course", ["anthrcul-344"])]),
  anthroSub("lsa-politics-law-and-economy", "Politics, Law, and Economy (sub-major)", []),
  anthroSub("lsa-power-identity-and-inequality", "Power, Identity, and Inequality (sub-major)", []),
  anthroSub("lsa-environment-and-conservation", "Environment and Conservation (sub-major)", []),
  sociologySub("lsa-law-justics-and-social-change", "Law, Justice, and Social Change (sub-major)", "Winter 2023", ["You can't also elect the Crime and Justice minor."], []),
  sociologySub("lsa-health-and-society", "Sociology of Health & Medicine (sub-major)", "Winter 2023", [], []),
  sociologySub("lsa-sociology-and-social-work", "Sociology and Social Work (sub-major)", "Winter 2023", ["Declare at or before the start of junior year if you can."], [
    c("Required", "Community Action and Social Change", ["sw-305"]),
    c("Required", "Project Community", ["soc-225"]),
  ]),
  lsa("lsa-ethnic-studies", "Ethnic Studies (sub-major)", "american-culture-major", "Winter 2021", [
    "This sub-major adds to the American Culture major, which needs 28 credits.",
    "Choose electives with an advisor from ARABAM, ASIANPAM, LATINOAM, NATIVEAM, AMCULT/AAS, or approved courses.",
  ], [
    c("Sub-major", "Intro ethnic studies course", ["aas-201", "latinoam-213", "asianpam-214", "arabam-215", "arabam-216", "nativeam-217"]),
    c("Required", "Practices of American Culture", ["amcult-300"]),
    o("Sub-major", "Approved Ethnic Studies courses", 4, "course"),
    o("Breadth", "American Culture breadth areas", 4, "course", "One course in each area on the source page. One course may meet more than one."),
    o("Total", "Total credits toward the 28-credit major", 28, "credits", "Enter your total."),
    c("Required", "Capstone Seminar", ["amcult-498"]),
  ]),
  lsa("lsa-screenwriting", "Screenwriting (sub-major)", "film-television-and-media-major", "Fall 2019", [
    "This is a selective path within the Film, Television, and Media major. Contact the Coordinator of Screenwriting to apply.",
    "If you aren't accepted, these courses still count toward the main major. Complete its other requirements too.",
  ], [
    c("Prerequisites", "Intro to Film, Television, and Media", ["ftvm-150", "ftvm-236"], "C- or better."),
    c("Screenwriting", "FTVM 290", ["ftvm-290"]),
    c("Screenwriting", "FTVM 210", ["ftvm-210"]),
    c("Screenwriting", "FTVM 310", ["ftvm-310"]),
    c("Screenwriting", "FTVM 410", ["ftvm-410"], "B- or better. Needs acceptance."),
    c("Screenwriting", "FTVM 311", ["ftvm-311"], "B or better, as listed on the source page."),
    c("Screenwriting", "FTVM 427 or 423", ["ftvm-427", "ftvm-423"], "B or better. FTVM 423 needs selection as a screenwriter."),
  ]),
  internationalSub("lsa-international-security-norms-and-cooperation-isnc", "International Security, Norms & Cooperation (sub-major)", "ISNC", "12 credits from the approved list, in two or more subjects, with at least one at the 400 level."),
  internationalSub("lsa-political-economy-and-development-ped", "Political Economy & Development (sub-major)", "PED", "12 credits from the approved list, in two or more subjects, with one listed ECON course and one at the 400 level.", [c("Prerequisites", "ECON 101", ["econ-101"], "C or better.")]),
  internationalSub("lsa-comparative-culture-and-identity-cci", "Comparative Culture & Identity (sub-major)", "CCI", "12 credits from the approved list, in two or more subjects, with one Globalization and Culture course and one at the 400 level."),
  internationalSub("lsa-global-environment-and-health-geh", "Global Environment & Health (sub-major)", "GEH", "12 credits from the approved list, in two or more subjects, with at least one at the 400 level."),
  lsa("lsa-gender-and-health", "Gender and Health", "gender-and-health-major", "Summer 2024", [
    "33 credits minimum. The source page lists thematic area courses, electives, and cognates.",
    "At most 6 credits of independent study count, not including the practicum. At least 14 credits must be in residence.",
    "A course can't double-count across thematic areas.",
  ], [
    c("Prerequisites", "Perspectives in Women's Health", ["wgs-220", "nurs-220", "womenstd-220"]),
    c("Core", "Feminist theory seminar", ["wgs-330", "wgs-331", "womenstd-330", "womenstd-331"]),
    o("Core", "Practicum", 1, "course", "Hands-on research or community service, approved by the instructor and undergraduate office."),
    o("Themes", "Thematic area courses", 4, "course", "One in each of four thematic areas."),
    o("Electives", "Electives", 3, "course", "Enough to reach 27 credits, not counting cognates."),
    o("Total", "Total credits toward the 33-credit major", 33, "credits", "Enter your total, including cognates."),
  ]),
  lsa("lsa-cognitive-science", "Cognitive Science", "cognitive-science-major", "Winter 2025", [
    "27 credits minimum across 9 courses, in one track: Computation, Decision, Philosophy, or Language.",
    "Your courses must come from at least three departments. Some track courses have their own prerequisites.",
    "Each track's required courses differ, so check your track on the source page.",
  ], [
    c("Prerequisites", "Introduction to Cognitive Science", ["cogsci-200"], "Complete or be enrolled."),
    o("Track", "Required track courses", 3, "course"),
    o("Track", "Track electives", 4, "course"),
    o("Masterlist", "Masterlist electives", 2, "course"),
  ]),
  lsa("lsa-russian", "Russian", "russian-major", "Winter 2022", [
    "27 credits minimum, in the Language and Literature, Culture, or Heritage Speakers track.",
    "This checklist follows the shared Language and Literature and Culture structure. Heritage speakers: use the source page, as your courses differ.",
    "Start Russian during your first year if you can.",
  ], [
    { ...c("Prerequisites", "First- and second-year Russian", [["russian-101", "russian-102", "russian-201", "russian-202"], ["russian-103", "russian-203"], ["russian-123", "russian-223"]], "Or the equivalent."), sequential: true },
    c("Core", "Third-year Russian", [["russian-301", "russian-302"], ["rclang-323", "russian-302"], ["russian-303"]]),
    c("Core", "Fourth-year Russian", [["russian-401", "russian-402"]]),
    c("Core", "RUSSIAN 451 or 499", ["russian-451", "russian-499"]),
    o("Track", "Track courses", 2, "course", "Language and Literature: RUSSIAN 347 plus 348 or 375, and one course outside the 19th century. Culture: an intro course and two upper-level electives."),
    o("Cognate", "Advanced cognate credits", 3, "credits", "300 level or above."),
  ]),
  lsa("lsa-biophysics-bs", "Biophysics", "biophysics-major", "Winter 2026", [
    "This checklist follows the Biological Physics track, 28 credits minimum. The Structural Biology track differs; see the source page.",
    "The source page lists major exclusions and electives.",
  ], [
    c("Prerequisites", "Calculus I", ["math-115", "math-120"]),
    c("Prerequisites", "Calculus II", ["math-116", "math-121"]),
    c("Prerequisites", "MATH 215 and 216, or CHEM 262", [["math-215", "math-216"], "chem-262"]),
    c("Prerequisites", "Organic chemistry with lab", [["chem-210", "chem-211"]]),
    c("Prerequisites", "CHEM 215", ["chem-215"]),
    c("Prerequisites", "Physics sequence", [["physics-150", "physics-151", "physics-250", "physics-251"], ["physics-140", "physics-141", "physics-240", "physics-241"], ["physics-160", "physics-161", "physics-260", "physics-261"], ["physics-139", "physics-239"]]),
    c("Prerequisites", "Biology", ["biology-172", "biology-174", "biology-191", "biology-192", "biology-195"]),
    c("Core", "Physical and Chemical Principles", ["biophys-370", "chem-370", "physics-370"]),
    c("Core", "Biochemistry", ["chem-351", "biolchem-351", "mcdb-310", "biolchem-415"]),
    c("Core", "Dynamical Processes in Biophysics", ["biophys-417", "chem-417", "physics-417"]),
    c("Core", "Biophysics Laboratory", ["biophys-450", "physics-450"]),
    o("Electives", "Electives", 4, "course", "Four from the source page's list, with two from Biophysics."),
    c("Core", "Senior Seminar", ["biophys-495"]),
  ]),
  major("school-of-information-bachelor-of-science-in-information", "Bachelor of Science in Information", "School of Information", "https://si.umich.edu/programs/degree-programs/bachelor-science-information/bachelor-science-information-curriculum", "UMSI curriculum page; requirements vary by cohort", [
    "120 credits, half upper-level, with 54 from School of Information courses. UMSI courses need a C- or higher, except SI 210, 300, and 390.",
    "You enter as a sophomore or above, with the prerequisites and 24 transferable credits.",
    "Choose the Information Analysis or UX Design pathway. Each has its own required courses and capstone on the source page.",
  ], [
    c("Prerequisites", "SI 101 or equivalent", ["si-101", "eecs-183", "engr-101"], "EECS 183 and ENGR 101 are accepted but don't count toward UMSI credit."),
    c("Prerequisites", "First-year writing", ["english-124", "english-125"], "Or an equivalent."),
    c("Core", "SI 110", ["si-110"]),
    c("Core", "SI 201", ["si-201"], "Waived by EECS 280 or 281 with a C or higher."),
    c("Core", "SI 261", ["si-261"]),
    c("Core", "SI 300", ["si-300"]),
    c("Core", "SI 310", ["si-310"]),
    o("Pathway", "Pathway required courses", 8, "course", "Information Analysis or UX Design, including its choose-two list."),
    c("Pathway", "Capstone course", ["si-485", "si-487"]),
    c("Pathway", "Capstone project", ["si-495", "si-497"]),
    o("Total", "Total School of Information credits", 54, "credits", "Enter your total. Electives fill what's left."),
  ], "General education and electives"),
  major("public-policy-bachelor-of-arts-in-public-policy", "Bachelor of Arts in Public Policy", "Public Policy", "https://fordschool.umich.edu/ba/major", "Ford School BA major page", [
    "Apply during your sophomore year.",
    "You also take an applied-learning course with your cohort. See the source page for details.",
    "PUBPOL 495 is taken in both junior and senior year.",
  ], [
    c("Statistics", "Statistics", ["stats-250", "soc-210"]),
    c("Core", "PUBPOL 320", ["pubpol-320"]),
    c("Core", "PUBPOL 330", ["pubpol-330"]),
    c("Core", "PUBPOL 315", ["pubpol-315"], "Junior year."),
    c("Core", "PUBPOL 474", ["pubpol-474"]),
    o("Core", "PUBPOL 495 seminars", 2, "course", "One in junior year and one in senior year."),
    c("Core", "PUBPOL 479", ["pubpol-479"], "Senior year."),
    o("Electives", "PUBPOL elective credits", 6, "credits", "300 level or higher."),
    o("Focus", "Focus area credits", 12, "credits", "Four upper-level classes in your declared focus."),
  ], "General education and electives"),
  ...[
    ["public-health-ba-in-community-and-global-public-health", "BA in Community and Global Public Health", [c("BA requirements", "PUBHLTH 350", ["pubhlth-350"]), c("BA requirements", "PUBHLTH 360", ["pubhlth-360"])]],
    ["public-health-bs-in-public-health-sciences", "BS in Public Health Sciences", [c("BS requirements", "PUBHLTH 370", ["pubhlth-370"]), c("BS requirements", "PUBHLTH 305, 310, or 311", ["pubhlth-305", "pubhlth-310", "pubhlth-311"])]],
  ].map(([id, name, specific]) => major(id as string, name as string, "Public Health", "https://sph.umich.edu/undergrad/degrees/degree-requirements.html", "School of Public Health requirements for students admitted Fall 2026", [
    "120 credits, with at least 60 upper-level, including 45 from the School of Public Health.",
    "Admission rules are on the School of Public Health's admissions page.",
  ], [
    c("Core", "PUBHLTH 381", ["pubhlth-381"]),
    c("Core", "PUBHLTH 382", ["pubhlth-382"]),
    c("Core", "PUBHLTH 383", ["pubhlth-383"]),
    c("Core", "PUBHLTH 384", ["pubhlth-384"]),
    ...(specific as Requirement[]),
    o("Electives", "Public health elective credits", 18, "credits", "300 level or higher."),
    o("Equity", "Health Equity course", 1, "course", "3 credits."),
    c("Capstone", "PUBHLTH 380", ["pubhlth-380"]),
    c("Capstone", "PUBHLTH 481", ["pubhlth-481"]),
  ], "General education and electives")),
];
