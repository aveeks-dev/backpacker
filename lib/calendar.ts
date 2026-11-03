// Hand-built weekly calendar: the sections a student picked, their own busy
// times, conflicts between them, and an .ics export for Google, Apple, or
// Outlook calendars. Imports must stay relative (no "@/") so plain Node can
// run the tests.

import type { Day, ScheduleSection } from "./registrar.ts";
import { buildBundles, toMinutes, type SchedulableCourse } from "./scheduler.ts";

/** Winter 2027 dates from the Registrar's 2026-2027 academic calendar. */
export const TERM_DATES = {
  label: "Winter 2027",
  firstDay: "2027-01-13",
  lastDay: "2027-04-27",
  // The end of the last day of classes, 11:59:59pm EDT, in UTC as RFC 5545 requires.
  untilUtc: "20270428T035959Z",
  // MLK Day, and the weekdays of spring break (March 6-14).
  noClasses: ["2027-01-18", "2027-03-08", "2027-03-09", "2027-03-10", "2027-03-11", "2027-03-12"],
  source: "https://ro.umich.edu/calendars",
};

/** A student's own time: work, practice, a club meeting. */
export type TimeBlock = { id: string; label: string; days: Day[]; start: string; end: string };

/** Section numbers picked for each course id. */
export type Picks = Record<string, string[]>;

/** One meeting on one day, for drawing and conflict checks. */
export type CalendarItem = {
  key: string;
  owner: string; // course id, or block id
  kind: "section" | "block";
  day: Day;
  start: number; // minutes from midnight
  end: number;
};

const SKIPPED = new Set(["MID", "IND"]);

/** Components a student has to pick one section of, lecture first. */
export function requiredComponents(course: SchedulableCourse): string[] {
  const components = new Set(course.sections.filter((s) => !SKIPPED.has(s.component)).map((s) => s.component));
  return [...components].sort((a, b) => (a === "LEC" ? -1 : b === "LEC" ? 1 : a.localeCompare(b)));
}

export function pickedSections(course: SchedulableCourse, picks: Picks): ScheduleSection[] {
  const numbers = picks[course.id] ?? [];
  return course.sections.filter((s) => numbers.includes(s.number));
}

/** Picks a section, replacing any other section of the same component. */
export function pickSection(course: SchedulableCourse, picks: Picks, section: ScheduleSection): Picks {
  const kept = pickedSections(course, picks).filter((s) => s.component !== section.component).map((s) => s.number);
  return { ...picks, [course.id]: [...kept, section.number] };
}

export function unpickSection(courseId: string, picks: Picks, number: string): Picks {
  const next = { ...picks, [courseId]: (picks[courseId] ?? []).filter((n) => n !== number) };
  if (next[courseId].length === 0) delete next[courseId];
  return next;
}

/**
 * Every valid way to take the course, as section numbers, following UMich's
 * linking rules (lecture 010 owns labs 011-019). Linking is decided from the
 * whole course, so this has to see every section.
 */
export function courseCombos(course: SchedulableCourse): string[][] {
  return buildBundles(course).flatMap((b) => b.alternatives.map((alt) => alt.map((s) => s.number)));
}

const fitsSomeCombo = (combos: string[][], numbers: string[]) => combos.some((combo) => numbers.every((n) => combo.includes(n)));

/** Whether a section can be taken with the course's other picked sections. */
export function pairsWithPicks(course: SchedulableCourse, picks: Picks, section: ScheduleSection, combos = courseCombos(course)): boolean {
  const others = pickedSections(course, picks).filter((s) => s.component !== section.component).map((s) => s.number);
  return fitsSomeCombo(combos, [...others, section.number]);
}

/** Components still missing a pick, and whether the picks pair correctly. */
export function courseStatus(course: SchedulableCourse, picks: Picks, combos = courseCombos(course)): { missing: string[]; linked: boolean } {
  const picked = pickedSections(course, picks);
  const have = new Set(picked.map((s) => s.component));
  const missing = requiredComponents(course).filter((c) => !have.has(c));
  const linked = picked.length === 0 || fitsSomeCombo(combos, picked.map((s) => s.number));
  return { missing, linked };
}

export function sectionItems(courseId: string, section: ScheduleSection): CalendarItem[] {
  return section.meetings.flatMap((m, mi) =>
    m.days.map((day) => ({
      key: `${courseId}-${section.number}-${mi}-${day}`,
      owner: courseId,
      kind: "section" as const,
      day,
      start: toMinutes(m.start),
      end: toMinutes(m.end),
    })),
  );
}

export function blockItems(block: TimeBlock): CalendarItem[] {
  return block.days.map((day) => ({
    key: `${block.id}-${day}`,
    owner: block.id,
    kind: "block" as const,
    day,
    start: toMinutes(block.start),
    end: toMinutes(block.end),
  }));
}

/** Keys of items that overlap an item from something else. */
export function conflictingKeys(items: CalendarItem[]): Set<string> {
  const keys = new Set<string>();
  for (let i = 0; i < items.length; i++)
    for (let j = i + 1; j < items.length; j++) {
      const a = items[i];
      const b = items[j];
      if (a.day === b.day && a.owner !== b.owner && a.start < b.end && b.start < a.end) {
        keys.add(a.key);
        keys.add(b.key);
      }
    }
  return keys;
}

/** "4" -> [4, 4], "1-3" -> [1, 3]; unknown counts as 0. */
export function creditRange(credits: string | null): [number, number] {
  const [lo, hi] = (credits ?? "").split("-").map((v) => parseFloat(v));
  if (!Number.isFinite(lo)) return [0, 0];
  return [lo, Number.isFinite(hi) ? hi : lo];
}

export function weekStats(items: CalendarItem[]): { classMinutes: number; days: number } {
  const sections = items.filter((i) => i.kind === "section");
  return {
    classMinutes: sections.reduce((sum, i) => sum + (i.end - i.start), 0),
    days: new Set(sections.map((i) => i.day)).size,
  };
}

// ----- .ics export -----

export type IcsEvent = { title: string; location: string; description: string; days: Day[]; start: string; end: string };

const ICS_DAYS: Record<Day, string> = { Su: "SU", M: "MO", T: "TU", W: "WE", Th: "TH", F: "FR", S: "SA" };
const DAY_INDEX: Record<Day, number> = { Su: 0, M: 1, T: 2, W: 3, Th: 4, F: 5, S: 6 };

// Ann Arbor's time zone, so events stay at the right local time across the
// March daylight saving change.
const VTIMEZONE = [
  "BEGIN:VTIMEZONE",
  "TZID:America/Detroit",
  "BEGIN:DAYLIGHT",
  "TZOFFSETFROM:-0500",
  "TZOFFSETTO:-0400",
  "TZNAME:EDT",
  "DTSTART:19700308T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU",
  "END:DAYLIGHT",
  "BEGIN:STANDARD",
  "TZOFFSETFROM:-0400",
  "TZOFFSETTO:-0500",
  "TZNAME:EST",
  "DTSTART:19701101T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU",
  "END:STANDARD",
  "END:VTIMEZONE",
];

const compactDate = (iso: string) => iso.replace(/-/g, "");
const compactTime = (clock: string) => clock.replace(":", "").padStart(4, "0") + "00";

function escapeText(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
}

/** Lines longer than 75 octets continue on the next line, per RFC 5545. */
function fold(line: string): string {
  const parts: string[] = [];
  let current = "";
  let bytes = 0;
  for (const ch of line) {
    const size = new TextEncoder().encode(ch).length;
    if (bytes + size > 75) {
      parts.push(current);
      current = " ";
      bytes = 1;
    }
    current += ch;
    bytes += size;
  }
  parts.push(current);
  return parts.join("\r\n");
}

function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

const weekday = (iso: string) => new Date(`${iso}T12:00:00Z`).getUTCDay();

/** Weekly events from the first day of classes to the last, skipping breaks. */
export function buildIcs(events: IcsEvent[], term = TERM_DATES, stamp = new Date()): string {
  const dtstamp = stamp.toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Backpacker//UMich course planner//EN", "CALSCALE:GREGORIAN", `X-WR-CALNAME:${term.label} classes`, ...VTIMEZONE];
  events.forEach((e, i) => {
    if (e.days.length === 0) return;
    // The first meeting is the earliest of the event's days on or after the first day of classes.
    const first = Math.min(...e.days.map((d) => (DAY_INDEX[d] - weekday(term.firstDay) + 7) % 7));
    const startDate = addDays(term.firstDay, first);
    const skipped = term.noClasses.filter((d) => e.days.some((day) => DAY_INDEX[day] === weekday(d)));
    lines.push(
      "BEGIN:VEVENT",
      `UID:${compactDate(term.firstDay)}-${i}-${compactTime(e.start)}@backpacker`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART;TZID=America/Detroit:${compactDate(startDate)}T${compactTime(e.start)}`,
      `DTEND;TZID=America/Detroit:${compactDate(startDate)}T${compactTime(e.end)}`,
      `RRULE:FREQ=WEEKLY;BYDAY=${e.days.map((d) => ICS_DAYS[d]).join(",")};UNTIL=${term.untilUtc}`,
      ...(skipped.length ? [fold(`EXDATE;TZID=America/Detroit:${skipped.map((d) => `${compactDate(d)}T${compactTime(e.start)}`).join(",")}`)] : []),
      fold(`SUMMARY:${escapeText(e.title)}`),
      ...(e.location ? [fold(`LOCATION:${escapeText(e.location)}`)] : []),
      ...(e.description ? [fold(`DESCRIPTION:${escapeText(e.description)}`)] : []),
      "END:VEVENT",
    );
  });
  lines.push("END:VCALENDAR");
  return lines.join("\r\n") + "\r\n";
}
