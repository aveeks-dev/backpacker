import Link from "next/link";
import { HeaderSearch } from "./header-search";

export function SiteHeader() {
  return (
    <header className="bg-michigan">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl flex-wrap items-center gap-x-4 gap-y-3 px-5 py-4">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-white">
          <span className="grid h-6 w-6 place-items-center rounded bg-maize text-xs font-bold text-michigan">
            B
          </span>
          Backpacker
        </Link>
        <HeaderSearch />
        <nav aria-label="Main navigation" className="flex w-full items-center justify-between gap-4 text-sm sm:ml-auto sm:w-auto sm:gap-5">
          <Link href="/courses" className="text-slate-300 transition-colors hover:text-maize">
            Courses
          </Link>
          <Link href="/subjects" className="text-slate-300 transition-colors hover:text-maize">
            Subjects
          </Link>
          <Link href="/compare" className="text-slate-300 transition-colors hover:text-maize">
            Compare
          </Link>
          <Link href="/plan" className="text-slate-300 transition-colors hover:text-maize">
            Plan
          </Link>
        </nav>
      </div>
      <div className="h-0.5 bg-maize" />
    </header>
  );
}
