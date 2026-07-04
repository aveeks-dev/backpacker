import Link from "next/link";
import { getAllCourses, getDepartments } from "@/lib/courses";

export default function Home() {
  const total = getAllCourses().length;
  const deptCount = getDepartments().length;

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Plan your semester at Michigan.
      </h1>
      <p className="mt-3 text-slate-600">
        Workload, grade distributions, and side-by-side comparison — all in one place.
      </p>

      <form action="/courses" className="mt-8 flex w-full max-w-xl gap-2">
        <input
          name="q"
          placeholder="Find a course (e.g. EECS 280, ANTHRO 101)"
          aria-label="Search courses"
          className="flex-1 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-md bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
        >
          Search
        </button>
      </form>
      <Link href="/courses" className="mt-3 text-sm text-slate-500 hover:text-slate-900">
        or browse all {total.toLocaleString()} courses across {deptCount} subjects →
      </Link>

      <div className="mt-16 grid w-full gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 text-left sm:grid-cols-3">
        <FeatureLink
          href="/courses"
          title="Browse"
          body="Filter by subject, level, credits, and requirements. Sort by workload, difficulty, or grades."
        />
        <FeatureLink
          href="/compare"
          title="Compare"
          body="Put up to four courses side-by-side. The better option in each metric is highlighted."
        />
        <FeatureLink
          href="/plan"
          title="Plan"
          body="Build a week, catch time conflicts, and see a projected GPA for the semester."
        />
      </div>
    </main>
  );
}

function FeatureLink({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <Link href={href} className="group bg-white p-5 transition-colors hover:bg-slate-50">
      <span className="text-sm font-semibold text-slate-900 group-hover:underline">
        {title} →
      </span>
      <p className="mt-1 text-xs leading-relaxed text-slate-500">{body}</p>
    </Link>
  );
}
