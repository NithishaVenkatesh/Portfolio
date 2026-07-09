"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { AutoplayVideo } from "@/components/autoplay-video";
import { YouTubeEmbed } from "@/components/youtube-embed";
import type { Project, ProjectMedia } from "@/data/site";

/**
 * Compact, non-interactive media preview for project cards.
 * YouTube renders as its poster (the real player lives in the detail view).
 */
export function MediaPreview({ media }: { media: ProjectMedia }) {
  if (media.type === "video") {
    return (
      <AutoplayVideo
        src={media.src}
        label={media.label}
        startAt={media.startAt}
        playbackRate={media.playbackRate}
        className="block h-full w-full object-cover"
      />
    );
  }

  if (media.type === "youtube") {
    return (
      <>
        <Image
          src={media.poster}
          alt={`${media.title} preview`}
          fill
          sizes="(max-width: 680px) 100vw, 620px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
        <span className="absolute bottom-2.5 left-3 inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[10.5px] font-medium text-white backdrop-blur-sm">
          <Play size={10} aria-hidden className="fill-white" />
          Video demo
        </span>
      </>
    );
  }

  return (
    <Image
      src={media.src}
      alt={media.alt}
      fill
      sizes="(max-width: 680px) 100vw, 620px"
      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
    />
  );
}

/** Diagram-style fallback preview for projects without media. */
export function DiagramPreview({ project }: { project: Project }) {
  const nodes = project.architecture?.nodes.slice(0, 4) ?? [];
  return (
    <div className="flex h-full w-full flex-col items-start justify-center gap-2 bg-surface p-5">
      {nodes.map((node, index) => (
        <span key={node} className="flex items-center gap-2">
          <span className="rounded-md border border-line-strong bg-card px-2 py-1 font-mono text-[11px] font-medium leading-none text-ink shadow-(--shadow-card)">
            {node}
          </span>
          {index < nodes.length - 1 && (
            <span aria-hidden className="font-mono text-[11px] text-faint">
              ↓
            </span>
          )}
        </span>
      ))}
      {project.architecture && project.architecture.nodes.length > 4 && (
        <span className="font-mono text-[11px] text-faint">
          … {project.architecture.nodes.length - 4} more stages
        </span>
      )}
    </div>
  );
}

/** Full-size media for the case-study view. */
export function MediaFull({ media, title }: { media: ProjectMedia; title: string }) {
  if (media.type === "youtube") {
    return (
      <YouTubeEmbed id={media.id} title={media.title} poster={media.poster} />
    );
  }

  if (media.type === "video") {
    return (
      <div className="overflow-hidden rounded-[13px] border border-line bg-surface">
        <AutoplayVideo
          src={media.src}
          label={media.label}
          startAt={media.startAt}
          playbackRate={media.playbackRate}
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
        sizes="(max-width: 900px) 100vw, 840px"
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
