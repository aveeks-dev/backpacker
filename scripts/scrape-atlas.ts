// Refreshes data/catalog.json from Atlas's public, no-login course endpoint.
//
//   npm run scrape:catalog                          // every known subject
//   npm run scrape:catalog -- --departments EECS MATH
//
// Subjects come from the current term's schedule, the existing catalog and
// OTHER_SUBJECTS, so new ones are picked up when the schedule is re-imported.
//
// Atlas caps results at 100 per query, ranked by an opaque relevance signal,
// so each subject gets a bare pass and one per digit, and any pass that is
// full of matches is narrowed by another digit. Results merge over the existing
// catalog, so a course Atlas stops returning is kept and reported. An HTTP error
// or a second dropped connection stops the run: what was fetched so far is saved
// and the exit code is 1.

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ATLAS_BASE = "https://atlas.ai.umich.edu/api/courses";
const USER_AGENT = "Mozilla/5.0 (compatible; Backpacker scraper; +https://github.com/aveeks-dev/backpacker)";
const RATE_LIMIT_MS = 150;
const PAGE_CAP = 100;
const NARROW_AT = 25; // hits on the number prefix in a full page; ranking isn't strictly prefix-first
const RETRY_AFTER_MS = 30_000;
const MAX_NUMBER_DIGITS = 3;
const DIGITS = "0123456789".split("");

// Subjects that may not be offered this term. No need to add to this by hand.
const OTHER_SUBJECTS = [
  "AAAS", "AAS", "AMCULT", "ANTHRARC", "ANTHRBIO", "ANTHRCUL", "APTIS", "ARABIC", "ARMENIAN", "ASIAN",
  "ASIANLAN", "ASIANPAM", "ASTRO", "BIOLOGY", "BIOPHYS", "CHEM", "CICS", "CLARCH", "CLCIV", "CLLANG",
  "COMM", "COMPLIT", "DUTCH", "EARTH", "ECON", "EEB", "ENGLISH", "ENS", "ENVIRON", "FILMTV", "FTVM",
  "FRENCH", "GERMAN", "GREEK", "GREEKMOD", "HEBREW", "HINDI", "HISTART", "HISTORY", "HONORS", "INDIC",
  "ITALIAN", "JAPANESE", "JUDAIC", "KOREAN", "LACS", "LATIN", "LATINOAM", "LING", "LSA", "MATH", "MCDB",
  "MEMS", "MIDEAST", "MUSICOL", "NES", "PERSIAN", "PHIL", "PHYSICS", "POLISH", "POLSCI", "PORTUG", "PSYCH",
  "RCARTS", "RCCORE", "RCHUMS", "RCLANG", "RCNSCI", "RCSSCI", "RELIGION", "ROMLANG", "ROMLING", "RUSSIAN",
  "SAS", "SCAND", "SLAVIC", "SOC", "SPANISH", "STATS", "STDABRD", "SWAHILI", "TURKISH", "UC", "UKR", "URDU",
  "VIETNAM", "WGS", "WOMENSTD", "YIDDISH", "AERO", "AEROSP", "AOSS", "APPPHYS", "AUTO", "BIOMEDE", "CEE",
  "CHE", "CLIMATE", "EAS", "EECS", "ENGR", "ENTR", "ESENG", "IOE", "MATSCI", "MECHENG", "NAVARCH", "NAVSCI",
  "NERS", "PHYSED", "ROB", "SI", "SPACE", "TCHNCLCM", "ACC", "BBA", "BCOM", "BL", "ES", "FIN", "MKT", "MO",
  "OMS", "STRATEGY", "TO", "ART", "ARTDES", "BASSOON", "CARILLON", "CELLO", "CLARINET", "COMP", "CONDUCT",
  "DANCE", "EUPHON", "FLUTE", "FRENCHHORN", "GUITAR", "HARP", "HARPSICH", "JAZZ", "JAZZIMP", "MUSED", "MUSIC",
  "MUSMETH", "MUSPERF", "MUSTHRY", "MUSTHTRE", "OBOE", "ORGAN", "PAT", "PIANO", "PERCUSS", "SAXOPHN", "TUBA",
  "THTREMUS", "TRUMPET", "TROMBONE", "VIOLA", "VIOLIN", "VOICE", "ARCH", "DENT", "DENTHYG", "EDUC", "HS",
  "IHS", "KINESLGY", "MOVESCI", "AT", "SM", "NURS", "PHARMACY", "PHARMSCI", "PHRMACOL", "MEDCHEM", "PUBPOL",
  "PUBHLTH", "SEAS", "SW", "URP", "MILSCI", "BIOSTAT", "ENVHLTH", "EPID", "EHS", "HBEHED", "HMP", "NUTR",
  "CDB", "MICRBIOL", "PATH", "PHYSIOL", "PIBS", "PSYCHIAT", "RACKHAM", "ALA", "AMAS", "BIO", "CMPLXSYS",
  "COGSCI", "DIGITAL", "GEOG", "GTBOOKS", "INTLSTD", "ISLAM", "MENAS", "ORGSTUDY", "PPE", "QMSS", "RCIDIV",
  "REEES", "SSEA", "UARTS",
];

type AtlasCourse = { course_code_spaced?: string; title?: string };
type CatalogEntry = { id: string; code: string; title: string; department: string };

class Refused extends Error {}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let queriesMade = 0;

function request(term: string): Promise<Response> {
  queriesMade++;
  return fetch(`${ATLAS_BASE}?${new URLSearchParams({ search: term })}`, {
    headers: { "User-Agent": USER_AGENT },
    signal: AbortSignal.timeout(30_000),
  });
}

async function fetchSearch(term: string): Promise<AtlasCourse[]> {
  let response: Response;
  try {
    response = await request(term);
  } catch {
    await sleep(RETRY_AFTER_MS);
    try {
      response = await request(term);
    } catch (err) {
      throw new Refused(`"${term}": ${err}`);
    }
  }
  if (!response.ok) throw new Refused(`"${term}": HTTP ${response.status}`);
  const data: unknown = await response.json().catch(() => null);
  if (!Array.isArray(data)) throw new Refused(`"${term}": response isn't a course list`);
  await sleep(RATE_LIMIT_MS);
  return data;
}

function toEntry(course: AtlasCourse): CatalogEntry | null {
  const [department, number, ...rest] = (course.course_code_spaced ?? "").split(" ");
  if (!department || !number || rest.length) return null;
  // Lowercase the whole id: the schedule's are "dent-520a", Atlas's code "DENT 520A".
  return { id: `${department}-${number}`.toLowerCase(), code: `${department} ${number}`, title: course.title ?? "", department };
}

/** Runs one query for a subject, narrowing by another digit while pages are full of matches. */
async function search(department: string, number: string, found: Map<string, CatalogEntry>): Promise<void> {
  const results = await fetchSearch(number ? `${department} ${number}` : department);
  let matches = 0;
  for (const course of results) {
    const entry = toEntry(course);
    if (entry?.department !== department) continue;
    if (entry.code.startsWith(`${department} ${number}`)) matches++;
    found.set(entry.id, entry);
  }
  const truncated = results.length >= PAGE_CAP && matches >= NARROW_AT;
  if (number.length === 0 || (truncated && number.length < MAX_NUMBER_DIGITS)) {
    for (const digit of DIGITS) await search(department, number + digit, found);
  }
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const catalogPath = join(root, "data", "catalog.json");
const schedulePath = join(root, "data", "schedule", "WN2027.json");
const catalog = JSON.parse(readFileSync(catalogPath, "utf8")) as CatalogEntry[];
const schedule = JSON.parse(readFileSync(schedulePath, "utf8")) as { courses: { department: string }[] };

const args = process.argv.slice(2);
const flag = args.indexOf("--departments");
const subjects = flag !== -1
  ? args.slice(flag + 1)
  : [...new Set([...schedule.courses.map((c) => c.department), ...catalog.map((c) => c.department), ...OTHER_SUBJECTS])].sort();

const merged = new Map(catalog.map((c) => [c.id, c]));
const seen = new Set<string>();
const completed = new Set<string>();
let refused: string | null = null;

console.log(`Scraping ${subjects.length} subjects`);
for (const [i, department] of subjects.entries()) {
  const found = new Map<string, CatalogEntry>();
  const before = queriesMade;
  try {
    await search(department, "", found);
  } catch (err) {
    if (!(err instanceof Refused)) throw err;
    refused = err.message;
  }
  for (const [id, entry] of found) {
    if (!merged.has(id)) console.log(`  new: ${entry.code}`);
    merged.set(id, entry);
    seen.add(id);
  }
  if (refused) break;
  completed.add(department);
  console.log(`[${i + 1}/${subjects.length}] ${department}: ${found.size} courses (${queriesMade - before} queries)`);
}

const output = [...merged.values()].sort((a, b) => (a.code < b.code ? -1 : a.code > b.code ? 1 : 0));
writeFileSync(catalogPath, JSON.stringify(output) + "\n");

const kept = catalog.filter((c) => completed.has(c.department) && !seen.has(c.id));
console.log(`\n${queriesMade} queries, ${completed.size}/${subjects.length} subjects complete`);
console.log(`Catalog: ${catalog.length} -> ${output.length} courses`);
if (kept.length) console.log(`Kept ${kept.length} courses Atlas no longer returned: ${kept.map((c) => c.code).join(", ")}`);
if (refused) {
  console.error(`Stopped because Atlas refused a request: ${refused}`);
  process.exit(1);
}
