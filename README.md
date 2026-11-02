# Backpacker

Backpacker helps University of Michigan students figure out what to take and when. Start with your major to see what's left and a four-year roadmap, then build a conflict-free schedule from the Registrar's real sections.

## What you can do

- Choose a major (CS in Engineering or LSA, Data Science, or Economics), mark what you've taken, and see remaining requirements and next-term suggestions that respect published EECS prerequisites.
- Rearrange a four-year roadmap, with status by year and an optional fifth year. CS-Engineering starts from the department's official sample schedule; the others start from a clearly labeled suggested order.
- Browse courses as cards, filter by school, and save the ones you like. Each course links to its Rate My Professors searches and its Atlas evaluations.
- Generate every conflict-free Winter 2027 schedule for up to 8 courses, ranked by later starts, fewer gaps, or fewer days on campus, with hard limits like "no class before 10am" or "Fridays off".
- Lock the sections you want and let the generator fill in the rest; each result lists the class numbers to put in your Wolverine Access backpack.
- Browse about 12,000 courses across the catalog, with each Winter 2027 course's sections, times, rooms, and instructors.
- Look up instructors on Rate My Professors and compare up to four courses side by side.
- Share a plan with a link, or save a shared plan in your own browser.

## How the schedule generator works

`lib/scheduler.ts` builds every valid way to take each course: one section per component (lecture, lab, discussion), following U-M's section numbering, where lecture 010 owns labs 011–019 and lecture 100 owns discussions 101–199. Options that meet at identical times are merged. A backtracking search then picks one option per course, trying the most constrained course first and rejecting time conflicts with a per-day bitset in 5-minute slots. Only the best 50 schedules are kept while it searches. For EECS 281, EECS 370, MATH 215, and ECON 101, it checks all ~120,000 valid schedules in about 150 ms.

## About the data

Major requirements come from official U-M pages linked in `lib/majors.ts`, and EECS prerequisites from the public Engineering Bulletin (`lib/prereqs.ts`). Prerequisites in other subjects aren't modeled. Atlas's login-only evaluations and grades are linked, not copied. Course codes and titles come from the public U-M Atlas catalog. Sections, meeting times, rooms, instructors, and credits come from the Registrar's Winter 2027 schedule of classes; see `scraper/README.md` for how both are imported. The Registrar lists instructors by last name only.

Backpacker does not check seat availability, enrollment restrictions, or prerequisites beyond the EECS courses it lists, and it does not register you for classes. Confirm everything in Wolverine Access before registering.

Plans are saved locally in your browser. There is no account system or cloud sync. Anyone with a shared plan link can see the courses in that link.

Backpacker is an independent project and is not affiliated with the University of Michigan.

## Run locally

Requires Node.js 20.9 or newer and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. To check a production build:

```sh
npm run build
npm start
```

## Deploy

Import this repository into Vercel as a Next.js project. Use `npm ci` to install and `npm run build` to build; leave the output directory at its default. The app currently needs no environment variables or database.

To use your own web address, add a domain you own in the project's domain settings and apply the DNS records Vercel provides. Domain registration is separate from hosting.

## Built with

Next.js 16, TypeScript, React 19, and Tailwind CSS 4. The `app/` directory contains the pages, `lib/` holds course and planning logic, and `data/` holds the catalog. The `scraper/` directory contains the catalog import scripts.
