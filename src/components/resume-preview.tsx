"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownToLine, Eye, X } from "lucide-react";
import { site } from "@/data/site";

/** Opens the resume PDF in an in-page dialog instead of forcing a download. */
export function ResumePreview() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-card px-4 py-2 text-[13.5px] font-medium text-ink transition-colors duration-200 hover:bg-surface"
      >
        <Eye size={14} aria-hidden />
        Preview resume
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/25 p-4 backdrop-blur-[2px]"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Resume preview"
              initial={reduced ? false : { opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="flex h-[85vh] w-full max-w-[760px] flex-col overflow-hidden rounded-card border border-line bg-card shadow-(--shadow-lift)"
            >
              <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
                <p className="text-[13.5px] font-semibold">Resume</p>
                <div className="flex items-center gap-1.5">
                  <a
                    href={site.resumeUrl}
                    download
                    className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-[12.5px] font-medium text-white transition-opacity duration-200 hover:opacity-90"
                  >
                    <ArrowDownToLine size={13} aria-hidden />
                    Download
                  </a>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close preview"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-soft transition-colors duration-200 hover:bg-surface hover:text-ink"
                  >
                    <X size={15} aria-hidden />
                  </button>
                </div>
              </div>
              <iframe
                src={`${site.resumeUrl}#view=FitH`}
                title="Resume preview"
                className="h-full w-full bg-surface"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
