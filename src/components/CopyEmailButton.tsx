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
          "group flex items-center gap-3 rounded-2xl border border-indigo-200 bg-white px-6 py-4 font-mono text-sm text-zinc-800 shadow-[0_8px_24px_-10px_rgba(99,102,241,0.4)] transition-all duration-200 hover:border-indigo-300 hover:shadow-[0_12px_28px_-10px_rgba(99,102,241,0.5)] focus-visible:ring-2 focus-visible:ring-accent outline-none sm:text-base",
          className,
        )}
      >
        {copied ? (
          <Check className="h-4 w-4 shrink-0 text-emerald-500" />
        ) : (
          <Copy className="h-4 w-4 shrink-0 text-cyan-600 transition-colors group-hover:text-cyan-500" />
        )}
        <span className="tracking-tight">{profile.email}</span>
        <span
          className={cn(
            "ml-1 rounded-full border px-2 py-0.5 font-sans text-[10px] font-medium uppercase tracking-wider transition-colors",
            copied
              ? "border-emerald-200 bg-emerald-50 text-emerald-600"
              : "border-zinc-200 text-zinc-400",
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
        "inline-flex h-11 items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-700 shadow-[0_4px_14px_-6px_rgba(24,26,42,0.15)] transition-all duration-200 hover:border-indigo-300 hover:text-indigo-700 hover:shadow-[0_6px_18px_-6px_rgba(99,102,241,0.4)] focus-visible:ring-2 focus-visible:ring-accent outline-none",
        className,
      )}
    >
      {copied ? (
        <Check className="h-4 w-4 text-emerald-500" />
      ) : (
        <Mail className="h-4 w-4 text-indigo-500" />
      )}
      {copied ? "Copied!" : "Copy Email"}
    </motion.button>
  );
}
