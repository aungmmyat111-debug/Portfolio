"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { AppWindow, Gauge, MapPin, Workflow } from "lucide-react";
import { bio, focus, profile, stack } from "@/data/profile";
import { fadeUp, stagger } from "@/lib/motion";
import { SectionHeading } from "@/components/SectionHeading";
import { useLocalTime } from "@/hooks/useLocalTime";
import { cn } from "@/lib/utils";

const FOCUS_ICONS = [AppWindow, Workflow, Gauge];

function GridCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-surface/70 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-white/20",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

function CardKicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500">
      {children}
    </p>
  );
}

export function BentoAbout() {
  const local = useLocalTime(profile.location.timeZone);

  return (
    <section id="about" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading kicker="About" title="A little about me" />

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {/* Bio — spans 2 columns */}
          <GridCard className="md:col-span-2">
            <div className="flex flex-col gap-5 sm:flex-row">
              <Image
                src="/profile.jpg"
                alt={`Portrait of ${profile.name}`}
                width={80}
                height={100}
                className="h-24 w-20 shrink-0 rounded-xl border border-white/10 object-cover"
              />
              <div>
                <CardKicker>{bio.heading}</CardKicker>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-400">
                  {bio.paragraphs.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-5">
              {Object.entries(profile.facts).map(([label, value]) => (
                <div key={label}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm text-zinc-200">{value}</dd>
                </div>
              ))}
            </dl>
          </GridCard>

          {/* Location & live local time */}
          <GridCard>
            <CardKicker>Local time</CardKicker>
            <div className="mt-4 flex items-center gap-2 text-zinc-300">
              <MapPin className="h-4 w-4 text-accent-soft" />
              <span className="text-sm">
                {profile.location.city}, {profile.location.country}
              </span>
            </div>
            <p className="mt-3 font-mono text-2xl tracking-tight text-zinc-50 tabular-nums">
              {local?.time ?? "00:00:00"}
            </p>
            <p className="mt-1 font-mono text-xs text-zinc-500">
              {local?.date ?? "—"} · {local?.offset || "GMT+6:30"}
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              {profile.location.timeZone}
            </p>
          </GridCard>

          {/* Current focus */}
          <GridCard>
            <CardKicker>{focus.heading}</CardKicker>
            <ul className="mt-4 space-y-3">
              {focus.items.map((item, i) => {
                const Icon = FOCUS_ICONS[i] ?? AppWindow;
                return (
                  <li key={item} className="flex items-center gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-accent-soft">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm text-zinc-300">{item}</span>
                  </li>
                );
              })}
            </ul>
          </GridCard>

          {/* Tech stack — spans 2 columns */}
          <GridCard className="md:col-span-2">
            <CardKicker>Tech stack</CardKicker>
            <div className="mt-5 space-y-5">
              {stack.map((group) => (
                <div key={group.category}>
                  <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="cursor-default rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-zinc-300 transition-colors duration-200 hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:text-indigo-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GridCard>
        </motion.div>
      </div>
    </section>
  );
}
