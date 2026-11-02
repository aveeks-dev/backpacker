import Link from "next/link";
import type { Metadata } from "next";
import { SaveCourseButton } from "@/components/save-course-button";
import {
  CURRENT_TERM,
  filterCourses,
  getAllCourses,
  getDepartments,
  getInstructors,
  getSchools,
  isOffered,
  type Course,
} from "@/lib/courses";
import { sectionSummary } from "@/lib/format";
import { Filters } from "./_components/filters";
import { SavedCourses } from "./_components/saved-courses";

export const metadata: Metadata = {
  title: "Courses",
  description: `Browse every University of Michigan course, with ${CURRENT_TERM.label} sections, times, and instructors.`,
};

const PAGE_SIZE = 32;

type SearchParams = Promise<{
  q?: string;
  school?: string;
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
  if (sp.school) activeBits.push(sp.school);
  if (sp.department) activeBits.push(sp.department);
  if (sp.level) activeBits.push(`${sp.level} level`);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Browse courses</h1>
        <span className="text-sm text-slate-500">
          {filtered.length.toLocaleString()} of {all.length.toLocaleString()}
          {activeBits.length ? ` · ${activeBits.join(" · ")}` : ""}
        </span>
      </div>

      <SavedCourses />

      <Filters schools={getSchools()} departments={getDepartments()} offeredCount={offeredCount} termLabel={CURRENT_TERM.label} />

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-md border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">
          No courses match. Try clearing some filters.
        </div>
      ) : (
        <>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {visible.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </ul>

          {totalPages > 1 && <Pagination sp={sp} page={page} totalPages={totalPages} />}
        </>
      )}

      <p className="mt-6 text-xs text-slate-500">
        Course titles come from the U-M Atlas catalog; sections, times, and instructors from the
        Registrar&apos;s {CURRENT_TERM.label} schedule. Press{" "}
        <kbd className="rounded border border-slate-300 px-1 py-0.5 text-[10px]">/</kbd> to search from anywhere.
      </p>
    </main>
  );
}

function CourseCard({ course }: { course: Course }) {
  const offered = isOffered(course);
  const instructors = getInstructors(course);
  return (
    <li className="flex flex-col rounded-md border border-slate-200 bg-white p-4 transition-colors hover:border-michigan/50">
      <div className="flex items-start justify-between gap-3">
        <Link href={`/courses/${course.id}`} className="group min-w-0">
          <span className="font-mono text-xs font-semibold text-slate-600">{course.code}</span>
          <h2 className="mt-0.5 font-semibold leading-snug group-hover:underline">{course.title}</h2>
        </Link>
        <SaveCourseButton courseId={course.id} />
      </div>
      {offered && (
        <div className="mt-2 text-xs text-slate-600">
          {course.credits} credits · {sectionSummary(course.sections)}
          {instructors.length > 0 && (
            <div className="mt-0.5 truncate text-slate-500" title={instructors.join(", ")}>
              {instructors.slice(0, 3).join(", ")}
              {instructors.length > 3 && ` +${instructors.length - 3}`}
            </div>
          )}
        </div>
      )}
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-3 text-xs">
        {offered ? (
          <span className="rounded bg-maize/30 px-2 py-0.5 font-medium text-michigan">Offered {CURRENT_TERM.label}</span>
        ) : (
          <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-600">Not offered {CURRENT_TERM.label}</span>
        )}
        {course.school && <span className="text-slate-500">{course.school}</span>}
      </div>
    </li>
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
            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-50"
          >
            ← Prev
          </Link>
        )}
        {page < totalPages && (
          <Link
            href={urlForPage(page + 1)}
            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-50"
          >
            Next →
          </Link>
        )}
      </div>
    </div>
  );
}
