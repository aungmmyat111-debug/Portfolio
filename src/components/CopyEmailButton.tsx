"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, Copy, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { useToast } from "@/components/Toast";
import { cn } from "@/lib/utils";

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers / non-secure contexts.
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

export function CopyEmailButton({
  variant = "hero",
  className,
}: {
  variant?: "hero" | "contact";
  className?: string;
}) {
  const showToast = useToast();
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    const ok = await copyText(profile.email);
    if (!ok) return;
    setCopied(true);
    showToast(`Copied ${profile.email} to clipboard`);
    setTimeout(() => setCopied(false), 1800);
  };

  if (variant === "contact") {
    return (
      <motion.button
        type="button"
        onClick={onCopy}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-mono text-sm text-zinc-100 backdrop-blur transition-colors hover:border-indigo-400/40 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-accent outline-none sm:text-base",
          className,
        )}
      >
        {copied ? (
          <Check className="h-4 w-4 shrink-0 text-emerald-400" />
        ) : (
          <Copy className="h-4 w-4 shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-200" />
        )}
        <span className="tracking-tight">{profile.email}</span>
        <span
          className={cn(
            "ml-1 rounded-full border px-2 py-0.5 font-sans text-[10px] uppercase tracking-wider transition-colors",
            copied
              ? "border-emerald-400/30 text-emerald-300"
              : "border-white/10 text-zinc-500",
          )}
        >
          {copied ? "Copied!" : "Click to copy"}
        </span>
      </motion.button>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onCopy}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 text-sm font-medium text-zinc-200 backdrop-blur transition-colors hover:border-white/20 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-accent outline-none",
        className,
      )}
    >
      {copied ? (
        <Check className="h-4 w-4 text-emerald-400" />
      ) : (
        <Mail className="h-4 w-4" />
      )}
      {copied ? "Copied!" : "Copy Email"}
    </motion.button>
  );
}
