"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronDown,
  ExternalLink,
  FileText,
  Github,
  PlayCircle,
  Sparkles,
  Trophy,
} from "lucide-react";
import { ArchitectureFlow } from "@/components/architecture-flow";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";
import type { Project, ProjectLink, ProjectMedia } from "@/data/site";

const LINK_ICONS = {
  live: ExternalLink,
  github: Github,
  video: PlayCircle,
  docs: FileText,
} as const;

function MediaBlock({ media, title }: { media: ProjectMedia; title: string }) {
  if (media.type === "youtube") {
    return (
      <YouTubeEmbed id={media.id} title={media.title} poster={media.poster} />
    );
  }

  if (media.type === "video") {
    return (
      <div className="overflow-hidden rounded-[13px] border border-line bg-surface">
        <video
          src={media.src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={media.label}
          className="block w-full"
        />
      </div>
    );
  }

  const image = (
    <div className="group/media overflow-hidden rounded-[13px] border border-line bg-surface">
      <Image
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        sizes="(max-width: 680px) 100vw, 620px"
        className="block w-full transition-transform duration-500 ease-out group-hover/media:scale-[1.02]"
      />
    </div>
  );

  if (!media.href) return image;

  return (
    <a
      href={media.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${title} live preview`}
      className="block"
    >
      {image}
    </a>
  );
}

function StoryBlock({ label, children }: { label: string; children: string }) {
  return (
    <div>
      <h4 className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-faint">
        {label}
      </h4>
      <p className="mt-1.5 text-[14px] leading-relaxed text-soft">{children}</p>
    </div>
  );
}

function MetricsRow({ metrics }: { metrics: Project["metrics"] }) {
  if (metrics.length === 0) return null;
  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="min-w-0">
          <dt className="sr-only">{metric.label}</dt>
          <dd className="font-mono text-[17px] font-semibold leading-none text-ink">
            {metric.value}
          </dd>
          <dd className="mt-1.5 text-[12px] leading-snug text-soft">
            {metric.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function HighlightsDisclosure({
  highlights,
  projectTitle,
}: {
  highlights: string[];
  projectTitle: string;
}) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  if (highlights.length === 0) return null;

  return (
    <div className="rounded-[13px] border border-line">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-[13px] font-medium text-ink transition-colors duration-200 hover:bg-surface"
      >
        Engineering highlights
        <span className="flex items-center gap-2 text-soft">
          <span className="font-mono text-[11.5px]">{highlights.length}</span>
          <ChevronDown
            size={14}
            aria-hidden
            className={cn(
              "transition-transform duration-300",
              open && "rotate-180",
            )}
          />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`highlights-${projectTitle.replace(/\W+/g, "-").toLowerCase()}`}
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <ul className="flex flex-col gap-2.5 border-t border-line px-4 py-3.5">
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-2.5 text-[13.5px] leading-relaxed text-soft"
                >
                  <span
                    aria-hidden
                    className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-faint"
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LinksRow({ links }: { links: ProjectLink[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {links.map((link) => {
        const Icon = LINK_ICONS[link.kind];
        return (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-card px-3 py-1.5 text-[12.5px] font-medium text-ink transition-colors duration-200 hover:bg-surface"
          >
            <Icon size={13} aria-hidden />
            {link.label}
          </a>
        );
      })}
    </div>
  );
}

/** A project rendered as a product showcase: media, story, metrics, system diagram. */
export function ProjectShowcase({ project }: { project: Project }) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      whileHover={reduced ? undefined : { y: -3 }}
      transition={{ type: "spring", bounce: 0.25, duration: 0.45 }}
      className={cn(
        "rounded-card border border-line bg-card p-5 shadow-(--shadow-card) transition-shadow duration-300 hover:shadow-(--shadow-lift) sm:p-6",
        project.featured &&
          (project.award
            ? "border-amber-500/30 shadow-[0_0_0_3px_rgba(245,158,11,0.07),var(--shadow-card)]"
            : "border-accent/25 shadow-[0_0_0_3px_rgba(29,155,240,0.06),var(--shadow-card)]"),
      )}
    >
      {project.award && (
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/8 px-2.5 py-1.5 font-mono text-[11px] font-medium leading-none text-amber-700">
          <Trophy size={11} aria-hidden />
          {project.award}
        </span>
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-[17px] font-semibold leading-snug tracking-tight">
            {project.title}
          </h3>
          <p className="mt-0.5 font-display text-[13.5px] text-soft">
            {project.tagline}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {project.featured && !project.award && (
            <span className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/8 px-2.5 py-1 font-mono text-[11px] font-medium leading-none text-accent">
              <Sparkles size={10} aria-hidden />
              Featured
            </span>
          )}
          <span className="rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[11px] font-medium leading-none text-soft">
            {project.kind}
          </span>
        </div>
      </div>

      {project.media && (
        <div className="mt-5">
          <MediaBlock media={project.media} title={project.title} />
        </div>
      )}

      <p className="mt-5 text-[14px] leading-relaxed text-soft">
        {project.description}
      </p>

      <div className="mt-5 flex flex-col gap-4">
        <StoryBlock label="Why it exists">{project.why}</StoryBlock>
        <StoryBlock label="What makes it interesting">{project.edge}</StoryBlock>
      </div>

      {project.metrics.length > 0 && (
        <div className="mt-5 rounded-[13px] border border-line bg-surface px-4 py-3.5">
          <MetricsRow metrics={project.metrics} />
        </div>
      )}

      {project.architecture && (
        <div className="mt-4">
          <ArchitectureFlow
            label={project.architecture.label}
            nodes={project.architecture.nodes}
          />
        </div>
      )}

      <div className="mt-4">
        <HighlightsDisclosure
          highlights={project.highlights}
          projectTitle={project.title}
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
        {project.stack.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>

      <div className="mt-5">
        <LinksRow links={project.links} />
      </div>
    </motion.article>
  );
}
