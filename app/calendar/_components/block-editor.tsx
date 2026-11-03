"use client";

import { useState } from "react";
import type { TimeBlock } from "@/lib/calendar";
import { DAY_LABELS, formatMinutes } from "@/lib/format";
import type { Day } from "@/lib/registrar";
import { toMinutes } from "@/lib/scheduler";

const DAYS: Day[] = ["M", "T", "W", "Th", "F", "S", "Su"];
// Every 15 minutes from 6am to midnight.
const TIMES = Array.from({ length: (24 - 6) * 4 + 1 }, (_, i) => 6 * 60 + i * 15).map((m) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`,
);
const SUGGESTIONS = ["Work", "Practice", "Club meeting", "Gym", "Lunch", "Commute"];

/** Dialog for adding or editing a personal time block. */
export function BlockEditor({
  block,
  isNew,
  onSave,
  onDelete,
  onClose,
}: {
  block: TimeBlock;
  isNew: boolean;
  onSave: (block: TimeBlock) => void;
  onDelete: () => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState(block);
  const valid = draft.days.length > 0 && toMinutes(draft.end) > toMinutes(draft.start);
  const set = (patch: Partial<TimeBlock>) => setDraft({ ...draft, ...patch });
  const toggleDay = (d: Day) =>
    set({ days: draft.days.includes(d) ? draft.days.filter((x) => x !== d) : DAYS.filter((x) => x === d || draft.days.includes(x)) });

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-michigan/40 p-4" onClick={onClose}>
      <form
        role="dialog"
        aria-label={isNew ? "Add a time block" : "Edit time block"}
        className="w-full max-w-sm space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) onSave({ ...draft, label: draft.label.trim() || "Busy" });
        }}
      >
        <h2 className="font-display text-lg font-semibold text-michigan">{isNew ? "Add a time block" : "Edit time block"}</h2>
        <label className="block text-xs font-medium text-slate-600">
          What is it?
          <input
            autoFocus
            value={draft.label}
            onChange={(e) => set({ label: e.target.value })}
            placeholder="Work, practice, club…"
            maxLength={40}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900"
          />
        </label>
        <div className="flex flex-wrap gap-1">
          {SUGGESTIONS.map((s) => (
            <button key={s} type="button" onClick={() => set({ label: s })} className="rounded-full border border-slate-200 px-2.5 py-0.5 text-xs text-slate-600 hover:border-michigan hover:text-michigan">
              {s}
            </button>
          ))}
        </div>
        <div>
          <div className="mb-1 text-xs font-medium text-slate-600">Days</div>
          <div className="flex gap-1">
            {DAYS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => toggleDay(d)}
                aria-pressed={draft.days.includes(d)}
                className={`flex-1 rounded-md border px-1 py-1.5 text-xs ${
                  draft.days.includes(d) ? "border-michigan bg-michigan text-white" : "border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {DAY_LABELS[d]}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {(["start", "end"] as const).map((field) => (
            <label key={field} className="text-xs font-medium text-slate-600">
              {field === "start" ? "Starts" : "Ends"}
              <select
                value={draft[field]}
                onChange={(e) => set({ [field]: e.target.value })}
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-2 py-2 text-sm text-slate-900"
              >
                {TIMES.map((t) => (
                  <option key={t} value={t}>
                    {formatMinutes(toMinutes(t))}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
        {!valid && <p className="text-xs text-rose-600">Pick at least one day, and an end after the start.</p>}
        <div className="flex items-center justify-between gap-2 pt-1">
          {!isNew ? (
            <button type="button" onClick={onDelete} className="text-sm text-rose-600 hover:underline">
              Delete
            </button>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <button type="button" onClick={onClose} className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" disabled={!valid} className="rounded-md bg-michigan px-3 py-1.5 text-sm font-medium text-white hover:bg-michigan-light disabled:opacity-40">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

/** "HH:MM" for minutes from midnight. */
export function toClock(minutes: number): string {
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}
