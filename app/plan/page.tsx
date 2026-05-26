"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { getAllCourses, type Course, type Meeting } from "@/lib/courses";
import { SiteHeader } from "@/components/site-header";
import { ScheduleGrid, getConflictCount } from "./_components/schedule-grid";
import { usePlan } from "./_components/use-plan";
import { GpaForecast } from "./_components/gpa-forecast";
import { DistributionCoverage } from "./_components/distribution-coverage";
import { ShareButton } from "./_components/share-button";

const allCourses = getAllCourses();

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

  // If `?ids=` is in the URL, the user is viewing a *shared* plan. Show that
  // instead of (or alongside, with a banner to import) the local one.
  const sharedIdsRaw = params.get("ids");
  const sharedIds = useMemo<string[] | null>(() => {
    if (!sharedIdsRaw) return null;
    return Array.from(
      new Set(sharedIdsRaw.split(",").map((s) => s.trim()).filter(Boolean)),
    );
  }, [sharedIdsRaw]);

  const isViewingShared = sharedIds !== null;
  const ids = isViewingShared ? sharedIds! : savedIds;

  const planCourses = useMemo<Course[]>(
    () =>
      ids
        .map((id) => allCourses.find((c) => c.id === id))
        .filter((c): c is Course => Boolean(c)),
    [ids],
  );

  const totalCredits = planCourses.reduce((sum, c) => sum + c.credits, 0);
  const totalWorkload = planCourses.reduce(
    (sum, c) => sum + c.workloadHoursPerWeek,
    0,
  );
  const conflicts = getConflictCount(planCourses);
  const avgDifficulty =
    planCourses.length > 0
      ? planCourses.reduce((s, c) => s + c.difficulty, 0) / planCourses.length
      : 0;

  return (
    <div className="flex min-h-full flex-col bg-white">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        {isViewingShared && (
          <SharedBanner sharedIds={sharedIds!} savedIds={savedIds} onImport={replace} />
        )}

        <div className="mb-6 flex items-baseline justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {isViewingShared ? "Shared plan" : "My plan"}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {mounted || isViewingShared
                ? `${planCourses.length} course${planCourses.length === 1 ? "" : "s"} · ${totalCredits} credits · ${totalWorkload} hrs/wk`
                : "Loading…"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {!isViewingShared && <ShareButton ids={savedIds} />}
            {!isViewingShared && planCourses.length > 0 && (
              <button
                onClick={clear}
                className="text-sm text-slate-500 hover:text-slate-900"
              >
                Clear plan
              </button>
            )}
          </div>
        </div>

        {(mounted || isViewingShared) && planCourses.length === 0 ? (
          <EmptyState onAdd={add} />
        ) : (
          <>
            <SummaryCards
              credits={totalCredits}
              workload={totalWorkload}
              avgDifficulty={avgDifficulty}
              conflicts={conflicts}
            />

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
              <div className="space-y-6">
                <ScheduleGrid courses={planCourses} />
                {planCourses.length > 1 && (
                  <Link
                    href={`/compare?ids=${planCourses.map((c) => c.id).join(",")}`}
                    className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900"
                  >
                    → Compare these courses side-by-side
                  </Link>
                )}
              </div>
              <div className="space-y-4">
                {!isViewingShared && (
                  <CoursePicker existing={savedIds} onAdd={add} />
                )}
                <GpaForecast courses={planCourses} />
                <DistributionCoverage courses={planCourses} />
                <PlanList
                  courses={planCourses}
                  onRemove={isViewingShared ? undefined : remove}
                />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
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
  const same =
    sharedIds.length === savedIds.length &&
    sharedIds.every((id) => savedIds.includes(id));

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
            className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
          >
            Save as my plan
          </button>
          <Link
            href="/plan"
            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
          >
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
        Add 3–6 courses to see your weekly schedule, projected GPA, distribution
        coverage, and any time conflicts.
      </p>
      <div className="mt-6 max-w-sm">
        <CoursePicker existing={[]} onAdd={onAdd} autoFocus />
      </div>
      <p className="mt-6 text-sm text-slate-500">
        Or{" "}
        <Link href="/courses" className="underline hover:text-slate-900">
          browse all courses
        </Link>{" "}
        and use the &ldquo;Add to plan&rdquo; button.
      </p>
    </div>
  );
}

function SummaryCards({
  credits,
  workload,
  avgDifficulty,
  conflicts,
}: {
  credits: number;
  workload: number;
  avgDifficulty: number;
  conflicts: number;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Stat label="Credits" value={credits.toString()} unit={credits >= 12 ? "full-time" : credits >= 18 ? "overload" : "—"} />
      <Stat
        label="Workload"
        value={`${workload}`}
        unit={`hrs/wk · ${workloadVerdict(workload)}`}
      />
      <Stat
        label="Avg difficulty"
        value={avgDifficulty ? avgDifficulty.toFixed(1) : "—"}
        unit="of 5"
      />
      <Stat
        label="Conflicts"
        value={conflicts.toString()}
        unit={conflicts > 0 ? "see schedule" : "none"}
        warn={conflicts > 0}
      />
    </div>
  );
}

function workloadVerdict(hrs: number): string {
  if (hrs === 0) return "—";
  if (hrs < 30) return "light";
  if (hrs < 45) return "moderate";
  if (hrs < 55) return "heavy";
  return "very heavy";
}

function Stat({
  label,
  value,
  unit,
  warn,
}: {
  label: string;
  value: string;
  unit?: string;
  warn?: boolean;
}) {
  return (
    <div
      className={`rounded-md border p-4 ${warn ? "border-rose-200 bg-rose-50" : "border-slate-200 bg-white"}`}
    >
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 text-xl font-semibold tabular-nums">{value}</div>
      {unit && <div className="text-xs text-slate-500">{unit}</div>}
    </div>
  );
}

function CoursePicker({
  existing,
  onAdd,
  autoFocus,
}: {
  existing: string[];
  onAdd: (id: string) => void;
  autoFocus?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const matches = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase().replace(/\s+/g, "");
    return allCourses
      .filter((c) => !existing.includes(c.id))
      .filter((c) =>
        `${c.code} ${c.title}`.toLowerCase().replace(/\s+/g, "").includes(q),
      )
      .slice(0, 8);
  }, [query, existing]);

  return (
    <div ref={wrapperRef} className="relative">
      <input
        autoFocus={autoFocus}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder="Add a course…"
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
      />
      {open && matches.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-72 w-full overflow-auto rounded-md border border-slate-200 bg-white shadow-md">
          {matches.map((c) => (
            <li key={c.id}>
              <button
                onClick={() => {
                  onAdd(c.id);
                  setQuery("");
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-slate-50"
              >
                <span className="font-mono text-xs font-semibold text-slate-700">{c.code}</span>
                <span className="truncate text-slate-700">{c.title}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PlanList({
  courses,
  onRemove,
}: {
  courses: Course[];
  onRemove?: (id: string) => void;
}) {
  if (courses.length === 0) return null;
  return (
    <ul className="divide-y divide-slate-100 rounded-md border border-slate-200 bg-white">
      {courses.map((c) => (
        <li key={c.id} className="flex items-center justify-between px-3 py-2.5">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <Link
                href={`/courses/${c.id}`}
                className="font-mono text-xs font-semibold text-slate-700 hover:underline"
              >
                {c.code}
              </Link>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500">
                {c.credits} cr · {c.workloadHoursPerWeek || "—"} hrs/wk
              </span>
            </div>
            <div className="truncate text-sm text-slate-700">{c.title}</div>
            <div className="text-xs text-slate-500">
              {describeMeetings(c.sections[0]?.meetings ?? [])}
            </div>
          </div>
          {onRemove && (
            <button
              onClick={() => onRemove(c.id)}
              className="ml-2 text-xs text-slate-400 hover:text-rose-600"
              aria-label={`Remove ${c.code}`}
            >
              Remove
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

function describeMeetings(meetings: Meeting[]): string {
  if (meetings.length === 0) return "Schedule TBD";
  return meetings
    .map((m) => `${m.days.join("")} ${m.start}–${m.end}`)
    .join(", ");
}
