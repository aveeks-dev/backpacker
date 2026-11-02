export function SiteFooter() {
  return (
    <footer className="mt-12 bg-michigan">
      <div className="mx-auto flex w-full max-w-6xl flex-col justify-between gap-2 px-6 py-8 text-xs text-slate-300 sm:flex-row">
        <div>
          <div className="font-display text-sm font-semibold text-white">Backpacker</div>
          <p className="mt-1 max-w-md">
            Built by a U-M student. Not affiliated with the University of Michigan. Always confirm your plan with an advisor and in Wolverine Access.
          </p>
        </div>
        <span>© {new Date().getFullYear()} Backpacker</span>
      </div>
    </footer>
  );
}
