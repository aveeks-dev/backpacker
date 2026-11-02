import Link from "next/link";
import type { Metadata } from "next";
import {
  CURRENT_TERM,
  getCourse,
  getCourseLevel,
  getCoursesById,
  getInstructors,
  isOffered,
  levelLabel,
  type Course,
} from "@/lib/courses";
import { InstructorLinks } from "@/components/instructor-links";
import { formatMeetings, sectionSummary } from "@/lib/format";
import { CompareSearch } from "./_components/compare-search";

export const metadata: Metadata = {
  title: "Compare courses",
  description: `Compare University of Michigan courses side-by-side: credits, ${CURRENT_TERM.label} sections, lecture times, and instructors.`,
};

const MAX_COMPARE = 4;

type SearchParams = Promise<{ ids?: string }>;

export default async function ComparePage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const ids = parseIds(sp.ids);
  const courses = getCoursesById(ids).slice(0, MAX_COMPARE);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
      <div className="mb-4 flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Compare</h1>
        {courses.length > 0 && (
          <span className="text-sm text-slate-500">
            {courses.length} of {MAX_COMPARE} courses
          </span>
        )}
      </div>
      <p className="mb-6 max-w-2xl text-sm text-slate-600">
        Line up to four courses side-by-side: credits, when the lectures meet in{" "}
        {CURRENT_TERM.label}, and who teaches them.
      </p>

      <div className="mb-6 flex items-center gap-3">
        <div className="w-full max-w-sm">
          <CompareSearch existing={courses.map((c) => c.id)} disabled={courses.length >= MAX_COMPARE} />
        </div>
        {courses.length > 0 && (
          <Link href="/compare" className="text-sm text-slate-500 hover:text-michigan">
            Clear
          </Link>
        )}
      </div>

      {courses.length === 0 ? <EmptyState /> : <CompareTable courses={courses} />}
    </main>
  );
}

function parseIds(raw: string | undefined): string[] {
  if (!raw) return [];
  return Array.from(new Set(raw.split(",").map((s) => s.trim()).filter(Boolean)));
}

function EmptyState() {
  const examples = [
    ["eecs-280", "eecs-281"],
    ["eecs-281", "eecs-370"],
    ["math-217", "math-215"],
    ["psych-111", "psych-230"],
  ].filter((pair) => pair.every((id) => getCourse(id)));

  return (
    <div className="rounded-md border border-slate-200 bg-white p-8">
      <h2 className="text-lg font-medium">No courses to compare yet.</h2>
      <p className="mt-1 text-sm text-slate-600">Add up to 4 courses with the search box above.</p>
      {examples.length > 0 && (
        <div className="mt-5">
          <p className="text-xs uppercase tracking-wide text-slate-500">Try one of these</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {examples.map((pair) => (
              <Link
                key={pair.join("-")}
                href={`/compare?ids=${pair.join(",")}`}
                className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm hover:border-slate-400"
              >
                {getCourse(pair[0])!.code} vs {getCourse(pair[1])!.code}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CompareTable({ courses }: { courses: Course[] }) {
  const cols = courses.length;
  return (
    <div className="overflow-x-auto rounded-md border border-slate-200">
      <table className="w-full text-sm" style={{ minWidth: `${240 + cols * 220}px` }}>
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="w-48 px-4 py-3 text-left text-xs uppercase tracking-wide text-slate-500" />
            {courses.map((c) => (
              <th key={c.id} className="px-4 py-4 text-left align-top">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <Link
                      href={`/courses/${c.id}`}
                      className="font-mono text-xs font-semibold text-slate-700 hover:underline"
                    >
                      {c.code}
                    </Link>
                    <div className="mt-0.5 text-sm font-medium text-michigan">{c.title}</div>
                  </div>
                  <RemoveLink id={c.id} existing={courses.map((x) => x.id)} />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          <Row label="Subject" courses={courses} cell={(c) => c.department} />
          <Row label="Credits" courses={courses} cell={(c) => c.credits ?? "—"} />
          <Row label="Level" courses={courses} cell={(c) => levelLabel(getCourseLevel(c))} />
          <Row
            label={`${CURRENT_TERM.label} sections`}
            courses={courses}
            cell={(c) => (isOffered(c) ? sectionSummary(c.sections) : "Not offered")}
          />
          <Row
            label="Lecture times"
            courses={courses}
            cell={(c) => {
              const lectures = c.sections.filter((s) => s.component === "LEC");
              if (lectures.length === 0) return "—";
              return (
                <ul className="space-y-0.5 text-xs">
                  {lectures.map((s) => (
                    <li key={s.classNumber}>
                      <span className="font-mono text-slate-500">{s.number}</span> {formatMeetings(s)}
                    </li>
                  ))}
                </ul>
              );
            }}
          />
          <Row
            label="Instructors"
            courses={courses}
            cell={(c) => <div className="text-xs"><InstructorLinks names={getInstructors(c)} /></div>}
          />
        </tbody>
      </table>
    </div>
  );
}

function Row({
  label,
  courses,
  cell,
}: {
  label: string;
  courses: Course[];
  cell: (c: Course) => React.ReactNode;
}) {
  return (
    <tr>
      <th className="w-48 bg-slate-50 px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </th>
      {courses.map((c) => (
        <td key={c.id} className="px-4 py-3 align-top text-sm text-slate-700">
          {cell(c)}
        </td>
      ))}
    </tr>
  );
}

function RemoveLink({ id, existing }: { id: string; existing: string[] }) {
  const next = existing.filter((x) => x !== id);
  const href = next.length > 0 ? `/compare?ids=${next.join(",")}` : "/compare";
  return (
    <Link href={href} aria-label="Remove from comparison" className="text-xs text-slate-400 hover:text-rose-600">
      ✕
    </Link>
  );
}
