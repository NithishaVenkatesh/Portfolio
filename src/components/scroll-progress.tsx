"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/** Thin reading-progress bar pinned to the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });
  const reduced = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent/70"
      style={{ scaleX: reduced ? scrollYProgress : scaleX }}
    />
  );
}
