"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { site } from "@/data/site";

/** One-click email copy with inline confirmation. */
export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(site.email);
          setCopied(true);
        } catch {
          // Clipboard unavailable (e.g. insecure context); the mailto link still works.
        }
      }}
      aria-label={copied ? "Email copied" : "Copy email address"}
      className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-card px-4 py-2 text-[13.5px] font-medium text-ink transition-colors duration-200 hover:bg-surface"
    >
      {copied ? (
        <Check size={14} aria-hidden className="text-accent" />
      ) : (
        <Copy size={14} aria-hidden />
      )}
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}
