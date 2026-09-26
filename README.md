# Backpacker

Backpacker helps University of Michigan students put together a semester that fits their workload and schedule. Search the course catalog, compare classes, and keep a plan in one place.

## What you can do

- Search nearly 9,000 courses across 128 subjects, with filters for level, credits, and requirements.
- Compare up to four courses by workload, difficulty, and grade distribution.
- Add courses to a weekly planner and see overlaps in the listed meeting times.
- Share a plan with a link, or save a shared plan in your own browser.
- Find subject-specific advising, tutoring, and study resources.

## About the data

Course codes and titles come from the public Michigan Atlas catalog. The dataset combines manually curated preview records with estimated workload and grade figures derived from course level and subject. Estimates are labeled in the app; they are not official student outcomes.

The planner currently uses the first listed section for each course. It does not check live availability, register you for classes, or verify every prerequisite. Courses without meeting times cannot be checked for conflicts. Confirm current information with the university before registering.

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
