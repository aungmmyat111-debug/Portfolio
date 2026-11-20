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
              "grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:text-zinc-100 focus-visible:ring-2 focus-visible:ring-accent outline-none",
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
