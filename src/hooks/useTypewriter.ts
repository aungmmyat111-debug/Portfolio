"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Types a list of terminal lines sequentially. Respects
 * `prefers-reduced-motion` by rendering everything instantly.
 */
export function useTypewriter(lines: string[], speed = 16) {
  const reduced = useReducedMotion();
  const [pos, setPos] = useState({ line: 0, char: 0, done: false });
  const started = useRef(false);

  useEffect(() => {
    if (reduced === null || started.current) return; // wait for client; run once
    started.current = true;

    if (reduced) {
      setPos({ line: lines.length, char: 0, done: true });
      return;
    }

    let line = 0;
    let char = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const target = lines[line];
      if (char < target.length) {
        char += 1;
        setPos({ line, char, done: false });
        timer = setTimeout(tick, speed);
      } else if (line < lines.length - 1) {
        line += 1;
        char = 0;
        setPos({ line, char, done: false });
        timer = setTimeout(tick, 240);
      } else {
        setPos({ line, char, done: true });
      }
    };

    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [lines, speed, reduced]);

  return pos;
}
