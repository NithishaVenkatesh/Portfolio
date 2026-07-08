"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

/**
 * Lite YouTube embed: renders a local poster with a play button and only
 * loads the YouTube iframe after a click, keeping initial page weight low.
 */
export function YouTubeEmbed({
  id,
  title,
  poster,
}: {
  id: string;
  title: string;
  poster: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-[13px] border border-line bg-ink">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group/video absolute inset-0 h-full w-full"
        >
          <Image
            src={poster}
            alt={`${title} video preview`}
            fill
            sizes="(max-width: 680px) 100vw, 620px"
            className="object-cover transition-transform duration-500 ease-out group-hover/video:scale-[1.02]"
          />
          <span className="absolute inset-0 bg-ink/10 transition-colors duration-300 group-hover/video:bg-ink/20" />
          <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-card shadow-(--shadow-lift) transition-transform duration-300 group-hover/video:scale-105">
            <Play size={18} aria-hidden className="ml-0.5 fill-ink text-ink" />
          </span>
          <span className="absolute bottom-2.5 left-3 rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[10.5px] font-medium text-white backdrop-blur-sm">
            Watch demo
          </span>
        </button>
      )}
    </div>
  );
}
