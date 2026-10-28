// Generates conflict-free weekly schedules from Registrar section data.
//
// For each course we build "bundles": one section from every required
// component (LEC + LAB, LEC + DIS, ...), respecting UMich's section-number
// linking. Bundles with identical meeting times are merged, then a
// backtracking search picks one bundle per course, pruning on time
// conflicts with a per-day bitset. Results are ranked by user preferences.
// Imports must stay relative (no "@/") so plain Node can run the tests.

import type { Day, ScheduleCourse, ScheduleMeeting, ScheduleSection } from "./registrar.ts";

// Components that are not regular class meetings (exam slots, independent
// study placeholders) and should not be scheduled.
const SKIPPED_COMPONENTS = new Set(["MID", "IND"]);

const WEEK: Day[] = ["M", "T", "W", "Th", "F", "S", "Su"];
const SLOT_MINUTES = 5;
const SLOTS_PER_DAY = (24 * 60) / SLOT_MINUTES; // 288
const WORDS_PER_DAY = Math.ceil(SLOTS_PER_DAY / 32); // 9
const MASK_WORDS = WORDS_PER_DAY * WEEK.length;

export type Interval = { day: Day; start: number; end: number }; // minutes from midnight

export type Bundle = {
  courseId: string;
  // Each alternative is one set of sections (one per component). All
  // alternatives in a bundle meet at exactly the same times.
  alternatives: ScheduleSection[][];
  intervals: Interval[];
  mask: Uint32Array;
};

export type Preferences = {
  earliestStart?: string; // "HH:MM": hard limit, no class starts before this
  latestEnd?: string; // "HH:MM": hard limit, no class ends after this
  daysOff?: Day[]; // hard limit, no classes on these days
  // Soft preferences, used for ranking.
  preferLateStart?: boolean;
  minimizeGaps?: boolean;
  minimizeDays?: boolean;
};

export type GeneratedSchedule = {
  bundles: Bundle[];
  score: number;
  stats: { days: number; gapMinutes: number; earliestStart: number; latestEnd: number };
};

export type GenerateResult = {
  schedules: GeneratedSchedule[];
  explored: number; // complete schedules found before ranking
  truncated: boolean; // stopped at maxExplored
  // Courses that have no valid option on their own (e.g. every section
  // breaks a hard limit, or every lecture/lab pairing overlaps).
  impossible: string[];
};

export type GenerateOptions = {
  preferences?: Preferences;
  // Restrict a course to these section numbers ("001", "011", ...).
  allowedSections?: Record<string, string[]>;
  maxExplored?: number;
  limit?: number;
};

export function toMinutes(clock: string): number {
  const [h, m] = clock.split(":").map(Number);
  return h * 60 + m;
}

function meetingIntervals(meetings: ScheduleMeeting[]): Interval[] {
  return meetings.flatMap((m) =>
    m.days.map((day) => ({ day, start: toMinutes(m.start), end: toMinutes(m.end) })),
  );
}

function buildMask(intervals: Interval[]): Uint32Array {
  const mask = new Uint32Array(MASK_WORDS);
  for (const { day, start, end } of intervals) {
    const base = WEEK.indexOf(day) * WORDS_PER_DAY * 32;
    const first = Math.floor(start / SLOT_MINUTES);
    const last = Math.ceil(end / SLOT_MINUTES); // exclusive
    for (let s = first; s < last; s++) {
      const bit = base + s;
      mask[bit >>> 5] |= 1 << (bit & 31);
    }
  }
  return mask;
}

function overlaps(a: Uint32Array, b: Uint32Array): boolean {
  for (let i = 0; i < MASK_WORDS; i++) if (a[i] & b[i]) return true;
  return false;
}

/**
 * UMich links secondary sections to a lecture by section number: lecture
 * 010 owns 011-019, lecture 100 owns 101-199. Lectures numbered 001, 002,
 * ... don't own anything, and any secondary section works with any of
 * them. Returns null when the course doesn't follow the linked pattern.
 */
function linkGroup(primaryNumber: string): string | null {
  if (primaryNumber.endsWith("00")) return primaryNumber.slice(0, -2);
  if (primaryNumber.endsWith("0")) return primaryNumber.slice(0, -1);
  return null;
}

function belongsTo(sectionNumber: string, group: string): boolean {
  return sectionNumber.length === 3 && sectionNumber.startsWith(group);
}

/** Every valid combination of one section per component, before merging. */
function sectionCombos(course: ScheduleCourse, allowed?: string[]): ScheduleSection[][] {
  const sections = course.sections.filter(
    (s) => !SKIPPED_COMPONENTS.has(s.component) && (!allowed || allowed.includes(s.number)),
  );
  const byComponent = new Map<string, ScheduleSection[]>();
  for (const s of sections) {
    if (!byComponent.has(s.component)) byComponent.set(s.component, []);
    byComponent.get(s.component)!.push(s);
  }
  if (byComponent.size === 0) return [];

  // The lecture (or whichever component comes first) anchors linking.
  const components = [...byComponent.keys()].sort((a, b) =>
    a === "LEC" ? -1 : b === "LEC" ? 1 : a.localeCompare(b),
  );
  const [primary, ...secondary] = components;
  const primaries = byComponent.get(primary)!;

  // Linking applies only if every primary has a group and every secondary
  // section falls into one of those groups.
  const groups = primaries.map((p) => linkGroup(p.number));
  const linked =
    secondary.length > 0 &&
    groups.every((g) => g !== null) &&
    secondary.every((comp) =>
      byComponent.get(comp)!.every((s) => groups.some((g) => belongsTo(s.number, g!))),
    );

  const combos: ScheduleSection[][] = [];
  for (let i = 0; i < primaries.length; i++) {
    const p = primaries[i];
    let partial: ScheduleSection[][] = [[p]];
    for (const comp of secondary) {
      const options = byComponent.get(comp)!.filter((s) => !linked || belongsTo(s.number, groups[i]!));
      partial = partial.flatMap((combo) => options.map((s) => [...combo, s]));
    }
    combos.push(...partial);
  }
  return combos;
}

function violatesHardLimits(intervals: Interval[], prefs: Preferences): boolean {
  const earliest = prefs.earliestStart ? toMinutes(prefs.earliestStart) : -1;
  const latest = prefs.latestEnd ? toMinutes(prefs.latestEnd) : Infinity;
  const off = new Set(prefs.daysOff ?? []);
  return intervals.some((iv) => iv.start < earliest || iv.end > latest || off.has(iv.day));
}

function intervalKey(intervals: Interval[]): string {
  return intervals
    .map((iv) => `${iv.day}${iv.start}-${iv.end}`)
    .sort()
    .join(",");
}

/** All distinct ways to take one course, merged by identical meeting times. */
export function buildBundles(
  course: ScheduleCourse,
  prefs: Preferences = {},
  allowed?: string[],
): Bundle[] {
  const byTimes = new Map<string, Bundle>();
  for (const combo of sectionCombos(course, allowed)) {
    const intervals = combo.flatMap((s) => meetingIntervals(s.meetings));
    if (violatesHardLimits(intervals, prefs)) continue;
    const mask = buildMask(intervals);
    // Drop combos whose own sections overlap (lecture clashing with its lab).
    const parts = combo.map((s) => buildMask(meetingIntervals(s.meetings)));
    let selfConflict = false;
    for (let i = 0; i < parts.length && !selfConflict; i++)
      for (let j = i + 1; j < parts.length && !selfConflict; j++)
        selfConflict = overlaps(parts[i], parts[j]);
    if (selfConflict) continue;

    const key = intervalKey(intervals);
    const existing = byTimes.get(key);
    if (existing) existing.alternatives.push(combo);
    else byTimes.set(key, { courseId: course.id, alternatives: [combo], intervals, mask });
  }
  return [...byTimes.values()];
}

function scheduleStats(bundles: Bundle[]): GeneratedSchedule["stats"] {
  const byDay = new Map<Day, Interval[]>();
  for (const b of bundles)
    for (const iv of b.intervals) {
      if (!byDay.has(iv.day)) byDay.set(iv.day, []);
      byDay.get(iv.day)!.push(iv);
    }
  let gapMinutes = 0;
  let earliestStart = Infinity;
  let latestEnd = -Infinity;
  for (const ivs of byDay.values()) {
    ivs.sort((a, b) => a.start - b.start);
    for (let i = 1; i < ivs.length; i++) gapMinutes += Math.max(0, ivs[i].start - ivs[i - 1].end);
    earliestStart = Math.min(earliestStart, ivs[0].start);
    latestEnd = Math.max(latestEnd, ...ivs.map((iv) => iv.end));
  }
  return {
    days: byDay.size,
    gapMinutes,
    earliestStart: Number.isFinite(earliestStart) ? earliestStart : 0,
    latestEnd: Number.isFinite(latestEnd) ? latestEnd : 0,
  };
}

/** Lower is better. */
function scoreSchedule(stats: GeneratedSchedule["stats"], bundles: Bundle[], prefs: Preferences): number {
  let score = 0;
  if (prefs.minimizeGaps) score += stats.gapMinutes;
  if (prefs.minimizeDays) score += stats.days * 120;
  if (prefs.preferLateStart) {
    // Penalize every class-day minute before 10am.
    for (const b of bundles) for (const iv of b.intervals) score += Math.max(0, 600 - iv.start) * 2;
  }
  return score;
}

export function generateSchedules(courses: ScheduleCourse[], options: GenerateOptions = {}): GenerateResult {
  const prefs = options.preferences ?? {};
  const maxExplored = options.maxExplored ?? 500_000;
  const limit = options.limit ?? 50;

  const perCourse = courses.map((c) => ({
    course: c,
    bundles: buildBundles(c, prefs, options.allowedSections?.[c.id]),
  }));
  const impossible = perCourse.filter((p) => p.bundles.length === 0).map((p) => p.course.id);
  if (impossible.length) return { schedules: [], explored: 0, truncated: false, impossible };

  // Fewest options first: conflicts surface early and prune more.
  perCourse.sort((a, b) => a.bundles.length - b.bundles.length);

  // Only the best `limit` schedules are kept, sorted best-first, so memory
  // stays flat even when hundreds of thousands of schedules are valid.
  const best: GeneratedSchedule[] = [];
  const better = (a: GeneratedSchedule, b: GeneratedSchedule) =>
    a.score - b.score || a.stats.gapMinutes - b.stats.gapMinutes;
  const chosen: Bundle[] = [];
  const occupied = new Uint32Array(MASK_WORDS);
  let explored = 0;
  let truncated = false;

  const search = (depth: number) => {
    if (truncated) return;
    if (depth === perCourse.length) {
      explored++;
      const stats = scheduleStats(chosen);
      const candidate = { bundles: chosen, stats, score: scoreSchedule(stats, chosen, prefs) };
      if (best.length < limit || better(candidate, best[best.length - 1]) < 0) {
        let i = best.length;
        while (i > 0 && better(candidate, best[i - 1]) < 0) i--;
        best.splice(i, 0, { ...candidate, bundles: [...chosen] });
        if (best.length > limit) best.pop();
      }
      if (explored >= maxExplored) truncated = true;
      return;
    }
    for (const bundle of perCourse[depth].bundles) {
      if (overlaps(occupied, bundle.mask)) continue;
      for (let i = 0; i < MASK_WORDS; i++) occupied[i] |= bundle.mask[i];
      chosen.push(bundle);
      search(depth + 1);
      chosen.pop();
      for (let i = 0; i < MASK_WORDS; i++) occupied[i] &= ~bundle.mask[i];
      if (truncated) return;
    }
  };
  search(0);

  // Present bundles in the order the user listed their courses.
  const order = new Map(courses.map((c, i) => [c.id, i]));
  const schedules = best.map((s) => ({
    ...s,
    bundles: [...s.bundles].sort((a, b) => order.get(a.courseId)! - order.get(b.courseId)!),
  }));
  return { schedules, explored, truncated, impossible: [] };
}
