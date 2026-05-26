"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Course } from "@/lib/courses";

type Props = {
  existing: string[];
  allCourses: Pick<Course, "id" | "code" | "title">[];
  disabled?: boolean;
};

export function AddCoursePicker({ existing, allCourses, disabled }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const matches = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase().replace(/\s+/g, "");
    return allCourses
      .filter((c) => !existing.includes(c.id))
      .filter((c) =>
        `${c.code} ${c.title}`.toLowerCase().replace(/\s+/g, "").includes(q),
      )
      .slice(0, 8);
  }, [query, existing, allCourses]);

  function pick(id: string) {
    const next = [...existing, id];
    router.push(`/compare?ids=${next.join(",")}`);
    setQuery("");
    setOpen(false);
  }

  if (disabled) {
    return (
      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
        Maximum 4 courses
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-sm">
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder="Add a course to compare…"
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
      />
      {open && matches.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-72 w-full overflow-auto rounded-md border border-slate-200 bg-white shadow-md">
          {matches.map((c) => (
            <li key={c.id}>
              <button
                onClick={() => pick(c.id)}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-slate-50"
              >
                <span className="font-mono text-xs font-semibold text-slate-700">{c.code}</span>
                <span className="truncate text-slate-700">{c.title}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
