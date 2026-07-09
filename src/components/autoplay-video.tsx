"use client";

import { useEffect, useRef } from "react";

/**
 * Muted looping video that starts when it scrolls into view and pauses when
 * it leaves, so demos are always moving when seen without wasting decode
 * time off-screen. More reliable than the bare autoplay attribute, which
 * browsers ignore for videos mounted off-viewport.
 */
export function AutoplayVideo({
  src,
  label,
  className,
  startAt = 0,
}: {
  src: string;
  label: string;
  className?: string;
  /** Seconds to skip into the video, for demos with a static intro. */
  startAt?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Autoplay rejected (e.g. low-power mode); the first frame shows.
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={startAt > 0 ? `${src}#t=${startAt}` : src}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      onTimeUpdate={(event) => {
        // Media-fragment start is ignored after a loop wraps to 0; re-seek.
        const video = event.currentTarget;
        if (startAt > 0 && video.currentTime < startAt - 1) {
          video.currentTime = startAt;
        }
      }}
      className={className}
    />
  );
}
