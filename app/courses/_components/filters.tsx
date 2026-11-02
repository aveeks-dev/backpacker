"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LEVEL_OPTIONS } from "@/lib/format";

type Props = {
  schools: string[];
  departments: string[];
  offeredCount: number;
  termLabel: string;
};

export function Filters({ schools, departments, offeredCount, termLabel }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  const [q, setQ] = useState(params.get("q") ?? "");
  const school = params.get("school") ?? "";
  const department = params.get("department") ?? "";
  const credits = params.get("credits") ?? "";
  const level = params.get("level") ?? "";
  const offered = params.get("offered") ?? "";

  useEffect(() => {
    const handle = setTimeout(() => {
      const next = new URLSearchParams(params.toString());
      if (q) next.set("q", q);
      else next.delete("q");
      next.delete("page");
      const queryString = next.toString();
      router.replace(queryString ? `/courses?${queryString}` : "/courses", { scroll: false });
    }, 200);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    const queryString = next.toString();
    router.replace(queryString ? `/courses?${queryString}` : "/courses", { scroll: false });
  }

  function clearAll() {
    setQ("");
    router.replace("/courses", { scroll: false });
  }

  const hasFilters = q || school || department || credits || level || offered;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <input
          aria-label="Search courses"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Find a course (e.g. EECS 280, ANTHRO 101)"
          className="min-w-[260px] flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-michigan focus:outline-none"
        />
        {hasFilters && (
          <button
            onClick={clearAll}
            className="rounded-md px-3 py-2 text-sm text-slate-500 hover:bg-slate-100 hover:text-michigan"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select value={school} onChange={(v) => setParam("school", v)} ariaLabel="School">
          <option value="">All schools</option>
          {schools.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </Select>
        <Select value={department} onChange={(v) => setParam("department", v)} ariaLabel="Subject">
          <option value="">All subjects</option>
          {departments.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </Select>
        <Select value={level} onChange={(v) => setParam("level", v)} ariaLabel="Course level">
          <option value="">All levels</option>
          {LEVEL_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </Select>
        <Select value={credits} onChange={(v) => setParam("credits", v)} ariaLabel="Credits">
          <option value="">Any credits</option>
          {["1", "2", "3", "4", "5"].map((c) => (
            <option key={c} value={c}>{c} credits</option>
          ))}
        </Select>
        <label className="ml-1 inline-flex items-center gap-1.5 text-xs text-slate-600">
          <input
            type="checkbox"
            checked={offered === "1"}
            onChange={(e) => setParam("offered", e.target.checked ? "1" : "")}
            className="h-3.5 w-3.5 rounded border-slate-300"
          />
          Offered in {termLabel} ({offeredCount.toLocaleString()})
        </label>
      </div>
    </div>
  );
}

function Select({
  value,
  onChange,
  children,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  ariaLabel: string;
}) {
  return (
    <select
      aria-label={ariaLabel}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-michigan focus:outline-none"
    >
      {children}
    </select>
  );
}
