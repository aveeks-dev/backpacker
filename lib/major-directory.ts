// Every undergraduate program, from official U-M lists. Each links to its own
// requirements. Programs with a matching entry in lib/majors.ts also get a
// full requirement checklist and roadmap.

import directory from "../data/majors-directory.json";
import { getMajor } from "./majors";

export type Program = {
  id: string;
  name: string;
  school: string;
  url: string;
  subject?: string;
};

export const PROGRAMS = directory as Program[];

export function getProgram(id: string | null | undefined): Program | undefined {
  return PROGRAMS.find((p) => p.id === id);
}

export function hasFullPlan(program: Program): boolean {
  return getMajor(program.id) !== undefined;
}

// Short names students type for majors.
const ALIASES: Record<string, string> = {
  cs: "computer science",
  ce: "computer engineering",
  ee: "electrical engineering",
  me: "mechanical engineering",
  ioe: "industrial operations engineering",
  bme: "biomedical engineering",
  aero: "aerospace engineering",
  ds: "data science",
  bba: "business administration",
  ross: "business administration",
  polisci: "political science",
  bcn: "biopsychology cognition neuroscience",
  neuro: "neuroscience",
  psych: "psychology",
  math: "mathematics",
  stats: "statistics",
  chem: "chemistry",
};

const words = (text: string) => text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);

/** Every query word starts some word of the program's name or school. */
function matches(program: Program, query: string): boolean {
  const haystack = words(`${program.name} ${program.school}`);
  return words(query).every((q) => haystack.some((w) => w.startsWith(q)));
}

export function searchPrograms(query: string): Program[] {
  const q = query.trim().toLowerCase();
  if (!q) return [...PROGRAMS].sort((a, b) => Number(hasFullPlan(b)) - Number(hasFullPlan(a)) || a.name.localeCompare(b.name));
  const alias = ALIASES[q.replace(/\s+/g, "")];
  const found = PROGRAMS.filter((p) => matches(p, q) || (alias !== undefined && matches(p, alias)));
  // Names that start with the query first, then programs with a full plan.
  const rank = (p: Program) => (p.name.toLowerCase().startsWith(q) || (alias && p.name.toLowerCase().startsWith(alias)) ? 0 : 1);
  return found.sort(
    (a, b) => rank(a) - rank(b) || Number(hasFullPlan(b)) - Number(hasFullPlan(a)) || a.name.localeCompare(b.name),
  );
}
