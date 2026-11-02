# Backpacker data

Backpacker combines two sources:

| File | Source | What it holds |
|---|---|---|
| `data/catalog.json` | Atlas public course API (`scrape_atlas.py`) | Every course code and title in the catalog |
| `data/schedule/<TERM>.json` | Registrar "All classes" CSV (`npm run import:schedule`) | Credits, sections, meeting times, rooms, instructors for one term |

A course appears in the app if it is in either file. Course titles come from
the catalog when available, because the Registrar abbreviates them.

## Catalog: Atlas public API

```bash
cd scraper
python3 scrape_atlas.py                         # all subjects -> ../data/catalog.json
python3 scrape_atlas.py --departments EECS MATH # selected subjects only
```

No authentication or dependencies beyond the Python standard library. Atlas
caps results at 100 per query, so the script makes several narrower passes
per subject and merges them.

## Term schedule: Registrar CSV

The Registrar publishes one CSV per term at
https://ro.umich.edu/calendars/schedule-of-classes ("All classes (CSV)"). It
requires a UMich login, so download it in your browser, save it under
`data/raw/` (gitignored), then run:

```bash
npm run import:schedule -- data/raw/WN2027.csv
```

This writes `data/schedule/WN2027.json`. To switch the app to a new term,
change `CURRENT_TERM` in `lib/courses.ts`.
