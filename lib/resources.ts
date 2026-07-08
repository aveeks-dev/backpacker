// Student-facing resources, mapped per subject. Links are limited to
// stable, official UMich destinations so they don't rot.

export type Resource = {
  name: string;
  url: string;
  description: string;
};

// ---------------------------------------------------------------------
// Universal resources — relevant to every student, shown on every subject
// ---------------------------------------------------------------------

export const UNIVERSAL_RESOURCES: Resource[] = [
  {
    name: "Atlas",
    url: "https://atlas.ai.umich.edu",
    description: "Official U-M curriculum data — log in for full course profiles and schedule builder.",
  },
  {
    name: "U-M Library",
    url: "https://www.lib.umich.edu",
    description: "Research guides, course reserves, and librarians for every subject.",
  },
  {
    name: "Office of the Registrar",
    url: "https://ro.umich.edu",
    description: "Registration dates, drop/add deadlines, and academic calendars.",
  },
  {
    name: "CAPS",
    url: "https://caps.umich.edu",
    description: "Counseling and Psychological Services — free and confidential.",
  },
];

// ---------------------------------------------------------------------
// Category resources — attached to subjects by discipline
// ---------------------------------------------------------------------

const SWEETLAND: Resource = {
  name: "Sweetland Center for Writing",
  url: "https://lsa.umich.edu/sweetland",
  description: "Free one-on-one writing help for any course, any stage of a draft.",
};

const SLC: Resource = {
  name: "Science Learning Center",
  url: "https://lsa.umich.edu/slc",
  description: "Study groups and drop-in tutoring for intro science courses.",
};

const MATH_DEPT: Resource = {
  name: "Math Department — tutoring & Math Lab",
  url: "https://lsa.umich.edu/math",
  description: "Free walk-in Math Lab help for 100/200-level math.",
};

const LRC: Resource = {
  name: "Language Resource Center",
  url: "https://lsa.umich.edu/lrc",
  description: "Conversation partners, media, and tools for language learners.",
};

const TBP: Resource = {
  name: "Tau Beta Pi free tutoring",
  url: "https://tbp.engin.umich.edu",
  description: "Free peer tutoring for engineering and lower-division STEM courses.",
};

const ENGIN_ADVISING: Resource = {
  name: "Engineering Advising",
  url: "https://adue.engin.umich.edu",
  description: "College of Engineering academic advising and degree requirements.",
};

const LSA_ADVISING: Resource = {
  name: "LSA Newnan Advising",
  url: "https://lsa.umich.edu/advising",
  description: "Academic advising, degree audits, and requirement planning for LSA.",
};

// ---------------------------------------------------------------------
// School / college home per subject prefix
// ---------------------------------------------------------------------

type SchoolDef = {
  name: string;
  url: string;
  depts: string[];
};

const SCHOOLS: SchoolDef[] = [
  {
    name: "College of Engineering",
    url: "https://www.engin.umich.edu",
    depts: ["AEROSP", "AERO", "AOSS", "AUTO", "BIOMEDE", "CEE", "CHE", "CLIMATE", "EAS", "EECS", "ENGR", "ENTR", "ESENG", "IOE", "MATSCI", "MATSCIE", "FINENG", "MECHENG", "NAVARCH", "NERS", "ROB", "SPACE", "TCHNCLCM", "APPPHYS"],
  },
  {
    name: "Ross School of Business",
    url: "https://michiganross.umich.edu",
    depts: ["ACC", "BBA", "BCOM", "BL", "ES", "FIN", "MKT", "MO", "OMS", "STRATEGY", "TO"],
  },
  {
    name: "School of Music, Theatre & Dance",
    url: "https://smtd.umich.edu",
    depts: ["BASSOON", "CARILLON", "CELLO", "CLARINET", "COMP", "CONDUCT", "DANCE", "EUPHON", "FLUTE", "FRENCHHORN", "GUITAR", "HARP", "HARPSICH", "JAZZ", "JAZZIMP", "MUSED", "MUSIC", "MUSICOL", "MUSPERF", "MUSTHTRE", "MUSTHRY", "ARTSADMN", "OBOE", "ORGAN", "PAT", "PERCUSS", "PIANO", "SAXOPHN", "THTREMUS", "TROMBONE", "TRUMPET", "TUBA", "VIOLA", "VIOLIN", "VOICE", "STRINGS", "WINDS"],
  },
  {
    name: "School of Information",
    url: "https://www.si.umich.edu",
    depts: ["SI", "SIADS"],
  },
  {
    name: "School of Public Health",
    url: "https://sph.umich.edu",
    depts: ["PUBHLTH", "BIOSTAT", "ENVHLTH", "EPID", "EHS", "HMP", "NUTR", "HBEHED"],
  },
  {
    name: "Ford School of Public Policy",
    url: "https://fordschool.umich.edu",
    depts: ["PUBPOL", "PPE"],
  },
  {
    name: "School for Environment & Sustainability",
    url: "https://seas.umich.edu",
    depts: ["SEAS", "ENVIRON", "ENS"],
  },
  {
    name: "Stamps School of Art & Design",
    url: "https://stamps.umich.edu",
    depts: ["ART", "ARTDES", "UARTS"],
  },
  {
    name: "Taubman College of Architecture & Urban Planning",
    url: "https://taubmancollege.umich.edu",
    depts: ["ARCH", "URP"],
  },
  {
    name: "School of Education (Marsal)",
    url: "https://marsal.umich.edu",
    depts: ["EDUC", "EDUCONL"],
  },
  {
    name: "School of Kinesiology",
    url: "https://www.kines.umich.edu",
    depts: ["KINESLGY", "MOVESCI", "AT", "SM", "PHYSED"],
  },
  {
    name: "School of Nursing",
    url: "https://nursing.umich.edu",
    depts: ["NURS", "HS"],
  },
  {
    name: "School of Dentistry",
    url: "https://dent.umich.edu",
    depts: ["DENT", "DENTHYG"],
  },
  {
    name: "College of Pharmacy",
    url: "https://pharmacy.umich.edu",
    depts: ["PHARMACY", "PHARMSCI", "PHRMACOL", "MEDCHEM"],
  },
  {
    name: "School of Social Work",
    url: "https://ssw.umich.edu",
    depts: ["SW"],
  },
  {
    name: "Medical School",
    url: "https://medicine.umich.edu",
    depts: ["MICRBIOL", "PATH", "PHYSIOL", "PIBS", "PSYCHIAT", "CDB", "BIOLCHEM", "IHS"],
  },
];

const WRITING_DEPTS = new Set([
  "ENGLISH", "COMPLIT", "HISTORY", "PHIL", "AMCULT", "CLCIV", "HISTART",
  "JUDAIC", "MEMS", "RELIGION", "WGS", "WOMENSTD", "AAS", "AAAS", "LATINOAM",
  "ANTHRCUL", "SOC", "COMM", "POLSCI", "PSYCH", "GTBOOKS", "HONORS", "RCHUMS",
]);

const SCIENCE_DEPTS = new Set([
  "BIOLOGY", "CHEM", "PHYSICS", "ASTRO", "EARTH", "MCDB", "EEB", "BIOPHYS",
  "STATS", "ANTHRBIO", "COGSCI", "GEOG",
]);

const LANGUAGE_DEPTS = new Set([
  "ARABIC", "ASIANLAN", "DUTCH", "FRENCH", "GERMAN", "GREEK", "GREEKMOD",
  "HEBREW", "HINDI", "INDIC", "ITALIAN", "JAPANESE", "KOREAN", "LATIN",
  "PERSIAN", "POLISH", "PORTUG", "RUSSIAN", "SCAND", "SPANISH", "SWAHILI",
  "TURKISH", "UKR", "URDU", "VIETNAM", "YIDDISH", "RCLANG",
]);

const ENGINEERING_SET = new Set(SCHOOLS[0].depts);

// ---------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------

export function getSchoolForDepartment(dept: string): Resource | null {
  for (const school of SCHOOLS) {
    if (school.depts.includes(dept)) {
      return {
        name: school.name,
        url: school.url,
        description: "The school or college that offers this subject.",
      };
    }
  }
  // LSA is the default home for everything else
  return {
    name: "College of LSA",
    url: "https://lsa.umich.edu",
    description: "The school or college that offers this subject.",
  };
}

export function getSubjectResources(dept: string): Resource[] {
  const out: Resource[] = [];
  const school = getSchoolForDepartment(dept);
  if (school) out.push(school);

  if (ENGINEERING_SET.has(dept)) {
    out.push(ENGIN_ADVISING, TBP);
  } else if (!SCHOOLS.some((s) => s.depts.includes(dept))) {
    out.push(LSA_ADVISING);
  }

  if (dept === "MATH") out.push(MATH_DEPT, SLC);
  else if (SCIENCE_DEPTS.has(dept)) out.push(SLC);
  if (LANGUAGE_DEPTS.has(dept)) out.push(LRC);
  if (WRITING_DEPTS.has(dept)) out.push(SWEETLAND);
  if (dept === "EECS") out.push(TBP); // duplicates removed below

  const seen = new Set<string>();
  return out.filter((r) => {
    if (seen.has(r.url)) return false;
    seen.add(r.url);
    return true;
  });
}

// ---------------------------------------------------------------------
// Human-readable subject names (fallback: the code itself)
// ---------------------------------------------------------------------

export const DEPT_NAMES: Record<string, string> = {
  AAS: "Afroamerican & African Studies",
  ACC: "Accounting",
  AMAS: "Arab and Muslim American Studies",
  BIOINF: "Bioinformatics",
  BIOMATLS: "Biomaterials",
  COMPFOR: "Computing for the Arts & Sciences",
  MUSMETH: "Museum Methods",
  SSEA: "South & Southeast Asian Studies",
  ARCHAM: "Classical Archaeology (Ancient Mediterranean)",
  ARTSADMN: "Arts Administration",
  CHEMBIO: "Chemical Biology",
  EDUCONL: "Education (Online)",
  FINENG: "Financial Engineering",
  MATSCIE: "Materials Science & Engineering",
  SIADS: "Applied Data Science (SI Online)",
  SLAVIC: "Slavic Languages & Literatures",
  AEROSP: "Aerospace Engineering",
  AERO: "Air Force Officer Education",
  ALA: "Applied Liberal Arts",
  AMCULT: "American Culture",
  ANTHRARC: "Anthropological Archaeology",
  ANTHRBIO: "Biological Anthropology",
  ANTHRCUL: "Cultural Anthropology",
  APPPHYS: "Applied Physics",
  ARABIC: "Arabic Studies",
  ARCH: "Architecture",
  ART: "Art & Design",
  ARTDES: "Art & Design",
  ASIAN: "Asian Studies",
  ASIANLAN: "Asian Languages",
  ASIANPAM: "Asian/Pacific Islander American Studies",
  ASTRO: "Astronomy",
  AT: "Athletic Training",
  AUTO: "Automotive Engineering",
  BIO: "Biology (General)",
  BIOLCHEM: "Biological Chemistry",
  BIOLOGY: "Biology",
  BIOMEDE: "Biomedical Engineering",
  BIOPHYS: "Biophysics",
  BIOSTAT: "Biostatistics",
  CDB: "Cell & Developmental Biology",
  CEE: "Civil & Environmental Engineering",
  CHE: "Chemical Engineering",
  CHEM: "Chemistry",
  CLCIV: "Classical Civilization",
  CLIMATE: "Climate & Space Sciences",
  CMPLXSYS: "Complex Systems",
  COGSCI: "Cognitive Science",
  COMM: "Communication & Media",
  COMP: "Music Composition",
  COMPLIT: "Comparative Literature",
  CONDUCT: "Conducting",
  DANCE: "Dance",
  DENT: "Dentistry",
  DENTHYG: "Dental Hygiene",
  DIGITAL: "Digital Studies",
  EARTH: "Earth & Environmental Sciences",
  ECON: "Economics",
  EDUC: "Education",
  EEB: "Ecology & Evolutionary Biology",
  EECS: "Electrical Engineering & Computer Science",
  EHS: "Environmental Health Sciences",
  ENGLISH: "English Language & Literature",
  ENGR: "Engineering (Core)",
  ENS: "Ensemble",
  ENVIRON: "Environment",
  EPID: "Epidemiology",
  FIN: "Finance",
  FRENCH: "French",
  FILMTV: "Film, Television & Media",
  GEOG: "Geography",
  GERMAN: "German",
  GTBOOKS: "Great Books",
  HBEHED: "Health Behavior & Health Education",
  HISTART: "History of Art",
  HISTORY: "History",
  HMP: "Health Management & Policy",
  HONORS: "Honors Program",
  HS: "Health Sciences",
  IHS: "Interprofessional Health Sciences",
  INTLSTD: "International Studies",
  IOE: "Industrial & Operations Engineering",
  ISLAM: "Islamic Studies",
  ITALIAN: "Italian",
  JAZZ: "Jazz Studies",
  JUDAIC: "Judaic Studies",
  KINESLGY: "Kinesiology",
  KOREAN: "Korean Studies",
  LATIN: "Latin",
  LATINOAM: "Latina/o American Studies",
  LING: "Linguistics",
  LSA: "LSA Interdisciplinary",
  MATH: "Mathematics",
  MATSCI: "Materials Science & Engineering",
  MCDB: "Molecular, Cellular & Developmental Biology",
  MECHENG: "Mechanical Engineering",
  MEDCHEM: "Medicinal Chemistry",
  MEMS: "Medieval & Early Modern Studies",
  MENAS: "Middle East & North African Studies",
  MICRBIOL: "Microbiology & Immunology",
  MIDEAST: "Middle East Studies",
  MILSCI: "Military Science (Army ROTC)",
  MKT: "Marketing",
  MO: "Management & Organizations",
  MOVESCI: "Movement Science",
  MUSED: "Music Education",
  MUSIC: "Music",
  MUSICOL: "Musicology",
  MUSPERF: "Music Performance",
  MUSTHTRE: "Musical Theatre",
  MUSTHRY: "Music Theory",
  NAVARCH: "Naval Architecture & Marine Engineering",
  NAVSCI: "Naval Science (Navy ROTC)",
  NERS: "Nuclear Engineering & Radiological Sciences",
  NES: "Near Eastern Studies",
  NURS: "Nursing",
  NUTR: "Nutritional Sciences",
  ORGSTUDY: "Organizational Studies",
  PAT: "Performing Arts Technology",
  PATH: "Pathology",
  PHARMACY: "Pharmacy",
  PHARMSCI: "Pharmaceutical Sciences",
  PHIL: "Philosophy",
  PHRMACOL: "Pharmacology",
  PHYSED: "Physical Education",
  PHYSICS: "Physics",
  PHYSIOL: "Physiology",
  PIBS: "Program in Biomedical Sciences",
  POLSCI: "Political Science",
  PPE: "Philosophy, Politics & Economics",
  PSYCH: "Psychology",
  PSYCHIAT: "Psychiatry",
  PUBHLTH: "Public Health",
  PUBPOL: "Public Policy",
  QMSS: "Quantitative Methods in the Social Sciences",
  RACKHAM: "Rackham Graduate Studies",
  RCARTS: "Residential College — Arts",
  RCCORE: "Residential College — Core",
  RCHUMS: "Residential College — Humanities",
  RCIDIV: "Residential College — Interdivisional",
  RCLANG: "Residential College — Languages",
  RCNSCI: "Residential College — Natural Science",
  RCSSCI: "Residential College — Social Science",
  REEES: "Russian, East European & Eurasian Studies",
  RELIGION: "Religion",
  ROB: "Robotics",
  RUSSIAN: "Russian",
  SEAS: "Environment & Sustainability",
  SI: "Information",
  SM: "Sport Management",
  SOC: "Sociology",
  SPACE: "Space Sciences & Engineering",
  SPANISH: "Spanish",
  STATS: "Statistics",
  STRATEGY: "Business Strategy",
  SW: "Social Work",
  THTREMUS: "Theatre & Drama",
  TO: "Technology & Operations",
  UARTS: "Arts Interdisciplinary",
  URP: "Urban & Regional Planning",
  WGS: "Women's & Gender Studies",
};

export function getDeptName(dept: string): string {
  return DEPT_NAMES[dept] ?? dept;
}
