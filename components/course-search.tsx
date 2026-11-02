"use client";

import { useEffect, useState } from "react";
import type { CourseSummary } from "@/lib/courses";

type Props = {
  onPick: (course: CourseSummary) => void;
  exclude?: string[];
  offeredOnly?: boolean;
  placeholder?: string;
  label: string;
  autoFocus?: boolean;
};

/** Typeahead backed by /api/courses, so the catalog never ships to the browser. */
export function CourseSearch({ onPick, exclude = [], offeredOnly, placeholder, label, autoFocus }: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<CourseSummary[]>([]);

  useEffect(() => {
    if (!query.trim()) return;
    const controller = new AbortController();
    const handle = setTimeout(async () => {
      const params = new URLSearchParams({ q: query });
      if (offeredOnly) params.set("offered", "1");
      try {
        const res = await fetch(`/api/courses?${params}`, { signal: controller.signal });
        const data = (await res.json()) as { courses: CourseSummary[] };
        setResults(data.courses);
      } catch {
        // Aborted by a newer keystroke, or offline; keep the last results.
      }
    }, 120);
    return () => {
      clearTimeout(handle);
      controller.abort();
    };
  }, [query, offeredOnly]);

  const visible = query.trim() ? results.filter((c) => !exclude.includes(c.id)) : [];

  function pick(course: CourseSummary) {
    onPick(course);
    setQuery("");
    setResults([]);
  }

  return (
    <div className="relative w-full">
      <input
        aria-label={label}
        autoFocus={autoFocus}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={(e) => {
          if (!e.currentTarget.parentElement?.contains(e.relatedTarget)) setOpen(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
          if (e.key === "Enter" && visible[0]) pick(visible[0]);
        }}
        placeholder={placeholder ?? "Add a course…"}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-michigan focus:outline-none"
      />
      {open && visible.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-72 w-full overflow-auto rounded-md border border-slate-200 bg-white shadow-md">
          {visible.map((c) => (
            <li key={c.id}>
              <button
                onClick={() => pick(c)}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-slate-50"
              >
                <span className="font-mono text-xs font-semibold text-slate-700">{c.code}</span>
                <span className="truncate text-slate-700">{c.title}</span>
                {!c.offered && <span className="ml-auto shrink-0 text-[10px] text-slate-400">not offered</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
