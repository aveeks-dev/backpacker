import Link from "next/link";
import type { Course } from "@/lib/courses";
import { sectionSummary } from "@/lib/format";

export function SimilarCourses({ similar }: { similar: Course[] }) {
  if (similar.length === 0) return null;
  return (
    <section className="mt-10">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Nearby courses in this subject
      </h2>
      <ul className="divide-y divide-slate-100 overflow-hidden rounded-md border border-slate-200">
        {similar.map((c) => (
          <li key={c.id}>
            <Link
              href={`/courses/${c.id}`}
              className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-slate-50"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-slate-700">{c.code}</span>
                  {c.credits && (
                    <>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs text-slate-500">{c.credits} cr</span>
                    </>
                  )}
                </div>
                <div className="truncate text-sm text-slate-700">{c.title}</div>
              </div>
              <span className="shrink-0 text-xs text-slate-500">
                {c.sections.length > 0 ? sectionSummary(c.sections) : "Not offered"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
