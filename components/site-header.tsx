import Link from "next/link";
import { HeaderSearch } from "./header-search";

export function SiteHeader() {
  return (
    <header className="bg-michigan">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-4 px-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-white">
          <span className="grid h-6 w-6 place-items-center rounded bg-maize text-xs font-bold text-michigan">
            B
          </span>
          Backpacker
        </Link>
        <HeaderSearch />
        <nav className="flex items-center gap-5 text-sm">
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
