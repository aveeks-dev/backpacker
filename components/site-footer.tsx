export function SiteFooter() {
  return (
    <footer className="bg-michigan">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-1.5 px-6 py-6 text-xs text-slate-300 sm:flex-row">
        <span>© {new Date().getFullYear()} Backpacker</span>
        <span>Not affiliated with the University of Michigan.</span>
      </div>
    </footer>
  );
}
