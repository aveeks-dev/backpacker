import Link from "next/link";
import { HeaderSearch } from "./header-search";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-4 px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Backpacker
        </Link>
        <HeaderSearch />
        <nav className="flex items-center gap-5 text-sm">
          <Link href="/courses" className="text-slate-600 hover:text-slate-900">Courses</Link>
          <Link href="/compare" className="text-slate-600 hover:text-slate-900">Compare</Link>
          <Link href="/plan" className="text-slate-600 hover:text-slate-900">Plan</Link>
        </nav>
      </div>
    </header>
  );
}
