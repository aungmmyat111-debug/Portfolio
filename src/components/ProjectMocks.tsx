"use client";

import type { Project } from "@/data/profile";
import { cn } from "@/lib/utils";

/** macOS-style window chrome shared by every project preview. */
function BrowserChrome({ url }: { url: string }) {
  return (
    <div className="relative flex h-8 items-center border-b border-zinc-200/80 px-3">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </div>
      <span className="absolute left-1/2 -translate-x-1/2 rounded-md border border-zinc-200/80 bg-white px-2.5 py-0.5 font-mono text-[10px] text-zinc-400 shadow-[0_1px_2px_rgba(24,26,42,0.04)]">
        {url}
      </span>
    </div>
  );
}

/** Kanban board — TaskFlow */
function BoardMock({ accent }: { accent: string }) {
  const cols = [
    { cards: ["w-3/4", "w-1/2", "w-2/3"], accent: true },
    { cards: ["w-2/3", "w-3/4"], accent: false },
    { cards: ["w-1/2", "w-3/5", "w-2/3"], accent: false },
  ];
  return (
    <div className="flex h-full gap-2 p-3.5 sm:gap-3 sm:p-4">
      {cols.map((col, i) => (
        <div
          key={i}
          className="flex flex-1 flex-col gap-2 rounded-lg border border-zinc-200/80 bg-zinc-50/80 p-2"
        >
          <div className="mb-1 h-1.5 w-8 rounded-full bg-zinc-300" />
          {col.cards.map((w, j) => (
            <div
              key={j}
              className={cn(
                "space-y-1.5 rounded-md border bg-white p-2 shadow-[0_1px_2px_rgba(24,26,42,0.06)]",
                col.accent && j === 0 ? "border-indigo-200" : "border-zinc-200/80",
              )}
            >
              <div className={cn("h-1 rounded-full bg-zinc-200", w)} />
              <div className="h-1 w-1/2 rounded-full bg-zinc-100" />
              {col.accent && j === 0 && (
                <div
                  className="mt-1 h-2 w-2 rounded"
                  style={{ backgroundColor: accent }}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/** CI/CD analytics — DevMetrics */
function ChartMock({ accent }: { accent: string }) {
  const bars = [45, 70, 84, 56, 92, 64];
  return (
    <div className="flex h-full flex-col justify-end gap-1 p-4 sm:p-5">
      <div className="flex flex-1 items-end gap-2 border-b border-dashed border-zinc-200 pb-0">
        {bars.map((h, i) => (
          <div
            key={i}
            className="w-full rounded-t-sm transition-transform duration-300 group-hover:scale-y-[1.02]"
            style={{
              height: `${h}%`,
              backgroundColor: i === 4 ? accent : "rgba(161,161,170,0.35)",
            }}
          />
        ))}
      </div>
      <div className="flex justify-between pt-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <span key={d} className="font-mono text-[9px] text-zinc-400">
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

/** E-commerce cards — ShopStack */
function CardsMock({ accent }: { accent: string }) {
  return (
    <div className="flex h-full items-center justify-center gap-3 p-5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "w-1/3 max-w-[110px] space-y-1.5 rounded-lg border border-zinc-200/80 bg-white p-2.5 shadow-[0_2px_8px_-2px_rgba(24,26,42,0.08)] transition-transform duration-300 group-hover:-translate-y-1",
            i === 1 && "translate-y-0",
          )}
        >
          <div
            className="h-10 rounded-md sm:h-12"
            style={
              i === 1
                ? { backgroundColor: `${accent}26` }
                : { backgroundColor: "rgba(161,161,170,0.2)" }
            }
          />
          <div className="h-1 w-3/4 rounded-full bg-zinc-200" />
          <div className="h-1 w-1/2 rounded-full bg-zinc-100" />
          <div
            className="h-1 w-1/3 rounded-full"
            style={{ backgroundColor: accent }}
          />
        </div>
      ))}
    </div>
  );
}

/** Link shortener — LinkPulse */
function LinkMock({ accent }: { accent: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-5">
      <div className="flex w-full max-w-[240px] items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 shadow-[0_1px_3px_rgba(24,26,42,0.06)]">
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: accent }}
        />
        <span className="truncate font-mono text-[10px] text-zinc-500">
          lnk.to/launch-week
        </span>
        <span className="ml-auto font-mono text-[10px] text-zinc-400">↗</span>
      </div>
      <div className="w-full max-w-[240px] space-y-1.5 font-mono text-[10px]">
        <div className="flex justify-between text-zinc-400">
          <span>clicks · 24h</span>
          <span className="font-semibold text-zinc-700">12,842</span>
        </div>
        <div className="flex justify-between text-zinc-400">
          <span>avg latency</span>
          <span className="font-semibold text-zinc-700">4.2 ms</span>
        </div>
        <div className="flex justify-between text-zinc-400">
          <span>top region</span>
          <span className="font-semibold text-zinc-700">APAC</span>
        </div>
      </div>
    </div>
  );
}

export function ProjectMock({ project }: { project: Project }) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-50/80",
        project.featured ? "aspect-[16/8] md:aspect-[21/9]" : "aspect-[16/9]",
      )}
    >
      {/* Per-project accent wash */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage: `radial-gradient(110% 85% at 50% 0%, ${project.accent}14, transparent 65%)`,
        }}
      />
      <BrowserChrome url={project.mockUrl} />
      <div className="h-[calc(100%-2rem)]">
        {project.mock === "board" && <BoardMock accent={project.accent} />}
        {project.mock === "chart" && <ChartMock accent={project.accent} />}
        {project.mock === "cards" && <CardsMock accent={project.accent} />}
        {project.mock === "link" && <LinkMock accent={project.accent} />}
      </div>
    </div>
  );
}
