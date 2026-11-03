"use client";

import { useEffect, useMemo, useState } from "react";
import type { Course } from "./courses";

/** Loads full course data (with sections) for the plan's ids. */
export function usePlanCourses(ids: string[]): Course[] | null {
  const key = ids.join(",");
  const [loaded, setLoaded] = useState<{ key: string; courses: Course[] } | null>(null);

  useEffect(() => {
    if (!key) return;
    const controller = new AbortController();
    fetch(`/api/courses?ids=${encodeURIComponent(key)}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data: { courses: Course[] }) => setLoaded({ key, courses: data.courses }))
      .catch(() => {});
    return () => controller.abort();
  }, [key]);

  // Keep showing the previous courses while a changed list loads. Memoized
  // so the schedule generator only reruns when the course list changes.
  return useMemo(() => {
    if (!key) return [];
    if (!loaded) return null;
    const wanted = new Set(key.split(","));
    return loaded.courses.filter((c) => wanted.has(c.id));
  }, [key, loaded]);
}
