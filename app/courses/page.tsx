import Link from "next/link";
import {
  aGradePercent,
  filterCourses,
  getAllCourses,
  getDepartments,
  getFulfillsGroups,
  isSortKey,
  sortCourses,
  type Course,
  type SortKey,
} from "@/lib/courses";
import { Filters } from "./_components/filters";
import { SiteHeader } from "@/components/site-header";

const PAGE_SIZE = 50;

type SearchParams = Promise<{
  q?: string;
  department?: string;
  credits?: string;
  maxWorkload?: string;
  fulfills?: string;
  sort?: string;
  page?: string;
  hasData?: string;
  level?: string;
}>;

export default async function CoursesPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const all = getAllCourses();
  const departments = getDepartments();
  const fulfillsGroups = getFulfillsGroups();
  const filtered = filterCourses(all, sp);
  const sortKey: SortKey = isSortKey(sp.sort) ? sp.sort : "code-asc";
  const sorted = sortCourses(filtered, sortKey);
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const visible = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const activeBits: string[] = [];
  if (sp.department) activeBits.push(sp.department);
  if (sp.level) activeBits.push(`${sp.level} level`);
  if (sp.fulfills) activeBits.push(sp.fulfills);

  const curatedCount = all.filter((c) => c.dataQuality === "curated").length;

  return (
    <div className="flex min-h-full flex-col bg-white">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        <div className="mb-6 flex items-baseline justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Courses</h1>
          <span className="text-sm text-slate-500">
            {sorted.length.toLocaleString()} of {all.length.toLocaleString()}
            {activeBits.length ? ` · ${activeBits.join(" · ")}` : ""}
          </span>
        </div>

        <Filters
          departments={departments}
          fulfillsGroups={fulfillsGroups}
          curatedCount={curatedCount}
        />

        {sorted.length === 0 ? (
          <div className="mt-6 rounded-md border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">
            No courses match. Try clearing some filters.
          </div>
        ) : (
          <>
            <div className="mt-6 overflow-x-auto rounded-md border border-slate-200">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                    <th className="px-4 py-3 font-medium">Course</th>
                    <th className="px-4 py-3 font-medium">Cr</th>
                    <ColHeader sp={sp} sortKey={sortKey} asc="workload-asc" desc="workload-desc">
                      Hrs/wk
                    </ColHeader>
                    <ColHeader sp={sp} sortKey={sortKey} asc="difficulty-asc" desc="difficulty-desc">
                      Diff
                    </ColHeader>
                    <ColHeader sp={sp} sortKey={sortKey} asc="median-asc" desc="median-desc">
                      Median
                    </ColHeader>
                    <ColHeader sp={sp} sortKey={sortKey} asc="a-percent-asc" desc="a-percent-desc">
                      % A
                    </ColHeader>
                    <ColHeader sp={sp} sortKey={sortKey} desc="rating-desc">
                      Rating
                    </ColHeader>
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
          {curatedCount} courses have full hand-reviewed data; the rest of the catalog shows
          estimated metrics derived from course level. Click any column header to sort.
          Tip: press <kbd className="rounded border border-slate-300 px-1 py-0.5 text-[10px]">/</kbd> anywhere to jump to the search bar.
        </p>
      </main>
    </div>
  );
}

function ColHeader({
  children,
  sp,
  sortKey,
  asc,
  desc,
}: {
  children: React.ReactNode;
  sp: Record<string, string | undefined>;
  sortKey: SortKey;
  asc?: SortKey;
  desc?: SortKey;
}) {
  const next: SortKey = (() => {
    if (desc && sortKey !== desc && sortKey !== asc) return desc;
    if (desc && sortKey === desc && asc) return asc;
    if (asc && sortKey === asc && desc) return desc;
    return desc || asc || "code-asc";
  })();
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) {
    if (typeof v === "string" && v) params.set(k, v);
  }
  params.set("sort", next);
  params.delete("page");
  const indicator =
    sortKey === asc ? " ↑" : sortKey === desc ? " ↓" : "";
  return (
    <th className="px-4 py-3 text-right font-medium">
      <Link
        href={`/courses?${params.toString()}`}
        className="inline-flex items-center hover:text-slate-900"
        scroll={false}
      >
        {children}
        <span className="ml-0.5 tabular-nums">{indicator || "  "}</span>
      </Link>
    </th>
  );
}

function CourseRow({ course }: { course: Course }) {
  const isEstimated = course.dataQuality === "estimated";
  const aPct = course.grades ? aGradePercent(course.grades.buckets) : null;
  return (
    <tr className="hover:bg-slate-50">
      <td className="px-4 py-3">
        <Link href={`/courses/${course.id}`} className="block group">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-slate-700">{course.code}</span>
            <span className="text-slate-400">·</span>
            <span className="text-xs text-slate-500">{course.department}</span>
            {isEstimated && (
              <span
                className="text-[10px] text-amber-700"
                title="Workload, difficulty, and grades estimated from course level"
              >
                est.
              </span>
            )}
          </div>
          <div className="mt-0.5 font-medium text-slate-900 group-hover:underline">
            {course.title}
          </div>
          {course.fulfills.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {course.fulfills.slice(0, 4).map((f) => (
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
        {course.workloadHoursPerWeek || "—"}
      </td>
      <td className="px-4 py-3 text-right">
        <DifficultyDots level={course.difficulty} />
      </td>
      <td className="px-4 py-3 text-right tabular-nums">
        {course.grades ? (
          <>
            <span className="font-medium text-slate-900">{course.grades.median}</span>
            <span className="ml-1 text-xs text-slate-400">{course.grades.mean.toFixed(1)}</span>
          </>
        ) : (
          <span className="text-slate-400">—</span>
        )}
      </td>
      <td className="px-4 py-3 text-right tabular-nums text-slate-700">
        {aPct !== null ? `${Math.round(aPct)}%` : <span className="text-slate-400">—</span>}
      </td>
      <td className="px-4 py-3 text-right tabular-nums text-slate-700">
        {course.studentRating > 0 ? course.studentRating.toFixed(1) : "—"}
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
