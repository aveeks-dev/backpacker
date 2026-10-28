"use client";

import { DAY_LABELS, WEEKDAYS, componentLabel, formatClock } from "@/lib/format";
import type { Day } from "@/lib/registrar";
import { toMinutes } from "@/lib/scheduler";

export type GridBlock = {
  key: string;
  code: string;
  component: string;
  sectionNumber: string;
  location: string;
  day: Day;
  start: string; // "HH:MM"
  end: string;
  colorIndex: number;
};

const PIXELS_PER_HOUR = 56;

// Static class names so Tailwind can see them.
const COLORS = [
  "border-michigan/30 bg-michigan/10 text-michigan",
  "border-amber-300 bg-amber-50 text-amber-900",
  "border-emerald-300 bg-emerald-50 text-emerald-900",
  "border-rose-300 bg-rose-50 text-rose-900",
  "border-sky-300 bg-sky-50 text-sky-900",
  "border-violet-300 bg-violet-50 text-violet-900",
];

function formatHour(hour: number): string {
  return formatClock(`${hour}:00`);
}

export function ScheduleGrid({ blocks }: { blocks: GridBlock[] }) {
  const weekday = blocks.filter((b) => WEEKDAYS.includes(b.day));
  const startHour = Math.min(8, ...weekday.map((b) => Math.floor(toMinutes(b.start) / 60)));
  const endHour = Math.max(18, ...weekday.map((b) => Math.ceil(toMinutes(b.end) / 60)));
  const hours = Array.from({ length: endHour - startHour }, (_, i) => startHour + i);
  const gridHeight = hours.length * PIXELS_PER_HOUR;

  return (
    <div className="overflow-x-auto rounded-md border border-slate-200 bg-white">
      <div className="min-w-[640px]">
        <div className="grid grid-cols-[64px_repeat(5,minmax(0,1fr))] border-b border-slate-200 bg-slate-50">
          <div />
          {WEEKDAYS.map((d) => (
            <div key={d} className="px-2 py-2.5 text-center text-xs font-medium text-slate-700">
              {DAY_LABELS[d]}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[64px_repeat(5,minmax(0,1fr))]">
          <div className="relative" style={{ height: gridHeight }}>
            {hours.map((h) => (
              <div
                key={h}
                style={{ height: PIXELS_PER_HOUR }}
                className="border-b border-slate-100 px-2 pt-1 text-[10px] text-slate-400"
              >
                {formatHour(h)}
              </div>
            ))}
          </div>

          {WEEKDAYS.map((d) => (
            <div key={d} className="relative border-l border-slate-100" style={{ height: gridHeight }}>
              {hours.map((h) => (
                <div key={h} style={{ height: PIXELS_PER_HOUR }} className="border-b border-slate-100" />
              ))}
              {weekday
                .filter((b) => b.day === d)
                .map((b) => {
                  const top = ((toMinutes(b.start) - startHour * 60) / 60) * PIXELS_PER_HOUR;
                  const height = ((toMinutes(b.end) - toMinutes(b.start)) / 60) * PIXELS_PER_HOUR;
                  return (
                    <div
                      key={b.key}
                      className={`absolute left-1 right-1 overflow-hidden rounded border px-2 py-1 ${COLORS[b.colorIndex % COLORS.length]}`}
                      style={{ top, height }}
                      title={`${b.code} ${componentLabel(b.component)} ${b.sectionNumber} · ${formatClock(b.start)}–${formatClock(b.end)} · ${b.location}`}
                    >
                      <div className="font-mono text-[10px] font-semibold">{b.code}</div>
                      <div className="text-[10px] leading-tight opacity-80">
                        {componentLabel(b.component)} {b.sectionNumber}
                      </div>
                      <div className="truncate text-[10px] leading-tight opacity-70">{b.location}</div>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
