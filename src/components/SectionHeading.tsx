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
        className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent-soft"
      >
        {kicker}
      </motion.p>
      <motion.h2
        variants={fadeUp}
        className="mt-3 text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl"
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p variants={fadeUp} className="mt-4 leading-relaxed text-zinc-400">
          {sub}
        </motion.p>
      )}
    </motion.div>
  );
}
