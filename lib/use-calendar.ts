"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { Picks, TimeBlock } from "./calendar";

// Per term, so next term's calendar starts empty.
const STORAGE_KEY = "backpacker.calendar.WN2027";

export type CalendarState = { picks: Picks; blocks: TimeBlock[] };

const EMPTY: CalendarState = { picks: {}, blocks: [] };

let cache: { raw: string | null; parsed: CalendarState } = { raw: null, parsed: EMPTY };

const isStrings = (v: unknown): v is string[] => Array.isArray(v) && v.every((x) => typeof x === "string");

function read(): CalendarState {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === cache.raw) return cache.parsed;
  let parsed = EMPTY;
  try {
    const value = raw ? JSON.parse(raw) : null;
    if (value && typeof value === "object") {
      const picks: Picks = {};
      for (const [id, numbers] of Object.entries(value.picks ?? {})) if (isStrings(numbers)) picks[id] = numbers;
      const blocks = Array.isArray(value.blocks)
        ? value.blocks.filter(
            (b: TimeBlock) => b && typeof b.id === "string" && typeof b.label === "string" && isStrings(b.days) && typeof b.start === "string" && typeof b.end === "string",
          )
        : [];
      parsed = { picks, blocks };
    }
  } catch {
    parsed = EMPTY;
  }
  cache = { raw, parsed };
  return parsed;
}

const listeners = new Set<() => void>();

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function write(next: CalendarState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  for (const l of listeners) l();
}

/** The hand-built calendar's picked sections and time blocks, saved in this browser. */
export function useCalendar() {
  const state = useSyncExternalStore(subscribe, read, () => EMPTY);
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  const setPicks = useCallback((update: (picks: Picks) => Picks) => {
    const cur = read();
    write({ ...cur, picks: update(cur.picks) });
  }, []);

  const saveBlock = useCallback((block: TimeBlock) => {
    const cur = read();
    const exists = cur.blocks.some((b) => b.id === block.id);
    write({ ...cur, blocks: exists ? cur.blocks.map((b) => (b.id === block.id ? block : b)) : [...cur.blocks, block] });
  }, []);

  const removeBlock = useCallback((id: string) => {
    const cur = read();
    write({ ...cur, blocks: cur.blocks.filter((b) => b.id !== id) });
  }, []);

  const clear = useCallback(() => write(EMPTY), []);

  return { ...state, mounted, setPicks, saveBlock, removeBlock, clear };
}

/** For the schedule generator's "Edit in calendar" button. */
export function replaceCalendarPicks(picks: Picks) {
  write({ ...read(), picks });
}
