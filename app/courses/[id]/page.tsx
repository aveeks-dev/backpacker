import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCourses, getCourse, type Section } from "@/lib/courses";
import { SiteHeader } from "@/components/site-header";
import { AddToPlanButton } from "./_components/add-to-plan";

export function generateStaticParams() {
  return getAllCourses().map((c) => ({ id: c.id }));
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = getCourse(id);
  if (!course) notFound();

  const { aPercent, bPercent, cOrLowerPercent } = course.grades;

  return (
    <div className="flex min-h-full flex-col bg-white">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-10">
        <Link
          href="/courses"
          className="mb-6 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900"
        >
          ← All courses
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-mono text-xs font-semibold text-slate-700">{course.code}</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500">{course.department}</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500">{course.credits} credits</span>
            </div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">{course.title}</h1>
          </div>
          <AddToPlanButton courseId={course.id} />
        </div>

        <p className="mt-4 max-w-2xl text-slate-600">{course.description}</p>

        {course.fulfills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {course.fulfills.map((f) => (
              <span
                key={f}
                className="rounded-full border border-slate-200 px-2.5 py-0.5 text-xs text-slate-600"
              >
                {f}
              </span>
            ))}
          </div>
        )}

        <div className="mt-8 grid gap-3 sm:grid-cols-4">
          <Stat label="Workload" value={course.workloadHoursPerWeek.toString()} unit="hrs / week" />
          <Stat label="Difficulty" value={course.difficulty.toString()} unit="of 5" />
          <Stat
            label="Median grade"
            value={course.grades.median}
            unit={`mean ${course.grades.mean.toFixed(1)}`}
          />
          <Stat label="Student rating" value={course.studentRating.toFixed(1)} unit="of 5" />
        </div>

        <section className="mt-10">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Grade distribution
          </h2>
          <div className="flex h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full bg-emerald-500" style={{ width: `${aPercent}%` }} />
            <div className="h-full bg-emerald-300" style={{ width: `${bPercent}%` }} />
            <div className="h-full bg-amber-400" style={{ width: `${cOrLowerPercent}%` }} />
          </div>
          <div className="mt-2 flex gap-6 text-xs text-slate-600">
            <Legend color="bg-emerald-500" label={`A: ${aPercent}%`} />
            <Legend color="bg-emerald-300" label={`B: ${bPercent}%`} />
            <Legend color="bg-amber-400" label={`C or lower: ${cOrLowerPercent}%`} />
          </div>
        </section>

        {course.prereqs.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Prerequisites
            </h2>
            <ul className="text-sm text-slate-700">
              {course.prereqs.map((p) => (
                <li key={p}>· {p}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-10">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Sections
          </h2>
          <div className="overflow-hidden rounded-md border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3 font-medium">Section</th>
                  <th className="px-4 py-3 font-medium">Professor</th>
                  <th className="px-4 py-3 font-medium">Meets</th>
                  <th className="px-4 py-3 font-medium">Enrollment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {course.sections.map((s) => (
                  <SectionRow key={s.id} section={s} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

function SectionRow({ section }: { section: Section }) {
  const fillPct = Math.round((section.enrolled / section.capacity) * 100);
  const meetingStr = section.meetings
    .map((m) => `${m.days.join("")} ${m.start}–${m.end}`)
    .join(", ");
  return (
    <tr>
      <td className="px-4 py-3 font-mono text-xs">{section.number}</td>
      <td className="px-4 py-3 text-slate-700">{section.professor}</td>
      <td className="px-4 py-3 text-slate-600">{meetingStr}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xs tabular-nums text-slate-600">
            {section.enrolled}/{section.capacity}
          </span>
          <div className="h-1 w-16 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full ${fillPct >= 95 ? "bg-rose-500" : "bg-slate-400"}`}
              style={{ width: `${fillPct}%` }}
            />
          </div>
        </div>
      </td>
    </tr>
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

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      {label}
    </span>
  );
}
