import Link from "next/link";
import type { Metadata } from "next";
import {
  CURRENT_TERM,
  filterCourses,
  getAllCourses,
  getDepartments,
  getInstructors,
  isOffered,
  type Course,
} from "@/lib/courses";
import { sectionSummary } from "@/lib/format";
import { Filters } from "./_components/filters";

export const metadata: Metadata = {
  title: "Courses",
  description: `Browse every University of Michigan course, with ${CURRENT_TERM.label} sections, times, and instructors.`,
};

const PAGE_SIZE = 50;

type SearchParams = Promise<{
  q?: string;
  department?: string;
  credits?: string;
  level?: string;
  offered?: string;
  page?: string;
}>;

export default async function CoursesPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const all = getAllCourses();
  const filtered = filterCourses(all, sp);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(totalPages, Math.max(1, parseInt(sp.page ?? "1", 10) || 1));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const offeredCount = all.filter(isOffered).length;

  const activeBits: string[] = [];
  if (sp.offered === "1") activeBits.push(CURRENT_TERM.label);
  if (sp.department) activeBits.push(sp.department);
  if (sp.level) activeBits.push(`${sp.level} level`);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
      <div className="mb-6 flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Courses</h1>
        <span className="text-sm text-slate-500">
          {filtered.length.toLocaleString()} of {all.length.toLocaleString()}
          {activeBits.length ? ` · ${activeBits.join(" · ")}` : ""}
        </span>
      </div>

      <Filters departments={getDepartments()} offeredCount={offeredCount} termLabel={CURRENT_TERM.label} />

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-md border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">
          No courses match. Try clearing some filters.
        </div>
      ) : (
        <>
          <div className="mt-6 overflow-x-auto rounded-md border border-slate-200">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3 font-medium">Course</th>
                  <th className="px-4 py-3 font-medium">Credits</th>
                  <th className="px-4 py-3 font-medium">{CURRENT_TERM.label}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visible.map((c) => (
                  <CourseRow key={c.id} course={c} />
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && <Pagination sp={sp} page={page} totalPages={totalPages} />}
        </>
      )}

      <p className="mt-6 text-xs text-slate-400">
        Course titles come from the U-M Atlas catalog; sections, times, and instructors from the
        Registrar&apos;s {CURRENT_TERM.label} schedule. Press{" "}
        <kbd className="rounded border border-slate-300 px-1 py-0.5 text-[10px]">/</kbd> to search from anywhere.
      </p>
    </main>
  );
}

function CourseRow({ course }: { course: Course }) {
  const offered = isOffered(course);
  const instructors = getInstructors(course);
  return (
    <tr className="hover:bg-slate-50">
      <td className="px-4 py-3">
        <Link href={`/courses/${course.id}`} className="group block">
          <span className="font-mono text-xs font-semibold text-slate-700">{course.code}</span>
          <div className="mt-0.5 font-medium text-michigan group-hover:underline">{course.title}</div>
        </Link>
      </td>
      <td className="px-4 py-3 tabular-nums text-slate-700">{course.credits ?? "—"}</td>
      <td className="px-4 py-3 text-xs text-slate-600">
        {offered ? (
          <>
            <div>{sectionSummary(course.sections)}</div>
            {instructors.length > 0 && (
              <div className="mt-0.5 truncate text-slate-400" title={instructors.join(", ")}>
                {instructors.slice(0, 3).join(", ")}
                {instructors.length > 3 && ` +${instructors.length - 3}`}
              </div>
            )}
          </>
        ) : (
          <span className="text-slate-400">Not offered</span>
        )}
      </td>
    </tr>
  );
}

function Pagination({
  sp,
  page,
  totalPages,
}: {
  sp: Record<string, string | undefined>;
  page: number;
  totalPages: number;
}) {
  function urlForPage(p: number) {
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(sp)) {
      if (typeof v === "string" && v) params.set(k, v);
    }
    if (p === 1) params.delete("page");
    else params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/courses?${qs}` : "/courses";
  }
  return (
    <div className="mt-4 flex items-center justify-between text-sm">
      <span className="text-slate-500">
        Page {page} of {totalPages}
      </span>
      <div className="flex gap-2">
        {page > 1 && (
          <Link
            href={urlForPage(page - 1)}
            className="rounded-md border border-slate-200 px-3 py-1.5 text-slate-700 hover:bg-slate-50"
          >
            ← Prev
          </Link>
        )}
        {page < totalPages && (
          <Link
            href={urlForPage(page + 1)}
            className="rounded-md border border-slate-200 px-3 py-1.5 text-slate-700 hover:bg-slate-50"
          >
            Next →
          </Link>
        )}
      </div>
    </div>
  );
}
