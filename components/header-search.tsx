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

  // The homepage and /courses have their own, more prominent search inputs.
  if (pathname === "/" || pathname === "/courses") return <div className="flex-1" />;

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
        placeholder="Find a course — press /"
        aria-label="Search courses"
        className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white placeholder:text-slate-400 focus:border-maize focus:outline-none"
      />
    </form>
  );
}
