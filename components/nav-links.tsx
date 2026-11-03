"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/degree", label: "My degree" },
  { href: "/plan", label: "Schedule" },
  { href: "/calendar", label: "Calendar" },
  { href: "/courses", label: "Courses" },
  { href: "/subjects", label: "Subjects" },
  { href: "/compare", label: "Compare" },
];

/** Main navigation, with the current section highlighted. Wraps on phones so every link shows. */
export function NavLinks() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main navigation" className="flex w-full flex-wrap items-center gap-1 text-sm sm:ml-auto sm:w-auto">
      {NAV.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`whitespace-nowrap rounded-lg px-2.5 py-1.5 transition-colors hover:bg-white/10 hover:text-maize ${
              active ? "bg-white/10 font-semibold text-maize" : "text-slate-200"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
