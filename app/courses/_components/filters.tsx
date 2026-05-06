"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SORT_LABELS, type FulfillsGroup, type SortKey } from "@/lib/courses";

const SORT_OPTIONS = Object.keys(SORT_LABELS) as SortKey[];

type Props = {
  departments: string[];
  fulfillsGroups: FulfillsGroup[];
};

export function Filters({ departments, fulfillsGroups }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  const [q, setQ] = useState(params.get("q") ?? "");
  const department = params.get("department") ?? "";
  const fulfills = params.get("fulfills") ?? "";
  const credits = params.get("credits") ?? "";
  const maxWorkload = params.get("maxWorkload") ?? "";
  const sort = params.get("sort") ?? "code-asc";

  useEffect(() => {
    const handle = setTimeout(() => {
      const next = new URLSearchParams(params.toString());
      if (q) next.set("q", q);
      else next.delete("q");
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
    const queryString = next.toString();
    router.replace(queryString ? `/courses?${queryString}` : "/courses", { scroll: false });
  }

  function clearAll() {
    setQ("");
    router.replace("/courses", { scroll: false });
  }

  const hasFilters = q || department || credits || maxWorkload || fulfills || sort !== "code-asc";

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by code, title, or topic"
          className="min-w-[260px] flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
        />
        <Select
          value={sort}
          onChange={(v) => setParam("sort", v === "code-asc" ? "" : v)}
          ariaLabel="Sort"
        >
          {SORT_OPTIONS.map((k) => (
            <option key={k} value={k}>{SORT_LABELS[k]}</option>
          ))}
        </Select>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="rounded-md px-3 py-2 text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select
          value={department}
          onChange={(v) => setParam("department", v)}
          ariaLabel="Subject"
        >
          <option value="">All subjects</option>
          {departments.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </Select>
        <Select
          value={fulfills}
          onChange={(v) => setParam("fulfills", v)}
          ariaLabel="Distribution"
        >
          <option value="">Any distribution</option>
          {fulfillsGroups.map((g) => (
            <optgroup key={g.label} label={g.label}>
              {g.options.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </optgroup>
          ))}
        </Select>
        <Select
          value={credits}
          onChange={(v) => setParam("credits", v)}
          ariaLabel="Credits"
        >
          <option value="">Any credits</option>
          {[2, 3, 4, 5].map((c) => (
            <option key={c} value={String(c)}>{c} credits</option>
          ))}
        </Select>
        <Select
          value={maxWorkload}
          onChange={(v) => setParam("maxWorkload", v)}
          ariaLabel="Max workload"
        >
          <option value="">Any workload</option>
          {[8, 12, 15, 20].map((w) => (
            <option key={w} value={String(w)}>{`≤ ${w} hrs/wk`}</option>
          ))}
        </Select>
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
      className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
    >
      {children}
    </select>
  );
}
