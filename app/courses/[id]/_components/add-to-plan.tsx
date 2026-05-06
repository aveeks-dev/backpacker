"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "backpacker.plan.v1";

export function AddToPlanButton({ courseId }: { courseId: string }) {
  const [planIds, setPlanIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setPlanIds(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const inPlan = planIds.includes(courseId);

  function toggle() {
    const next = inPlan ? planIds.filter((id) => id !== courseId) : [...planIds, courseId];
    setPlanIds(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  if (!mounted) {
    return (
      <button
        disabled
        className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-400"
      >
        Add to plan
      </button>
    );
  }

  if (inPlan) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-emerald-700">✓ In your plan</span>
        <button
          onClick={toggle}
          className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
        >
          Remove
        </button>
        <Link
          href="/plan"
          className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800"
        >
          View plan →
        </Link>
      </div>
    );
  }

  return (
    <button
      onClick={toggle}
      className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800"
    >
      Add to plan
    </button>
  );
}
