"use client";

import { useMemo } from "react";
import type { Course } from "@/lib/courses";

// Common LSA distribution requirements that students track. Not exhaustive;
// other colleges (Engineering, Ross) have their own — those show only if
// any course in the plan fulfills them.
const LSA_CORE = [
  "LSA Humanities",
  "LSA Natural Science",
  "LSA Social Science",
  "LSA Mathematical and Symbolic Analysis",
  "LSA Creative Expression",
  "LSA QR/1",
  "LSA First-Year Writing",
  "LSA Race & Ethnicity",
];

export function DistributionCoverage({ courses }: { courses: Course[] }) {
  const summary = useMemo(() => buildSummary(courses), [courses]);

  return (
    <div className="rounded-md border border-slate-200 bg-white p-4">
      <h3 className="text-xs uppercase tracking-wide text-slate-500">Distribution coverage</h3>
      <p className="mt-1 text-[11px] text-slate-500">
        Which LSA categories your plan satisfies. Other colleges&apos; requirements
        appear if any course in your plan counts toward them.
      </p>

      <ul className="mt-3 space-y-1">
        {summary.lsa.map((row) => (
          <li
            key={row.label}
            className="flex items-center justify-between gap-2 text-sm"
          >
            <span className={row.count > 0 ? "text-slate-900" : "text-slate-400"}>
              {row.count > 0 ? "✓" : "○"} {row.label}
            </span>
            <span className="text-xs tabular-nums text-slate-500">
              {row.count > 0 ? `${row.count} course${row.count === 1 ? "" : "s"}` : "—"}
            </span>
          </li>
        ))}
      </ul>

      {summary.other.length > 0 && (
        <>
          <div className="mt-4 text-[11px] uppercase tracking-wide text-slate-500">
            Other requirements fulfilled
          </div>
          <ul className="mt-1 space-y-0.5">
            {summary.other.map((row) => (
              <li
                key={row.label}
                className="flex items-center justify-between gap-2 text-sm text-slate-700"
              >
                <span>✓ {row.label}</span>
                <span className="text-xs tabular-nums text-slate-500">
                  {row.count} course{row.count === 1 ? "" : "s"}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function buildSummary(courses: Course[]) {
  const counts = new Map<string, number>();
  for (const c of courses) {
    for (const f of c.fulfills) {
      counts.set(f, (counts.get(f) ?? 0) + 1);
    }
  }
  const lsa = LSA_CORE.map((label) => ({ label, count: counts.get(label) ?? 0 }));
  const lsaSet = new Set(LSA_CORE);
  const other: Array<{ label: string; count: number }> = [];
  for (const [label, count] of counts) {
    if (!lsaSet.has(label) && count > 0) {
      other.push({ label, count });
    }
  }
  other.sort((a, b) => a.label.localeCompare(b.label));
  return { lsa, other };
}
