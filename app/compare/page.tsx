import Link from "next/link";
import {
  aGradePercent,
  difficultyLabel,
  getAllCourses,
  getCourseLevel,
  getCoursesById,
  GRADE_LETTERS,
  gradeLetterColor,
  levelLabel,
  type Course,
  type GradeLetter,
} from "@/lib/courses";
import { expectedGpaForCourse } from "@/lib/gpa";
import { SiteHeader } from "@/components/site-header";
import { AddCoursePicker } from "./_components/add-course-picker";

const MAX_COMPARE = 4;

type SearchParams = Promise<{ ids?: string }>;

export default async function ComparePage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const ids = parseIds(sp.ids);
  const courses = getCoursesById(ids).slice(0, MAX_COMPARE);

  const allCoursesLite = getAllCourses().map((c) => ({
    id: c.id,
    code: c.code,
    title: c.title,
  }));

  return (
    <div className="flex min-h-full flex-col bg-white">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        <div className="mb-4 flex items-baseline justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Compare</h1>
          <span className="text-sm text-slate-500">
            {courses.length} of {MAX_COMPARE} slots used
          </span>
        </div>
        <p className="mb-6 max-w-2xl text-sm text-slate-600">
          Put courses side-by-side to weigh workload against grades, difficulty
          against rating. Useful when picking between two electives or
          choosing the lighter alternative to a heavy core class. The cell that
          &ldquo;wins&rdquo; each row is highlighted.
        </p>

        <div className="mb-6 flex items-center gap-3">
          <AddCoursePicker
            existing={ids}
            allCourses={allCoursesLite}
            disabled={courses.length >= MAX_COMPARE}
          />
          {courses.length > 0 && (
            <Link href="/compare" className="text-sm text-slate-500 hover:text-slate-900">
              Clear
            </Link>
          )}
        </div>

        {courses.length === 0 ? (
          <EmptyState allCourses={allCoursesLite} />
        ) : (
          <CompareTable courses={courses} />
        )}
      </main>
    </div>
  );
}

function parseIds(raw: string | undefined): string[] {
  if (!raw) return [];
  return Array.from(
    new Set(
      raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    ),
  );
}

function EmptyState({
  allCourses,
}: {
  allCourses: { id: string; code: string; title: string }[];
}) {
  const examples = [
    ["eecs-280", "eecs-281"],
    ["eecs-281", "eecs-370"],
    ["math-217", "math-215"],
    ["psych-111", "psych-230"],
  ]
    .map((pair) => pair.filter((id) => allCourses.find((c) => c.id === id)))
    .filter((pair) => pair.length === 2);

  return (
    <div className="rounded-md border border-slate-200 bg-white p-8">
      <h2 className="text-lg font-medium">No courses to compare yet.</h2>
      <p className="mt-1 text-sm text-slate-600">
        Add up to 4 courses with the picker above to see every metric — workload,
        difficulty, grade distribution, %A — lined up side-by-side.
      </p>
      {examples.length > 0 && (
        <div className="mt-5">
          <p className="text-xs uppercase tracking-wide text-slate-500">Try one of these</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {examples.map((pair) => {
              const a = allCourses.find((c) => c.id === pair[0])!;
              const b = allCourses.find((c) => c.id === pair[1])!;
              return (
                <Link
                  key={pair.join("-")}
                  href={`/compare?ids=${pair.join(",")}`}
                  className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm hover:border-slate-400"
                >
                  {a.code} vs {b.code}
                </Link>
              );
            })}
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
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/courses/${c.id}`}
                        className="font-mono text-xs font-semibold text-slate-700 hover:underline"
                      >
                        {c.code}
                      </Link>
                      {c.dataQuality === "estimated" && (
                        <span
                          className="text-[10px] text-amber-700"
                          title="Estimated metrics"
                        >
                          est.
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 text-sm font-medium text-slate-900">
                      {c.title}
                    </div>
                  </div>
                  <RemoveLink id={c.id} existing={courses.map((x) => x.id)} />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          <Row label="Department" courses={courses} cell={(c) => c.department} />
          <Row label="Credits" courses={courses} cell={(c) => `${c.credits}`} />
          <Row
            label="Level"
            courses={courses}
            cell={(c) => levelLabel(getCourseLevel(c))}
          />
          <Row
            label="Workload"
            courses={courses}
            highlight={extremes(courses, (c) => c.workloadHoursPerWeek, "low")}
            cell={(c) =>
              c.workloadHoursPerWeek > 0 ? `${c.workloadHoursPerWeek} hrs/wk` : "—"
            }
          />
          <Row
            label="Difficulty"
            courses={courses}
            highlight={extremes(courses, (c) => c.difficulty, "low")}
            cell={(c) => `${c.difficulty}/5 · ${difficultyLabel(c.difficulty)}`}
          />
          <Row
            label="Median grade"
            courses={courses}
            highlight={extremes(courses, (c) => c.grades?.mean ?? 0, "high")}
            cell={(c) =>
              c.grades ? `${c.grades.median} · mean ${c.grades.mean.toFixed(2)}` : "—"
            }
          />
          <Row
            label="% earning A"
            courses={courses}
            highlight={extremes(
              courses,
              (c) => (c.grades ? aGradePercent(c.grades.buckets) : 0),
              "high",
            )}
            cell={(c) =>
              c.grades ? `${Math.round(aGradePercent(c.grades.buckets))}%` : "—"
            }
          />
          <Row
            label="Expected GPA"
            courses={courses}
            highlight={extremes(courses, (c) => expectedGpaForCourse(c) ?? 0, "high")}
            cell={(c) => {
              const e = expectedGpaForCourse(c);
              return e !== null ? e.toFixed(2) : "—";
            }}
          />
          <Row
            label="Student rating"
            courses={courses}
            highlight={extremes(courses, (c) => c.studentRating, "high")}
            cell={(c) => (c.studentRating > 0 ? c.studentRating.toFixed(1) : "—")}
          />
          <Row
            label="Distributions"
            courses={courses}
            cell={(c) =>
              c.fulfills.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {c.fulfills.map((f) => (
                    <span
                      key={f}
                      className="rounded border border-slate-200 px-1.5 py-0.5 text-[10px] text-slate-600"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              ) : (
                "—"
              )
            }
          />
          <Row
            label="Grade distribution"
            courses={courses}
            cell={(c) =>
              c.grades ? (
                <MiniGradeChart buckets={c.grades.buckets} median={c.grades.median} />
              ) : (
                "—"
              )
            }
          />
          <Row
            label="Description"
            courses={courses}
            cell={(c) =>
              c.description ? (
                <span className="text-xs text-slate-600">{c.description}</span>
              ) : (
                "—"
              )
            }
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
  highlight,
}: {
  label: string;
  courses: Course[];
  cell: (c: Course) => React.ReactNode;
  highlight?: Set<string>;
}) {
  return (
    <tr>
      <th className="w-48 bg-slate-50 px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </th>
      {courses.map((c) => (
        <td
          key={c.id}
          className={`px-4 py-3 align-top text-sm ${
            highlight?.has(c.id)
              ? "bg-emerald-50 font-medium text-emerald-900"
              : "text-slate-700"
          }`}
        >
          {cell(c)}
        </td>
      ))}
    </tr>
  );
}

function MiniGradeChart({
  buckets,
  median,
}: {
  buckets: Partial<Record<GradeLetter, number>>;
  median: string;
}) {
  const max = Math.max(1, ...GRADE_LETTERS.map((l) => buckets[l] ?? 0));
  return (
    <div>
      <div className="flex h-14 items-end gap-0.5">
        {GRADE_LETTERS.map((letter) => {
          const pct = buckets[letter] ?? 0;
          const isMedian = letter === median;
          const heightPct = (pct / max) * 100;
          return (
            <div
              key={letter}
              className={`flex-1 rounded-sm ${gradeLetterColor(letter)} ${
                isMedian ? "ring-1 ring-slate-900" : ""
              }`}
              style={{
                height: pct > 0 ? `${Math.max(2, heightPct)}%` : "2px",
                opacity: pct > 0 ? 1 : 0.2,
              }}
              title={`${letter}: ${pct}%`}
            />
          );
        })}
      </div>
      <div className="mt-1 flex gap-0.5">
        {GRADE_LETTERS.map((letter) => (
          <div
            key={letter}
            className={`flex-1 text-center text-[8px] tabular-nums ${
              letter === median ? "font-semibold text-slate-900" : "text-slate-400"
            }`}
          >
            {letter}
          </div>
        ))}
      </div>
    </div>
  );
}

function RemoveLink({ id, existing }: { id: string; existing: string[] }) {
  const next = existing.filter((x) => x !== id);
  const href = next.length > 0 ? `/compare?ids=${next.join(",")}` : "/compare";
  return (
    <Link
      href={href}
      aria-label="Remove from comparison"
      className="text-xs text-slate-400 hover:text-rose-600"
    >
      ✕
    </Link>
  );
}

function extremes(
  courses: Course[],
  accessor: (c: Course) => number,
  dir: "low" | "high",
): Set<string> {
  const valid = courses.filter((c) => accessor(c) > 0);
  if (valid.length < 2) return new Set();
  const target =
    dir === "low"
      ? Math.min(...valid.map(accessor))
      : Math.max(...valid.map(accessor));
  return new Set(valid.filter((c) => accessor(c) === target).map((c) => c.id));
}
