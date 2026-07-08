import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  aGradePercent,
  getAllCourses,
  getDepartmentAverages,
  getDepartments,
  sortCourses,
  type Course,
} from "@/lib/courses";
import {
  getDeptName,
  getSubjectResources,
  UNIVERSAL_RESOURCES,
  type Resource,
} from "@/lib/resources";

export function generateStaticParams() {
  return getDepartments().map((dept) => ({ dept }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ dept: string }>;
}): Promise<Metadata> {
  const { dept } = await params;
  const name = getDeptName(dept);
  return {
    title: `${dept} — ${name}`,
    description: `${name} courses at the University of Michigan: workload, grade outcomes, and study resources.`,
  };
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ dept: string }>;
}) {
  const { dept } = await params;
  const courses = getAllCourses().filter((c) => c.department === dept);
  if (courses.length === 0) notFound();

  const avg = getDepartmentAverages()[dept];
  const resources = getSubjectResources(dept);
  const popular = pickPopular(courses, 6);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
      <Link
        href="/subjects"
        className="mb-6 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-michigan"
      >
        ← All subjects
      </Link>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="font-mono text-xs font-semibold text-slate-500">{dept}</div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">{getDeptName(dept)}</h1>
        </div>
        <Link
          href={`/courses?department=${encodeURIComponent(dept)}`}
          className="rounded-md bg-michigan px-4 py-2 text-sm font-medium text-white hover:bg-michigan-light"
        >
          View all {courses.length.toLocaleString()} courses →
        </Link>
      </div>

      {avg && (
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <Stat label="Courses" value={avg.count.toLocaleString()} unit="in catalog" />
          <Stat label="Avg workload" value={avg.workload.toFixed(1)} unit="hrs / week" />
          <Stat
            label="Avg GPA"
            value={avg.meanGpa > 0 ? avg.meanGpa.toFixed(2) : "—"}
            unit="across graded courses"
          />
        </div>
      )}

      <section className="mt-10">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Resources for {dept} students
        </h2>
        <ResourceList resources={resources} />
      </section>

      {popular.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Popular courses
          </h2>
          <ul className="divide-y divide-slate-100 overflow-hidden rounded-md border border-slate-200">
            {popular.map((c) => {
              const aPct = c.grades ? Math.round(aGradePercent(c.grades.buckets)) : null;
              return (
                <li key={c.id}>
                  <Link
                    href={`/courses/${c.id}`}
                    className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-slate-50"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="font-mono text-xs font-semibold text-slate-700">
                        {c.code}
                      </span>
                      <div className="truncate text-sm text-slate-700">{c.title}</div>
                    </div>
                    <div className="flex shrink-0 items-center gap-4 text-xs tabular-nums text-slate-600">
                      <Cell label="hrs/wk" value={c.workloadHoursPerWeek > 0 ? `${c.workloadHoursPerWeek}` : "—"} />
                      <Cell label="median" value={c.grades?.median ?? "—"} />
                      <Cell label="%A" value={aPct !== null ? `${aPct}%` : "—"} />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className="mt-10">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Campus-wide resources
        </h2>
        <ResourceList resources={UNIVERSAL_RESOURCES} />
      </section>
    </main>
  );
}

function pickPopular(courses: Course[], n: number): Course[] {
  // curated (real data) first, then highest-rated, then lowest course number
  const curated = courses.filter((c) => c.dataQuality === "curated");
  const rest = sortCourses(
    courses.filter((c) => c.dataQuality !== "curated"),
    "code-asc",
  );
  return [...curated.sort((a, b) => b.studentRating - a.studentRating), ...rest].slice(0, n);
}

function ResourceList({ resources }: { resources: Resource[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {resources.map((r) => (
        <li key={r.url}>
          <a
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full rounded-md border border-slate-200 bg-white p-4 transition-colors hover:border-michigan/40 hover:bg-slate-50"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium text-michigan">{r.name}</span>
              <span className="text-xs text-slate-400">↗</span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">{r.description}</p>
          </a>
        </li>
      ))}
    </ul>
  );
}

function Stat({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-4">
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 text-xl font-semibold tabular-nums">{value}</div>
      <div className="text-xs text-slate-500">{unit}</div>
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-12 flex-col items-end leading-tight">
      <span className="text-michigan">{value}</span>
      <span className="text-[10px] text-slate-400">{label}</span>
    </div>
  );
}
