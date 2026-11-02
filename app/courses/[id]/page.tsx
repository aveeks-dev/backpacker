import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CURRENT_TERM,
  getCourse,
  getCourseLevel,
  getInstructors,
  getSimilarCourses,
  isOffered,
  levelLabel,
} from "@/lib/courses";
import { InstructorLinks } from "@/components/instructor-links";
import { componentLabel, formatMeeting, sectionSummary } from "@/lib/format";
import { describePrereqs, PREREQ_SOURCE } from "@/lib/prereqs";
import type { ScheduleSection } from "@/lib/registrar";
import { getDeptName, getSubjectResources } from "@/lib/resources";
import { SaveCourseButton } from "@/components/save-course-button";
import { AddToPlanButton } from "./_components/add-to-plan";
import { SimilarCourses } from "./_components/similar-courses";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const course = getCourse(id);
  if (!course) return { title: "Course not found" };
  return {
    title: `${course.code} — ${course.title}`,
    description: isOffered(course)
      ? `${course.code} (${course.title}) at the University of Michigan: ${CURRENT_TERM.label} sections, meeting times, and instructors.`
      : `${course.code} (${course.title}) at the University of Michigan.`,
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = getCourse(id);
  if (!course) notFound();

  const offered = isOffered(course);
  const similar = getSimilarCourses(course, 6);
  // Group sections by component, lectures first, exams last.
  const groups = new Map<string, ScheduleSection[]>();
  for (const s of course.sections) {
    if (!groups.has(s.component)) groups.set(s.component, []);
    groups.get(s.component)!.push(s);
  }
  const order = (c: string) => (c === "LEC" ? 0 : c === "MID" ? 2 : 1);
  const grouped = [...groups].sort(([a], [b]) => order(a) - order(b) || a.localeCompare(b));

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-10">
      <Link
        href="/courses"
        className="mb-6 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-michigan"
      >
        ← All courses
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-mono text-xs font-semibold text-slate-700">{course.code}</span>
            <span className="text-slate-400">·</span>
            <Link
              href={`/subjects/${course.department}`}
              className="text-slate-500 underline-offset-2 hover:text-michigan hover:underline"
            >
              {getDeptName(course.department)}
            </Link>
            {course.credits && (
              <>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500">{course.credits} credits</span>
              </>
            )}
            <span className="text-slate-400">·</span>
            <span className="text-slate-500">{levelLabel(getCourseLevel(course))}</span>
          </div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">{course.title}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <SaveCourseButton courseId={course.id} withLabel />
          <Link
            href={`/compare?ids=${course.id}`}
            className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
          >
            Compare
          </Link>
          {offered && <AddToPlanButton courseId={course.id} />}
        </div>
      </div>

      <section className="mt-8 grid gap-3 sm:grid-cols-2">
        <div className="rounded-md border border-slate-200 bg-white p-5">
          <h2 className="font-display text-base font-semibold">Prerequisites</h2>
          {describePrereqs(course.id) ? (
            <>
              <p className="mt-1 text-sm">{describePrereqs(course.id)}</p>
              <p className="mt-1 text-xs text-slate-500">
                Enforced, usually with a C or better.{" "}
                <a href={PREREQ_SOURCE} target="_blank" rel="noopener noreferrer" className="underline">Engineering Bulletin ↗</a>
              </p>
            </>
          ) : (
            <p className="mt-1 text-sm text-slate-600">Not listed on Backpacker yet. Check Wolverine Access or Atlas before registering.</p>
          )}
        </div>
        <div className="rounded-md border border-slate-200 bg-white p-5">
          <h2 className="font-display text-base font-semibold">Student evaluations and grades</h2>
          <p className="mt-1 text-sm text-slate-600">See workload, how much students learned, and past grades on Atlas. Requires a U-M login.</p>
          <a
            href={`https://atlas.ai.umich.edu/courses/${course.code.replace(/\s+/g, "")}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block rounded-md bg-michigan px-3 py-1.5 text-sm font-medium text-white hover:bg-michigan-light"
          >
            See evaluations on Atlas ↗
          </a>
        </div>
      </section>

      {getInstructors(course).length > 0 && (
        <section className="mt-8 rounded-md border border-slate-200 bg-white p-5">
          <h2 className="font-display text-base font-semibold">Who&apos;s teaching in {CURRENT_TERM.label}</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Reviews open on Rate My Professors. The Registrar lists last names only, so check it&apos;s the right person.
          </p>
          <div className="mt-3 text-sm font-medium">
            <InstructorLinks names={getInstructors(course)} />
          </div>
        </section>
      )}

      <section className="mt-10">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            {CURRENT_TERM.label} sections
          </h2>
          {offered && <span className="text-xs text-slate-500">{sectionSummary(course.sections)}</span>}
        </div>
        {!offered ? (
          <p className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            {course.code} isn&apos;t on the Registrar&apos;s {CURRENT_TERM.label} schedule.
          </p>
        ) : (
          <div className="space-y-6">
            {grouped.map(([component, sections]) => (
              <div key={component}>
                <h3 className="mb-2 text-sm font-medium text-slate-700">
                  {componentLabel(component)}
                  {component === "MID" && (
                    <span className="ml-2 font-normal text-slate-500">(evening exam times, not regular meetings)</span>
                  )}
                </h3>
                <div className="overflow-x-auto rounded-md border border-slate-200">
                  <table className="w-full min-w-[560px] text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                        <th className="px-4 py-2.5 font-medium">Section</th>
                        <th className="px-4 py-2.5 font-medium">Meets</th>
                        <th className="px-4 py-2.5 font-medium">Room</th>
                        <th className="px-4 py-2.5 font-medium">Instructors</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {sections.map((s) => (
                        <SectionRow key={s.classNumber} section={s} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
                      </div>
        )}
      </section>

      <SimilarCourses similar={similar} />

      <section className="mt-10">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Resources for {course.department} students
        </h2>
        <div className="flex flex-wrap gap-2">
          {getSubjectResources(course.department).map((r) => (
            <a
              key={r.url}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              title={r.description}
              className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 transition-colors hover:border-michigan/40 hover:bg-slate-50"
            >
              {r.name} ↗
            </a>
          ))}
          <Link
            href={`/subjects/${course.department}`}
            className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-michigan hover:bg-slate-50"
          >
            All {course.department} resources →
          </Link>
        </div>
      </section>
    </main>
  );
}

function SectionRow({ section }: { section: ScheduleSection }) {
  return (
    <tr className="align-top">
      <td className="px-4 py-2.5">
        <span className="font-mono text-xs">{section.number}</span>
        <div className="text-[11px] text-slate-400">#{section.classNumber}</div>
      </td>
      <td className="px-4 py-2.5 text-slate-700">
        {section.meetings.length === 0
          ? <span className="text-slate-400">Arranged</span>
          : section.meetings.map((m, i) => <div key={i}>{formatMeeting(m)}</div>)}
      </td>
      <td className="px-4 py-2.5 text-slate-600">
        {section.meetings.map((m, i) => <div key={i}>{m.location || "—"}</div>)}
      </td>
      <td className="px-4 py-2.5 text-slate-700">
        <InstructorLinks names={section.instructors} />
      </td>
    </tr>
  );
}
