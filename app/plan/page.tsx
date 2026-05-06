"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { getAllCourses, type Course, type Meeting } from "@/lib/courses";
import { SiteHeader } from "@/components/site-header";
import { ScheduleGrid, getConflictCount } from "./_components/schedule-grid";
import { usePlan } from "./_components/use-plan";

const allCourses = getAllCourses();

export default function PlanPage() {
  const { ids, mounted, add, remove, clear } = usePlan();

  const planCourses = useMemo<Course[]>(
    () => ids.map((id) => allCourses.find((c) => c.id === id)).filter(Boolean) as Course[],
    [ids],
  );

  const totalCredits = planCourses.reduce((sum, c) => sum + c.credits, 0);
  const totalWorkload = planCourses.reduce((sum, c) => sum + c.workloadHoursPerWeek, 0);
  const conflicts = getConflictCount(planCourses);
  const avgDifficulty =
    planCourses.length > 0
      ? planCourses.reduce((s, c) => s + c.difficulty, 0) / planCourses.length
      : 0;

  return (
    <div className="flex min-h-full flex-col bg-white">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        <div className="mb-6 flex items-baseline justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">My plan</h1>
            <p className="mt-1 text-sm text-slate-500">
              {mounted
                ? `${planCourses.length} course${planCourses.length === 1 ? "" : "s"} · ${totalCredits} credits · ${totalWorkload} hrs/wk`
                : "Loading…"}
            </p>
          </div>
          {planCourses.length > 0 && (
            <button
              onClick={clear}
              className="text-sm text-slate-500 hover:text-slate-900"
            >
              Clear plan
            </button>
          )}
        </div>

        {mounted && planCourses.length === 0 ? (
          <EmptyState onAdd={add} />
        ) : (
          <>
            <SummaryCards
              credits={totalCredits}
              workload={totalWorkload}
              avgDifficulty={avgDifficulty}
              conflicts={conflicts}
            />

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
              <ScheduleGrid courses={planCourses} />
              <div>
                <CoursePicker existing={ids} onAdd={add} />
                <PlanList courses={planCourses} onRemove={remove} />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function EmptyState({ onAdd }: { onAdd: (id: string) => void }) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-10">
      <h2 className="text-lg font-medium">Start by adding a course.</h2>
      <p className="mt-1 text-sm text-slate-500">
        Add 3–6 courses to see your weekly schedule, total workload, and any time conflicts.
      </p>
      <div className="mt-6 max-w-sm">
        <CoursePicker existing={[]} onAdd={onAdd} autoFocus />
      </div>
      <p className="mt-6 text-sm text-slate-500">
        Or <Link href="/courses" className="underline hover:text-slate-900">browse all courses</Link> and use the &ldquo;Add to plan&rdquo; button.
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
    <div className="grid gap-3 sm:grid-cols-4">
      <Stat label="Credits" value={credits.toString()} />
      <Stat label="Workload" value={`${workload}`} unit="hrs/wk" />
      <Stat label="Avg difficulty" value={avgDifficulty ? avgDifficulty.toFixed(1) : "—"} unit="of 5" />
      <Stat
        label="Conflicts"
        value={conflicts.toString()}
        unit={conflicts > 0 ? "see schedule" : "none"}
        warn={conflicts > 0}
      />
    </div>
  );
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
    const q = query.toLowerCase();
    return allCourses
      .filter((c) => !existing.includes(c.id))
      .filter((c) => `${c.code} ${c.title}`.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query, existing]);

  return (
    <div ref={wrapperRef} className="relative mb-4">
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

function PlanList({ courses, onRemove }: { courses: Course[]; onRemove: (id: string) => void }) {
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
              <span className="text-xs text-slate-500">{c.credits} cr · {c.workloadHoursPerWeek} hrs/wk</span>
            </div>
            <div className="truncate text-sm text-slate-700">{c.title}</div>
            <div className="text-xs text-slate-500">{describeMeetings(c.sections[0]?.meetings ?? [])}</div>
          </div>
          <button
            onClick={() => onRemove(c.id)}
            className="ml-2 text-xs text-slate-400 hover:text-rose-600"
            aria-label={`Remove ${c.code}`}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}

function describeMeetings(meetings: Meeting[]): string {
  return meetings.map((m) => `${m.days.join("")} ${m.start}–${m.end}`).join(", ");
}
