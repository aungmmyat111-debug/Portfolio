"use client";

import { motion } from "motion/react";
import { profile, hero } from "@/data/profile";
import { useTypewriter } from "@/hooks/useTypewriter";
import { cn } from "@/lib/utils";

const LINES: { kind: "cmd" | "out" | "ok"; text: string }[] = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: "aungmyintmyat — software engineer · yangon, myanmar" },
  { kind: "cmd", text: "cat stack.txt" },
  { kind: "out", text: "typescript · react · next.js · node.js · go · python" },
  { kind: "out", text: "postgresql · redis · docker · aws · tailwind · figma" },
  { kind: "cmd", text: "./check --availability" },
  { kind: "ok", text: "status: open to new opportunities ✓" },
];

const PROMPT = "❯ ";

export function TerminalCard() {
  const { line, char, done } = useTypewriter(LINES.map((l) => l.text));

  const renderLine = (entry: (typeof LINES)[number], index: number) => {
    const isCurrent = index === line && !done;
    const isFuture = index > line;
    if (isFuture) return null;

    const text = isCurrent ? entry.text.slice(0, char) : entry.text;
    const cursor = isCurrent || (done && index === LINES.length - 1);

    return (
      <div
        key={index}
        className={cn(
          "flex min-h-[22px] items-baseline font-mono text-[12.5px] leading-[22px] sm:text-[13px]",
          entry.kind === "cmd"
            ? "text-zinc-100"
            : entry.kind === "ok"
              ? "text-emerald-300"
              : "pl-6 text-zinc-400",
        )}
      >
        {entry.kind === "cmd" && (
          <span className="shrink-0 text-emerald-400">{PROMPT}</span>
        )}
        <span className="whitespace-pre-wrap break-words">{text}</span>
        {cursor && (
          <span
            aria-hidden
            className="cursor-blink ml-0.5 inline-block h-[15px] w-[7px] shrink-0 translate-y-[3px] bg-zinc-300"
          />
        )}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0f]/90 text-left shadow-2xl shadow-black/40 shadow-indigo-500/5 backdrop-blur-md"
      aria-label="Terminal showing a summary of my stack"
    >
      {/* Window chrome */}
      <div className="relative flex h-9 items-center border-b border-white/[0.06] px-4">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 font-mono text-[11px] text-zinc-500">
          {profile.domain} — zsh
        </span>
      </div>

      {/* Body */}
      <div className="min-h-[200px] px-4 py-4 sm:px-5">
        {LINES.map(renderLine)}
      </div>

      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-1/2 h-40 w-3/4 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl"
      />
    </motion.div>
  );
}
