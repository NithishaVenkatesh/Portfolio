"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowDownToLine,
  Check,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
} from "lucide-react";
import { site } from "@/data/site";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

/**
 * Full-page resume viewer, opened via the #resume URL hash from anywhere
 * on the site. The PDF is read in place; downloading is a choice made here.
 */
export function ResumeViewer() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const syncFromHash = () =>
      setOpen(window.location.hash.replace(/^#/, "") === "resume");
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const close = useCallback(() => {
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Resume"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] flex flex-col bg-surface"
        >
          {/* Top bar */}
          <div className="border-b border-line bg-card/90 backdrop-blur-md">
            <div className="mx-auto flex w-full max-w-[900px] items-center justify-between gap-3 px-5 py-3 sm:px-8">
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[13px] font-medium text-soft transition-colors duration-200 hover:bg-surface hover:text-ink"
              >
                <ArrowLeft size={14} aria-hidden />
                Back
              </button>

              <div className="hidden text-center sm:block">
                <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-faint">
                  Resume
                </p>
                <p className="text-[13px] font-semibold leading-tight">
                  {site.name}
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(site.email);
                      setCopied(true);
                    } catch {
                      // Clipboard unavailable; the contact section still has mailto.
                    }
                  }}
                  aria-label={copied ? "Email copied" : "Copy email address"}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-card px-3 py-1.5 text-[12px] font-medium text-ink transition-colors duration-200 hover:bg-surface"
                >
                  {copied ? (
                    <Check size={12} aria-hidden className="text-accent" />
                  ) : (
                    <Copy size={12} aria-hidden />
                  )}
                  <span className="hidden sm:inline">
                    {copied ? "Copied" : "Copy email"}
                  </span>
                </button>
                <a
                  href={site.resumeUrl}
                  download="Nithisha-Venkatesh-Resume.pdf"
                  className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-[12px] font-medium text-white transition-opacity duration-200 hover:opacity-90"
                >
                  <ArrowDownToLine size={12} aria-hidden />
                  Download PDF
                </a>
              </div>
            </div>
          </div>

          {/* Paper */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mx-auto flex w-full max-w-[900px] flex-1 flex-col px-5 pb-4 pt-6 sm:px-8"
          >
            <div className="flex-1 overflow-hidden rounded-card border border-line bg-card shadow-(--shadow-lift)">
              <iframe
                src={`${site.resumeUrl}#view=FitH&toolbar=0`}
                title="Resume"
                className="h-full w-full"
              />
            </div>

            {/* Footer strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 py-3">
              <p className="text-[12px] text-faint">
                Viewer not loading?{" "}
                <a
                  href={site.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-soft transition-colors duration-200 hover:text-ink"
                >
                  Open the PDF in a new tab
                  <ExternalLink size={11} aria-hidden />
                </a>
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/NithishaVenkatesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12px] font-medium text-soft transition-colors duration-200 hover:text-ink"
                >
                  <Github size={12} aria-hidden />
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/nithisha-v"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12px] font-medium text-soft transition-colors duration-200 hover:text-ink"
                >
                  <Linkedin size={12} aria-hidden />
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
