// Parses the Registrar's "All classes" schedule CSV into per-course
// section data. Pure functions only: scripts/import-schedule.ts handles
// file I/O. Imports must stay relative (no "@/") so plain Node can run this.

export type Day = "M" | "T" | "W" | "Th" | "F" | "S" | "Su";

export type ScheduleMeeting = {
  days: Day[];
  start: string; // "HH:MM", 24-hour
  end: string;
  location: string;
};

export type ScheduleSection = {
  classNumber: string; // unique per term; what students enter to register
  number: string; // "001", "011", ...
  component: string; // "LEC", "DIS", "LAB", "SEM", ...
  instructors: string[];
  meetings: ScheduleMeeting[]; // empty when the time is "ARR" (arranged)
};

export type ScheduleCourse = {
  id: string; // "eecs-281", matching Course.id in data/courses.json
  code: string; // "EECS 281"
  title: string;
  department: string;
  school: string; // Registrar's academic group: "Engineering", "LSA", ...
  credits: string; // "4", "1-3"
  sections: ScheduleSection[];
};

const DAY_COLUMNS: Array<[string, Day]> = [
  ["M", "M"], ["T", "T"], ["W", "W"], ["TH", "Th"], ["F", "F"], ["S", "S"], ["SU", "Su"],
];

// Columns we depend on. Matched case-insensitively after trimming.
const REQUIRED_COLUMNS = [
  "Acad Group", "Class Nbr", "Subject", "Catalog Nbr", "Section", "Course Title",
  "Component", "Time", "Location", "Instructor", "Units",
  ...DAY_COLUMNS.map(([col]) => col),
];

/** RFC 4180 CSV parsing: quoted fields, escaped quotes, CRLF, embedded newlines. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(field); field = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.some((f) => f !== "")) rows.push(row);
      row = [];
    } else {
      field += ch;
    }
  }
  row.push(field);
  if (row.some((f) => f !== "")) rows.push(row);
  return rows;
}

function toClock(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

// "1030" -> [10, 30], "9" -> [9, 0], "130" -> [1, 30]
function splitClock(digits: string): [number, number] | null {
  if (!/^\d{1,4}$/.test(digits)) return null;
  if (digits.length <= 2) return [Number(digits), 0];
  return [Number(digits.slice(0, -2)), Number(digits.slice(-2))];
}

/**
 * Parses Registrar time ranges such as "10-1130AM", "1130-1PM", "4-530PM".
 * Only the end carries AM/PM, so the start is the latest reading of its
 * hour (AM or PM) that still falls before the end. Returns null for "ARR",
 * "TBA", and anything unrecognised.
 */
export function parseTimeRange(raw: string): { start: string; end: string } | null {
  const m = raw.trim().toUpperCase().replace(/\s+/g, "").match(/^(\d{1,4})-(\d{1,4})(AM|PM)$/);
  if (!m) return null;
  const startParts = splitClock(m[1]);
  const endParts = splitClock(m[2]);
  if (!startParts || !endParts) return null;
  const [eh, em] = endParts;
  const [sh, sm] = startParts;
  if (eh < 1 || eh > 12 || sh < 1 || sh > 12 || em > 59 || sm > 59) return null;

  const end = (eh % 12 + (m[3] === "PM" ? 12 : 0)) * 60 + em;
  const startAm = (sh % 12) * 60 + sm;
  const startPm = startAm + 12 * 60;
  const start = startPm < end ? startPm : startAm;
  if (start >= end) return null;
  return { start: toClock(start), end: toClock(end) };
}

/** "Electrical Engineering and Computer Science (EECS)" -> "EECS" */
export function parseSubject(raw: string): string {
  const m = raw.match(/\(([A-Z&]+)\)\s*$/);
  return (m ? m[1] : raw).trim().toUpperCase();
}

/** The CSV gives last names only: "Darden, Garcia-Ramirez, Paoletti" -> three names. */
export function splitInstructors(raw: string): string[] {
  return raw.split(",").map((name) => name.trim()).filter(Boolean);
}

/** "4.00" -> "4", "1.00-3.00" -> "1-3" */
function formatCredits(raw: string): string {
  return raw
    .split("-")
    .map((part) => {
      const n = Number(part.trim());
      return Number.isFinite(n) ? String(n) : part.trim();
    })
    .join("-");
}

function meetingKey(m: ScheduleMeeting): string {
  return `${m.days.join("")}|${m.start}|${m.end}|${m.location}`;
}

export type ParseResult = {
  courses: ScheduleCourse[];
  rowCount: number;
  warnings: string[];
};

/**
 * Converts the Registrar CSV into courses with their sections. The CSV has
 * one row per meeting pattern per instructor, so rows sharing a class
 * number are merged into one section.
 */
export function parseScheduleCsv(text: string): ParseResult {
  const rows = parseCsv(text.replace(/^﻿/, ""));
  if (rows.length === 0) throw new Error("CSV is empty");

  const header = rows[0].map((h) => h.trim().toLowerCase());
  const col = (name: string) => header.indexOf(name.toLowerCase());
  const missing = REQUIRED_COLUMNS.filter((name) => col(name) === -1);
  if (missing.length) {
    throw new Error(
      `CSV is missing columns: ${missing.join(", ")}. Found: ${rows[0].join(", ")}`,
    );
  }
  const idx = Object.fromEntries(REQUIRED_COLUMNS.map((name) => [name, col(name)]));
  const get = (row: string[], name: string) => (row[idx[name]] ?? "").trim();

  const warnings: string[] = [];
  const courses = new Map<string, ScheduleCourse>();
  const sections = new Map<string, ScheduleSection>();

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const classNumber = get(row, "Class Nbr");
    const department = parseSubject(get(row, "Subject"));
    const catalog = get(row, "Catalog Nbr").replace(/\s+/g, "");
    if (!classNumber || !department || !catalog) {
      warnings.push(`row ${r + 1}: missing class number, subject, or catalog number`);
      continue;
    }

    const id = `${department.toLowerCase()}-${catalog.toLowerCase()}`;
    let course = courses.get(id);
    if (!course) {
      course = {
        id,
        code: `${department} ${catalog}`,
        title: get(row, "Course Title"),
        department,
        school: get(row, "Acad Group"),
        credits: formatCredits(get(row, "Units")),
        sections: [],
      };
      courses.set(id, course);
    } else if (course.credits === "0") {
      // Labs and discussions list 0 units; take credits from the lecture row.
      course.credits = formatCredits(get(row, "Units"));
    }

    let section = sections.get(classNumber);
    if (!section) {
      section = {
        classNumber,
        number: get(row, "Section").padStart(3, "0"),
        component: get(row, "Component").toUpperCase(),
        instructors: [],
        meetings: [],
      };
      sections.set(classNumber, section);
      course.sections.push(section);
    }

    for (const name of splitInstructors(get(row, "Instructor"))) {
      if (!section.instructors.includes(name)) section.instructors.push(name);
    }

    const days = DAY_COLUMNS.filter(([colName]) => get(row, colName) !== "").map(([, day]) => day);
    const rawTime = get(row, "Time");
    const time = parseTimeRange(rawTime);
    if (!time || days.length === 0) {
      // "ARR"/"TBA" and zero-length placeholders like "1-1AM" mean no fixed time.
      const placeholder = /^(ARR|TBA)$/i.test(rawTime) || /^(\d+)-\1(AM|PM)$/i.test(rawTime);
      if (rawTime && !placeholder) {
        warnings.push(`row ${r + 1} (${course.code} ${section.number}): unrecognised time "${rawTime}"`);
      }
      continue;
    }
    const meeting: ScheduleMeeting = { days, ...time, location: get(row, "Location") };
    if (!section.meetings.some((m) => meetingKey(m) === meetingKey(meeting))) {
      section.meetings.push(meeting);
    }
  }

  const sorted = [...courses.values()].sort((a, b) =>
    a.department.localeCompare(b.department) ||
    a.code.localeCompare(b.code, undefined, { numeric: true }),
  );
  for (const c of sorted) {
    c.sections.sort((a, b) => a.number.localeCompare(b.number, undefined, { numeric: true }));
  }
  return { courses: sorted, rowCount: rows.length - 1, warnings };
}
