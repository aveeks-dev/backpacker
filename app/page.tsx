import Link from "next/link";
import { CURRENT_TERM, getAllCourses, getCourse, getDepartments, isOffered, type Course } from "@/lib/courses";
import { PROGRAMS, getProgram, hasFullPlan, type Program } from "@/lib/major-directory";
import { generateSchedules, toMinutes } from "@/lib/scheduler";

// The best Winter 2027 schedule for these courses, from the real generator.
const EXAMPLE_COURSES = ["econ-101", "eecs-281", "math-215", "eecs-370"];
const TONES = ["bg-maize text-michigan", "bg-white text-michigan", "bg-sky-200 text-michigan", "bg-emerald-200 text-michigan"];
const SHORT: Record<string, string> = { LEC: "Lecture", DIS: "Discussion", LAB: "Lab", REC: "Recitation", SEM: "Seminar" };
const DAY_INDEX: Record<string, number> = { M: 0, T: 1, W: 2, Th: 3, F: 4 };

type ExampleBlock = { key: string; code: string; kind: string; day: number; start: number; end: number; tone: string };

function exampleWeek(): { blocks: ExampleBlock[]; total: number; truncated: boolean } {
  const courses = EXAMPLE_COURSES.map(getCourse).filter((c): c is Course => c !== undefined && c.sections.length > 0);
  const result = generateSchedules(courses, { preferences: { preferLateStart: true, minimizeGaps: true }, maxExplored: 500_000, limit: 1 });
  const best = result.schedules[0];
  const blocks: ExampleBlock[] = [];
  for (const bundle of best?.bundles ?? []) {
    const course = courses.find((c) => c.id === bundle.courseId)!;
    for (const section of bundle.alternatives[0])
      section.meetings.forEach((m, mi) =>
        m.days.forEach((d) => {
          if (DAY_INDEX[d] === undefined) return;
          blocks.push({
            key: `${course.id}-${section.number}-${mi}-${d}`,
            code: course.code,
            kind: SHORT[section.component] ?? section.component,
            day: DAY_INDEX[d],
            start: toMinutes(m.start) / 60,
            end: toMinutes(m.end) / 60,
            tone: TONES[courses.indexOf(course) % TONES.length],
          });
        }),
      );
  }
  return { blocks, total: result.explored, truncated: result.truncated };
}

// Some of the most common U-M majors, for the home page.
const FEATURED = ["cs-eng", "cs-lsa", "econ-lsa", "lsa-psychology-general-social-science", "ross-school-of-business-bachelor-of-business-administration", "engineering-mechanical-engineering", "lsa-biology", "nursing-bachelor-of-science-in-nursing"];

const STEPS = [
  { title: "Tell us your major", body: "Pick your program and mark what you've already taken, including AP and transfer credit." },
  { title: "See what's left", body: "Get your remaining requirements, a four-year layout, and what makes sense next term." },
  { title: "Build the schedule", body: "Backpacker tries every section combination and ranks the ones that fit your week, or you pick sections yourself on the calendar." },
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
          <ExampleWeek {...exampleWeek()} />
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
          {FEATURED.map(getProgram).filter((m): m is Program => m !== undefined && hasFullPlan(m)).map((m) => (
            <li key={m.id}>
              <Link href={`/degree?major=${m.id}`} className="block h-full rounded-md border border-slate-200 bg-white p-5 transition hover:border-michigan hover:shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{m.school}</div>
                <div className="mt-1 font-display text-lg font-semibold">{m.name}</div>
              </Link>
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

function ExampleWeek({ blocks, total, truncated }: { blocks: ExampleBlock[]; total: number; truncated: boolean }) {
  if (blocks.length === 0) return null;
  const first = Math.floor(Math.min(...blocks.map((b) => b.start)));
  const last = Math.ceil(Math.max(...blocks.map((b) => b.end)));
  const hours = last - first;
  return (
    <figure className="rounded-lg border border-white/15 bg-white/[0.07] p-4 backdrop-blur" aria-label={`Example ${CURRENT_TERM.label} schedule`}>
      <figcaption className="mb-3 flex items-baseline justify-between gap-2 text-xs text-slate-300">
        <span className="font-semibold text-white">Example week</span>
        <span>
          Best of {total.toLocaleString()}
          {truncated ? "+" : ""} schedules for these 4 courses
        </span>
      </figcaption>
      <div className="grid grid-cols-[28px_repeat(5,minmax(0,1fr))] gap-1 text-center text-[10px] text-slate-300">
        <div />
        {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => <div key={d}>{d}</div>)}
      </div>
      <div className="mt-1 grid grid-cols-[28px_repeat(5,minmax(0,1fr))] gap-1" style={{ height: 320 }} aria-hidden="true">
        <div className="relative text-right text-[9px] text-slate-400">
          {Array.from({ length: hours }, (_, i) => first + i).map((h) => (
            <div key={h} className="absolute right-1" style={{ top: `${((h - first) / hours) * 100}%` }}>
              {h % 12 === 0 ? 12 : h % 12}
              {h < 12 ? "a" : "p"}
            </div>
          ))}
        </div>
        {[0, 1, 2, 3, 4].map((day) => (
          <div key={day} className="relative rounded bg-white/[0.04]">
            {blocks.filter((b) => b.day === day).map((b) => (
              <div
                key={b.key}
                className={`absolute inset-x-0.5 overflow-hidden rounded px-1 py-0.5 leading-tight ${b.tone}`}
                style={{ top: `${((b.start - first) / hours) * 100}%`, height: `calc(${((b.end - b.start) / hours) * 100}% - 2px)` }}
              >
                <div className="font-mono text-[9px] font-semibold leading-none sm:truncate sm:text-[10px] sm:leading-tight">{b.code}</div>
                <div className="truncate text-[9px] opacity-75">{b.kind}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </figure>
  );
}
