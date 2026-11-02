import Link from "next/link";
import { CURRENT_TERM, getAllCourses, getDepartments, isOffered } from "@/lib/courses";
import { PROGRAMS, hasFullPlan } from "@/lib/major-directory";

// A real Winter 2027 combination from the Registrar's schedule, drawn to scale.
const EXAMPLE = [
  { code: "ECON 101", kind: "Lecture", days: [0, 2], start: 10, end: 11.5, tone: "bg-maize text-michigan" },
  { code: "EECS 281", kind: "Lecture", days: [1, 3], start: 10.5, end: 12, tone: "bg-white text-michigan" },
  { code: "MATH 215", kind: "Lecture", days: [0, 2, 4], start: 12, end: 13, tone: "bg-sky-200 text-michigan" },
  { code: "ECON 101", kind: "Discussion", days: [0], start: 13, end: 14.5, tone: "bg-maize/80 text-michigan" },
  { code: "EECS 370", kind: "Lab", days: [0], start: 14.5, end: 16.5, tone: "bg-emerald-200 text-michigan" },
  { code: "MATH 215", kind: "Lab", days: [1], start: 12, end: 13, tone: "bg-sky-200 text-michigan" },
  { code: "EECS 281", kind: "Lab", days: [0], start: 16.5, end: 18.5, tone: "bg-white text-michigan" },
];
const FIRST_HOUR = 10;
const LAST_HOUR = 19;

const STEPS = [
  { title: "Tell us your major", body: "Pick your program and mark what you've already taken, including AP and transfer credit." },
  { title: "See what's left", body: "Get your remaining requirements, a four-year layout, and what makes sense next term." },
  { title: "Build the schedule", body: "Backpacker tries every section combination and ranks the ones that fit your week." },
];

export default function Home() {
  const courses = getAllCourses();
  const subjects = getDepartments();
  const offeredCount = courses.filter(isOffered).length;

  return (
    <main className="flex-1">
      <section className="hero text-white">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div>
            <p className="inline-block rounded-full border border-maize/40 bg-maize/10 px-3 py-1 text-xs font-semibold text-maize">
              {CURRENT_TERM.label} schedule is live
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] text-white sm:text-6xl">
              Know exactly what to take <span className="text-maize">next.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-200">
              Start with your major. Backpacker shows what you still need, lays out your four years, and finds every schedule that fits.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/degree" className="rounded-md bg-maize px-6 py-3 font-semibold text-michigan transition-colors hover:bg-maize-dark">
                Start with my major →
              </Link>
              <Link href="/plan" className="rounded-md border border-white/25 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10">
                I know my courses
              </Link>
            </div>
            <p className="mt-5 text-sm text-slate-300">Free, with no account. Your plan stays in your browser.</p>
          </div>
          <ExampleWeek />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-6">
        <ol className="grid gap-4 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="rounded-md border border-slate-200 bg-white p-6">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-michigan font-display text-sm font-semibold text-maize">{i + 1}</span>
              <h2 className="mt-4 text-lg font-semibold">{step.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-6 sm:px-6">
        <h2 className="text-2xl font-semibold">Four-year plans by major</h2>
        <p className="mt-1 text-slate-600">Find any of {PROGRAMS.length} U-M programs. {PROGRAMS.filter(hasFullPlan).length} have full checklists and roadmaps so far, including:</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PROGRAMS.filter(hasFullPlan).slice(0, 8).map((m) => (
            <li key={m.id} className="rounded-md border border-slate-200 bg-white p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{m.school}</div>
              <div className="mt-1 font-display text-lg font-semibold">{m.name}</div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6">
        <form action="/courses" className="flex max-w-2xl gap-2 rounded-lg border border-slate-200 bg-white p-2">
          <input id="home-search" name="q" type="search" placeholder="Search any course, like EECS 281" aria-label="Search courses" className="min-w-0 flex-1 rounded-md px-3 py-2.5" />
          <button type="submit" className="rounded-md bg-michigan px-5 py-2.5 font-semibold text-white hover:bg-michigan-light">Search</button>
        </form>
        <Link href="/courses?offered=1" className="mt-4 inline-block text-sm font-medium underline decoration-slate-300 underline-offset-4">
          Browse {offeredCount.toLocaleString()} {CURRENT_TERM.label} courses across {subjects.length} subjects →
        </Link>
      </section>
    </main>
  );
}

function ExampleWeek() {
  const hours = LAST_HOUR - FIRST_HOUR;
  return (
    <figure className="rounded-lg border border-white/15 bg-white/[0.07] p-4 backdrop-blur" aria-label={`Example ${CURRENT_TERM.label} schedule`}>
      <figcaption className="mb-3 flex items-baseline justify-between text-xs text-slate-300">
        <span className="font-semibold text-white">Example week</span>
        <span>1 of 119,946 valid schedules</span>
      </figcaption>
      <div className="grid grid-cols-5 gap-1 text-center text-[10px] text-slate-300">
        {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => <div key={d}>{d}</div>)}
      </div>
      <div className="mt-1 grid grid-cols-5 gap-1" style={{ height: 300 }} aria-hidden="true">
        {[0, 1, 2, 3, 4].map((day) => (
          <div key={day} className="relative rounded bg-white/[0.04]">
            {EXAMPLE.filter((b) => b.days.includes(day)).map((b) => (
              <div
                key={b.code + b.kind}
                className={`absolute inset-x-0.5 overflow-hidden rounded px-1 py-0.5 ${b.tone}`}
                style={{ top: `${((b.start - FIRST_HOUR) / hours) * 100}%`, height: `${((b.end - b.start) / hours) * 100}%` }}
              >
                <div className="truncate font-mono text-[9px] font-semibold sm:text-[10px]">{b.code}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </figure>
  );
}
