"use client";

import { motion } from "motion/react";
import { experience } from "@/data/profile";
import { fadeUp, stagger } from "@/lib/motion";
import { SectionHeading } from "@/components/SectionHeading";

export function Timeline() {
  return (
    <section id="experience" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading kicker="Experience" title="Where I've worked" />

        <motion.ol
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="relative mx-auto mt-14 max-w-3xl"
        >
          {/* Rail */}
          <div
            aria-hidden
            className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-indigo-400 via-purple-400/70 to-transparent"
          />

          {experience.map((item) => (
            <motion.li
              key={item.org}
              variants={fadeUp}
              className="relative pb-12 pl-10 last:pb-0 md:grid md:grid-cols-[200px_1fr] md:gap-6 md:pl-14"
            >
              {/* Node */}
              <span
                aria-hidden
                className="absolute left-0 top-1.5 grid h-[15px] w-[15px] place-items-center"
              >
                <span className="absolute inset-0 animate-ping rounded-full bg-indigo-400/40 [animation-duration:2.5s]" />
                <span className="absolute inset-0 rounded-full border border-indigo-300" />
                <span className="h-[7px] w-[7px] rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-[0_0_10px_rgba(99,102,241,0.7)]" />
              </span>

              {/* Date column */}
              <div className="mb-1.5 md:mb-0">
                <p className="font-mono text-sm font-medium text-indigo-500">
                  {item.period}
                </p>
                <p className="mt-1 inline-block rounded-full border border-indigo-100 bg-indigo-50 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-indigo-600">
                  {item.type}
                </p>
              </div>

              {/* Content */}
              <div>
                <h3 className="font-display text-lg font-bold tracking-tight text-zinc-900">
                  {item.role}
                  <span className="text-gradient"> · {item.org}</span>
                </h3>
                <ul className="mt-3 space-y-2">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2.5 text-sm leading-relaxed text-zinc-600"
                    >
                      <span className="mt-[1px] shrink-0 text-indigo-500">▸</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
