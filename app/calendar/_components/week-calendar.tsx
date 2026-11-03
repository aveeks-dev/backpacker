"use client";

import { useRef, useState } from "react";
import { DAY_LABELS, WEEKDAYS, formatMinutes } from "@/lib/format";
import type { Day } from "@/lib/registrar";
import { COLORS } from "@/app/plan/_components/schedule-grid";

export type DrawItem = {
  key: string;
  day: Day;
  start: number; // minutes from midnight
  end: number;
  title: string;
  subtitle: string;
  detail: string;
  colorIndex: number;
  kind: "section" | "block";
  conflict?: boolean;
  ghost?: boolean;
  onClick?: () => void;
};

const PIXELS_PER_HOUR = 60;
const SNAP = 15;

/** Side-by-side lanes for items that overlap on one day. */
function layOut(items: DrawItem[]): Map<string, { lane: number; lanes: number }> {
  const sorted = [...items].sort((a, b) => a.start - b.start || b.end - a.end);
  const placed = new Map<string, { lane: number; lanes: number }>();
  let cluster: DrawItem[] = [];
  let laneEnds: number[] = [];
  let clusterEnd = -1;
  const flush = () => {
    for (const item of cluster) placed.get(item.key)!.lanes = laneEnds.length;
    cluster = [];
    laneEnds = [];
  };
  for (const item of sorted) {
    if (item.start >= clusterEnd) flush();
    let lane = laneEnds.findIndex((end) => end <= item.start);
    if (lane === -1) lane = laneEnds.push(0) - 1;
    laneEnds[lane] = item.end;
    placed.set(item.key, { lane, lanes: 1 });
    cluster.push(item);
    clusterEnd = Math.max(clusterEnd, item.end);
  }
  flush();
  return placed;
}

/**
 * A Monday-Friday week (weekends appear when something is on them). Dragging
 * on an empty part of a day calls onCreate with the snapped time range.
 */
export function WeekCalendar({ items, onCreate }: { items: DrawItem[]; onCreate: (day: Day, start: number, end: number) => void }) {
  const days: Day[] = [...WEEKDAYS, ...(["S", "Su"] as Day[]).filter((d) => items.some((i) => i.day === d))];
  const startHour = Math.min(8, ...items.map((i) => Math.floor(i.start / 60)));
  const endHour = Math.max(20, ...items.map((i) => Math.ceil(i.end / 60)));
  const hours = Array.from({ length: endHour - startHour }, (_, i) => startHour + i);
  const height = hours.length * PIXELS_PER_HOUR;
  // On touch screens a drag scrolls the page, so a tap adds an hour instead.
  const [drag, setDrag] = useState<{ day: Day; from: number; to: number; touch: boolean; y: number } | null>(null);
  const columns = useRef(new Map<Day, HTMLDivElement>());

  const minuteAt = (day: Day, clientY: number) => {
    const rect = columns.current.get(day)!.getBoundingClientRect();
    const minute = startHour * 60 + ((clientY - rect.top) / PIXELS_PER_HOUR) * 60;
    return Math.max(startHour * 60, Math.min(endHour * 60, Math.round(minute / SNAP) * SNAP));
  };

  const finish = () => {
    if (!drag) return;
    const start = Math.min(drag.from, drag.to);
    let end = Math.max(drag.from, drag.to);
    if (end - start < 30) end = Math.min(start + 60, 24 * 60);
    setDrag(null);
    onCreate(drag.day, start, end);
  };

  const top = (minute: number) => ((minute - startHour * 60) / 60) * PIXELS_PER_HOUR;

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <div style={{ minWidth: 96 + days.length * 110 }}>
        <div className="grid border-b border-slate-200 bg-michigan text-white" style={{ gridTemplateColumns: `56px repeat(${days.length}, minmax(0, 1fr))` }}>
          <div />
          {days.map((d) => (
            <div key={d} className="px-2 py-2.5 text-center text-xs font-semibold tracking-wide">
              {DAY_LABELS[d]}
            </div>
          ))}
        </div>

        <div className="grid select-none" style={{ gridTemplateColumns: `56px repeat(${days.length}, minmax(0, 1fr))` }}>
          <div className="relative" style={{ height }}>
            {hours.map((h) => (
              <div key={h} style={{ height: PIXELS_PER_HOUR }} className="border-b border-slate-100 pr-2 pt-1 text-right text-[10px] text-slate-400">
                {formatMinutes(h * 60)}
              </div>
            ))}
          </div>

          {days.map((d) => {
            const dayItems = items.filter((i) => i.day === d);
            const lanes = layOut(dayItems);
            return (
              <div
                key={d}
                ref={(el) => {
                  if (el) columns.current.set(d, el);
                }}
                className="relative cursor-crosshair border-l border-slate-100"
                style={{ height }}
                onPointerDown={(e) => {
                  if (e.button !== 0 || e.target !== e.currentTarget) return;
                  const touch = e.pointerType === "touch";
                  if (!touch) e.currentTarget.setPointerCapture(e.pointerId);
                  const m = minuteAt(d, e.clientY);
                  setDrag({ day: d, from: m, to: m, touch, y: e.clientY });
                }}
                onPointerMove={(e) => {
                  if (drag?.day !== d) return;
                  if (drag.touch) {
                    if (Math.abs(e.clientY - drag.y) > 8) setDrag(null);
                  } else setDrag({ ...drag, to: minuteAt(d, e.clientY) });
                }}
                onPointerUp={finish}
                onPointerCancel={() => setDrag(null)}
              >
                {hours.map((h) => (
                  <div key={h} style={{ height: PIXELS_PER_HOUR }} className="pointer-events-none border-b border-slate-100">
                    <div className="h-1/2 border-b border-dashed border-slate-50" />
                  </div>
                ))}

                {dayItems.map((item) => {
                  const { lane, lanes: count } = lanes.get(item.key)!;
                  const style = {
                    top: top(item.start),
                    height: Math.max(18, top(item.end) - top(item.start)),
                    left: `calc(${(lane / count) * 100}% + 2px)`,
                    width: `calc(${100 / count}% - 4px)`,
                  };
                  const look =
                    item.kind === "block"
                      ? "border-slate-400 bg-[repeating-linear-gradient(135deg,#eef2f7_0,#eef2f7_6px,#e2e8f0_6px,#e2e8f0_12px)] text-slate-700"
                      : COLORS[item.colorIndex % COLORS.length];
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={item.onClick}
                      title={`${item.title} · ${item.subtitle} · ${formatMinutes(item.start)}–${formatMinutes(item.end)}${item.detail ? ` · ${item.detail}` : ""}`}
                      className={`absolute overflow-hidden rounded-md border px-1.5 py-1 text-left shadow-sm transition ${look} ${
                        item.ghost ? "z-20 border-dashed opacity-80 shadow-md" : "z-10 hover:brightness-95"
                      } ${item.conflict ? "ring-2 ring-rose-500 ring-offset-1" : ""}`}
                      style={style}
                    >
                      <div className="truncate font-mono text-[10px] font-semibold">{item.title}</div>
                      <div className="truncate text-[10px] leading-tight opacity-80">{item.subtitle}</div>
                      <div className="truncate text-[10px] leading-tight opacity-70">
                        {formatMinutes(item.start)}–{formatMinutes(item.end)}
                      </div>
                      {item.detail && <div className="truncate text-[10px] leading-tight opacity-70">{item.detail}</div>}
                    </button>
                  );
                })}

                {drag?.day === d && drag.to !== drag.from && (
                  <div
                    className="pointer-events-none absolute left-0.5 right-0.5 z-30 rounded-md border-2 border-dashed border-maize-dark bg-maize/25 px-1.5 py-1 text-[10px] font-medium text-michigan"
                    style={{ top: top(Math.min(drag.from, drag.to)), height: top(Math.max(drag.from, drag.to)) - top(Math.min(drag.from, drag.to)) }}
                  >
                    {formatMinutes(Math.min(drag.from, drag.to))}–{formatMinutes(Math.max(drag.from, drag.to))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
