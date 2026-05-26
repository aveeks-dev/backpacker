"use client";

import { useState } from "react";

export function ShareButton({ ids }: { ids: string[] }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (ids.length === 0) return;
    const url = `${window.location.origin}/plan?ids=${ids.join(",")}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // fallback: select the URL in the address bar
      window.prompt("Copy this plan URL:", url);
    }
  }

  if (ids.length === 0) return null;

  return (
    <button
      onClick={copy}
      className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
    >
      {copied ? "Copied!" : "Share plan"}
    </button>
  );
}
