"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  X,
} from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { projects, type Project } from "@/data/profile";
import { EASE, fadeUp, stagger } from "@/lib/motion";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectMock } from "@/components/ProjectMocks";
import { useScrollLock } from "@/hooks/useScrollLock";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Project card                                                       */
/* ------------------------------------------------------------------ */
function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.article
      variants={fadeUp}
      onMouseMove={onMove}
      onClick={onOpen}
      className={cn(
        "border-gradient shadow-card group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-card-hover",
        project.featured && "md:col-span-2",
      )}
    >
      {/* Mock preview */}
      <div className="p-3 sm:p-4">
        <ProjectMock project={project} />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-6 pt-2">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-lg font-bold tracking-tight text-zinc-900">
            {project.name}
          </h3>
          <span className="shrink-0 font-mono text-xs text-zinc-400">
            {project.year}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-zinc-600">{project.tagline}</p>

        <ul className="flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 font-mono text-[11px] text-zinc-500"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center gap-2.5 pt-4">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-medium text-zinc-600 transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 focus-visible:ring-2 focus-visible:ring-accent outline-none"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live demo
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-medium text-zinc-600 transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 focus-visible:ring-2 focus-visible:ring-accent outline-none"
            >
              <GitHubIcon className="h-3.5 w-3.5" />
              Code
            </a>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            className="ml-auto inline-flex items-center gap-1 rounded-full px-2 py-1.5 text-xs font-semibold text-indigo-600 transition-colors hover:text-indigo-500 focus-visible:ring-2 focus-visible:ring-accent outline-none"
          >
            Case study
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* Mouse-tracking spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 30%), rgb(168 85 247 / 0.08), transparent 65%)",
        }}
      />
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  Case study modal                                                   */
/* ------------------------------------------------------------------ */
function CaseSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-indigo-500">
        {label}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useScrollLock(true);

  // Focus management + Escape to close.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="absolute inset-0 bg-indigo-950/30 backdrop-blur-sm"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="relative z-10 max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-indigo-100 bg-white shadow-[0_24px_64px_-16px_rgba(49,46,129,0.35)] sm:rounded-2xl"
      >
        {/* Sticky header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-100 bg-white/95 px-6 py-4 backdrop-blur">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-indigo-500">
            Case study
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="grid h-8 w-8 place-items-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:border-indigo-300 hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-accent outline-none"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-7 px-6 py-6">
          {/* Header */}
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <h3
                id="case-study-title"
                className="font-display text-2xl font-bold tracking-tight text-zinc-900"
              >
                {project.name}
              </h3>
              <span className="shrink-0 font-mono text-xs text-zinc-400">
                {project.year}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              {project.tagline}
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 font-mono text-[11px] text-zinc-500"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <CaseSection label="The problem">
            <p className="text-sm leading-relaxed text-zinc-600">
              {project.caseStudy.problem}
            </p>
          </CaseSection>

          <CaseSection label="Architecture & solution">
            <ul className="space-y-2.5">
              {project.caseStudy.architecture.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm leading-relaxed text-zinc-600"
                >
                  <span className="mt-[1px] shrink-0 text-indigo-500">▸</span>
                  {item}
                </li>
              ))}
            </ul>
          </CaseSection>

          <CaseSection label="Key results">
            <ul className="space-y-2.5">
              {project.caseStudy.results.map((result) => (
                <li
                  key={result}
                  className="flex gap-2.5 text-sm font-medium leading-relaxed text-zinc-800"
                >
                  <CheckCircle2 className="mt-[3px] h-4 w-4 shrink-0 text-emerald-500" />
                  {result}
                </li>
              ))}
            </ul>
          </CaseSection>

          {/* Links */}
          {(project.demo || project.repo) && (
            <div className="flex flex-wrap gap-2.5 border-t border-zinc-100 pt-5">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_16px_-4px_rgba(99,102,241,0.5)] transition-all duration-200 hover:brightness-110 focus-visible:ring-2 focus-visible:ring-accent outline-none"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live demo
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 focus-visible:ring-2 focus-visible:ring-accent outline-none"
                >
                  <GitHubIcon className="h-4 w-4" />
                  View source
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */
export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          kicker="Selected work"
          title="Featured projects"
          sub="A few products I've designed and built end-to-end."
        />

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={() => setSelected(project)}
            />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <CaseStudyModal
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
