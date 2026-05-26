"use client";

import { useMemo } from "react";
import type { Course } from "@/lib/courses";
import { gpaToLetter, semesterGpaForecast } from "@/lib/gpa";

export function GpaForecast({ courses }: { courses: Course[] }) {
  const forecast = useMemo(() => semesterGpaForecast(courses), [courses]);

  if (!forecast) {
    return (
      <div className="rounded-md border border-slate-200 bg-white p-4">
        <h3 className="text-xs uppercase tracking-wide text-slate-500">Semester GPA forecast</h3>
        <p className="mt-2 text-sm text-slate-500">
          Add courses with grade data to see a projected GPA.
        </p>
      </div>
    );
  }

  const { expected, p25, p75, coursesWithData, coursesTotal } = forecast;
  // Build the bar: 0.0–4.0 range
  const min = 0;
  const max = 4;
  const span = max - min;
  const p25Pct = ((p25 - min) / span) * 100;
  const p75Pct = ((p75 - min) / span) * 100;
  const expectedPct = ((expected - min) / span) * 100;

  return (
    <div className="rounded-md border border-slate-200 bg-white p-4">
      <div className="flex items-baseline justify-between">
        <h3 className="text-xs uppercase tracking-wide text-slate-500">Semester GPA forecast</h3>
        {coursesWithData < coursesTotal && (
          <span className="text-[10px] text-slate-400">
            {coursesWithData} of {coursesTotal} have grade data
          </span>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-semibold tabular-nums text-slate-900">
          {expected.toFixed(2)}
        </span>
        <span className="text-sm text-slate-500">expected · ≈ {gpaToLetter(expected)}</span>
      </div>
      <p className="mt-1 text-xs text-slate-500">
        Likely range {p25.toFixed(2)}–{p75.toFixed(2)} GPA · weighted by credits
      </p>

      <div className="relative mt-4 h-2 rounded-full bg-slate-100">
        <div
          className="absolute top-0 bottom-0 rounded-full bg-emerald-200"
          style={{
            left: `${Math.max(0, p25Pct)}%`,
            width: `${Math.min(100 - p25Pct, p75Pct - p25Pct)}%`,
          }}
          title={`25th–75th percentile: ${p25.toFixed(2)}–${p75.toFixed(2)}`}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
          style={{ left: `${expectedPct}%` }}
          title={`Expected: ${expected.toFixed(2)}`}
        >
          <div className="h-3 w-3 rounded-full border-2 border-white bg-emerald-600 shadow-sm" />
        </div>
      </div>
      <div className="mt-1 flex justify-between text-[10px] tabular-nums text-slate-400">
        <span>0.0</span>
        <span>1.0</span>
        <span>2.0</span>
        <span>3.0</span>
        <span>4.0</span>
      </div>

      <p className="mt-3 text-[11px] text-slate-500">
        Estimated by sampling each course&apos;s grade distribution 2,000 times.
        Real GPA depends on instructor, section, and your performance.
      </p>
    </div>
  );
}
