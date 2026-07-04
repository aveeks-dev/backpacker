"use client";

import Link from "next/link";
import { usePlan } from "@/lib/use-plan";

export function AddToPlanButton({ courseId }: { courseId: string }) {
  const { ids, mounted, add, remove } = usePlan();
  const inPlan = ids.includes(courseId);

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
          onClick={() => remove(courseId)}
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
      onClick={() => add(courseId)}
      className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800"
    >
      Add to plan
    </button>
  );
}
