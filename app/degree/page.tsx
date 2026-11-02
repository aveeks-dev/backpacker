"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CourseSearch } from "@/components/course-search";
import type { CourseSummary } from "@/lib/courses";
import {
  arrangePlan,
  courseCode,
  evaluate,
  finishedEntries,
  getMajor,
  majorCourseIds,
  percentComplete,
  suggestNext,
  yearStatus,
  type Major,
  type PlacedEntry,
  type Progress,
  type Requirement,
  type RequirementStatus,
  type YearStatus,
} from "@/lib/majors";
import { describeGroup } from "@/lib/prereqs";
import { PROGRAMS, getProgram, hasFullPlan, searchPrograms, type Program } from "@/lib/major-directory";
import { usePlan } from "@/lib/use-plan";
import { useProfile } from "@/lib/use-profile";

const TERM_LABEL = "Winter 2027";
const YEARS = ["First year", "Second year", "Third year", "Fourth year", "Fifth year"];

export default function DegreePage() {
  const { profile, mounted, setMajor, setCourses, setOpenProgress, moveEntry, setExtraYear, resetLayout } = useProfile();
  const major = getMajor(profile.majorId);
  const program = getProgram(profile.majorId);
  // null until the student chooses: returning students with progress land on their plan.
  const [editing, setEditing] = useState<boolean | null>(null);
  const courses = useCourseSummaries(major);

  if (!mounted) return <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 text-sm text-slate-500">Loading…</main>;

  const showChecklist = major && (editing ?? profile.completed.length === 0);
  const step = !program ? 1 : !major || !showChecklist ? 3 : 2;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 sm:px-6 sm:py-10">
      <Steps step={step} />
      {!program ? (
        <MajorPicker onPick={(id) => { setMajor(id); setEditing(true); }} />
      ) : !major ? (
        <ProgramOverview program={program} onChange={() => setMajor(null)} />
      ) : showChecklist ? (
        <Checklist
          major={major}
          profile={profile}
          courses={courses}
          setCourses={setCourses}
          setOpenProgress={setOpenProgress}
          onDone={() => setEditing(false)}
          onChangeMajor={() => setMajor(null)}
        />
      ) : (
        <DegreePlan
          major={major}
          profile={profile}
          courses={courses}
          onEdit={() => setEditing(true)}
          onChangeMajor={() => setMajor(null)}
          moveEntry={moveEntry}
          setExtraYear={setExtraYear}
          resetLayout={resetLayout}
        />
      )}
    </main>
  );
}

function useCourseSummaries(major: Major | undefined): Map<string, CourseSummary> | null {
  const key = major ? majorCourseIds(major).join(",") : "";
  const [loaded, setLoaded] = useState<{ key: string; courses: CourseSummary[] } | null>(null);

  useEffect(() => {
    if (!key) return;
    const controller = new AbortController();
    fetch(`/api/courses?summary=1&ids=${encodeURIComponent(key)}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data: { courses: CourseSummary[] }) => setLoaded({ key, courses: data.courses }))
      .catch(() => {});
    return () => controller.abort();
  }, [key]);

  return useMemo(() => {
    if (!loaded || loaded.key !== key) return null;
    return new Map(loaded.courses.map((c) => [c.id, c]));
  }, [loaded, key]);
}

function Steps({ step }: { step: number }) {
  const labels = ["Your major", "What you've taken", "Your plan"];
  return (
    <ol className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm" aria-label="Progress">
      {labels.map((label, i) => {
        const n = i + 1;
        return (
          <li key={label} className="flex items-center gap-2" aria-current={n === step ? "step" : undefined}>
            <span className={`grid h-6 w-6 place-items-center rounded-full text-xs font-semibold ${n === step ? "bg-maize text-michigan" : n < step ? "bg-michigan text-white" : "bg-slate-200 text-slate-500"}`}>
              {n < step ? "✓" : n}
            </span>
            <span className={n === step ? "font-semibold text-michigan" : "text-slate-500"}>{label}</span>
            {n < labels.length && <span className="ml-1 hidden h-px w-8 bg-slate-300 sm:block" />}
          </li>
        );
      })}
    </ol>
  );
}

function MajorPicker({ onPick }: { onPick: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchPrograms(query), [query]);
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">What are you studying?</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Find your major, or your best guess if you haven&apos;t declared. You can change it anytime.
      </p>
      <input
        type="search"
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search majors"
        placeholder={`Search ${PROGRAMS.length} majors and programs`}
        className="mt-6 w-full max-w-xl rounded-md border border-slate-300 bg-white px-4 py-3 placeholder:text-slate-400 focus:border-michigan focus:outline-none"
      />
      {results.length === 0 ? (
        <p className="mt-6 text-sm text-slate-600">No matches. Try a shorter word, like &ldquo;bio&rdquo;.</p>
      ) : (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <li key={p.id}>
              <button
                onClick={() => onPick(p.id)}
                className="flex h-full w-full flex-col rounded-md border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-michigan"
              >
                <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{p.school}</span>
                <span className="mt-1 font-display font-semibold text-michigan">{p.name}</span>
                {hasFullPlan(p) && (
                  <span className="mt-2 self-start rounded bg-maize/40 px-2 py-0.5 text-[11px] font-semibold text-michigan">Full plan available</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function ProgramOverview({ program, onChange }: { program: Program; onChange: () => void }) {
  return (
    <section>
      <div className="rounded-md bg-michigan p-6 text-white sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-300">{program.school}</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white">{program.name}</h1>
          </div>
          <button onClick={onChange} className="rounded-md bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20">Change major</button>
        </div>
        <a
          href={program.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-md bg-maize px-5 py-2.5 font-semibold text-michigan hover:bg-maize-dark"
        >
          See official requirements ↗
        </a>
      </div>

      <p className="mt-6 max-w-2xl text-slate-600">
        We don&apos;t have a checklist or roadmap for this program yet. We only add them from official requirements, so nothing here is a guess. Until then, these will get you started:
      </p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {program.subject && (
          <li>
            <Link href={`/courses?department=${encodeURIComponent(program.subject)}&offered=1`} className="block h-full rounded-md border border-slate-200 bg-white p-5 hover:border-michigan">
              <span className="font-display font-semibold">{program.subject} courses in {TERM_LABEL}</span>
              <span className="mt-1 block text-sm text-slate-600">See sections, times, and instructors.</span>
            </Link>
          </li>
        )}
        <li>
          <Link href="/plan" className="block h-full rounded-md border border-slate-200 bg-white p-5 hover:border-michigan">
            <span className="font-display font-semibold">Build your schedule</span>
            <span className="mt-1 block text-sm text-slate-600">Add your courses and see every combination that fits.</span>
          </Link>
        </li>
        {!program.subject && (
          <li>
            <Link href="/courses?offered=1" className="block h-full rounded-md border border-slate-200 bg-white p-5 hover:border-michigan">
              <span className="font-display font-semibold">Browse {TERM_LABEL} courses</span>
              <span className="mt-1 block text-sm text-slate-600">Filter by school, subject, level, and credits.</span>
            </Link>
          </li>
        )}
      </ul>
    </section>
  );
}

type ChecklistProps = {
  major: Major;
  profile: Progress;
  courses: Map<string, CourseSummary> | null;
  setCourses: (ids: string[], done: boolean) => void;
  setOpenProgress: (id: string, amount: number) => void;
  onDone: () => void;
  onChangeMajor: () => void;
};

function Checklist({ major, profile, courses, setCourses, setOpenProgress, onDone, onChangeMajor }: ChecklistProps) {
  const statuses = evaluate(major, profile);
  const groups = groupStatuses(statuses);
  const known = new Set(major.requirements.flatMap((r) => r.anyOf?.flat() ?? []));
  const others = profile.completed.filter((id) => !known.has(id));

  return (
    <section>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">
            {major.name} · {major.school}{" "}
            <button onClick={onChangeMajor} className="ml-1 underline hover:text-michigan">Change</button>
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">What have you already taken?</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Tap every course you&apos;ve finished, including AP or transfer credit. Just starting? Skip straight to your plan.
          </p>
        </div>
        <button onClick={onDone} className="rounded-md bg-maize px-5 py-2.5 font-semibold text-michigan hover:bg-maize-dark">
          See my plan →
        </button>
      </div>

      <div className="mt-8 space-y-8">
        {groups.map(([group, items]) => (
          <div key={group}>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">{group}</h2>
            <ul className="divide-y divide-slate-100 rounded-md border border-slate-200 bg-white">
              {items.map((status) => (
                <li key={status.requirement.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 sm:max-w-[45%]">
                    <div className="flex items-center gap-2 font-medium text-michigan">
                      <DoneDot done={status.done} />
                      {status.requirement.label}
                    </div>
                    {status.requirement.note && <p className="mt-0.5 text-xs text-slate-500">{status.requirement.note}</p>}
                  </div>
                  {status.requirement.anyOf ? (
                    <div className="flex flex-wrap gap-1.5 sm:justify-end">
                      {status.requirement.anyOf.map((option) => {
                        const selected = option.every((id) => profile.completed.includes(id));
                        return (
                          <button
                            key={option.join("+")}
                            aria-pressed={selected}
                            onClick={() => setCourses(option, !selected)}
                            title={option.map((id) => courses?.get(id)?.title).filter(Boolean).join(" + ")}
                            className={`rounded-full border px-2.5 py-1 font-mono text-xs transition ${selected ? "border-michigan bg-michigan text-white" : "border-slate-300 bg-white text-slate-700 hover:border-michigan"}`}
                          >
                            {selected && "✓ "}{option.map(courseCode).join(" + ")}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <label className="flex items-center gap-2 text-sm text-slate-600">
                      <input
                        type="number"
                        min={0}
                        max={status.requirement.target}
                        value={profile.openProgress[status.requirement.id] ?? 0}
                        onChange={(e) => setOpenProgress(status.requirement.id, Number(e.target.value))}
                        aria-label={`${status.requirement.label}: ${status.requirement.unit === "course" ? "courses" : "credits"} completed`}
                        className="w-16 rounded-md border border-slate-300 bg-white px-2 py-1 text-center"
                      />
                      of {status.requirement.target} {status.requirement.unit === "course" ? "course" : "credits"}
                    </label>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Anything else you&apos;ve taken</h2>
          <div className="rounded-md border border-slate-200 bg-white p-4">
            <div className="max-w-sm">
              <CourseSearch label="Add another completed course" placeholder="Search any course…" exclude={profile.completed} onPick={(c) => setCourses([c.id], true)} />
            </div>
            {others.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {others.map((id) => (
                  <button key={id} onClick={() => setCourses([id], false)} className="rounded-full border border-michigan bg-michigan px-2.5 py-1 font-mono text-xs text-white">
                    ✓ {courseCode(id)} ✕
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button onClick={onDone} className="rounded-md bg-maize px-5 py-2.5 font-semibold text-michigan hover:bg-maize-dark">
          See my plan →
        </button>
      </div>
    </section>
  );
}

function DegreePlan({
  major,
  profile,
  courses,
  onEdit,
  onChangeMajor,
  moveEntry,
  setExtraYear,
  resetLayout,
}: {
  major: Major;
  profile: Progress;
  courses: Map<string, CourseSummary> | null;
  onEdit: () => void;
  onChangeMajor: () => void;
  moveEntry: (key: string, term: number) => void;
  setExtraYear: (on: boolean) => void;
  resetLayout: () => void;
}) {
  const statuses = useMemo(() => evaluate(major, profile), [major, profile]);
  const percent = percentComplete(statuses);
  const remaining = statuses.filter((s) => !s.done);

  return (
    <section>
      <div className="rounded-md bg-michigan p-6 text-white sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-300">{major.school}</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white">{major.name}</h1>
          </div>
          <div className="flex gap-2 text-sm">
            <button onClick={onEdit} className="rounded-md bg-white/10 px-3 py-1.5 hover:bg-white/20">Edit what I&apos;ve taken</button>
            <button onClick={onChangeMajor} className="rounded-md bg-white/10 px-3 py-1.5 hover:bg-white/20">Change major</button>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-4">
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/15" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label="Requirements complete">
            <div className="h-full rounded-full bg-maize" style={{ width: `${percent}%` }} />
          </div>
          <span className="font-display text-2xl font-semibold tabular-nums text-maize">{percent}%</span>
        </div>
        <p className="mt-2 text-sm text-slate-300">
          {statuses.length - remaining.length} of {statuses.length} requirements finished
        </p>
      </div>

      <NextSemester major={major} profile={profile} courses={courses} />

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <FourYearPlan major={major} profile={profile} statuses={statuses} moveEntry={moveEntry} setExtraYear={setExtraYear} resetLayout={resetLayout} />
        <Remaining statuses={statuses} />
      </div>

      <aside className="mt-10 rounded-md border border-slate-200 bg-white p-5 text-sm text-slate-600">
        <h2 className="font-display text-base font-semibold text-michigan">Before you rely on this</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {major.notes.map((note) => <li key={note}>{note}</li>)}
          <li>Requirements depend on when you started, and prerequisites aren&apos;t checked here. Confirm your plan with an advisor.</li>
        </ul>
        <p className="mt-3">
          Source: <a href={major.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">{major.sourceLabel} ↗</a>
        </p>
      </aside>
    </section>
  );
}

function NextSemester({ major, profile, courses }: { major: Major; profile: Progress; courses: Map<string, CourseSummary> | null }) {
  const { ids, add } = usePlan();
  const result = useMemo(
    () => (courses ? suggestNext(major, profile, (id) => courses.get(id)?.offered ?? false) : null),
    [major, profile, courses],
  );

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl font-semibold tracking-tight">What to take in {TERM_LABEL}</h2>
        <Link href="/plan" className="text-sm font-medium underline underline-offset-4">Open schedule builder →</Link>
      </div>
      <p className="mt-1 text-sm text-slate-500">Based on your plan order, what&apos;s offered next term, and EECS prerequisites from the Bulletin. Other subjects&apos; prerequisites aren&apos;t checked, so confirm them before registering.</p>
      {!result ? (
        <p className="mt-4 text-sm text-slate-500">Checking what&apos;s offered…</p>
      ) : result.suggestions.length === 0 && result.notOffered.length === 0 && result.blocked.length === 0 ? (
        <p className="mt-4 rounded-md border border-slate-200 bg-white p-5 text-sm text-slate-600">You&apos;ve finished every requirement listed here. Check with your advisor about graduation.</p>
      ) : (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {result.suggestions.map(({ requirement, options }) => (
            <li key={requirement.id} className="flex flex-col rounded-md border border-slate-200 bg-white p-4">
              <span className="font-display font-semibold text-michigan">{requirement.label}</span>
              {options.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {options.slice(0, 4).map((option) => {
                    const added = option.every((id) => ids.includes(id));
                    return (
                      <div key={option.join("+")} className="flex items-center overflow-hidden rounded-md border border-slate-200 text-xs">
                        <Link href={`/courses/${option[0]}`} className="px-2 py-1.5 font-mono font-medium text-michigan hover:underline" title={courses?.get(option[0])?.title}>
                          {option.map(courseCode).join(" + ")}
                        </Link>
                        <button
                          onClick={() => option.forEach(add)}
                          disabled={added}
                          aria-label={`Add ${option.map(courseCode).join(" and ")} to my schedule`}
                          className={`border-l border-slate-200 px-2 py-1.5 font-semibold ${added ? "text-slate-400" : "bg-maize text-michigan hover:bg-maize-dark"}`}
                        >
                          {added ? "Added" : "+ Add"}
                        </button>
                      </div>
                    );
                  })}
                  {options.length > 4 && <span className="self-center text-xs text-slate-500">+{options.length - 4} more</span>}
                </div>
              ) : (
                <p className="mt-2 text-sm text-slate-600">
                  {requirement.note ?? "Your choice."}{" "}
                  {requirement.browse && <BrowseLink href={requirement.browse} />}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
      {result && result.blocked.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-slate-500">
          {result.blocked.map(({ requirement, missing }) => (
            <li key={requirement.id}>
              <span className="font-medium text-slate-700">{requirement.label}</span> opens after{" "}
              {missing.map(describeGroup).join(" and ")}.
            </li>
          ))}
        </ul>
      )}
      {result && result.notOffered.length > 0 && (
        <p className="mt-3 text-sm text-slate-500">
          Up next, but not on the {TERM_LABEL} schedule: {result.notOffered.map((r) => r.label).join(", ")}.
        </p>
      )}
    </div>
  );
}

function BrowseLink({ href }: { href: string }) {
  const external = href.startsWith("http");
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium underline">See options ↗</a>
  ) : (
    <Link href={href} className="font-medium underline">See options →</Link>
  );
}

const STATUS_STYLES: Record<YearStatus, string> = {
  Complete: "bg-michigan text-maize",
  "In progress": "bg-maize text-michigan",
  "Not started": "bg-slate-100 text-slate-600",
};

function FourYearPlan({
  major,
  profile,
  statuses,
  moveEntry,
  setExtraYear,
  resetLayout,
}: {
  major: Major;
  profile: Progress;
  statuses: RequirementStatus[];
  moveEntry: (key: string, term: number) => void;
  setExtraYear: (on: boolean) => void;
  resetLayout: () => void;
}) {
  const terms = useMemo(() => arrangePlan(major, profile), [major, profile]);
  const finished = useMemo(() => finishedEntries(terms, statuses), [terms, statuses]);
  // Finished years start collapsed; the student can open any of them.
  const [toggled, setToggled] = useState<Record<number, boolean>>({});
  const yearCount = Math.ceil(terms.length / 2);
  const customized = Object.keys(profile.layout ?? {}).length > 0 || !!profile.extraYear;

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl font-semibold tracking-tight">Your roadmap</h2>
        <span className="text-xs text-slate-500">Changes save in this browser</span>
      </div>
      <p className="mt-1 text-sm text-slate-500">
        {major.planIsOfficial ? (
          <>Starts from the department&apos;s <a href={major.planSourceUrl} target="_blank" rel="noopener noreferrer" className="underline">official sample schedule ↗</a>. Move courses to fit your plans, as long as you follow prerequisites.</>
        ) : (
          <>Starts from Backpacker&apos;s suggested order, not an official U-M plan. The requirements are official; the timing is yours to change.</>
        )}
      </p>
      <div className="mt-4 space-y-3">
        {Array.from({ length: yearCount }, (_, y) => {
          const yearTerms = terms.slice(y * 2, y * 2 + 2);
          const status = yearStatus(yearTerms, finished);
          const open = toggled[y] ?? status !== "Complete";
          return (
            <section key={y} className="rounded-md border border-slate-200 bg-white">
              <h3>
                <button
                  onClick={() => setToggled((cur) => ({ ...cur, [y]: !open }))}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-3 p-4 text-left"
                >
                  <span className="font-display font-semibold">{YEARS[y] ?? `Year ${y + 1}`}</span>
                  <span className="flex items-center gap-2">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[status]}`}>{status}</span>
                    <span aria-hidden="true" className="text-slate-400">{open ? "▾" : "▸"}</span>
                  </span>
                </button>
              </h3>
              {open && (
                <div className="grid gap-3 border-t border-slate-100 p-4 sm:grid-cols-2">
                  {yearTerms.map((term, t) => (
                    <TermCard
                      key={t}
                      termIndex={y * 2 + t}
                      term={term}
                      termCount={terms.length}
                      finished={finished}
                      moveEntry={moveEntry}
                    />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-3 text-sm">
        {yearCount < 5 && (
          <button onClick={() => setExtraYear(true)} className="rounded-md border border-slate-300 bg-white px-3 py-1.5 hover:border-michigan">
            + Add a fifth year
          </button>
        )}
        {customized && (
          <button onClick={resetLayout} className="px-1 text-slate-500 underline hover:text-michigan">
            Reset to the original plan
          </button>
        )}
      </div>
    </div>
  );
}

function TermCard({
  termIndex,
  term,
  termCount,
  finished,
  moveEntry,
}: {
  termIndex: number;
  term: PlacedEntry[];
  termCount: number;
  finished: Set<string>;
  moveEntry: (key: string, term: number) => void;
}) {
  const credits = term.reduce((sum, e) => sum + (e.credits ?? 0), 0);
  return (
    <div className="rounded-md bg-slate-50 p-3">
      <div className="mb-2 flex items-baseline justify-between text-xs text-slate-500">
        <span className="font-semibold">Term {termIndex + 1}</span>
        {credits > 0 && <span>{credits} credits</span>}
      </div>
      {term.length === 0 && <p className="text-xs text-slate-400">Nothing planned</p>}
      <ul className="space-y-1.5 text-sm">
        {term.map((entry) => {
          const done = finished.has(entry.key);
          return (
            <li key={entry.key} className="flex items-start gap-2">
              <DoneDot done={done} muted={!entry.req} />
              <span className={`min-w-0 flex-1 ${done ? "text-slate-400 line-through" : entry.req ? "text-michigan" : "text-slate-500"}`}>
                {entry.label}
                {entry.credits !== undefined && <span className="ml-1 text-xs text-slate-400">{entry.credits} cr</span>}
              </span>
              {entry.req && !done && (
                <select
                  value={termIndex}
                  onChange={(e) => moveEntry(entry.key, Number(e.target.value))}
                  aria-label={`Move ${entry.label} to another term`}
                  className="max-w-[4.25rem] shrink-0 rounded border border-slate-200 bg-white px-1 py-0.5 text-[11px] text-slate-500"
                >
                  {Array.from({ length: termCount }, (_, i) => (
                    <option key={i} value={i}>Term {i + 1}</option>
                  ))}
                </select>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Remaining({ statuses }: { statuses: RequirementStatus[] }) {
  const groups = groupStatuses(statuses);
  return (
    <div>
      <h2 className="text-xl font-semibold tracking-tight">Requirements</h2>
      <p className="mt-1 text-sm text-slate-500">Everything your major needs, and what can fill it.</p>
      <div className="mt-4 space-y-5">
        {groups.map(([group, items]) => (
          <div key={group}>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">{group}</h3>
            <ul className="divide-y divide-slate-100 rounded-md border border-slate-200 bg-white text-sm">
              {items.map(({ requirement, done, progress }) => (
                <li key={requirement.id} className="p-3">
                  <div className={`flex items-start gap-2 ${done ? "text-slate-400" : "text-michigan"}`}>
                    <DoneDot done={done} />
                    <span className="flex-1 font-medium">{requirement.label}</span>
                    {requirement.target && <span className="text-xs tabular-nums">{progress}/{requirement.target}</span>}
                  </div>
                  {!done && <RequirementDetail requirement={requirement} />}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function RequirementDetail({ requirement }: { requirement: Requirement }) {
  return (
    <div className="mt-1 pl-5 text-xs text-slate-500">
      {requirement.anyOf && <p className="font-mono">{requirement.anyOf.map((o) => o.map(courseCode).join(" + ")).join(" · ")}</p>}
      {requirement.note && <p className="mt-0.5">{requirement.note}</p>}
      {requirement.browse && <p className="mt-0.5"><BrowseLink href={requirement.browse} /></p>}
    </div>
  );
}

function DoneDot({ done, muted }: { done: boolean; muted?: boolean }) {
  return (
    <span
      aria-label={muted ? undefined : done ? "Done" : "Not done"}
      className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full text-[10px] ${done ? "bg-michigan text-maize" : muted ? "border border-dashed border-slate-300" : "border border-slate-400"}`}
    >
      {done && "✓"}
    </span>
  );
}

function groupStatuses(statuses: RequirementStatus[]): [string, RequirementStatus[]][] {
  const groups = new Map<string, RequirementStatus[]>();
  for (const s of statuses) {
    if (!groups.has(s.requirement.group)) groups.set(s.requirement.group, []);
    groups.get(s.requirement.group)!.push(s);
  }
  return [...groups];
}
