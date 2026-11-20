"use client";

import type { ComponentType, SVGProps } from "react";
import { profile, type SocialIcon } from "@/data/profile";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const ICONS: Record<SocialIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  x: XIcon,
};

export function SocialLinks({
  className,
  itemClassName,
}: {
  className?: string;
  itemClassName?: string;
}) {
  const links = profile.socials.filter((s) => s.href);
  if (links.length === 0) return null;

  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      {links.map((social) => {
        const Icon = ICONS[social.icon];
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            title={social.label}
            className={cn(
              "grid h-10 w-10 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-[0_2px_6px_-2px_rgba(24,26,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-[0_6px_16px_-4px_rgba(99,102,241,0.4)] focus-visible:ring-2 focus-visible:ring-accent outline-none",
              itemClassName,
            )}
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}
