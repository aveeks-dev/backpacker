// Display helpers shared by server and client components. Keep this file
// free of data imports so client bundles stay small.

import type { Day, ScheduleMeeting, ScheduleSection } from "./registrar";

export const WEEKDAYS: Day[] = ["M", "T", "W", "Th", "F"];
export const DAY_LABELS: Record<Day, string> = {
  M: "Mon", T: "Tue", W: "Wed", Th: "Thu", F: "Fri", S: "Sat", Su: "Sun",
};

export const COMPONENT_LABELS: Record<string, string> = {
  LEC: "Lecture",
  DIS: "Discussion",
  LAB: "Lab",
  REC: "Recitation",
  SEM: "Seminar",
  IND: "Independent study",
  MID: "Exam",
  CLN: "Clinical",
  STU: "Studio",
  FLD: "Field work",
};

export function componentLabel(component: string): string {
  return COMPONENT_LABELS[component] ?? component;
}

/** "13:30" -> "1:30pm", "09:00" -> "9am" */
export function formatClock(clock: string): string {
  const [h, m] = clock.split(":").map(Number);
  const period = h < 12 ? "am" : "pm";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour}${period}` : `${hour}:${String(m).padStart(2, "0")}${period}`;
}

/** Minutes from midnight -> "1:30pm" */
export function formatMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return formatClock(`${h}:${m}`);
}

export function formatMeeting(m: ScheduleMeeting): string {
  return `${m.days.join("")} ${formatClock(m.start)}–${formatClock(m.end)}`;
}

export function formatMeetings(section: ScheduleSection): string {
  if (section.meetings.length === 0) return "No set time (arranged or online)";
  return section.meetings.map(formatMeeting).join(", ");
}

/** Rate My Professors search for a last name at UMich (school 1258). */
export function rateMyProfessorsUrl(lastName: string): string {
  return `https://www.ratemyprofessors.com/search/professors/1258?q=${encodeURIComponent(lastName)}`;
}

/** "4 lectures · 20 labs" style summary, skipping exam slots. */
export function sectionSummary(sections: ScheduleSection[]): string {
  const counts = new Map<string, number>();
  for (const s of sections) {
    if (s.component === "MID") continue;
    counts.set(s.component, (counts.get(s.component) ?? 0) + 1);
  }
  return [...counts]
    .map(([comp, n]) => {
      const label = componentLabel(comp).toLowerCase();
      if (n === 1 || label.endsWith("work")) return `${n} ${label}`;
      return `${n} ${label.endsWith("y") ? label.slice(0, -1) + "ies" : label + "s"}`;
    })
    .join(" · ");
}

export const LEVEL_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "100", label: "100 — Intro" },
  { value: "200", label: "200 — Lower" },
  { value: "300", label: "300 — Upper" },
  { value: "400", label: "400 — Upper" },
  { value: "500", label: "500 — Capstone / Grad" },
  { value: "600", label: "600+ — Graduate" },
];
