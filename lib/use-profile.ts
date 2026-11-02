"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "backpacker.profile.v1";

export type Profile = {
  majorId: string | null;
  completed: string[];
  openProgress: Record<string, number>;
  layout: Record<string, number>;
  extraYear: boolean;
};

const EMPTY: Profile = { majorId: null, completed: [], openProgress: {}, layout: {}, extraYear: false };

// Cached so getSnapshot returns a stable reference (see use-plan.ts).
let cache: { raw: string | null; parsed: Profile } = { raw: null, parsed: EMPTY };

function read(): Profile {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === cache.raw) return cache.parsed;
  let parsed = EMPTY;
  try {
    const value = raw ? JSON.parse(raw) : null;
    if (value && typeof value === "object") {
      parsed = {
        majorId: typeof value.majorId === "string" ? value.majorId : null,
        completed: Array.isArray(value.completed) ? value.completed.filter((x: unknown) => typeof x === "string") : [],
        openProgress: value.openProgress && typeof value.openProgress === "object" ? value.openProgress : {},
        layout: value.layout && typeof value.layout === "object" ? value.layout : {},
        extraYear: value.extraYear === true,
      };
    }
  } catch {
    parsed = EMPTY;
  }
  cache = { raw, parsed };
  return parsed;
}

const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
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

function write(next: Profile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  for (const l of listeners) l();
}

/** The student's major and completed courses, stored only in this browser. */
export function useProfile() {
  const profile = useSyncExternalStore(subscribe, read, () => EMPTY);
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  const setMajor = useCallback((majorId: string | null) => write({ ...read(), majorId, openProgress: {}, layout: {}, extraYear: false }), []);
  const setCourses = useCallback((ids: string[], done: boolean) => {
    const cur = read();
    const completed = done
      ? Array.from(new Set([...cur.completed, ...ids]))
      : cur.completed.filter((id) => !ids.includes(id));
    write({ ...cur, completed });
  }, []);
  const setOpenProgress = useCallback((id: string, amount: number) => {
    const cur = read();
    write({ ...cur, openProgress: { ...cur.openProgress, [id]: Math.max(0, amount) } });
  }, []);

  const moveEntry = useCallback((key: string, term: number) => {
    const cur = read();
    write({ ...cur, layout: { ...cur.layout, [key]: term } });
  }, []);
  const setExtraYear = useCallback((extraYear: boolean) => write({ ...read(), extraYear }), []);
  const resetLayout = useCallback(() => write({ ...read(), layout: {}, extraYear: false }), []);

  return { profile, mounted, setMajor, setCourses, setOpenProgress, moveEntry, setExtraYear, resetLayout };
}
