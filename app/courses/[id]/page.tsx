import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllCourses,
  getCourse,
  getDepartmentAverages,
  GRADE_LETTERS,
  gradeLetterColor,
  difficultyLabel,
  type GradeLetter,
  type Section,
} from "@/lib/courses";
import { SiteHeader } from "@/components/site-header";
import { AddToPlanButton } from "./_components/add-to-plan";

// Only prerender curated courses; estimated/catalog-only render dynamically
export function generateStaticParams() {
  return getAllCourses()
    .filter((c) => c.dataQuality === "curated")
    .map((c) => ({ id: c.id }));
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = getCourse(id);
  if (!course) notFound();

  const deptAvg = getDepartmentAverages()[course.department];
  const isCurated = course.dataQuality === "curated";
  const isEstimated = course.dataQuality === "estimated";

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
              {isEstimated && (
                <span className="ml-1 rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-800">
                  Estimated metrics
                </span>
              )}
            </div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">{course.title}</h1>
          </div>
          <AddToPlanButton courseId={course.id} />
        </div>

        {course.description && (
          <p className="mt-4 max-w-2xl text-slate-600">{course.description}</p>
        )}

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

        {isEstimated && (
          <div className="mt-6 rounded-md border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
            <strong>Estimated data.</strong> Workload, difficulty, and grade
            distribution shown below are derived from course level + subject
            heuristics, not real student responses. Real metrics will populate
            once the authenticated Atlas scraper runs (planned).
          </div>
        )}

        <div className="mt-8 grid gap-3 sm:grid-cols-4">
          <BigStat
            label="Workload"
            value={course.workloadHoursPerWeek > 0 ? course.workloadHoursPerWeek.toString() : "—"}
            unit="hrs / week"
            comparison={
              deptAvg && course.workloadHoursPerWeek > 0
                ? compareLine(course.workloadHoursPerWeek, deptAvg.workload, course.department, "hrs", false)
                : undefined
            }
          />
          <BigStat
            label="Difficulty"
            value={`${course.difficulty}/5`}
            unit={difficultyLabel(course.difficulty)}
            comparison={
              deptAvg
                ? compareLine(course.difficulty, deptAvg.difficulty, course.department, "", false)
                : undefined
            }
          />
          <BigStat
            label="Median grade"
            value={course.grades?.median ?? "—"}
            unit={course.grades ? `mean ${course.grades.mean.toFixed(1)} GPA` : "no data"}
            comparison={
              deptAvg && course.grades
                ? compareLine(course.grades.mean, deptAvg.meanGpa, course.department, "GPA", true)
                : undefined
            }
          />
          <BigStat
            label="Student rating"
            value={course.studentRating > 0 ? course.studentRating.toFixed(1) : "—"}
            unit={course.studentRating > 0 ? "of 5" : "no data"}
          />
        </div>

        {course.grades && (
          <section className="mt-10">
            <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Grade distribution
            </h2>
            <p className="mb-4 text-xs text-slate-500">
              Median {course.grades.median} · Mean {course.grades.mean.toFixed(2)} GPA
              {!isCurated && " · Estimated"}
            </p>
            <GradeChart buckets={course.grades.buckets} median={course.grades.median} />
          </section>
        )}

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

        {course.sections.length > 0 ? (
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
        ) : (
          <section className="mt-10 rounded-md border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
            Section schedule will appear here once the authenticated scraper runs.
          </section>
        )}

        <section className="mt-10">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            How to read these numbers
          </h2>
          <ul className="space-y-1.5 text-sm text-slate-600">
            <li>
              <strong>Workload</strong> is hours/week including lecture, problem
              sets, projects, and exam prep — not just class time.
            </li>
            <li>
              <strong>Difficulty (1–5)</strong> reflects conceptual rigor and
              pace, not just workload. A heavy class can still be a 2 if the
              concepts are familiar.
            </li>
            <li>
              <strong>Median grade</strong> is the middle student&apos;s final
              letter; <strong>mean GPA</strong> averages all students&apos;
              grade points.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

function GradeChart({
  buckets,
  median,
}: {
  buckets: Partial<Record<GradeLetter, number>>;
  median: string;
}) {
  const max = Math.max(1, ...GRADE_LETTERS.map((l) => buckets[l] ?? 0));
  return (
    <div>
      <div className="flex h-32 items-end gap-1">
        {GRADE_LETTERS.map((letter) => {
          const pct = buckets[letter] ?? 0;
          const isMedian = letter === median;
          const heightPct = (pct / max) * 100;
          return (
            <div key={letter} className="flex flex-1 flex-col items-center justify-end">
              <span className="mb-1 text-[10px] tabular-nums text-slate-500">
                {pct > 0 ? `${pct}%` : ""}
              </span>
              <div
                className={`w-full rounded-t ${gradeLetterColor(letter)} ${
                  isMedian ? "ring-2 ring-offset-2 ring-slate-900" : ""
                }`}
                style={{ height: pct > 0 ? `${Math.max(2, heightPct)}%` : "2px", opacity: pct > 0 ? 1 : 0.2 }}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-1.5 flex gap-1">
        {GRADE_LETTERS.map((letter) => (
          <div
            key={letter}
            className={`flex-1 text-center text-[10px] tabular-nums ${
              letter === median ? "font-semibold text-slate-900" : "text-slate-500"
            }`}
          >
            {letter}
          </div>
        ))}
      </div>
    </div>
  );
}

function compareLine(
  value: number,
  avg: number,
  dept: string,
  unit: string,
  higherIsBetter: boolean,
): string {
  const diff = value - avg;
  const absPct = avg === 0 ? 0 : Math.round((Math.abs(diff) / avg) * 100);
  if (Math.abs(diff) < 0.05 || absPct < 3) return `≈ ${dept} avg`;
  const direction = diff > 0 ? "above" : "below";
  // Color implied via direction word; prefix with dept avg value
  const _ = higherIsBetter; // reserved for future styling
  return `${direction} ${dept} avg (${avg.toFixed(unit === "GPA" ? 2 : 1)}${unit ? " " + unit : ""})`;
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

function BigStat({
  label,
  value,
  unit,
  comparison,
}: {
  label: string;
  value: string;
  unit: string;
  comparison?: string;
}) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-4">
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 text-xl font-semibold tabular-nums">{value}</div>
      <div className="text-xs text-slate-500">{unit}</div>
      {comparison && (
        <div className="mt-1 text-[11px] text-slate-500">{comparison}</div>
      )}
    </div>
  );
}
