#!/usr/bin/env python3
"""
Scrape the UMich course catalog from Atlas's public API.

Atlas (atlas.ai.umich.edu) exposes a public JSON endpoint at /api/courses
that returns up to 100 courses per `?search=<term>` request, ranked by
some opaque relevance signal. To get past the 100-cap for large subjects
(e.g. EECS, MUSPERF), this scraper makes multiple narrower passes per
subject — bare DEPT, then DEPT + each digit 0–9 — and unions the results,
deduping by course code.

Usage
-----
    python3 scrape_atlas.py                     # full sweep -> ../data/scraped.json
    python3 scrape_atlas.py --departments EECS  # one subject only

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
RATE_LIMIT_SLEEP_SEC = 0.15
PAGE_CAP = 100  # Atlas hard-caps results per query

DEPARTMENTS: list[str] = [
    # LSA
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
    "AERO", "AEROSP", "AOSS", "APPPHYS", "AUTO", "BIOMEDE", "CEE", "CHE",
    "CLIMATE", "EAS", "EECS", "ENGR", "ENTR", "ESENG", "IOE",
    "MATSCI", "MECHENG", "NAVARCH", "NAVSCI", "NERS", "PHYSED",
    "ROB", "SI", "SPACE", "TCHNCLCM",
    # Ross School of Business
    "ACC", "BBA", "BCOM", "BL", "ES", "FIN", "MKT", "MO",
    "OMS", "STRATEGY", "TO",
    # Stamps Art & Design
    "ART", "ARTDES",
    # Music, Theatre & Dance
    "BASSOON", "CARILLON", "CELLO", "CLARINET", "COMP", "CONDUCT",
    "DANCE", "EUPHON", "FLUTE", "FRENCHHORN", "GUITAR", "HARP",
    "HARPSICH", "JAZZ", "JAZZIMP", "MUSED", "MUSIC", "MUSMETH",
    "MUSPERF", "MUSTHRY", "MUSTHTRE", "OBOE", "ORGAN", "PAT", "PIANO",
    "PERCUSS", "SAXOPHN", "TUBA", "THTREMUS", "TRUMPET", "TROMBONE",
    "VIOLA", "VIOLIN", "VOICE",
    # Schools / professional
    "ARCH", "DENT", "DENTHYG", "EDUC", "HS", "IHS", "KINESLGY",
    "MOVESCI", "AT", "SM", "NURS", "PHARMACY", "PHARMSCI", "PHRMACOL",
    "MEDCHEM", "PUBPOL", "PUBHLTH", "SEAS", "SW", "URP", "MILSCI",
    # Public Health
    "BIOSTAT", "ENVHLTH", "EPID", "EHS", "HBEHED", "HMP", "NUTR",
    # Medical School / graduate
    "CDB", "MICRBIOL", "PATH", "PHYSIOL", "PIBS", "PSYCHIAT", "RACKHAM",
    # LSA additions
    "ALA", "AMAS", "BIO", "CMPLXSYS", "COGSCI", "DIGITAL", "GEOG",
    "GTBOOKS", "INTLSTD", "ISLAM", "MENAS", "ORGSTUDY", "PPE", "QMSS",
    "RCIDIV", "REEES", "SSEA", "UARTS",
]


def fetch_search(term: str) -> list[dict]:
    qs = urllib.parse.urlencode({"search": term})
    url = f"{ATLAS_BASE}?{qs}"
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = json.loads(resp.read())
    return data if isinstance(data, list) else []


def scrape_department(dept: str) -> tuple[list[dict], int]:
    """Multi-pass scrape of one subject. Returns (courses, total_query_count)."""
    seen: dict[str, dict] = {}
    queries = [dept] + [f"{dept} {d}" for d in "0123456789"]
    queries_made = 0
    for q in queries:
        try:
            data = fetch_search(q)
            queries_made += 1
        except Exception as exc:
            print(f"      query '{q}' failed: {exc}", file=sys.stderr)
            time.sleep(RATE_LIMIT_SLEEP_SEC)
            continue
        for course in data:
            code = course.get("course_code")
            if not code or not code.startswith(dept):
                continue
            if code not in seen:
                seen[code] = course
        time.sleep(RATE_LIMIT_SLEEP_SEC)
    return list(seen.values()), queries_made


def scrape_all(departments: list[str]) -> list[dict]:
    seen: dict[str, dict] = {}
    for i, dept in enumerate(departments, 1):
        try:
            results, queries = scrape_department(dept)
        except Exception as exc:
            print(f"  [{i:>3}/{len(departments)}] {dept}: ERROR {exc}", file=sys.stderr)
            continue
        added = 0
        for course in results:
            code = course["course_code"]
            if code not in seen:
                seen[code] = course
                added += 1
        print(f"  [{i:>3}/{len(departments)}] {dept}: +{added} ({queries} queries, {len(results)} unique results)")
    return list(seen.values())


def to_intermediate(courses: list[dict]) -> list[dict]:
    """Convert raw Atlas API records to our intermediate format."""
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
            "number": num,
            "offered_terms": c.get("offered_terms", []),
        })
    return out


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument(
        "--output",
        default=str(Path(__file__).parent.parent / "data" / "scraped.json"),
        help="Output path (default: ../data/scraped.json)",
    )
    p.add_argument(
        "--departments",
        nargs="*",
        default=None,
        help="Limit to specific subject codes (default: full list)",
    )
    args = p.parse_args()

    depts = args.departments or DEPARTMENTS
    print(f"Scraping UMich Atlas catalog ({len(depts)} subjects, ~{len(depts)*11} queries)…\n")

    raw = scrape_all(depts)
    print(f"\nUnique courses scraped: {len(raw)}")

    converted = to_intermediate(raw)
    out_path = Path(args.output)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(converted, indent=2))

    print(f"Wrote {len(converted)} courses to {out_path}")
    print("\nNext: run build_dataset.py to merge with curated data.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
