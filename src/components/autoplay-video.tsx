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
}: {
  src: string;
  label: string;
  className?: string;
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
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      className={className}
    />
  );
}
