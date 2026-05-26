import Link from "next/link";
import { aGradePercent, type Course } from "@/lib/courses";

export function SimilarCourses({ similar }: { similar: Course[] }) {
  if (similar.length === 0) return null;
  return (
    <section className="mt-10">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Similar courses in this subject
      </h2>
      <ul className="divide-y divide-slate-100 overflow-hidden rounded-md border border-slate-200">
        {similar.map((c) => {
          const aPct = c.grades ? Math.round(aGradePercent(c.grades.buckets)) : null;
          return (
            <li key={c.id}>
              <Link
                href={`/courses/${c.id}`}
                className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-slate-50"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-slate-700">{c.code}</span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-500">{c.credits} cr</span>
                  </div>
                  <div className="truncate text-sm text-slate-700">{c.title}</div>
                </div>
                <div className="flex shrink-0 items-center gap-4 text-xs tabular-nums text-slate-600">
                  <Cell label="hrs/wk" value={c.workloadHoursPerWeek > 0 ? `${c.workloadHoursPerWeek}` : "—"} />
                  <Cell label="diff" value={`${c.difficulty}/5`} />
                  <Cell label="median" value={c.grades?.median ?? "—"} />
                  <Cell label="%A" value={aPct !== null ? `${aPct}%` : "—"} />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-12 flex-col items-end leading-tight">
      <span className="text-slate-900">{value}</span>
      <span className="text-[10px] text-slate-400">{label}</span>
    </div>
  );
}
