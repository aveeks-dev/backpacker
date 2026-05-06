"use client";

import { DAYS, DAY_LABELS, type Course, type Day, type Meeting } from "@/lib/courses";

const START_HOUR = 8;
const END_HOUR = 21;
const HOURS = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i);
const PIXELS_PER_HOUR = 56;

type Block = {
  id: string;
  courseId: string;
  code: string;
  title: string;
  day: Day;
  startMin: number;
  endMin: number;
  professor: string;
};

function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function formatHour(hour: number): string {
  const period = hour < 12 ? "am" : "pm";
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display}${period}`;
}

function buildBlocks(courses: Course[]): Block[] {
  const blocks: Block[] = [];
  for (const c of courses) {
    const section = c.sections[0];
    if (!section) continue;
    for (const meeting of section.meetings) {
      for (const day of meeting.days) {
        blocks.push({
          id: `${c.id}-${day}-${meeting.start}`,
          courseId: c.id,
          code: c.code,
          title: c.title,
          day,
          startMin: timeToMinutes(meeting.start),
          endMin: timeToMinutes(meeting.end),
          professor: section.professor,
        });
      }
    }
  }
  return blocks;
}

function detectConflicts(blocks: Block[]): Set<string> {
  const conflicting = new Set<string>();
  const byDay = new Map<Day, Block[]>();
  for (const b of blocks) {
    if (!byDay.has(b.day)) byDay.set(b.day, []);
    byDay.get(b.day)!.push(b);
  }
  for (const dayBlocks of byDay.values()) {
    for (let i = 0; i < dayBlocks.length; i++) {
      for (let j = i + 1; j < dayBlocks.length; j++) {
        const a = dayBlocks[i];
        const b = dayBlocks[j];
        if (a.startMin < b.endMin && b.startMin < a.endMin) {
          conflicting.add(a.id);
          conflicting.add(b.id);
        }
      }
    }
  }
  return conflicting;
}

export function ScheduleGrid({ courses }: { courses: Course[] }) {
  const blocks = buildBlocks(courses);
  const conflicts = detectConflicts(blocks);

  const gridStartMin = START_HOUR * 60;
  const gridHeight = HOURS.length * PIXELS_PER_HOUR;

  return (
    <div className="overflow-x-auto rounded-md border border-slate-200 bg-white">
      <div className="min-w-[640px]">
        <div className="grid grid-cols-[64px_repeat(5,minmax(0,1fr))] border-b border-slate-200 bg-slate-50">
          <div />
          {DAYS.map((d) => (
            <div key={d} className="px-2 py-2.5 text-center text-xs font-medium text-slate-700">
              {DAY_LABELS[d]}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[64px_repeat(5,minmax(0,1fr))]">
          <div className="relative" style={{ height: gridHeight }}>
            {HOURS.map((h) => (
              <div
                key={h}
                style={{ height: PIXELS_PER_HOUR }}
                className="border-b border-slate-100 px-2 pt-1 text-[10px] text-slate-400"
              >
                {formatHour(h)}
              </div>
            ))}
          </div>

          {DAYS.map((d) => {
            const dayBlocks = blocks.filter((b) => b.day === d);
            return (
              <div
                key={d}
                className="relative border-l border-slate-100"
                style={{ height: gridHeight }}
              >
                {HOURS.map((h) => (
                  <div
                    key={h}
                    style={{ height: PIXELS_PER_HOUR }}
                    className="border-b border-slate-100"
                  />
                ))}
                {dayBlocks.map((b) => {
                  const top = ((b.startMin - gridStartMin) / 60) * PIXELS_PER_HOUR;
                  const height = ((b.endMin - b.startMin) / 60) * PIXELS_PER_HOUR;
                  const isConflict = conflicts.has(b.id);
                  return (
                    <div
                      key={b.id}
                      className={`absolute left-1 right-1 overflow-hidden rounded border px-2 py-1 ${
                        isConflict
                          ? "border-rose-300 bg-rose-50"
                          : "border-slate-300 bg-slate-50"
                      }`}
                      style={{ top, height }}
                      title={`${b.code} · ${b.professor}`}
                    >
                      <div className="font-mono text-[10px] font-semibold text-slate-900">
                        {b.code}
                      </div>
                      <div className="line-clamp-2 text-[11px] leading-tight text-slate-600">
                        {b.title}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function getConflictCount(courses: Course[]): number {
  const blocks = buildBlocks(courses);
  return detectConflicts(blocks).size;
}
