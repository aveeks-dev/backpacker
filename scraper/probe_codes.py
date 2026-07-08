#!/usr/bin/env python3
"""Probe candidate Atlas subject codes and report how many courses match each."""
import json
import sys
import time
import urllib.parse
import urllib.request

CANDIDATES = [
    # codes that returned 0 in the last sweep + likely real spellings
    "NAME", "NAVARCH", "THEATRE", "THTREMUS", "INFO", "SI", "SOCWORK", "SW",
    # schools/colleges possibly missing entirely
    "DENT", "DENTHYG", "NURS", "HS", "PHARMACY", "PHARMSCI", "PHRMACOL",
    "KINESLGY", "MOVESCI", "APPPHYS", "AT", "SM", "IHS",
    # public policy / environment / music variants
    "PUBPOL", "ENVIRON", "SEAS", "MUSTHTRE", "MUSMETH", "COMP", "CONDUCT",
    "JAZZ", "PAT", "EXCEL", "STRINGS", "WINDS", "MILSCI", "AMAS",
    # misc LSA that may exist
    "COGSCI", "DIGITAL", "QMSS", "ISLAM", "MENAS", "REEES", "CEAS",
    "SEAA", "SSEA", "GTBOOKS", "ORGSTUDY", "PPE", "RCIDIV", "SOCSCI",
    "UARTS", "URES", "ALA", "BIO", "BIOMS", "CDB", "CMPLXSYS", "EHS",
    "ESALA", "GEOG", "HBEHED", "HISTAM", "IB", "INTLSTD", "MEDCHEM",
    "MICRBIOL", "PATH", "PHYSIOL", "PIBS", "PSYCHIAT", "RACKHAM", "SPACE",
]

def count(code: str) -> int:
    qs = urllib.parse.urlencode({"search": code})
    req = urllib.request.Request(
        f"https://atlas.ai.umich.edu/api/courses?{qs}",
        headers={"User-Agent": "Mozilla/5.0 (compatible; Backpacker)"},
    )
    with urllib.request.urlopen(req, timeout=20) as r:
        data = json.loads(r.read())
    if not isinstance(data, list):
        return -1
    return sum(1 for c in data if c.get("course_code", "").startswith(code))

def main() -> int:
    hits = []
    for code in CANDIDATES:
        try:
            n = count(code)
        except Exception as exc:
            print(f"{code}: ERROR {exc}", file=sys.stderr)
            time.sleep(0.3)
            continue
        marker = " <-- FOUND" if n > 0 else ""
        print(f"{code}: {n}{marker}")
        if n > 0:
            hits.append(code)
        time.sleep(0.25)
    print("\nCodes with results:", " ".join(hits))
    return 0

if __name__ == "__main__":
    sys.exit(main())
