import type { Variants } from "motion/react";

/** Signature easing used across the site — snappy, never sluggish. */
export const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};

export const stagger = (delayChildren = 0, staggerChildren = 0.08): Variants => ({
  hidden: {},
  show: {
    transition: { delayChildren, staggerChildren },
  },
});
