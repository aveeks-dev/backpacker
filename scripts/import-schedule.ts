// Converts a Registrar "All classes" CSV into data/schedule/<term>.json.
//
// The CSVs sit behind UMich Weblogin, so download one yourself from
// https://ro.umich.edu/calendars/schedule-of-classes, then run:
//
//   npm run import:schedule -- path/to/WN2027.csv
//
// The term name is taken from the file name (WN2027.csv -> WN2027) unless
// --term is given.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseScheduleCsv } from "../lib/registrar.ts";

function usage(): never {
  console.error("Usage: npm run import:schedule -- <path/to/TERM.csv> [--term WN2027]");
  process.exit(1);
}

const args = process.argv.slice(2);
const termFlag = args.indexOf("--term");
const term = termFlag !== -1 ? args[termFlag + 1] : undefined;
const csvPath = args.find((a, i) => !a.startsWith("--") && args[i - 1] !== "--term");
if (!csvPath) usage();

const termName = (term ?? basename(csvPath).replace(/\.csv$/i, "")).toUpperCase();
if (!/^(FA|WN|SP|SU|SS)\d{4}$/.test(termName)) {
  console.error(`Can't tell the term from "${termName}". Pass --term, e.g. --term WN2027.`);
  process.exit(1);
}

const text = readFileSync(csvPath, "utf8");
if (/^\s*<(!doctype|html)/i.test(text)) {
  console.error(
    "That file is an HTML page, not a CSV. The Registrar site needs you to be " +
    "logged in to UMich; download the CSV from your browser instead.",
  );
  process.exit(1);
}

const { courses, rowCount, warnings } = parseScheduleCsv(text);

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "data", "schedule");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, `${termName}.json`);
writeFileSync(outPath, JSON.stringify({ term: termName, courses }) + "\n");

const sectionCount = courses.reduce((n, c) => n + c.sections.length, 0);
const timed = courses.reduce(
  (n, c) => n + c.sections.filter((s) => s.meetings.length > 0).length,
  0,
);
console.log(`${termName}: ${rowCount} rows -> ${courses.length} courses, ${sectionCount} sections (${timed} with meeting times)`);
console.log(`Wrote ${outPath}`);
if (warnings.length) {
  console.warn(`\n${warnings.length} warning(s):`);
  for (const w of warnings.slice(0, 20)) console.warn(`  ${w}`);
  if (warnings.length > 20) console.warn(`  ...and ${warnings.length - 20} more`);
}
