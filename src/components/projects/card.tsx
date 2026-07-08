"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  FileText,
  Github,
  PlayCircle,
  Trophy,
} from "lucide-react";
import { MediaPreview, DiagramPreview } from "@/components/projects/media";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/site";

const LINK_ICONS = {
  live: ExternalLink,
  github: Github,
  video: PlayCircle,
  docs: FileText,
} as const;

/**
 * Compact preview card: media, one-line pitch, every external link, and a
 * case-study CTA. Clicking anywhere else on the card opens the case study.
 */
export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      whileHover={reduced ? undefined : { y: -3 }}
      transition={{ type: "spring", bounce: 0.25, duration: 0.45 }}
      className={cn(
        "group flex h-full cursor-pointer flex-col overflow-hidden rounded-card border border-line bg-card shadow-(--shadow-card) transition-shadow duration-300 hover:shadow-(--shadow-lift)",
        project.award && "border-amber-500/30",
      )}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
      aria-label={`Open ${project.title} case study`}
    >
      <div className="relative aspect-video overflow-hidden border-b border-line bg-surface">
        {project.media ? (
          <MediaPreview media={project.media} />
        ) : (
          <DiagramPreview project={project} />
        )}
        {project.award && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-white px-2.5 py-1.5 font-mono text-[10.5px] font-semibold leading-none text-ink shadow-(--shadow-lift)">
            <Image
              src="/microsoft.svg"
              alt=""
              width={11}
              height={11}
              className="h-[11px] w-[11px]"
            />
            {project.award}
            <Trophy size={10} aria-hidden className="text-amber-600" />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-[16px] font-semibold leading-snug tracking-tight">
              {project.title}
            </h3>
            <p className="mt-0.5 font-display text-[12.5px] text-soft">
              {project.tagline}
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[10.5px] font-medium leading-none text-soft">
            {project.kind}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-soft">
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
          <span className="inline-flex items-center gap-1 rounded-full bg-ink px-3 py-1.5 text-[12px] font-medium text-white transition-opacity duration-200 group-hover:opacity-90">
            Case study
            <ArrowUpRight
              size={12}
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
          {project.links.map((link) => {
            const Icon = LINK_ICONS[link.kind];
            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-card px-3 py-1.5 text-[12px] font-medium text-ink transition-colors duration-200 hover:bg-surface"
              >
                <Icon size={12} aria-hidden />
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </motion.article>
  );
}
