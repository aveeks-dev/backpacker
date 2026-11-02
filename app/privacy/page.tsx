import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What Backpacker stores and what it doesn't.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Privacy</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated November 2026</p>
      <div className="mt-8 space-y-6 leading-relaxed text-slate-700">
        <section>
          <h2 className="text-lg font-semibold text-michigan">Your plan stays in your browser</h2>
          <p className="mt-1">
            There are no accounts. Your major, completed courses, roadmap, schedule, and saved courses are stored in your browser&apos;s local storage and aren&apos;t sent to a Backpacker database. Clearing your browser data removes them.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-michigan">What your browser sends</h2>
          <p className="mt-1">
            To load course information, the site receives course searches and the course IDs in your plan, without your name. Backpacker is hosted on Vercel, which may process technical information like IP addresses to run and protect the site.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-michigan">Shared links</h2>
          <p className="mt-1">A shared plan link contains the course IDs in that plan. Anyone with the link can see them.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-michigan">Other websites</h2>
          <p className="mt-1">Links to sites like Rate My Professors and U-M pages leave Backpacker, and those sites&apos; privacy policies apply.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-michigan">Changes and questions</h2>
          <p className="mt-1">
            If this changes, we&apos;ll update this page. Questions? <a href="https://github.com/aveeks-dev/backpacker/issues" target="_blank" rel="noopener noreferrer" className="underline">Open an issue on GitHub ↗</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
