"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  FileText,
  Github,
  PlayCircle,
  Trophy,
} from "lucide-react";
import { ArchitectureFlow } from "@/components/architecture-flow";
import { MediaFull } from "@/components/projects/media";
import { Tag } from "@/components/ui/tag";
import type { Project } from "@/data/site";

const LINK_ICONS = {
  live: ExternalLink,
  github: Github,
  video: PlayCircle,
  docs: FileText,
} as const;

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

function Block({
  label,
  children,
  delay = 0,
}: {
  label: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.section
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: EASE }}
    >
      <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-faint">
        {label}
      </h3>
      <div className="mt-2.5">{children}</div>
    </motion.section>
  );
}

/**
 * Full case-study view. Rendered as a page-like overlay on top of the
 * portfolio, with its own scroll, top bar, and next-project navigation.
 */
export function ProjectDetail({
  project,
  nextProject,
  onClose,
  onNext,
}: {
  project: Project;
  nextProject: Project;
  onClose: () => void;
  onNext: () => void;
}) {
  const reduced = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Reset scroll when navigating between projects inside the overlay.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [project.title]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduced ? undefined : { opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[70] bg-card"
    >
      <motion.div
        ref={scrollRef}
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? undefined : { opacity: 0, y: 16 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="h-full overflow-y-auto overscroll-contain"
      >
        {/* Top bar */}
        <div className="sticky top-0 z-10 border-b border-line bg-card/90 backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-[860px] items-center justify-between gap-3 px-5 py-3 sm:px-8">
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[13px] font-medium text-soft transition-colors duration-200 hover:bg-surface hover:text-ink"
            >
              <ArrowLeft size={14} aria-hidden />
              All projects
            </button>
            <div className="flex items-center gap-1.5">
              {project.links.map((link) => {
                const Icon = LINK_ICONS[link.kind];
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-card px-3 py-1.5 text-[12px] font-medium text-ink transition-colors duration-200 hover:bg-surface"
                  >
                    <Icon size={12} aria-hidden />
                    <span className="hidden sm:inline">{link.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[860px] px-5 pb-16 pt-10 sm:px-8">
          {/* Hero */}
          <motion.header
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {project.award && (
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-3 py-1.5 font-mono text-[11.5px] font-semibold leading-none text-white shadow-(--shadow-card)">
                <Trophy size={12} aria-hidden />
                {project.award}
              </span>
            )}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="font-display text-[30px] font-bold leading-tight tracking-tight">
                {project.title}
              </h2>
              <span className="rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[11px] font-medium leading-none text-soft">
                {project.kind}
              </span>
            </div>
            <p className="mt-1.5 font-display text-[16px] text-soft">
              {project.tagline}
            </p>
            <p className="mt-4 max-w-[640px] text-[14.5px] leading-relaxed text-soft">
              {project.description}
            </p>
          </motion.header>

          {/* Media */}
          {project.media && (
            <motion.div
              className="mt-8"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
            >
              <MediaFull media={project.media} title={project.title} />
            </motion.div>
          )}

          {/* Metrics band */}
          {project.metrics.length > 0 && (
            <motion.dl
              className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: EASE }}
            >
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[13px] border border-line bg-surface px-4 py-3.5"
                >
                  <dt className="sr-only">{metric.label}</dt>
                  <dd className="font-mono text-[18px] font-semibold leading-none text-ink">
                    {metric.value}
                  </dd>
                  <dd className="mt-1.5 text-[12px] leading-snug text-soft">
                    {metric.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          )}

          {/* Story + engineering, with a sticky meta rail on desktop */}
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-[1fr_220px]">
            <div className="flex min-w-0 flex-col gap-8">
              <Block label="Why it exists" delay={0.2}>
                <p className="text-[14.5px] leading-relaxed text-soft">
                  {project.why}
                </p>
              </Block>

              <Block label="What makes it interesting" delay={0.25}>
                <p className="text-[14.5px] leading-relaxed text-soft">
                  {project.edge}
                </p>
              </Block>

              {project.architecture && (
                <Block label="System design" delay={0.3}>
                  <ArchitectureFlow
                    label={project.architecture.label}
                    nodes={project.architecture.nodes}
                  />
                </Block>
              )}

              {project.highlights.length > 0 && (
                <Block label="Engineering highlights" delay={0.35}>
                  <ol className="flex flex-col gap-4">
                    {project.highlights.map((highlight, index) => (
                      <li key={highlight} className="flex gap-3.5">
                        <span
                          aria-hidden
                          className="mt-0.5 font-mono text-[12px] font-semibold text-faint"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="text-[14px] leading-relaxed text-soft">
                          {highlight}
                        </p>
                      </li>
                    ))}
                  </ol>
                </Block>
              )}
            </div>

            <aside className="sm:sticky sm:top-20 sm:self-start">
              <div className="flex flex-col gap-6">
                <Block label="Stack" delay={0.3}>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>
                </Block>
                <Block label="Links" delay={0.35}>
                  <div className="flex flex-col items-start gap-2">
                    {project.links.map((link) => {
                      const Icon = LINK_ICONS[link.kind];
                      return (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-soft transition-colors duration-200 hover:text-ink"
                        >
                          <Icon size={13} aria-hidden />
                          {link.label}
                        </a>
                      );
                    })}
                  </div>
                </Block>
              </div>
            </aside>
          </div>

          {/* Next project */}
          <motion.div
            className="mt-14 border-t border-line pt-6"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <button
              type="button"
              onClick={onNext}
              className="group flex w-full items-center justify-between gap-4 rounded-card border border-line bg-surface px-5 py-4 text-left transition-colors duration-200 hover:bg-card hover:shadow-(--shadow-card)"
            >
              <span>
                <span className="block font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-faint">
                  Next project
                </span>
                <span className="mt-1 block font-display text-[15px] font-semibold tracking-tight text-ink">
                  {nextProject.title}
                </span>
                <span className="block text-[12.5px] text-soft">
                  {nextProject.tagline}
                </span>
              </span>
              <ArrowRight
                size={16}
                aria-hidden
                className="shrink-0 text-soft transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
