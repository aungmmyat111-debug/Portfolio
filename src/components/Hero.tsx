"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { hero, profile } from "@/data/profile";
import { fadeUp, stagger } from "@/lib/motion";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { SocialLinks } from "@/components/SocialLinks";
import { TerminalCard } from "@/components/TerminalCard";

export function Hero() {
  return (
    <section id="home" className="scroll-mt-24 pb-24 pt-36 sm:pb-32 sm:pt-44">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          variants={stagger(0.1, 0.07)}
          initial="hidden"
          animate="show"
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          {/* Status badge */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-xs text-zinc-400 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {profile.availability}
            <span className="text-zinc-600">·</span>
            <span>
              {profile.location.city}, {profile.location.country}
            </span>
          </motion.div>

          {/* Identity kicker */}
          <motion.p
            variants={fadeUp}
            className="mt-7 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500"
          >
            {hero.kicker}
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-zinc-50 sm:text-6xl"
          >
            {hero.headline[0]}
            <br className="hidden sm:block" /> that{" "}
            <span className="text-gradient">{hero.gradientWord}</span>
          </motion.h1>

          {/* Value proposition */}
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
          >
            {hero.sub}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-zinc-50 px-6 text-sm font-medium text-zinc-900 transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-accent outline-none sm:w-auto"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </motion.a>
            <CopyEmailButton className="w-full sm:w-auto" />
          </motion.div>

          {/* Socials */}
          <motion.div variants={fadeUp} className="mt-10">
            <SocialLinks />
          </motion.div>

          {/* Terminal */}
          <motion.div variants={fadeUp} className="mt-14 w-full">
            <TerminalCard />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
