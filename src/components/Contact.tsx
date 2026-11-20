"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { fadeUp, stagger } from "@/lib/motion";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { SocialLinks } from "@/components/SocialLinks";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface/60 px-6 py-16 text-center backdrop-blur-sm sm:px-12 sm:py-20"
        >
          {/* Ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-[110px]"
          />

          <motion.p
            variants={fadeUp}
            className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent-soft"
          >
            Contact
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mx-auto mt-3 max-w-xl text-3xl font-bold tracking-tight text-zinc-50 sm:text-5xl"
          >
            Let&rsquo;s build something together
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-md leading-relaxed text-zinc-400"
          >
            I&rsquo;m open to full-time roles, freelance work, and interesting
            collaborations. My inbox is always open — I&rsquo;ll get back to you
            within a day.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex justify-center"
          >
            <CopyEmailButton variant="contact" />
          </motion.div>

          <motion.div variants={fadeUp} className="mt-9">
            <SocialLinks />
          </motion.div>

          {profile.resumeUrl && (
            <motion.div variants={fadeUp} className="mt-8">
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-100 focus-visible:ring-2 focus-visible:ring-accent outline-none"
              >
                View résumé
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
