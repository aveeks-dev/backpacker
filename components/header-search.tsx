"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function HeaderSearch() {
  const pathname = usePathname();
  const router = useRouter();
  const [q, setQ] = useState("");

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // press "/" to focus the header search (skipped if typing in a field)
      if (e.key !== "/") return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      e.preventDefault();
      const el = document.getElementById("header-search-input");
      el?.focus();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // On /courses the page has its own (richer) search; hide this one.
  if (pathname === "/courses") return <div className="flex-1" />;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (q.trim()) router.push(`/courses?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <form onSubmit={submit} className="hidden flex-1 sm:flex sm:max-w-md">
      <input
        id="header-search-input"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Quick find: EECS 280, ANTHRO 101 …  (press /)"
        className="w-full rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
      />
    </form>
  );
}
