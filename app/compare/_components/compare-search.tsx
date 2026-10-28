"use client";

import { useRouter } from "next/navigation";
import { CourseSearch } from "@/components/course-search";

export function CompareSearch({ existing, disabled }: { existing: string[]; disabled?: boolean }) {
  const router = useRouter();

  if (disabled) {
    return (
      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
        Maximum 4 courses
      </div>
    );
  }

  return (
    <CourseSearch
      label="Add a course to compare"
      placeholder="Add a course to compare…"
      exclude={existing}
      onPick={(c) => router.push(`/compare?ids=${[...existing, c.id].join(",")}`)}
    />
  );
}
