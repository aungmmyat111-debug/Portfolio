"use client";

import type { Project } from "@/data/profile";
import { cn } from "@/lib/utils";

/** macOS-style window chrome shared by every project preview. */
function BrowserChrome({ url }: { url: string }) {
  return (
    <div className="relative flex h-8 items-center border-b border-white/[0.06] px-3">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
      </div>
      <span className="absolute left-1/2 -translate-x-1/2 rounded-md bg-white/[0.04] px-2.5 py-0.5 font-mono text-[10px] text-zinc-500">
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
          className="flex flex-1 flex-col gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2"
        >
          <div className="mb-1 h-1.5 w-8 rounded-full bg-white/10" />
          {col.cards.map((w, j) => (
            <div
              key={j}
              className={cn(
                "space-y-1.5 rounded-md border bg-white/[0.04] p-2",
                col.accent && j === 0 ? "border-white/[0.14]" : "border-white/[0.07]",
              )}
            >
              <div className={cn("h-1 rounded-full bg-white/15", w)} />
              <div className="h-1 w-1/2 rounded-full bg-white/10" />
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
      <div className="flex flex-1 items-end gap-2 border-b border-dashed border-white/10 pb-0">
        {bars.map((h, i) => (
          <div
            key={i}
            className="w-full rounded-t-sm transition-transform duration-300 group-hover:scale-y-[1.02]"
            style={{
              height: `${h}%`,
              backgroundColor: i === 4 ? accent : "rgba(255,255,255,0.12)",
            }}
          />
        ))}
      </div>
      <div className="flex justify-between pt-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <span key={d} className="font-mono text-[9px] text-zinc-600">
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
            "w-1/3 max-w-[110px] space-y-1.5 rounded-lg border border-white/[0.07] bg-white/[0.03] p-2.5 transition-transform duration-300 group-hover:-translate-y-1",
            i === 1 && "translate-y-0",
          )}
        >
          <div
            className="h-10 rounded-md sm:h-12"
            style={
              i === 1
                ? { backgroundColor: `${accent}26` }
                : { backgroundColor: "rgba(255,255,255,0.05)" }
            }
          />
          <div className="h-1 w-3/4 rounded-full bg-white/15" />
          <div className="h-1 w-1/2 rounded-full bg-white/10" />
          <div
            className="h-1 w-1/3 rounded-full"
            style={{ backgroundColor: `${accent}99` }}
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
      <div className="flex w-full max-w-[240px] items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: accent }}
        />
        <span className="truncate font-mono text-[10px] text-zinc-400">
          lnk.to/launch-week
        </span>
        <span className="ml-auto font-mono text-[10px] text-zinc-600">↗</span>
      </div>
      <div className="w-full max-w-[240px] space-y-1.5 font-mono text-[10px]">
        <div className="flex justify-between text-zinc-600">
          <span>clicks · 24h</span>
          <span className="text-zinc-300">12,842</span>
        </div>
        <div className="flex justify-between text-zinc-600">
          <span>avg latency</span>
          <span className="text-zinc-300">4.2 ms</span>
        </div>
        <div className="flex justify-between text-zinc-600">
          <span>top region</span>
          <span className="text-zinc-300">APAC</span>
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
        "relative overflow-hidden rounded-xl border border-white/10 bg-[#0c0c0f]",
        project.featured ? "aspect-[16/8] md:aspect-[21/9]" : "aspect-[16/9]",
      )}
    >
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
