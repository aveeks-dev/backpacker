import Link from "next/link";
import { HeaderSearch } from "./header-search";

const NAV = [
  { href: "/degree", label: "My degree" },
  { href: "/plan", label: "Schedule" },
  { href: "/courses", label: "Courses" },
  { href: "/subjects", label: "Subjects" },
  { href: "/compare", label: "Compare" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-michigan/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-white">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-maize text-sm font-bold text-michigan">B</span>
          Backpacker
        </Link>
        <HeaderSearch />
        <nav aria-label="Main navigation" className="flex w-full items-center gap-1 overflow-x-auto text-sm sm:ml-auto sm:w-auto">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-lg px-2.5 py-1.5 text-slate-200 transition-colors hover:bg-white/10 hover:text-maize"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
