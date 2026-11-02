import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for using Backpacker.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Terms of use</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated November 2026</p>
      <div className="mt-8 space-y-6 leading-relaxed text-slate-700">
        <section>
          <h2 className="text-lg font-semibold text-michigan">A planning tool, not official advice</h2>
          <p className="mt-1">
            Backpacker is a free student project. It isn&apos;t academic advising and doesn&apos;t register you for classes. Requirements, prerequisites, sections, times, and instructors can be incomplete, out of date, or wrong. Before you register or make academic decisions, confirm everything with your advisor and in Wolverine Access. You&apos;re responsible for your own academic choices.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-michigan">Not affiliated</h2>
          <p className="mt-1">
            Backpacker is independent. It isn&apos;t affiliated with, sponsored by, or endorsed by the University of Michigan or Rate My Professors. Their names are used only to describe where information comes from or where links lead.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-michigan">No warranty</h2>
          <p className="mt-1">
            Backpacker is provided &ldquo;as is&rdquo;, without warranties of any kind. To the fullest extent the law allows, its creator isn&apos;t liable for damages from using it or relying on its information.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-michigan">Other websites</h2>
          <p className="mt-1">We link to other sites for convenience, and their own terms apply there.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-michigan">Contact</h2>
          <p className="mt-1">
            Found a mistake or have a concern? <a href="https://github.com/aveeks-dev/backpacker/issues" target="_blank" rel="noopener noreferrer" className="underline">Open an issue on GitHub ↗</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
