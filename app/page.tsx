import Link from "next/link";
import { getAllCourses, getDepartments } from "@/lib/courses";

export default function Home() {
  const total = getAllCourses().length;
  const deptCount = getDepartments().length;

  return (
    <div className="flex min-h-full flex-col bg-white text-slate-900">
      <header className="border-b border-slate-200">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            Backpacker
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/courses" className="text-slate-600 hover:text-slate-900">Courses</Link>
            <Link href="/plan" className="text-slate-600 hover:text-slate-900">My Plan</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Plan your semester at Michigan.
        </h1>
        <p className="mt-3 text-slate-600">
          Workload, granular grade distributions, and side-by-side comparison —
          all in one place.
        </p>

        <form action="/courses" className="mt-8 flex w-full max-w-xl gap-2">
          <input
            name="q"
            placeholder="Find a course (e.g. EECS 280, ANTHRO 101)"
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
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        Not affiliated with the University of Michigan.
      </footer>
    </div>
  );
}
