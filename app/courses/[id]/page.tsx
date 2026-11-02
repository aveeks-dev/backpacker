import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InstructorLinks } from "@/components/instructor-links";
import { SaveCourseButton } from "@/components/save-course-button";
import {
  CURRENT_TERM,
  getCourse,
  getCourseLevel,
  getInstructors,
  getSimilarCourses,
  isOffered,
  levelLabel,
} from "@/lib/courses";
import { WEEKDAYS, DAY_LABELS, componentLabel, formatMeeting } from "@/lib/format";
import { describePrereqs, PREREQ_SOURCE } from "@/lib/prereqs";
import type { ScheduleSection } from "@/lib/registrar";
import { getDeptName, getSubjectResources } from "@/lib/resources";
import { AddToPlanButton } from "./_components/add-to-plan";
import { SimilarCourses } from "./_components/similar-courses";

// Static class names so Tailwind can see them.
const COMPONENT_TONES: Record<string, string> = {
  LEC: "bg-michigan text-white",
  LAB: "bg-sky-100 text-sky-950",
  DIS: "bg-emerald-100 text-emerald-950",
  REC: "bg-violet-100 text-violet-950",
  SEM: "bg-maize/40 text-michigan",
  MID: "bg-amber-100 text-amber-950",
};
const DEFAULT_TONE = "bg-slate-100 text-michigan";

// Backpacker's own questions. Shown empty until there are real student responses.
const RATING_QUESTIONS = [
  { label: "Would recommend", detail: "Students who would recommend this course" },
  { label: "Learned a lot", detail: "Students who felt they learned a lot" },
  { label: "Heavy workload", detail: "Students who found the workload heavier than most" },
  { label: "Clear expectations", detail: "Students who knew what was expected" },
  { label: "More interested", detail: "Students who left more interested in the subject" },
];

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
  const instructors = getInstructors(course);
  const prereqs = describePrereqs(course.id);
  const similar = getSimilarCourses(course, 6);

  // Group sections by component, lectures first, exams last.
  const groups = new Map<string, ScheduleSection[]>();
  for (const s of course.sections) {
    if (!groups.has(s.component)) groups.set(s.component, []);
    groups.get(s.component)!.push(s);
  }
  const order = (c: string) => (c === "LEC" ? 0 : c === "MID" ? 2 : 1);
  const grouped = [...groups].sort(([a], [b]) => order(a) - order(b) || a.localeCompare(b));
  const regular = course.sections.filter((s) => s.component !== "MID");
  const dayCounts = WEEKDAYS.map((day) => ({
    day,
    count: regular.filter((s) => s.meetings.some((m) => m.days.includes(day))).length,
  }));
  const maxDay = Math.max(1, ...dayCounts.map((d) => d.count));

  return (
    <main className="flex-1">
      <section className="hero text-white">
        <div className="mx-auto w-full max-w-5xl px-6 pb-16 pt-8 sm:pt-10">
          <Link href="/courses" className="text-sm text-slate-300 hover:text-maize">
            ← All courses
          </Link>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-5">
            <div className="min-w-0">
              <p className="font-mono text-sm font-semibold text-maize">{course.code}</p>
              <h1 className="mt-1 text-3xl font-bold leading-tight text-white sm:text-4xl">{course.title}</h1>
              <p className="mt-2 text-sm text-slate-200">
                <Link href={`/subjects/${course.department}`} className="underline-offset-2 hover:underline">
                  {getDeptName(course.department)}
                </Link>
                {" · "}{levelLabel(getCourseLevel(course))}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 rounded-lg bg-white p-1.5 text-michigan">
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
        </div>
      </section>

      <div className="mx-auto w-full max-w-5xl px-6 pb-8">
        <div className="-mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Fact tone="bg-maize text-michigan" label="Credits" value={course.credits ?? "—"} />
          <Fact tone="bg-white text-michigan border border-slate-200" label={CURRENT_TERM.label} value={offered ? "Offered" : "Not offered"} />
          <Fact tone="bg-sky-100 text-sky-950" label="Sections" value={regular.length ? String(regular.length) : "—"} />
          <Fact tone="bg-emerald-100 text-emerald-950" label="Instructors" value={instructors.length ? String(instructors.length) : "—"} />
        </div>

        <section className="mt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-2xl font-semibold">Student ratings</h2>
            <span className="rounded-full bg-maize/40 px-3 py-1 text-xs font-semibold">Coming soon</span>
          </div>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">
            Ratings from U-M students who use Backpacker will appear here, so you can see how a course really felt.
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
            {RATING_QUESTIONS.map((q) => (
              <li key={q.label} className="flex flex-col items-center rounded-md border border-slate-200 bg-white p-4 text-center">
                <span aria-hidden="true" className="grid h-16 w-16 place-items-center rounded-full border-[6px] border-slate-100 font-display text-lg font-semibold text-slate-400">—</span>
                <span className="mt-3 font-display text-sm font-semibold">{q.label}</span>
                <span className="mt-1 text-[11px] leading-snug text-slate-500">{q.detail}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <section className="rounded-md border-l-4 border-maize bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">Prerequisites</h2>
            {prereqs ? (
              <>
                <p className="mt-1">{prereqs}</p>
                <p className="mt-1 text-xs text-slate-500">
                  Enforced, usually with a C or better.{" "}
                  <a href={PREREQ_SOURCE} target="_blank" rel="noopener noreferrer" className="underline">Engineering Bulletin ↗</a>
                </p>
              </>
            ) : (
              <p className="mt-1 text-sm text-slate-600">Not listed on Backpacker yet. Check Wolverine Access before registering.</p>
            )}
          </section>
          {offered && (
            <section className="rounded-md border-l-4 border-michigan bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold">Which days it meets</h2>
              <p className="text-xs text-slate-500">Number of {CURRENT_TERM.label} sections meeting each day</p>
              <ul className="mt-3 flex h-24 items-end gap-2">
                {dayCounts.map(({ day, count }) => (
                  <li key={day} className="flex h-full flex-1 flex-col items-center justify-end gap-1 text-xs">
                    <span className="font-semibold tabular-nums">{count}</span>
                    <span className="w-full rounded-t bg-michigan" style={{ height: `${Math.max(3, (count / maxDay) * 60)}%` }} />
                    <span className="text-slate-500">{DAY_LABELS[day]}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {instructors.length > 0 && (
          <section className="mt-10 rounded-md bg-michigan p-5 text-white sm:p-6">
            <h2 className="text-xl font-semibold text-white">Who&apos;s teaching in {CURRENT_TERM.label}</h2>
            <p className="mt-1 text-xs text-slate-300">
              Reviews open on Rate My Professors. The Registrar lists last names only, so check it&apos;s the right person.
            </p>
            <div className="mt-3 font-medium">
              <InstructorLinks names={instructors} />
            </div>
          </section>
        )}

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">{CURRENT_TERM.label} sections</h2>
          {!offered ? (
            <p className="mt-3 rounded-md border border-slate-200 bg-white p-4 text-sm text-slate-600">
              {course.code} isn&apos;t on the Registrar&apos;s {CURRENT_TERM.label} schedule.
            </p>
          ) : (
            <div className="mt-4 space-y-5">
              {grouped.map(([component, sections]) => (
                <div key={component} className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
                  <h3 className={`flex items-baseline justify-between px-4 py-2.5 text-sm font-semibold ${COMPONENT_TONES[component] ?? DEFAULT_TONE}`}>
                    <span>
                      {componentLabel(component)}
                      {component === "MID" && <span className="ml-2 font-normal">Exam times, not regular meetings</span>}
                    </span>
                    <span className="font-normal">{sections.length}</span>
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[560px] text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
                          <th className="px-4 py-2 font-medium">Section</th>
                          <th className="px-4 py-2 font-medium">Meets</th>
                          <th className="px-4 py-2 font-medium">Room</th>
                          <th className="px-4 py-2 font-medium">Instructors</th>
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
                className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 transition-colors hover:border-michigan/40"
              >
                {r.name} ↗
              </a>
            ))}
            <Link
              href={`/subjects/${course.department}`}
              className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-michigan"
            >
              All {course.department} resources →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function Fact({ tone, label, value }: { tone: string; label: string; value: string }) {
  return (
    <div className={`rounded-md p-4 shadow-sm ${tone}`}>
      <div className="text-[11px] font-semibold uppercase tracking-wide opacity-75">{label}</div>
      <div className="mt-0.5 font-display text-xl font-semibold tabular-nums">{value}</div>
    </div>
  );
}

function SectionRow({ section }: { section: ScheduleSection }) {
  return (
    <tr className="align-top even:bg-slate-50">
      <td className="px-4 py-2.5">
        <span className="font-mono text-xs font-semibold">{section.number}</span>
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
