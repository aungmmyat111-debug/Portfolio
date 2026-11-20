"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import { useScrollLock } from "@/hooks/useScrollLock";
import { cn } from "@/lib/utils";

const LINKS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useScrollLock(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track the section currently in view.
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const cta = profile.resumeUrl
    ? { href: profile.resumeUrl, label: "Resume", external: true }
    : { href: "#contact", label: "Get in Touch", external: false };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className="mx-auto max-w-5xl">
        <nav
          aria-label="Primary"
          className={cn(
            "flex items-center justify-between rounded-2xl border bg-white/80 px-3 py-2.5 backdrop-blur-md transition-all duration-300 sm:px-4",
            scrolled
              ? "border-indigo-100 shadow-[0_8px_32px_-12px_rgba(79,70,229,0.25)]"
              : "border-transparent",
          )}
        >
          {/* Monogram / logo */}
          <a
            href="#home"
            aria-label={`${profile.domain} — home`}
            className="flex items-center gap-2.5 rounded-xl focus-visible:ring-2 focus-visible:ring-accent outline-none"
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 font-mono text-[11px] font-bold text-white shadow-[0_2px_10px_rgba(99,102,241,0.4)]">
              {profile.monogram}
            </span>
            <span className="font-display text-sm font-semibold text-zinc-800">
              {profile.domain.replace(".dev", "")}
              <span className="text-gradient">.dev</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={active === link.id ? "true" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-accent outline-none",
                  active === link.id
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-zinc-500 hover:bg-zinc-100/70 hover:text-zinc-900",
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <a
              href={cta.href}
              {...(cta.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-1.5 text-sm font-semibold text-white shadow-[0_4px_16px_-4px_rgba(99,102,241,0.5)] transition-all duration-200 hover:brightness-110 focus-visible:ring-2 focus-visible:ring-accent outline-none md:inline-flex"
            >
              {cta.label}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-9 w-9 place-items-center rounded-xl border border-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-accent outline-none md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -60 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 60 }}
                  transition={{ duration: 0.15 }}
                >
                  {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0, y: -6 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -6 }}
              transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mt-2 overflow-hidden rounded-2xl border border-indigo-100 bg-white/95 shadow-[0_16px_40px_-16px_rgba(79,70,229,0.3)] backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-1 p-3">
                {LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-xl px-4 py-2.5 text-base font-medium transition-colors",
                      active === link.id
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-zinc-500 hover:bg-zinc-100/70 hover:text-zinc-900",
                    )}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={cta.href}
                  {...(cta.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_4px_16px_-4px_rgba(99,102,241,0.5)]"
                >
                  {cta.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
