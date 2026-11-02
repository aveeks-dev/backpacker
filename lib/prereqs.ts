// Enforced prerequisites, transcribed from the public Engineering Bulletin.
// Each is an AND of OR-groups. Only the undergraduate path is kept: "or
// graduate standing" alternatives and grade rules aren't modeled. Subjects
// outside this table (MATH, STATS, ECON...) aren't in that source, so nothing
// is known about them, and "unknown" must never be read as "no prerequisites".

export const PREREQ_SOURCE = "https://bulletin.engin.umich.edu/courses/eecs/";

type Prereq = string[][];

const math = (...nums: number[]) => nums.map((n) => `math-${n}`);
const LINEAR = [...math(214, 217, 296, 417, 419), "rob-101"];
const DISCRETE = ["eecs-203", "math-465", "math-565"];
const AFTER_281: Prereq = [["eecs-281"]];
const AFTER_281_OR_291: Prereq = [["eecs-281", "eecs-291"]];
const SYSTEMS: Prereq = [["eecs-281"], ["eecs-370"]];

export const PREREQS: Record<string, Prereq> = {
  "eecs-203": [[...math(115, 116, 119, 120, 121, 156, 175, 176, 185, 186, 214, 215, 216, 217, 255, 256, 285, 286, 295, 296, 417, 419), "rob-201"]],
  "eecs-280": [["engr-101", "engr-151", "eecs-180", "eecs-183", "rob-102"]],
  "eecs-281": [DISCRETE, ["eecs-280"]],
  "eecs-285": [["eecs-280"]],
  "eecs-295": [["eecs-280"]],
  "eecs-370": [["eecs-203", "eecs-270", "math-465", "math-565"], ["eecs-280"]],
  "eecs-376": [["eecs-280"], DISCRETE],
  "eecs-388": AFTER_281,
  "eecs-390": AFTER_281,
  "eecs-404": AFTER_281,
  "eecs-440": AFTER_281,
  "eecs-442": [["eecs-281"], LINEAR],
  "eecs-445": [["eecs-281", "eecs-291"], ["eecs-245", ...LINEAR]],
  "eecs-448": [["eecs-281", "eecs-291"], ["eecs-245", ...LINEAR]],
  "eecs-449": [["eecs-280"]],
  "eecs-470": [["eecs-270"], ["eecs-370"]],
  "eecs-471": SYSTEMS,
  "eecs-475": AFTER_281,
  "eecs-477": AFTER_281,
  "eecs-479": [["eecs-280"], ["eecs-370"]],
  "eecs-481": AFTER_281,
  "eecs-482": SYSTEMS,
  "eecs-483": SYSTEMS,
  "eecs-484": [["eecs-281", "eecs-403"]],
  "eecs-485": AFTER_281,
  "eecs-486": AFTER_281_OR_291,
  "eecs-487": AFTER_281_OR_291,
  "eecs-489": SYSTEMS,
  "eecs-490": AFTER_281,
  "eecs-491": AFTER_281,
  "eecs-492": AFTER_281_OR_291,
  "eecs-493": AFTER_281,
  "eecs-494": AFTER_281,
  "eecs-495": AFTER_281,
  "eecs-497": AFTER_281,
};

export function hasKnownPrereqs(courseId: string): boolean {
  return courseId in PREREQS;
}

/** OR-groups not yet met. Empty when met, or when the prerequisites are unknown. */
export function missingPrereqs(courseId: string, completed: Iterable<string>): string[][] {
  const done = new Set(completed);
  return (PREREQS[courseId] ?? []).filter((group) => !group.some((id) => done.has(id)));
}

/** "eecs-203" -> "EECS 203" */
export function codeOf(id: string): string {
  const i = id.indexOf("-");
  return `${id.slice(0, i).toUpperCase()} ${id.slice(i + 1).toUpperCase()}`;
}

/** "EECS 203 or MATH 465 or MATH 565", shortening very long lists. */
export function describeGroup(group: string[]): string {
  const codes = group.map(codeOf);
  if (codes.length <= 5) return codes.join(" or ");
  return `${codes.slice(0, 3).join(", ")}, or another listed course`;
}

export function describePrereqs(courseId: string): string | null {
  const groups = PREREQS[courseId];
  if (!groups) return null;
  return groups.map((g) => (g.length > 1 && groups.length > 1 ? `(${describeGroup(g)})` : describeGroup(g))).join(" and ");
}
