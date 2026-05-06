# Backpacker scrapers

Two scrapers are planned for pulling real UMich course data into `data/courses.json`.

| Stage | Source | Auth | Status | Data extracted |
|---|---|---|---|---|
| v1 | `atlas.ai.umich.edu/api/courses` (public JSON) | none | **available** | course code, title, terms offered |
| v2 | `atlas.ai.umich.edu/courses/<dept>/<num>/` (HTML, behind UMich SSO) | UMich login (you, locally) | TODO | grade distributions, sections, professors, descriptions, prereqs |

## v1 — public catalog scraper

Pulls every UMich course code + title from Atlas's public JSON API. No
authentication required.

```bash
cd scraper
python3 scrape_atlas.py
```

Default output: `../data/courses-scraped.json`. Other flags:

```bash
python3 scrape_atlas.py --output /tmp/courses.json
python3 scrape_atlas.py --departments EECS MATH STATS
```

### Limitations

- Atlas caps results at 100 per query. Subjects that exceed 100 (e.g.
  some music performance codes) will be partially missed; the script
  prints a warning naming each capped subject.
- The public endpoint exposes only `course_code`, `title`, and
  `offered_terms`. Workload, grades, descriptions, sections, and
  professors are not in this API response.

### Why don't we just merge into `data/courses.json` directly?

The hand-curated `data/courses.json` has rich metrics (workload,
grade distributions, sections) that the public API can't provide. We
keep the scraped catalog separate so you can review it first, then
merge selectively. The recommended workflow:

1. Run the scraper → `data/courses-scraped.json`
2. Review what's new vs. what's already in `data/courses.json`
3. Merge by hand or with a small merge script (TODO)
4. Once v2 is ready, the auth scraper will fill in the rich fields

## v2 — authenticated detail scraper (TODO)

Will use Playwright with a persistent browser profile. You log in to
UMich once, the session cookie is saved locally, and the script then
fetches the per-course detail pages to extract grade distributions,
sections, and professors.

**Your credentials never enter any code or server.** Playwright opens
your browser, you log in interactively, and only the cookie sits in
a local file (`~/.config/backpacker/auth/`).

Planned interface:

```bash
python3 scrape_atlas_auth.py login        # one-time interactive login
python3 scrape_atlas_auth.py --department EECS
```
