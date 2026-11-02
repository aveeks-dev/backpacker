"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "backpacker.saved.v1";
const EMPTY: string[] = [];

let cache: { raw: string | null; parsed: string[] } = { raw: null, parsed: EMPTY };

function read(): string[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === cache.raw) return cache.parsed;
  let parsed = EMPTY;
  try {
    const value = raw ? JSON.parse(raw) : EMPTY;
    if (Array.isArray(value)) parsed = value.filter((x) => typeof x === "string");
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

/** Courses the student bookmarked, stored only in this browser. */
export function useSaved() {
  const ids = useSyncExternalStore(subscribe, read, () => EMPTY);
  const toggle = useCallback((id: string) => {
    const cur = read();
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    for (const l of listeners) l();
  }, []);
  return { ids, toggle };
}
