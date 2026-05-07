#!/usr/bin/env python3
"""
Combine hand-curated rich course data with the scraped Atlas catalog
into a single ``data/courses.json`` file consumed by the Next.js app.

Strategy
--------
- Curated courses (rich metrics: workload, difficulty, granular grade
  distribution, sections, profs) are loaded from ``data/curated.json``.
  These are the gold-standard, real-feeling entries.
- Scraped courses (just code/title/terms from Atlas's public API) are
  loaded from ``data/scraped.json``.
- For courses present in both sources, the curated entry wins.
- For scraped-only courses, we synthesize a plausible record:
    * Workload + difficulty: heuristic from course level (1xx easier
      than 6xx) and dept type (engineering generally heavier than
      humanities).
    * Grade distribution: same heuristic — intro courses skew higher.
    * `dataQuality` field marks which is which so the UI can be
      transparent ("Estimated — based on course level").

Usage
-----
    python3 build_dataset.py
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

# ---------------------------------------------------------------------
# Data quality tags
# ---------------------------------------------------------------------
QUALITY_CURATED = "curated"         # rich, real-feeling data
QUALITY_ESTIMATED = "estimated"     # synthesized from course level
QUALITY_CATALOG = "catalog-only"    # code/title only

# ---------------------------------------------------------------------
# Heuristics for synthesizing course metrics
# ---------------------------------------------------------------------
HEAVY_DEPTS = {
    "EECS", "MATH", "PHYSICS", "CHEM", "AEROSP", "MECHENG", "BIOMEDE",
    "CEE", "CHE", "MATSCI", "IOE", "NERS", "ROB",
}

LIGHT_DEPTS = {
    "PSYCH", "POLSCI", "HISTORY", "PHIL", "RELIGION", "AMCULT", "ENGLISH",
    "COMM", "ANTHRO", "ANTHRCUL", "WGS", "MUSIC", "MUSICOL", "ARTDES",
    "ASTRO", "WOMENSTD",
}


def course_level(num: str) -> int:
    """Return 1, 2, 3, ... for 1xx, 2xx, 3xx etc. Floor at 1, cap at 9."""
    m = re.match(r"(\d+)", num)
    if not m:
        return 1
    n = int(m.group(1))
    return max(1, min(9, n // 100 if n >= 100 else 1))


def synth_difficulty(dept: str, num: str) -> int:
    """1–5 difficulty estimate."""
    level = course_level(num)
    base = level  # 1..9
    if dept in HEAVY_DEPTS:
        base += 1
    elif dept in LIGHT_DEPTS:
        base -= 0
    if level <= 1:
        return 2
    if level == 2:
        return 3 if dept in HEAVY_DEPTS else 2
    if level == 3:
        return 4 if dept in HEAVY_DEPTS else 3
    if level >= 4:
        return min(5, 4 + (1 if dept in HEAVY_DEPTS else 0))
    return 3


def synth_workload(dept: str, num: str) -> int:
    """Estimated hours per week."""
    level = course_level(num)
    if dept in HEAVY_DEPTS:
        return [0, 10, 12, 15, 17, 18][min(5, level)]  # 1xx..5xx+
    if dept in LIGHT_DEPTS:
        return [0, 5, 6, 7, 8, 8][min(5, level)]
    # default
    return [0, 7, 8, 10, 12, 12][min(5, level)]


def synth_mean(dept: str, num: str) -> float:
    """Estimated mean GPA."""
    level = course_level(num)
    if dept in HEAVY_DEPTS:
        if level == 1:
            return 3.4
        if level == 2:
            return 3.1
        if level == 3:
            return 3.2
        return 3.4  # advanced electives often grade higher
    if dept in LIGHT_DEPTS:
        return 3.6 - (0.05 * level)
    # default
    return 3.4 - (0.05 * level)


def grade_buckets_for_mean(mean: float) -> dict[str, int]:
    """Generate a 13-bucket distribution from a target mean GPA."""
    if mean >= 3.7:
        return {"A+": 8, "A": 32, "A-": 25, "B+": 18, "B": 10, "B-": 4,
                "C+": 2, "C": 1, "C-": 0, "D+": 0, "D": 0, "D-": 0, "E": 0}
    if mean >= 3.5:
        return {"A+": 5, "A": 25, "A-": 23, "B+": 22, "B": 14, "B-": 6,
                "C+": 3, "C": 1, "C-": 1, "D+": 0, "D": 0, "D-": 0, "E": 0}
    if mean >= 3.3:
        return {"A+": 3, "A": 18, "A-": 22, "B+": 23, "B": 18, "B-": 9,
                "C+": 4, "C": 2, "C-": 1, "D+": 0, "D": 0, "D-": 0, "E": 0}
    if mean >= 3.1:
        return {"A+": 2, "A": 13, "A-": 18, "B+": 23, "B": 22, "B-": 12,
                "C+": 5, "C": 3, "C-": 1, "D+": 1, "D": 0, "D-": 0, "E": 0}
    if mean >= 2.9:
        return {"A+": 2, "A": 9, "A-": 14, "B+": 19, "B": 24, "B-": 16,
                "C+": 8, "C": 5, "C-": 2, "D+": 1, "D": 0, "D-": 0, "E": 0}
    return {"A+": 1, "A": 7, "A-": 11, "B+": 16, "B": 22, "B-": 18,
            "C+": 11, "C": 8, "C-": 4, "D+": 1, "D": 1, "D-": 0, "E": 0}


def median_from_mean(mean: float) -> str:
    """Pick a representative letter grade for a GPA mean."""
    if mean >= 3.85:
        return "A"
    if mean >= 3.5:
        return "A-"
    if mean >= 3.15:
        return "B+"
    if mean >= 2.85:
        return "B"
    if mean >= 2.5:
        return "B-"
    return "C+"


def synthesize(course: dict) -> dict:
    dept = course["department"]
    num = course["number"]
    diff = synth_difficulty(dept, num)
    work = synth_workload(dept, num)
    mean = synth_mean(dept, num)
    return {
        "id": course["id"],
        "code": course["code"],
        "title": course["title"],
        "department": dept,
        "credits": 3,
        "description": "",
        "prereqs": [],
        "fulfills": [],
        "workloadHoursPerWeek": work,
        "difficulty": diff,
        "studentRating": 0,
        "grades": {
            "median": median_from_mean(mean),
            "mean": round(mean, 2),
            "buckets": grade_buckets_for_mean(mean),
        },
        "sections": [],
        "tags": [],
        "dataQuality": QUALITY_ESTIMATED,
        "_meta": {"offered_terms": course.get("offered_terms", [])},
    }


def upgrade_curated_grades(course: dict) -> dict:
    """Migrate legacy 3-bucket grades to 13-bucket; mark quality."""
    g = course.get("grades", {})
    if "buckets" not in g:
        mean = float(g.get("mean", 3.0))
        course["grades"] = {
            "median": g.get("median", median_from_mean(mean)),
            "mean": mean,
            "buckets": grade_buckets_for_mean(mean),
        }
    course["dataQuality"] = QUALITY_CURATED
    return course


def main() -> int:
    p = argparse.ArgumentParser()
    here = Path(__file__).parent.parent / "data"
    p.add_argument("--curated", default=str(here / "curated.json"))
    p.add_argument("--scraped", default=str(here / "scraped.json"))
    p.add_argument("--output", default=str(here / "courses.json"))
    args = p.parse_args()

    curated_path = Path(args.curated)
    scraped_path = Path(args.scraped)
    out_path = Path(args.output)

    curated_raw = json.loads(curated_path.read_text()) if curated_path.exists() else []
    scraped_raw = json.loads(scraped_path.read_text()) if scraped_path.exists() else []

    curated = [upgrade_curated_grades(c) for c in curated_raw]
    by_id = {c["id"]: c for c in curated}

    added = 0
    for s in scraped_raw:
        if s["id"] in by_id:
            continue
        by_id[s["id"]] = synthesize(s)
        added += 1

    merged = sorted(by_id.values(), key=lambda c: c["code"])
    out_path.write_text(json.dumps(merged, indent=2))

    quality_counts: dict[str, int] = {}
    for c in merged:
        quality_counts[c["dataQuality"]] = quality_counts.get(c["dataQuality"], 0) + 1

    print(f"Curated:    {len(curated)}")
    print(f"Scraped (added):  {added}")
    print(f"Total written: {len(merged)} -> {out_path}")
    print(f"Data-quality breakdown: {quality_counts}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
