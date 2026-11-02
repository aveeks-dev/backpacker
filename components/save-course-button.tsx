"use client";

import { useSaved } from "@/lib/use-saved";

export function SaveCourseButton({ courseId, withLabel }: { courseId: string; withLabel?: boolean }) {
  const { ids, toggle } = useSaved();
  const saved = ids.includes(courseId);
  const label = saved ? "Saved" : "Save";
  return (
    <button
      onClick={() => toggle(courseId)}
      aria-pressed={saved}
      aria-label={withLabel ? undefined : `${saved ? "Remove" : "Save"} ${courseId.replace("-", " ").toUpperCase()}`}
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1.5 text-sm transition-colors ${
        saved ? "border-maize bg-maize/30 text-michigan" : "border-slate-200 text-slate-500 hover:border-michigan hover:text-michigan"
      }`}
    >
      <span aria-hidden="true">{saved ? "★" : "☆"}</span>
      {withLabel && label}
    </button>
  );
}
