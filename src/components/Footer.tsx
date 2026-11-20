"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  const [year, setYear] = useState<string>("");

  // Rendered after mount — `new Date()` is not allowed during static prerendering.
  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  return (
    <footer className="relative border-t border-transparent py-8 [background:linear-gradient(90deg,transparent,rgba(129,140,248,0.4),transparent)_top/100%_1px_no-repeat]">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 sm:flex-row sm:justify-between">
        <p className="font-mono text-xs text-zinc-500">
          © {year} {profile.name}
        </p>
        <p className="font-mono text-xs text-zinc-400">
          {profile.location.city}, {profile.location.country} · Built with
          Next.js &amp; Tailwind CSS
        </p>
        <a
          href="#home"
          className="group inline-flex items-center gap-1.5 font-mono text-xs font-medium text-zinc-500 transition-colors hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-accent outline-none"
        >
          Back to top
          <ArrowUp className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}
