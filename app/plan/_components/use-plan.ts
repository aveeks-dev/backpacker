"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "backpacker.plan.v1";

export function usePlan() {
  const [ids, setIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setIds(JSON.parse(raw));
    } catch {
      // ignore
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setIds(JSON.parse(e.newValue));
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function update(next: string[]) {
    setIds(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function add(id: string) {
    if (!ids.includes(id)) update([...ids, id]);
  }

  function remove(id: string) {
    update(ids.filter((x) => x !== id));
  }

  function clear() {
    update([]);
  }

  function replace(next: string[]) {
    update(Array.from(new Set(next)));
  }

  return { ids, mounted, add, remove, clear, replace };
}
