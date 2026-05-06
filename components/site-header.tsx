import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Backpacker
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/courses" className="text-slate-600 hover:text-slate-900">Courses</Link>
          <Link href="/plan" className="text-slate-600 hover:text-slate-900">My Plan</Link>
        </nav>
      </div>
    </header>
  );
}
