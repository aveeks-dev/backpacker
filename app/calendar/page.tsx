"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Course } from "@/lib/courses";
import type { ScheduleSection } from "@/lib/registrar";
import {
  TERM_DATES,
  blockItems,
  buildIcs,
  conflictingKeys,
  courseCombos,
  courseStatus,
  creditRange,
  pairsWithPicks,
  pickSection,
  pickedSections,
  requiredComponents,
  sectionItems,
  unpickSection,
  weekStats,
  type CalendarItem,
  type IcsEvent,
  type Picks,
  type TimeBlock,
} from "@/lib/calendar";
import { componentLabel, formatMeetings, formatMinutes } from "@/lib/format";
import { generateSchedules } from "@/lib/scheduler";
import { useCalendar } from "@/lib/use-calendar";
import { usePlan } from "@/lib/use-plan";
import { usePlanCourses } from "@/lib/use-plan-courses";
import { CourseSearch } from "@/components/course-search";
import { COLORS } from "@/app/plan/_components/schedule-grid";
import { WeekCalendar, type DrawItem } from "./_components/week-calendar";
import { BlockEditor, toClock } from "./_components/block-editor";

const MAX_COURSES = 8;
const COLLAPSED_SECTIONS = 6;

type Hover = { courseId: string; section: ScheduleSection } | null;

export default function CalendarPage() {
  const plan = usePlan();
  const calendar = useCalendar();
  const { picks, blocks, setPicks } = calendar;
  const courses = usePlanCourses(plan.ids);
  const offered = useMemo(() => courses?.filter((c) => c.sections.length > 0) ?? [], [courses]);
  const notOffered = courses?.filter((c) => c.sections.length === 0) ?? [];
  const [hover, setHover] = useState<Hover>(null);
  const [editing, setEditing] = useState<{ block: TimeBlock; isNew: boolean } | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const ready = plan.mounted && calendar.mounted && courses !== null;

  const colorOf = useMemo(() => new Map(offered.map((c, i) => [c.id, i])), [offered]);

  // Everything currently on the calendar, for conflicts and stats.
  const placed = useMemo<CalendarItem[]>(
    () => [
      ...offered.flatMap((c) => pickedSections(c, picks).flatMap((s) => sectionItems(c.id, s))),
      ...blocks.flatMap(blockItems),
    ],
    [offered, picks, blocks],
  );
  const conflicts = useMemo(() => conflictingKeys(placed), [placed]);
  const stats = weekStats(placed);
  const [minCredits, maxCredits] = offered.reduce(
    ([lo, hi], c) => {
      const [a, b] = creditRange(c.credits);
      return [lo + a, hi + b];
    },
    [0, 0],
  );

  const drawn: DrawItem[] = [];
  for (const c of offered) {
    for (const s of pickedSections(c, picks)) {
      for (const item of sectionItems(c.id, s)) {
        drawn.push({
          ...item,
          title: c.code,
          subtitle: `${componentLabel(s.component)} ${s.number}`,
          detail: s.meetings[0]?.location ?? "",
          colorIndex: colorOf.get(c.id) ?? 0,
          conflict: conflicts.has(item.key),
          onClick: () => setFocused(c.id),
        });
      }
    }
  }
  for (const b of blocks) {
    for (const item of blockItems(b)) {
      drawn.push({ ...item, title: b.label, subtitle: "Your time", detail: "", colorIndex: 0, conflict: conflicts.has(item.key), onClick: () => setEditing({ block: b, isNew: false }) });
    }
  }
  if (hover && !(picks[hover.courseId] ?? []).includes(hover.section.number)) {
    const course = offered.find((c) => c.id === hover.courseId);
    if (course) {
      for (const item of sectionItems(course.id, hover.section)) {
        drawn.push({
          ...item,
          key: `ghost-${item.key}`,
          title: course.code,
          subtitle: `${componentLabel(hover.section.component)} ${hover.section.number} · preview`,
          detail: hover.section.meetings[0]?.location ?? "",
          colorIndex: colorOf.get(course.id) ?? 0,
          ghost: true,
        });
      }
    }
  }

  function removeCourse(id: string) {
    plan.remove(id);
    setPicks((cur) => {
      const next = { ...cur };
      delete next[id];
      return next;
    });
  }

  function newBlock(day: TimeBlock["days"][number], start: number, end: number) {
    setEditing({ block: { id: `b${Date.now().toString(36)}`, label: "", days: [day], start: toClock(start), end: toClock(end) }, isNew: true });
  }

  /** Picks the best sections for whatever is still unpicked, around everything already placed. */
  function fillRest() {
    const allowed: Record<string, string[]> = {};
    for (const c of offered) {
      const mine = pickedSections(c, picks);
      if (mine.length === 0) continue;
      const fixed = new Set(mine.map((s) => s.component));
      allowed[c.id] = c.sections.filter((s) => !fixed.has(s.component) || mine.includes(s)).map((s) => s.number);
    }
    const busy = blocks.flatMap((b) => b.days.map((day) => ({ day, start: b.start, end: b.end })));
    const result = generateSchedules(offered, {
      preferences: { busy, minimizeGaps: true, preferLateStart: true },
      allowedSections: allowed,
      maxExplored: 300_000,
      limit: 1,
    });
    const best = result.schedules[0];
    if (!best) {
      setNotice("Those courses can't all fit around your picked sections and time blocks. Try unpicking a section or moving a block.");
      return;
    }
    setNotice(null);
    setPicks(() => Object.fromEntries(best.bundles.map((b) => [b.courseId, b.alternatives[0].map((s) => s.number)])) as Picks);
  }

  function exportIcs() {
    const events: IcsEvent[] = [];
    for (const c of offered) {
      for (const s of pickedSections(c, picks)) {
        for (const m of s.meetings) {
          events.push({
            title: `${c.code} ${componentLabel(s.component)}`,
            location: m.location,
            description: [`${c.title}`, `Section ${s.number}, class #${s.classNumber}`, s.instructors.length ? `Instructor: ${s.instructors.join(", ")}` : ""].filter(Boolean).join("\n"),
            days: m.days,
            start: m.start,
            end: m.end,
          });
        }
      }
    }
    for (const b of blocks) events.push({ title: b.label, location: "", description: "", days: b.days, start: b.start, end: b.end });
    const url = URL.createObjectURL(new Blob([buildIcs(events)], { type: "text/calendar" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "winter-2027-classes.ics";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const pickedCount = Object.keys(picks).filter((id) => offered.some((c) => c.id === id)).length + blocks.length;

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-maize-dark">{TERM_DATES.label}</p>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-michigan sm:text-3xl">Weekly calendar</h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Pick the sections you want, then drag (or tap, on a phone) on the calendar to block off work, practice, or anything else.
            Hover a section to preview it, and conflicts turn red.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={fillRest}
            disabled={offered.length === 0}
            className="rounded-md border border-michigan px-3 py-1.5 text-sm font-medium text-michigan hover:bg-michigan hover:text-white disabled:opacity-40"
            title="Fill in every unpicked section with the best fit around your picks and time blocks"
          >
            Fill in the rest
          </button>
          <button
            onClick={exportIcs}
            disabled={pickedCount === 0}
            className="rounded-md bg-maize px-3 py-1.5 text-sm font-semibold text-michigan hover:bg-maize-dark disabled:opacity-40"
          >
            Add to my calendar (.ics)
          </button>
          {pickedCount > 0 && (
            <button onClick={calendar.clear} className="px-2 text-sm text-slate-500 hover:text-rose-600">
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Credits" value={minCredits === maxCredits ? String(minCredits) : `${minCredits}–${maxCredits}`} tone={maxCredits > 18 ? "warn" : undefined} hint={maxCredits > 18 ? "Over 18 usually needs approval" : undefined} />
        <Stat label="Class hours / week" value={stats.classMinutes ? (Math.round((stats.classMinutes / 60) * 10) / 10).toString() : "0"} />
        <Stat label="Days on campus" value={String(stats.days)} />
        <Stat label="Conflicts" value={String(countConflicts(placed, conflicts))} tone={conflicts.size ? "bad" : "good"} />
      </div>

      {notice && <div className="mb-4 rounded-md border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm text-rose-900">{notice}</div>}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0 space-y-3">
          <WeekCalendar items={drawn} onCreate={newBlock} />
          <p className="text-xs text-slate-500">
            Times come from the Registrar&apos;s {TERM_DATES.label} schedule. The calendar file repeats each class weekly from
            Jan 13 to Apr 27, skipping MLK Day and spring break, per the{" "}
            <a href={TERM_DATES.source} className="underline hover:text-michigan" target="_blank" rel="noreferrer">
              academic calendar
            </a>
            . Seats aren&apos;t checked, so confirm in Wolverine Access before registering. Your calendar is saved in this browser only.
          </p>
        </div>

        <div className="space-y-4">
          <CourseSearch
            label="Add a course"
            placeholder={plan.ids.length >= MAX_COURSES ? `Up to ${MAX_COURSES} courses` : "Add a course, like EECS 281…"}
            exclude={plan.ids}
            offeredOnly
            onPick={(c) => plan.ids.length < MAX_COURSES && plan.add(c.id)}
          />

          {!ready ? (
            <div className="rounded-md border border-slate-200 bg-white p-4 text-sm text-slate-500">Loading…</div>
          ) : offered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600">
              Add the courses you&apos;re thinking about. They&apos;re shared with your{" "}
              <Link href="/plan" className="font-medium text-michigan underline">schedule generator</Link>, and you can also{" "}
              <Link href="/degree" className="font-medium text-michigan underline">start from your major</Link>.
            </div>
          ) : (
            <ul className="space-y-3">
              {offered.map((c) => (
                <CourseCard
                  key={c.id}
                  course={c}
                  picks={picks}
                  placed={placed}
                  colorIndex={colorOf.get(c.id) ?? 0}
                  focused={focused === c.id}
                  onPick={(s) => setPicks((cur) => ((cur[c.id] ?? []).includes(s.number) ? unpickSection(c.id, cur, s.number) : pickSection(c, cur, s)))}
                  onHover={(s) => setHover(s ? { courseId: c.id, section: s } : null)}
                  onRemove={() => removeCourse(c.id)}
                />
              ))}
            </ul>
          )}

          {notOffered.length > 0 && (
            <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950">
              Not offered in {TERM_DATES.label}:{" "}
              {notOffered.map((c, i) => (
                <span key={c.id}>
                  {i > 0 && ", "}
                  {c.code}
                  <button onClick={() => removeCourse(c.id)} className="ml-1 text-xs underline">remove</button>
                </span>
              ))}
            </div>
          )}

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Your time</h2>
              <button
                onClick={() => setEditing({ block: { id: `b${Date.now().toString(36)}`, label: "", days: ["M", "W"], start: "12:00", end: "13:00" }, isNew: true })}
                className="text-sm font-medium text-michigan hover:underline"
              >
                + Add a time block
              </button>
            </div>
            {blocks.length === 0 ? (
              <p className="mt-2 text-sm text-slate-500">Work, practice, or meetings. Drag on the calendar, or use the button.</p>
            ) : (
              <ul className="mt-2 divide-y divide-slate-100">
                {blocks.map((b) => (
                  <li key={b.id} className="flex items-center justify-between gap-2 py-2 text-sm">
                    <div>
                      <div className="font-medium text-slate-800">{b.label}</div>
                      <div className="text-xs text-slate-500">
                        {b.days.join("")} {formatMinutes(toMinutesSafe(b.start))}–{formatMinutes(toMinutesSafe(b.end))}
                      </div>
                    </div>
                    <button onClick={() => setEditing({ block: b, isNew: false })} className="text-xs text-slate-500 hover:text-michigan">
                      Edit
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {editing && (
        <BlockEditor
          key={editing.block.id}
          block={editing.block}
          isNew={editing.isNew}
          onClose={() => setEditing(null)}
          onSave={(b) => {
            calendar.saveBlock(b);
            setEditing(null);
          }}
          onDelete={() => {
            calendar.removeBlock(editing.block.id);
            setEditing(null);
          }}
        />
      )}
    </main>
  );
}

function toMinutesSafe(clock: string): number {
  const [h, m] = clock.split(":").map(Number);
  return h * 60 + (m || 0);
}

/** Overlapping pairs, each counted once, however many days they share. */
function countConflicts(items: CalendarItem[], keys: Set<string>): number {
  const pairs = new Set<string>();
  const hit = items.filter((i) => keys.has(i.key));
  for (let i = 0; i < hit.length; i++)
    for (let j = i + 1; j < hit.length; j++) {
      const a = hit[i];
      const b = hit[j];
      if (a.day === b.day && a.owner !== b.owner && a.start < b.end && b.start < a.end) pairs.add([a.owner, b.owner].sort().join("|"));
    }
  return pairs.size;
}

function Stat({ label, value, tone, hint }: { label: string; value: string; tone?: "good" | "warn" | "bad"; hint?: string }) {
  const color = tone === "bad" ? "text-rose-600" : tone === "warn" ? "text-amber-600" : tone === "good" ? "text-emerald-700" : "text-michigan";
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="text-[11px] font-medium uppercase tracking-wide text-slate-500">{label}</div>
      <div className={`mt-0.5 font-display text-2xl font-semibold tabular-nums ${color}`}>{value}</div>
      {hint && <div className="text-[11px] text-amber-700">{hint}</div>}
    </div>
  );
}

function CourseCard({
  course,
  picks,
  placed,
  colorIndex,
  focused,
  onPick,
  onHover,
  onRemove,
}: {
  course: Course;
  picks: Picks;
  placed: CalendarItem[];
  colorIndex: number;
  focused: boolean;
  onPick: (s: ScheduleSection) => void;
  onHover: (s: ScheduleSection | null) => void;
  onRemove: () => void;
}) {
  const [showAll, setShowAll] = useState<Record<string, boolean>>({});
  const combos = useMemo(() => courseCombos(course), [course]);
  const { missing, linked } = courseStatus(course, picks, combos);
  const chosen = picks[course.id] ?? [];
  const status = !linked
    ? { text: "Sections don't pair", cls: "bg-rose-100 text-rose-800" }
    : missing.length
      ? { text: `Pick ${missing.map((m) => componentLabel(m).toLowerCase()).join(" and ")}`, cls: "bg-amber-100 text-amber-900" }
      : { text: "All set", cls: "bg-emerald-100 text-emerald-800" };

  return (
    <li className={`overflow-hidden rounded-xl border bg-white shadow-sm ${focused ? "border-michigan ring-2 ring-maize" : "border-slate-200"}`}>
      <div className={`flex items-start justify-between gap-2 border-l-4 px-3 py-2.5 ${COLORS[colorIndex % COLORS.length]}`}>
        <div className="min-w-0">
          <Link href={`/courses/${course.id}`} className="font-mono text-sm font-semibold hover:underline">
            {course.code}
          </Link>
          <span className="ml-2 text-xs opacity-80">{course.credits} cr</span>
          <div className="truncate text-sm opacity-90">{course.title}</div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${status.cls}`}>{status.text}</span>
          <button onClick={onRemove} className="text-[11px] opacity-70 hover:text-rose-600 hover:opacity-100" aria-label={`Remove ${course.code}`}>
            Remove
          </button>
        </div>
      </div>

      {requiredComponents(course).map((component) => {
        const sections = course.sections.filter((s) => s.component === component);
        const replaced = sections.filter((s) => chosen.includes(s.number)).map((s) => s.number);
        const fits = sections.map((s) => ({ s, pairs: pairsWithPicks(course, picks, s, combos), clash: clashes(course.id, s, replaced, placed) }));
        // Once a lecture is picked, sections that can't go with it are tucked away.
        const visible = showAll[component] ? fits : fits.filter((f) => f.pairs || chosen.includes(f.s.number));
        const shown = showAll[component] ? visible : visible.slice(0, COLLAPSED_SECTIONS);
        const hidden = fits.length - shown.length;
        return (
          <div key={component} className="border-t border-slate-100 px-3 py-2">
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              {componentLabel(component)} <span className="font-normal normal-case">· {sections.length} option{sections.length === 1 ? "" : "s"}</span>
            </div>
            <ul className="space-y-1">
              {shown.map(({ s, pairs, clash }) => {
                const on = chosen.includes(s.number);
                return (
                  <li key={s.classNumber}>
                    <button
                      onClick={() => onPick(s)}
                      onMouseEnter={() => onHover(s)}
                      onMouseLeave={() => onHover(null)}
                      onFocus={() => onHover(s)}
                      onBlur={() => onHover(null)}
                      aria-pressed={on}
                      className={`flex w-full items-start gap-2 rounded-md border px-2 py-1.5 text-left text-xs transition ${
                        on ? "border-michigan bg-michigan text-white" : "border-slate-200 text-slate-700 hover:border-michigan/50 hover:bg-slate-50"
                      }`}
                    >
                      <span className={`mt-0.5 h-3 w-3 shrink-0 rounded-full border ${on ? "border-maize bg-maize" : "border-slate-400"}`} />
                      <span className="min-w-0 flex-1">
                        <span className="font-semibold">{s.number}</span>
                        <span className={on ? "text-slate-200" : "text-slate-500"}> · {formatMeetings(s)}</span>
                        <span className={`block truncate ${on ? "text-slate-200" : "text-slate-500"}`}>
                          {[s.instructors.join(", "), s.meetings[0]?.location].filter(Boolean).join(" · ") || `Class #${s.classNumber}`}
                        </span>
                      </span>
                      {!on && !pairs && <span className="shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600">Doesn&apos;t pair</span>}
                      {!on && pairs && clash && <span className="shrink-0 rounded bg-rose-100 px-1.5 py-0.5 text-[10px] text-rose-700">Conflict</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
            {hidden > 0 && (
              <button onClick={() => setShowAll({ ...showAll, [component]: true })} className="mt-1 text-xs font-medium text-michigan hover:underline">
                Show {hidden} more
              </button>
            )}
          </div>
        );
      })}
    </li>
  );
}

/** Whether a section would overlap anything else on the calendar, apart from the sections it would replace. */
function clashes(courseId: string, section: ScheduleSection, replaced: string[], placed: CalendarItem[]): boolean {
  const mine = sectionItems(courseId, section);
  const skip = replaced.map((n) => `${courseId}-${n}-`);
  return placed.some(
    (p) => !skip.some((prefix) => p.key.startsWith(prefix)) && mine.some((m) => m.day === p.day && m.start < p.end && p.start < m.end),
  );
}
