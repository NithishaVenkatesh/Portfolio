"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const node: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const arrow: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

/**
 * Animated linear system diagram: mono node chips connected by arrows,
 * revealed left-to-right as the diagram enters the viewport.
 */
export function ArchitectureFlow({
  label,
  nodes,
}: {
  label: string;
  nodes: string[];
}) {
  const reduced = useReducedMotion();

  return (
    <figure className="rounded-[13px] border border-line bg-surface p-4">
      <figcaption className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-faint">
        {label}
      </figcaption>
      <motion.div
        className="mt-3 flex flex-wrap items-center gap-y-2.5"
        variants={reduced ? undefined : container}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-48px" }}
        role="img"
        aria-label={`${label}: ${nodes.join(", then ")}`}
      >
        {nodes.map((step, index) => (
          <span key={step} className="flex items-center">
            <motion.span
              variants={reduced ? undefined : node}
              className="rounded-md border border-line-strong bg-card px-2 py-1 font-mono text-[11.5px] font-medium leading-none text-ink shadow-(--shadow-card)"
            >
              {step}
            </motion.span>
            {index < nodes.length - 1 && (
              <motion.span
                variants={reduced ? undefined : arrow}
                aria-hidden
                className="mx-1 text-faint"
              >
                <ArrowRight size={11} strokeWidth={2} />
              </motion.span>
            )}
          </span>
        ))}
      </motion.div>
    </figure>
  );
}
