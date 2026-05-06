#!/usr/bin/env python3
"""
Scrape the UMich course catalog from Atlas's public API.

Atlas (atlas.ai.umich.edu) exposes a public JSON endpoint at /api/courses
that returns up to 100 courses per request, filtered by `?search=<term>`.
This script enumerates a hardcoded list of UMich subject codes and unions
the results, deduping by course code.

Output schema matches Backpacker's data/courses.json shape, with stub
values for fields the public API doesn't expose (descriptions, grades,
workload, sections). Those come from the authenticated v2 scraper.

Usage
-----
    python3 scrape_atlas.py                     # writes to ../data/courses-scraped.json
    python3 scrape_atlas.py --output foo.json   # custom path
    python3 scrape_atlas.py --departments EECS  # limit to one or more departments

No external dependencies — uses only the Python standard library.
"""

from __future__ import annotations

import argparse
import json
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

ATLAS_BASE = "https://atlas.ai.umich.edu/api/courses"
USER_AGENT = "Mozilla/5.0 (compatible; Backpacker scraper; +https://github.com/aveeks-dev/backpacker)"
RATE_LIMIT_SLEEP_SEC = 0.25
PAGE_CAP = 100  # Atlas hard-caps results per query

DEPARTMENTS: list[str] = [
    # LSA (Literature, Science & the Arts)
    "AAAS", "AAS", "AMCULT", "ANTHRARC", "ANTHRBIO", "ANTHRCUL",
    "APTIS", "ARABIC", "ARMENIAN", "ASIAN", "ASIANLAN", "ASIANPAM",
    "ASTRO", "BIOLOGY", "BIOPHYS", "CHEM", "CICS", "CLARCH",
    "CLCIV", "CLLANG", "COMM", "COMPLIT", "DUTCH", "EARTH",
    "ECON", "EEB", "ENGLISH", "ENS", "ENVIRON", "FILMTV", "FRENCH",
    "GERMAN", "GREEK", "GREEKMOD", "HEBREW", "HINDI", "HISTART",
    "HISTORY", "HONORS", "INDIC", "ITALIAN", "JAPANESE", "JUDAIC",
    "KOREAN", "LACS", "LATIN", "LATINOAM", "LING", "LSA", "MATH",
    "MCDB", "MEMS", "MIDEAST", "MUSICOL", "NES", "PERSIAN", "PHIL",
    "PHYSICS", "POLISH", "POLSCI", "PORTUG", "PSYCH", "RCARTS",
    "RCCORE", "RCHUMS", "RCLANG", "RCNSCI", "RCSSCI", "RELIGION",
    "ROMLANG", "ROMLING", "RUSSIAN", "SAS", "SCAND", "SLAVIC",
    "SOC", "SPANISH", "STATS", "STDABRD", "SWAHILI", "TURKISH",
    "UC", "UKR", "URDU", "VIETNAM", "WGS", "WOMENSTD", "YIDDISH",
    # College of Engineering
    "AERO", "AEROSP", "AOSS", "AUTO", "BIOMEDE", "CEE", "CHE",
    "CLIMATE", "EAS", "EECS", "ENGR", "ENTR", "ESENG", "IOE",
    "MATSCI", "MECHENG", "NAME", "NAVSCI", "NERS", "PHYSED",
    "ROB", "SI", "TCHNCLCM",
    # Ross School of Business
    "ACC", "BBA", "BCOM", "BL", "ES", "FIN", "MKT", "MO",
    "OMS", "STRATEGY", "TO",
    # Stamps School of Art & Design
    "ART", "ARTDES",
    # School of Music, Theatre & Dance
    "BASSOON", "CARILLON", "CELLO", "CLARINET", "DANCE", "EUPHON",
    "FLUTE", "FRENCHHORN", "GUITAR", "HARP", "HARPSICH", "JAZZIMP",
    "MUSED", "MUSIC", "MUSPERF", "MUSTHRY", "OBOE", "ORGAN", "PIANO",
    "PERCUSS", "SAXOPHN", "TUBA", "THEATRE", "TRUMPET", "TROMBONE",
    "VIOLA", "VIOLIN", "VOICE",
    # Schools / professional
    "ARCH", "DENT", "EDUC", "INFO", "KINESLGY", "MOVESCI", "NURS",
    "PHARM", "PUBPOL", "PUBHLTH", "SOCWORK", "URP",
    # Public Health (codes vary by program)
    "BIOSTAT", "ENVHLTH", "EPID", "HMP", "NUTR",
]


def fetch_search(term: str) -> list[dict]:
    qs = urllib.parse.urlencode({"search": term})
    url = f"{ATLAS_BASE}?{qs}"
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = json.loads(resp.read())
    return data if isinstance(data, list) else []


def scrape_all(departments: list[str]) -> list[dict]:
    seen: dict[str, dict] = {}
    capped: list[str] = []
    for i, dept in enumerate(departments, 1):
        try:
            data = fetch_search(dept)
        except Exception as exc:
            print(f"  [{i:>3}/{len(departments)}] {dept}: ERROR {exc}", file=sys.stderr)
            continue

        added = 0
        for course in data:
            code = course.get("course_code")
            if not code:
                continue
            # Filter to courses whose canonical prefix matches this department,
            # since fuzzy search may return unrelated hits.
            if not code.startswith(dept):
                continue
            if code in seen:
                continue
            seen[code] = course
            added += 1

        marker = " (cap hit)" if len(data) >= PAGE_CAP else ""
        if len(data) >= PAGE_CAP:
            capped.append(dept)
        print(f"  [{i:>3}/{len(departments)}] {dept}: +{added}{marker}")
        time.sleep(RATE_LIMIT_SLEEP_SEC)

    if capped:
        print(
            "\nWARNING: these subjects hit the 100-result cap and may be missing courses:",
            file=sys.stderr,
        )
        print("  " + ", ".join(capped), file=sys.stderr)
        print(
            "Use the authenticated Playwright scraper (v2) for full coverage.",
            file=sys.stderr,
        )
    return list(seen.values())


def to_backpacker_schema(courses: list[dict]) -> list[dict]:
    out: list[dict] = []
    for c in sorted(courses, key=lambda x: x.get("course_code_spaced", "")):
        spaced = c.get("course_code_spaced", "")
        parts = spaced.split(" ", 1)
        if len(parts) != 2:
            continue
        dept, num = parts
        out.append({
            "id": f"{dept.lower()}-{num}",
            "code": spaced,
            "title": c.get("title", ""),
            "department": dept,
            "credits": 3,
            "description": "",
            "prereqs": [],
            "fulfills": [],
            "workloadHoursPerWeek": 0,
            "difficulty": 3,
            "studentRating": 0,
            "grades": {
                "median": "—", "mean": 0,
                "aPercent": 0, "bPercent": 0, "cOrLowerPercent": 0,
            },
            "sections": [],
            "tags": [],
            "_meta": {
                "source": "atlas-public-api",
                "offered_terms": c.get("offered_terms", []),
            },
        })
    return out


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument(
        "--output",
        default=str(Path(__file__).parent.parent / "data" / "courses-scraped.json"),
        help="Output path (default: ../data/courses-scraped.json)",
    )
    p.add_argument(
        "--departments",
        nargs="*",
        default=None,
        help="Limit scrape to specific subject codes (default: full list)",
    )
    args = p.parse_args()

    depts = args.departments or DEPARTMENTS
    print(f"Scraping UMich Atlas catalog ({len(depts)} subjects)…\n")

    raw = scrape_all(depts)
    print(f"\nUnique courses scraped: {len(raw)}")

    converted = to_backpacker_schema(raw)
    out_path = Path(args.output)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(converted, indent=2))

    print(f"Wrote {len(converted)} courses to {out_path}")
    print("\nNote: This catalog only contains course code, title, and offered terms.")
    print("Workload, grades, descriptions, and sections require the authenticated")
    print("Playwright scraper (planned v2). For now, hand-curated metrics in")
    print("data/courses.json provide demo values.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
