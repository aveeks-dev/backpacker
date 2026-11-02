import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CURRENT_TERM, getAllCourses, getDepartments, isOffered } from "@/lib/courses";
import { sectionSummary } from "@/lib/format";
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
    description: `${name} courses at the University of Michigan: ${CURRENT_TERM.label} sections and study resources.`,
  };
}

const SHOWN_OFFERED = 8;

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ dept: string }>;
}) {
  const { dept } = await params;
  const courses = getAllCourses().filter((c) => c.department === dept);
  if (courses.length === 0) notFound();

  const offered = courses.filter(isOffered);
  const resources = getSubjectResources(dept);

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

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Stat label="Courses" value={courses.length.toLocaleString()} unit="in the catalog" />
        <Stat label={CURRENT_TERM.label} value={offered.length.toLocaleString()} unit="courses offered" />
      </div>

      <section className="mt-10">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Resources for {dept} students
        </h2>
        <ResourceList resources={resources} />
      </section>

      {offered.length > 0 && (
        <section className="mt-10">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Offered in {CURRENT_TERM.label}
            </h2>
            {offered.length > SHOWN_OFFERED && (
              <Link
                href={`/courses?department=${encodeURIComponent(dept)}&offered=1`}
                className="text-sm text-michigan hover:underline"
              >
                All {offered.length} →
              </Link>
            )}
          </div>
          <ul className="divide-y divide-slate-100 overflow-hidden rounded-md border border-slate-200">
            {offered.slice(0, SHOWN_OFFERED).map((c) => (
              <li key={c.id}>
                <Link
                  href={`/courses/${c.id}`}
                  className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-slate-50"
                >
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-xs font-semibold text-slate-700">{c.code}</span>
                    <div className="truncate text-sm text-slate-700">{c.title}</div>
                  </div>
                  <span className="shrink-0 text-xs text-slate-500">{sectionSummary(c.sections)}</span>
                </Link>
              </li>
            ))}
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
