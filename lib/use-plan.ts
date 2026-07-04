"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "backpacker.plan.v1";
const EMPTY: string[] = [];

// Cache the parsed value so getSnapshot returns a stable reference for
// unchanged data (required by useSyncExternalStore).
let cache: { raw: string | null; parsed: string[] } = { raw: null, parsed: EMPTY };

function readSnapshot(): string[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === cache.raw) return cache.parsed;
  let parsed: string[] = EMPTY;
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

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  // Also react to changes made in other tabs.
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function write(next: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  for (const l of listeners) l();
}

/**
 * Shared semester-plan state, persisted to localStorage and kept in sync
 * across every component (and browser tab) that uses it.
 */
export function usePlan() {
  const ids = useSyncExternalStore(subscribe, readSnapshot, () => EMPTY);
  // false during SSR/hydration, true immediately after — lets consumers
  // avoid flashing "empty plan" UI before storage has been read.
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const add = useCallback((id: string) => {
    const cur = readSnapshot();
    if (!cur.includes(id)) write([...cur, id]);
  }, []);

  const remove = useCallback((id: string) => {
    write(readSnapshot().filter((x) => x !== id));
  }, []);

  const clear = useCallback(() => write([]), []);

  const replace = useCallback((next: string[]) => {
    write(Array.from(new Set(next)));
  }, []);

  return { ids, mounted, add, remove, clear, replace };
}
