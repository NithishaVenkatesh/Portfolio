"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, ArrowRight, FileText, Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/data/site";
import { HoverLift } from "@/components/motion";

const SOCIAL_ICONS = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
} as const;

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

/** Staggered entrance, mirroring V1's 0.2s-spaced fade-and-rise cadence. */
function Enter({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  return (
    <section id="hero" aria-label="Introduction" className="pb-14 pt-28 sm:pb-16 sm:pt-32">
      <Enter delay={0}>
        <a
          href="#contact"
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/8 px-3 py-1.5 font-mono text-[11.5px] font-medium text-emerald-700 transition-colors duration-200 hover:border-emerald-500/50"
        >
          <span className="relative flex h-1.5 w-1.5" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          {site.availability}
        </a>
        <h1 className="flex items-center gap-1.5 text-[22px] font-bold leading-tight tracking-tight">
          {site.name}
          <BadgeCheck
            size={20}
            aria-label="Verified"
            className="shrink-0 fill-accent stroke-white"
          />
        </h1>
        <p className="mt-1 font-mono text-[14px] font-medium text-soft">
          {site.role}
        </p>
      </Enter>

      <Enter delay={0.15} className="mt-5">
        <p className="max-w-prose text-[15px] leading-relaxed text-soft">
          {site.intro.split(site.introHighlight).map((part, index, parts) => (
            <span key={index}>
              {part}
              {index < parts.length - 1 && (
                <mark className="rounded bg-amber-500/15 px-1 py-0.5 font-medium text-amber-800">
                  {site.introHighlight}
                </mark>
              )}
            </span>
          ))}
        </p>
      </Enter>

      <Enter delay={0.3} className="mt-7">
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#project"
            className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[13.5px] font-medium text-white transition-opacity duration-200 hover:opacity-90"
          >
            View projects
            <ArrowRight
              size={14}
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
          <a
            href="#resume"
            className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-card px-4 py-2 text-[13.5px] font-medium text-ink transition-colors duration-200 hover:bg-surface"
          >
            <FileText size={14} aria-hidden />
            View resume
          </a>

          <div className="ml-1 flex items-center gap-1" aria-label="Social links">
            {site.socials.map((social) => {
              const Icon = SOCIAL_ICONS[social.icon as keyof typeof SOCIAL_ICONS];
              return (
                <HoverLift key={social.label}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-soft transition-colors duration-200 hover:bg-surface hover:text-ink"
                  >
                    <Icon size={17} aria-hidden />
                  </a>
                </HoverLift>
              );
            })}
          </div>
        </div>
      </Enter>
    </section>
  );
}
