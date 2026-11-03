import Link from "next/link";
import { HeaderSearch } from "./header-search";
import { NavLinks } from "./nav-links";

export function SiteHeader() {
  return (
    <header className="z-40 sm:sticky sm:top-0 border-b border-white/10 bg-michigan/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-white">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-maize text-sm font-bold text-michigan">B</span>
          Backpacker
        </Link>
        <HeaderSearch />
        <NavLinks />
      </div>
    </header>
  );
}
