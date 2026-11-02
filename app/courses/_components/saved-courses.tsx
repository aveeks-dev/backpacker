"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { CourseSummary } from "@/lib/courses";
import { useSaved } from "@/lib/use-saved";

/** Bookmarked courses, shown above the catalog once there are any. */
export function SavedCourses() {
  const { ids, toggle } = useSaved();
  const key = ids.join(",");
  const [courses, setCourses] = useState<CourseSummary[]>([]);

  useEffect(() => {
    if (!key) return;
    const controller = new AbortController();
    fetch(`/api/courses?summary=1&ids=${encodeURIComponent(key)}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data: { courses: CourseSummary[] }) => setCourses(data.courses))
      .catch(() => {});
    return () => controller.abort();
  }, [key]);

  const visible = courses.filter((c) => ids.includes(c.id));
  if (visible.length === 0) return null;

  return (
    <section className="mb-5 rounded-md border border-maize/60 bg-maize/10 p-4">
      <h2 className="text-sm font-semibold">Saved courses</h2>
      <ul className="mt-2 flex flex-wrap gap-2">
        {visible.map((c) => (
          <li key={c.id} className="flex items-center overflow-hidden rounded-md border border-slate-200 bg-white text-xs">
            <Link href={`/courses/${c.id}`} title={c.title} className="px-2 py-1 font-mono font-medium hover:underline">{c.code}</Link>
            <button onClick={() => toggle(c.id)} aria-label={`Remove ${c.code} from saved`} className="border-l border-slate-200 px-2 py-1 text-slate-400 hover:text-rose-600">✕</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
