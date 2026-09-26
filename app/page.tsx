import Link from "next/link";
import { getAllCourses, getDepartments } from "@/lib/courses";

export default function Home() {
  const courses = getAllCourses();
  const subjects = getDepartments();
  const featured = ["EECS 280", "MATH 115", "STATS 250", "EECS 203"]
    .map(code => courses.find(c => c.code === code)).filter(c => c !== undefined);
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-6 sm:py-16">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section>
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">University of Michigan · Course planning</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">A semester that<br />works for you.</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">Find your courses. Weigh the workload. Make room for everything else.</p>
          <form action="/courses" className="mt-8 flex max-w-2xl gap-2 rounded-xl border border-slate-300 bg-white p-2 shadow-sm">
            <input id="home-search" name="q" type="search" placeholder="Course code or title" aria-label="Search courses" className="min-w-0 flex-1 rounded-lg px-3 py-3 text-base" />
            <button type="submit" className="rounded-lg bg-maize px-5 py-3 font-semibold text-michigan hover:bg-maize-dark">Search</button>
          </form>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <span className="mr-1 text-slate-500">Jump to</span>
            {["EECS", "MATH", "STATS", "PSYCH"].filter(d => subjects.includes(d)).map(dept => <Link key={dept} href={`/courses?department=${dept}`} className="rounded-full border border-slate-200 px-3 py-1.5 hover:border-michigan hover:bg-slate-50">{dept}</Link>)}
          </div>
          <Link href="/courses" className="mt-5 inline-block text-sm font-medium underline decoration-slate-300 underline-offset-4">Explore {courses.length.toLocaleString()} courses across {subjects.length} subjects →</Link>
        </section>
        <aside className="rounded-2xl bg-michigan p-7 text-white lg:mt-1">
          <span className="inline-block rounded-full bg-maize px-3 py-1 text-xs font-semibold text-michigan">YOUR NEXT SEMESTER</span>
          <h2 className="mt-5 text-2xl font-semibold tracking-tight">See the whole week.</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">Bring your courses together to check listed meeting times, compare workload, and spot overlaps.</p>
          <Link href="/plan" className="mt-6 flex items-center justify-between rounded-lg bg-white px-4 py-3 text-sm font-semibold text-michigan hover:bg-slate-100">Open my planner <span aria-hidden="true">→</span></Link>
          <p className="mt-4 text-xs leading-5 text-slate-300">No account needed. Your plan stays in this browser.</p>
        </aside>
      </div>
      <section className="mt-14 border-t border-slate-200 pt-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3"><h2 className="text-xl font-semibold tracking-tight">A few courses to explore</h2><Link href="/compare" className="text-sm underline underline-offset-4">Compare courses →</Link></div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map(course => <Link key={course.id} href={`/courses/${course.id}`} className="group flex flex-col rounded-xl border border-slate-200 p-5 transition-colors hover:border-michigan hover:bg-slate-50">
            <span className="font-mono text-sm font-semibold">{course.code}</span>
            <h3 className="mt-2 flex-1 text-base leading-6 text-slate-700">{course.title}</h3>
            <span className="mt-5 flex justify-between border-t border-slate-100 pt-3 text-sm text-slate-500"><span>{course.credits} credits</span><span className="text-michigan group-hover:underline">View course →</span></span>
          </Link>)}
        </div>
      </section>
      <p className="mt-8 max-w-3xl text-sm leading-6 text-slate-500">A planning companion, not a registration system. Some workload and grade figures are estimates; check each course’s data label and confirm current offerings with the university.</p>
    </main>
  );
}
