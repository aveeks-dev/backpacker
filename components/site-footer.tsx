import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-12 bg-michigan">
      <div className="mx-auto flex w-full max-w-6xl flex-col justify-between gap-2 px-6 py-8 text-xs text-slate-300 sm:flex-row">
        <div>
          <div className="font-display text-sm font-semibold text-white">Backpacker</div>
          <p className="mt-1 max-w-md">
            Built by a U-M student. Not affiliated with or endorsed by the University of Michigan or Rate My Professors. Information may be wrong or out of date, so confirm your plan with an advisor and in Wolverine Access.
          </p>
        </div>
        <div className="flex flex-col gap-1 sm:items-end">
          <nav aria-label="Legal" className="flex gap-4">
            <Link href="/terms" className="underline-offset-4 hover:text-maize hover:underline">Terms</Link>
            <Link href="/privacy" className="underline-offset-4 hover:text-maize hover:underline">Privacy</Link>
          </nav>
          <span>© {new Date().getFullYear()} Backpacker</span>
        </div>
      </div>
    </footer>
  );
}
