"use client";

import { motion } from "motion/react";
import { fadeUp, stagger } from "@/lib/motion";

export function SectionHeading({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub?: string;
}) {
  return (
    <motion.div
      variants={stagger()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="mx-auto max-w-2xl text-center"
    >
      <motion.p
        variants={fadeUp}
        className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-indigo-600 shadow-[0_4px_16px_-8px_rgba(79,70,229,0.35)]"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
        {kicker}
      </motion.p>
      <motion.h2
        variants={fadeUp}
        className="font-display mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl"
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p variants={fadeUp} className="mt-4 leading-relaxed text-zinc-600">
          {sub}
        </motion.p>
      )}
    </motion.div>
  );
}
