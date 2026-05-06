import Link from "next/link";
import {
  filterCourses,
  getAllCourses,
  getDepartments,
  getFulfillsGroups,
  isSortKey,
  sortCourses,
  type Course,
} from "@/lib/courses";
import { Filters } from "./_components/filters";
import { SiteHeader } from "@/components/site-header";

type SearchParams = Promise<{
  q?: string;
  department?: string;
  credits?: string;
  maxWorkload?: string;
  fulfills?: string;
  sort?: string;
}>;

export default async function CoursesPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const all = getAllCourses();
  const departments = getDepartments();
  const fulfillsGroups = getFulfillsGroups();
  const filtered = filterCourses(all, sp);
  const sortKey = isSortKey(sp.sort) ? sp.sort : "code-asc";
  const sorted = sortCourses(filtered, sortKey);

  const activeBits: string[] = [];
  if (sp.department) activeBits.push(sp.department);
  if (sp.fulfills) activeBits.push(sp.fulfills);

  return (
    <div className="flex min-h-full flex-col bg-white">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        <div className="mb-6 flex items-baseline justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Courses</h1>
          <span className="text-sm text-slate-500">
            {sorted.length} of {all.length}
            {activeBits.length ? ` · ${activeBits.join(" · ")}` : ""}
          </span>
        </div>

        <Filters departments={departments} fulfillsGroups={fulfillsGroups} />

        {sorted.length === 0 ? (
          <div className="mt-6 rounded-md border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">
            No courses match. Try clearing some filters.
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-md border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3 font-medium">Course</th>
                  <th className="px-4 py-3 font-medium">Cr</th>
                  <th className="px-4 py-3 font-medium text-right">Hrs/wk</th>
                  <th className="px-4 py-3 font-medium text-right">Diff</th>
                  <th className="px-4 py-3 font-medium text-right">Median</th>
                  <th className="px-4 py-3 font-medium text-right">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sorted.map((c) => (
                  <CourseRow key={c.id} course={c} />
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-6 text-xs text-slate-400">
          Preview data — not yet wired to UMich Atlas.
        </p>
      </main>
    </div>
  );
}

function CourseRow({ course }: { course: Course }) {
  return (
    <tr className="hover:bg-slate-50">
      <td className="px-4 py-3">
        <Link href={`/courses/${course.id}`} className="block group">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-slate-700">{course.code}</span>
            <span className="text-slate-400">·</span>
            <span className="text-xs text-slate-500">{course.department}</span>
          </div>
          <div className="mt-0.5 font-medium text-slate-900 group-hover:underline">
            {course.title}
          </div>
          {course.fulfills.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {course.fulfills.map((f) => (
                <span
                  key={f}
                  className="rounded border border-slate-200 px-1.5 py-0.5 text-[10px] text-slate-500"
                >
                  {f}
                </span>
              ))}
            </div>
          )}
        </Link>
      </td>
      <td className="px-4 py-3 tabular-nums text-slate-700">{course.credits}</td>
      <td className="px-4 py-3 text-right tabular-nums text-slate-700">
        {course.workloadHoursPerWeek}
      </td>
      <td className="px-4 py-3 text-right">
        <DifficultyDots level={course.difficulty} />
      </td>
      <td className="px-4 py-3 text-right tabular-nums">
        <span className="font-medium text-slate-900">{course.grades.median}</span>
        <span className="ml-1 text-xs text-slate-400">{course.grades.mean.toFixed(1)}</span>
      </td>
      <td className="px-4 py-3 text-right tabular-nums text-slate-700">
        {course.studentRating.toFixed(1)}
      </td>
    </tr>
  );
}

function DifficultyDots({ level }: { level: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`Difficulty ${level} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${i <= level ? "bg-slate-900" : "bg-slate-200"}`}
        />
      ))}
    </span>
  );
}
