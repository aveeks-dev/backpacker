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

export function searchPrograms(query: string): Program[] {
  const q = query.trim().toLowerCase();
  const matches = q
    ? PROGRAMS.filter((p) => `${p.name} ${p.school}`.toLowerCase().includes(q))
    : PROGRAMS;
  return [...matches].sort(
    (a, b) => Number(hasFullPlan(b)) - Number(hasFullPlan(a)) || a.name.localeCompare(b.name),
  );
}
