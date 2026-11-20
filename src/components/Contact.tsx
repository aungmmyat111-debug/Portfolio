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
          className="border-gradient relative overflow-hidden rounded-3xl px-6 py-16 text-center shadow-[0_24px_64px_-24px_rgba(99,102,241,0.45)] sm:px-12 sm:py-20"
        >
          {/* Ambient pastel glows */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[500px] -translate-x-1/2 rounded-full bg-indigo-200/60 blur-[100px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-24 h-64 w-64 rounded-full bg-purple-200/60 blur-[90px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -right-24 h-64 w-64 rounded-full bg-cyan-200/60 blur-[90px]"
          />

          <motion.p
            variants={fadeUp}
            className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-indigo-500"
          >
            Contact
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display mx-auto mt-3 max-w-xl text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl"
          >
            Let&rsquo;s build something{" "}
            <span className="text-gradient font-serif italic font-normal">
              together
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-md leading-relaxed text-zinc-600"
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
                className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-accent outline-none"
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
