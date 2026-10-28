"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import type { Course } from "@/lib/courses";
import type { Day, ScheduleSection } from "@/lib/registrar";
import { generateSchedules, type GenerateResult, type Preferences } from "@/lib/scheduler";
import { DAY_LABELS, WEEKDAYS, componentLabel, formatMeetings, formatMinutes, rateMyProfessorsUrl } from "@/lib/format";
import { usePlan } from "@/lib/use-plan";
import { CourseSearch } from "@/components/course-search";
import { ScheduleGrid, type GridBlock } from "./_components/schedule-grid";
import { ShareButton } from "./_components/share-button";

// The term label lives in lib/courses (server-only), so it's repeated here.
const TERM_LABEL = "Winter 2027";
const MAX_COURSES = 8;
// Keeps the page responsive: about half a second in the worst case.
const MAX_EXPLORED = 300_000;

const DEFAULT_PREFS: Preferences = { preferLateStart: true, minimizeGaps: true, minimizeDays: false };

export default function PlanPage() {
  return (
    <Suspense fallback={null}>
      <PlanPageInner />
    </Suspense>
  );
}

function PlanPageInner() {
  const { ids: savedIds, mounted, add, remove, clear, replace } = usePlan();
  const params = useSearchParams();

  // `?ids=` means the user is viewing someone else's shared plan.
  const sharedIdsRaw = params.get("ids");
  const sharedIds = useMemo<string[] | null>(() => {
    if (!sharedIdsRaw) return null;
    return Array.from(new Set(sharedIdsRaw.split(",").map((s) => s.trim()).filter(Boolean)));
  }, [sharedIdsRaw]);
  const isViewingShared = sharedIds !== null;
  const ids = isViewingShared ? sharedIds : savedIds;

  const courses = usePlanCourses(ids);
  const [prefs, setPrefs] = useState<Preferences>(DEFAULT_PREFS);
  const [locked, setLocked] = useState<Record<string, string[]>>({});

  const offered = useMemo(() => courses?.filter((c) => c.sections.length > 0) ?? [], [courses]);
  const notOffered = useMemo(() => courses?.filter((c) => c.sections.length === 0) ?? [], [courses]);
  const { result, generating } = useGeneratedSchedules(offered, prefs, locked);
  const [index, setIndex] = useState(0);
  // Back to the best schedule whenever the inputs change.
  const [resultSeen, setResultSeen] = useState(result);
  if (result !== resultSeen) {
    setResultSeen(result);
    setIndex(0);
  }

  const schedule = result?.schedules[Math.min(index, (result?.schedules.length ?? 1) - 1)];
  const credits = offered.reduce((sum, c) => sum + parseFloat(c.credits ?? "0"), 0);
  const ready = (mounted || isViewingShared) && courses !== null;

  function toggleLock(courseId: string, sections: ScheduleSection[]) {
    setLocked((cur) => {
      const next = { ...cur };
      if (next[courseId]) delete next[courseId];
      else next[courseId] = sections.map((s) => s.number);
      return next;
    });
  }

  function removeCourse(id: string) {
    remove(id);
    setLocked((cur) => {
      const next = { ...cur };
      delete next[id];
      return next;
    });
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
      {isViewingShared && <SharedBanner sharedIds={sharedIds} savedIds={savedIds} onImport={replace} />}

      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {isViewingShared ? "Shared plan" : `My ${TERM_LABEL} plan`}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {ready ? `${ids.length} course${ids.length === 1 ? "" : "s"} · ${credits} credits` : "Loading…"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!isViewingShared && <ShareButton ids={savedIds} />}
          {!isViewingShared && ids.length > 0 && (
            <button onClick={clear} className="text-sm text-slate-500 hover:text-michigan">
              Clear plan
            </button>
          )}
        </div>
      </div>

      {ready && ids.length === 0 ? (
        <EmptyState onAdd={add} />
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 space-y-4">
            <ResultHeader
              result={result}
              generating={generating}
              index={index}
              onIndex={setIndex}
              loading={courses === null}
              courses={offered}
            />
            {schedule && <ScheduleStats stats={schedule.stats} />}
            <ScheduleGrid blocks={schedule ? toBlocks(schedule.bundles, offered) : []} />
            <p className="text-xs text-slate-500">
              Section times come from the Registrar&apos;s {TERM_LABEL} schedule. Seats and
              restrictions aren&apos;t checked; confirm in Wolverine Access before registering.
            </p>
          </div>

          <div className="space-y-4">
            {!isViewingShared && (
              <CourseSearch
                label="Add a course to your plan"
                placeholder={ids.length >= MAX_COURSES ? `Up to ${MAX_COURSES} courses` : "Add a course…"}
                exclude={ids}
                offeredOnly
                onPick={(c) => ids.length < MAX_COURSES && add(c.id)}
              />
            )}
            <PreferencesPanel prefs={prefs} onChange={setPrefs} />
            {notOffered.length > 0 && (
              <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950">
                Not offered in {TERM_LABEL}:{" "}
                {notOffered.map((c, i) => (
                  <span key={c.id}>
                    {i > 0 && ", "}
                    {c.code}
                    {!isViewingShared && (
                      <button onClick={() => removeCourse(c.id)} className="ml-1 text-xs underline">
                        remove
                      </button>
                    )}
                  </span>
                ))}
              </div>
            )}
            <ChosenSections
              courses={offered}
              schedule={schedule}
              locked={locked}
              onToggleLock={toggleLock}
              onRemove={isViewingShared ? undefined : removeCourse}
            />
          </div>
        </div>
      )}
    </main>
  );
}

/** Loads full course data (with sections) for the plan's ids. */
function usePlanCourses(ids: string[]): Course[] | null {
  const key = ids.join(",");
  const [loaded, setLoaded] = useState<{ key: string; courses: Course[] } | null>(null);

  useEffect(() => {
    if (!key) return;
    const controller = new AbortController();
    fetch(`/api/courses?ids=${encodeURIComponent(key)}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data: { courses: Course[] }) => setLoaded({ key, courses: data.courses }))
      .catch(() => {});
    return () => controller.abort();
  }, [key]);

  // Keep showing the previous courses while a changed list loads. Memoized
  // so the schedule generator only reruns when the course list changes.
  return useMemo(() => {
    if (!key) return [];
    if (!loaded) return null;
    const wanted = new Set(key.split(","));
    return loaded.courses.filter((c) => wanted.has(c.id));
  }, [key, loaded]);
}

/** Runs the generator after paint so the "Generating…" state can show. */
function useGeneratedSchedules(courses: Course[], prefs: Preferences, locked: Record<string, string[]>) {
  const [state, setState] = useState<{ result: GenerateResult | null; inputs: unknown[] }>({ result: null, inputs: [] });
  const inputs = [courses, prefs, locked];
  const stale = inputs.some((v, i) => v !== state.inputs[i]);

  useEffect(() => {
    if (courses.length === 0) return;
    const handle = setTimeout(() => {
      const result = generateSchedules(courses, {
        preferences: prefs,
        allowedSections: locked,
        maxExplored: MAX_EXPLORED,
      });
      setState({ result, inputs: [courses, prefs, locked] });
    }, 0);
    return () => clearTimeout(handle);
  }, [courses, prefs, locked]);

  if (courses.length === 0) return { result: null, generating: false };
  return { result: state.result, generating: stale };
}

function toBlocks(bundles: GenerateResult["schedules"][number]["bundles"], courses: Course[]): GridBlock[] {
  const colorOf = new Map(courses.map((c, i) => [c.id, i]));
  const codeOf = new Map(courses.map((c) => [c.id, c.code]));
  return bundles.flatMap((b) =>
    b.alternatives[0].flatMap((s) =>
      s.meetings.flatMap((m, mi) =>
        m.days.map((day) => ({
          key: `${b.courseId}-${s.number}-${mi}-${day}`,
          code: codeOf.get(b.courseId) ?? b.courseId,
          component: s.component,
          sectionNumber: s.number,
          location: m.location,
          day,
          start: m.start,
          end: m.end,
          colorIndex: colorOf.get(b.courseId) ?? 0,
        })),
      ),
    ),
  );
}

function ResultHeader({
  result,
  generating,
  index,
  onIndex,
  loading,
  courses,
}: {
  result: GenerateResult | null;
  generating: boolean;
  index: number;
  onIndex: (i: number) => void;
  loading: boolean;
  courses: Course[];
}) {
  if (loading) return <Notice>Loading courses…</Notice>;
  if (courses.length === 0) {
    return <Notice>Add courses offered this term to generate schedules.</Notice>;
  }
  if (!result) return <Notice>Generating schedules…</Notice>;
  if (result.impossible.length > 0) {
    const codes = result.impossible.map((id) => courses.find((c) => c.id === id)?.code ?? id);
    return (
      <Notice warn>
        No sections of {codes.join(", ")} fit your time limits. Loosen the limits or unlock sections.
      </Notice>
    );
  }
  if (result.schedules.length === 0) {
    return <Notice warn>These courses can&apos;t all fit together without a time conflict.</Notice>;
  }

  const total = result.schedules.length;
  const found = result.truncated
    ? `${result.explored.toLocaleString()}+ valid schedules (searched the first ${result.explored.toLocaleString()})`
    : `${result.explored.toLocaleString()} valid schedule${result.explored === 1 ? "" : "s"}`;
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-slate-200 bg-white px-4 py-3">
      <div className="text-sm">
        <span className="font-medium text-slate-900">
          Schedule {index + 1} of the best {total}
        </span>{" "}
        <span className="ml-1 text-slate-500">
          · {generating ? "Updating…" : found}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onIndex(Math.max(0, index - 1))}
          disabled={index === 0}
          className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-40"
        >
          ← Prev
        </button>
        <button
          onClick={() => onIndex(Math.min(total - 1, index + 1))}
          disabled={index >= total - 1}
          className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-40"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

function Notice({ children, warn }: { children: React.ReactNode; warn?: boolean }) {
  return (
    <div
      className={`rounded-md border px-4 py-3 text-sm ${
        warn ? "border-rose-200 bg-rose-50 text-rose-900" : "border-slate-200 bg-white text-slate-600"
      }`}
    >
      {children}
    </div>
  );
}

function ScheduleStats({ stats }: { stats: GenerateResult["schedules"][number]["stats"] }) {
  const hasTimes = stats.days > 0;
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <Stat label="Days on campus" value={hasTimes ? String(stats.days) : "—"} />
      <Stat label="First class" value={hasTimes ? formatMinutes(stats.earliestStart) : "—"} />
      <Stat label="Last class ends" value={hasTimes ? formatMinutes(stats.latestEnd) : "—"} />
      <Stat
        label="Gaps between classes"
        value={hasTimes ? formatHours(stats.gapMinutes) : "—"}
      />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-3">
      <div className="text-[11px] uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-0.5 text-lg font-semibold tabular-nums">{value}</div>
    </div>
  );
}

function PreferencesPanel({ prefs, onChange }: { prefs: Preferences; onChange: (p: Preferences) => void }) {
  const set = (patch: Partial<Preferences>) => onChange({ ...prefs, ...patch });
  const daysOff = prefs.daysOff ?? [];
  const toggleDay = (d: Day) =>
    set({ daysOff: daysOff.includes(d) ? daysOff.filter((x) => x !== d) : [...daysOff, d] });

  return (
    <div className="space-y-3 rounded-md border border-slate-200 bg-white p-4 text-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Preferences</div>
      <div className="grid grid-cols-2 gap-2">
        <label className="flex flex-col gap-1 text-xs text-slate-600">
          No class before
          <select
            value={prefs.earliestStart ?? ""}
            onChange={(e) => set({ earliestStart: e.target.value || undefined })}
            className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm"
          >
            <option value="">Any time</option>
            {["08:00", "09:00", "10:00", "11:00", "12:00"].map((t) => (
              <option key={t} value={t}>{formatMinutes(parseInt(t) * 60)}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-slate-600">
          Done by
          <select
            value={prefs.latestEnd ?? ""}
            onChange={(e) => set({ latestEnd: e.target.value || undefined })}
            className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm"
          >
            <option value="">Any time</option>
            {["14:00", "15:00", "16:00", "17:00", "18:00", "19:00"].map((t) => (
              <option key={t} value={t}>{formatMinutes(parseInt(t) * 60)}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <div className="mb-1 text-xs text-slate-600">Days off</div>
        <div className="flex gap-1">
          {WEEKDAYS.map((d) => (
            <button
              key={d}
              onClick={() => toggleDay(d)}
              aria-pressed={daysOff.includes(d)}
              className={`flex-1 rounded-md border px-2 py-1 text-xs ${
                daysOff.includes(d)
                  ? "border-michigan bg-michigan text-white"
                  : "border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {DAY_LABELS[d]}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-1.5">
        <Check label="Prefer later starts" checked={!!prefs.preferLateStart} onChange={(v) => set({ preferLateStart: v })} />
        <Check label="Fewer gaps between classes" checked={!!prefs.minimizeGaps} onChange={(v) => set({ minimizeGaps: v })} />
        <Check label="Fewer days on campus" checked={!!prefs.minimizeDays} onChange={(v) => set({ minimizeDays: v })} />
      </div>
    </div>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-3.5 w-3.5 rounded border-slate-300"
      />
      {label}
    </label>
  );
}

function ChosenSections({
  courses,
  schedule,
  locked,
  onToggleLock,
  onRemove,
}: {
  courses: Course[];
  schedule: GenerateResult["schedules"][number] | undefined;
  locked: Record<string, string[]>;
  onToggleLock: (courseId: string, sections: ScheduleSection[]) => void;
  onRemove?: (id: string) => void;
}) {
  if (courses.length === 0) return null;
  return (
    <ul className="divide-y divide-slate-100 rounded-md border border-slate-200 bg-white">
      {courses.map((c) => {
        const bundle = schedule?.bundles.find((b) => b.courseId === c.id);
        const sections = bundle?.alternatives[0] ?? [];
        const sameTime = (bundle?.alternatives.length ?? 1) - 1;
        const isLocked = !!locked[c.id];
        return (
          <li key={c.id} className="px-3 py-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <Link href={`/courses/${c.id}`} className="font-mono text-xs font-semibold text-slate-700 hover:underline">
                  {c.code}
                </Link>
                <span className="ml-2 text-xs text-slate-500">{c.credits} cr</span>
                <div className="truncate text-sm text-slate-700">{c.title}</div>
              </div>
              <div className="flex shrink-0 gap-2 text-xs">
                {sections.length > 0 && (
                  <button
                    onClick={() => onToggleLock(c.id, sections)}
                    className={isLocked ? "font-medium text-michigan" : "text-slate-500 hover:text-michigan"}
                    title={isLocked ? "Let the generator pick any section" : "Keep these sections in every schedule"}
                  >
                    {isLocked ? "Unlock" : "Lock"}
                  </button>
                )}
                {onRemove && (
                  <button onClick={() => onRemove(c.id)} className="text-slate-400 hover:text-rose-600" aria-label={`Remove ${c.code}`}>
                    Remove
                  </button>
                )}
              </div>
            </div>
            {sections.length > 0 && (
              <ul className="mt-2 space-y-1">
                {sections.map((s) => (
                  <li key={s.classNumber} className="text-xs text-slate-600">
                    <span className="font-medium text-slate-800">
                      {componentLabel(s.component)} {s.number}
                    </span>
                    <span className="text-slate-400"> · #{s.classNumber}</span>
                    <div>
                      {formatMeetings(s)}
                      {s.meetings[0]?.location && ` · ${s.meetings[0].location}`}
                    </div>
                    {s.instructors.length > 0 && (
                      <div>
                        {s.instructors.map((name, i) => (
                          <span key={name}>
                            {i > 0 && ", "}
                            <a
                              href={rateMyProfessorsUrl(name)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline decoration-slate-300 underline-offset-2 hover:text-michigan"
                              title={`Search Rate My Professors for ${name} at UMich`}
                            >
                              {name}
                            </a>
                          </span>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
                {sameTime > 0 && (
                  <li className="text-[11px] text-slate-400">
                    +{sameTime} other section combination{sameTime === 1 ? "" : "s"} at the same times
                  </li>
                )}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function SharedBanner({
  sharedIds,
  savedIds,
  onImport,
}: {
  sharedIds: string[];
  savedIds: string[];
  onImport: (next: string[]) => void;
}) {
  const same = sharedIds.length === savedIds.length && sharedIds.every((id) => savedIds.includes(id));
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm">
      <span className="text-slate-700">
        Viewing a <strong>shared plan</strong> from someone else.
        {same && " It matches your saved plan."}
      </span>
      {!same && (
        <div className="flex gap-2">
          <button
            onClick={() => onImport(sharedIds)}
            className="rounded-md bg-michigan px-3 py-1.5 text-xs font-medium text-white hover:bg-michigan-light"
          >
            Save as my plan
          </button>
          <Link href="/plan" className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50">
            Back to mine
          </Link>
        </div>
      )}
    </div>
  );
}

function EmptyState({ onAdd }: { onAdd: (id: string) => void }) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-10">
      <h2 className="text-lg font-medium">Start by adding a course.</h2>
      <p className="mt-1 text-sm text-slate-500">
        Add the courses you want to take in {TERM_LABEL}. Backpacker tries every combination of
        lectures, labs, and discussions and shows the schedules that fit, best first.
      </p>
      <div className="mt-6 max-w-sm">
        <CourseSearch label="Add a course to your plan" offeredOnly autoFocus onPick={(c) => onAdd(c.id)} />
      </div>
      <p className="mt-6 text-sm text-slate-500">
        Or{" "}
        <Link href="/courses?offered=1" className="underline hover:text-michigan">
          browse {TERM_LABEL} courses
        </Link>{" "}
        and use the &ldquo;Add to plan&rdquo; button.
      </p>
    </div>
  );
}

function formatHours(minutes: number): string {
  const hours = Math.round((minutes / 60) * 10) / 10;
  return `${hours} ${hours === 1 ? "hr" : "hrs"}`;
}
