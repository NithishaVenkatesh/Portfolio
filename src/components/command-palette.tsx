"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownToLine,
  Check,
  Copy,
  ExternalLink,
  FolderGit2,
  Github,
  Layers,
  Linkedin,
  Mail,
  Search,
  SquareArrowDown,
} from "lucide-react";
import { projects, site, skillGroups } from "@/data/site";
import { cn } from "@/lib/utils";

type PaletteItem = {
  id: string;
  group: "Sections" | "Projects" | "Skills" | "Actions";
  title: string;
  hint?: string;
  keywords: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  run: () => void | Promise<void>;
};

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function openExternal(href: string) {
  window.open(href, "_blank", "noopener,noreferrer");
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
    setCopied(false);
  }, []);

  const items = useMemo<PaletteItem[]>(() => {
    const sections: PaletteItem[] = [
      { id: "hero", title: "Home", icon: SquareArrowDown },
      { id: "experience", title: "Experience", icon: SquareArrowDown },
      { id: "project", title: "Projects", icon: FolderGit2 },
      { id: "glance", title: "AI Systems at a Glance", icon: Layers },
      { id: "stacks-skills", title: "Stack & Skills", icon: Layers },
      { id: "achievements", title: "Achievements", icon: SquareArrowDown },
      { id: "education", title: "Education", icon: SquareArrowDown },
      { id: "contact", title: "Contact", icon: Mail },
    ].map((section) => ({
      ...section,
      group: "Sections" as const,
      hint: "Jump to",
      keywords: section.title.toLowerCase(),
      run: () => scrollToSection(section.id),
    }));

    const projectItems: PaletteItem[] = projects.map((project) => ({
      id: `project-${project.title}`,
      group: "Projects",
      title: project.title,
      hint: project.tagline,
      keywords:
        `${project.title} ${project.tagline} ${project.stack.join(" ")}`.toLowerCase(),
      icon: FolderGit2,
      run: () => scrollToSection("project"),
    }));

    const skillItems: PaletteItem[] = skillGroups.flatMap((group) =>
      group.skills.map((skill) => ({
        id: `skill-${skill}`,
        group: "Skills" as const,
        title: skill,
        hint: group.title,
        keywords: `${skill} ${group.title}`.toLowerCase(),
        icon: Layers,
        run: () => scrollToSection("stacks-skills"),
      })),
    );

    const actions: PaletteItem[] = [
      {
        id: "copy-email",
        group: "Actions",
        title: copied ? "Email copied" : "Copy email",
        hint: site.email,
        keywords: "copy email contact mail",
        icon: copied ? Check : Copy,
        run: async () => {
          try {
            await navigator.clipboard.writeText(site.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          } catch {
            // Clipboard unavailable; ignore.
          }
        },
      },
      {
        id: "download-resume",
        group: "Actions",
        title: "Download resume",
        hint: "PDF",
        keywords: "resume cv download pdf",
        icon: ArrowDownToLine,
        run: () => openExternal(site.resumeUrl),
      },
      {
        id: "open-github",
        group: "Actions",
        title: "Open GitHub",
        hint: "github.com/NithishaVenkatesh",
        keywords: "github code repositories",
        icon: Github,
        run: () => openExternal("https://github.com/NithishaVenkatesh"),
      },
      {
        id: "open-linkedin",
        group: "Actions",
        title: "Open LinkedIn",
        hint: "linkedin.com/in/nithisha-v",
        keywords: "linkedin profile connect",
        icon: Linkedin,
        run: () => openExternal("https://linkedin.com/in/nithisha-v"),
      },
      {
        id: "open-nexthire",
        group: "Actions",
        title: "Open NextHire AI",
        hint: "nexthire-ai.tech",
        keywords: "nexthire live product demo",
        icon: ExternalLink,
        run: () => openExternal("https://nexthire-ai.tech"),
      },
    ];

    return [...sections, ...projectItems, ...skillItems, ...actions];
  }, [copied]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Default view: sections and actions only, to keep the list scannable.
      return items.filter(
        (item) => item.group === "Sections" || item.group === "Actions",
      );
    }
    return items.filter((item) => item.keywords.includes(q));
  }, [items, query]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      } else if (event.key === "Escape" && open) {
        close();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const active = listRef.current?.querySelector('[data-active="true"]');
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  const runItem = (item: PaletteItem) => {
    void item.run();
    if (item.id !== "copy-email") close();
  };

  const onInputKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => Math.min(current + 1, filtered.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, 0));
    } else if (event.key === "Enter" && filtered[activeIndex]) {
      event.preventDefault();
      runItem(filtered[activeIndex]);
    }
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[70] flex items-start justify-center bg-ink/20 px-4 pt-[14vh] backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={reduced ? false : { opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="w-full max-w-[520px] overflow-hidden rounded-card border border-line bg-card shadow-(--shadow-lift)"
          >
            <div className="flex items-center gap-2.5 border-b border-line px-4">
              <Search size={15} aria-hidden className="shrink-0 text-faint" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Search sections, projects, skills…"
                aria-label="Search"
                className="h-12 w-full bg-transparent text-[14px] text-ink outline-none placeholder:text-faint"
              />
              <kbd className="shrink-0 rounded-md border border-line bg-surface px-1.5 py-0.5 font-mono text-[10.5px] text-faint">
                esc
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[46vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-8 text-center text-[13px] text-faint">
                  No matches for &ldquo;{query}&rdquo;
                </p>
              )}
              {filtered.map((item, index) => {
                const showGroup = item.group !== lastGroup;
                lastGroup = item.group;
                const Icon = item.icon;
                return (
                  <div key={item.id}>
                    {showGroup && (
                      <p className="px-3 pb-1 pt-2.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-faint">
                        {item.group}
                      </p>
                    )}
                    <button
                      type="button"
                      data-active={index === activeIndex}
                      onClick={() => runItem(item)}
                      onMouseMove={() => setActiveIndex(index)}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2 text-left",
                        index === activeIndex ? "bg-surface" : "bg-transparent",
                      )}
                    >
                      <Icon size={14} className="shrink-0 text-soft" />
                      <span className="min-w-0 flex-1 truncate text-[13.5px] font-medium text-ink">
                        {item.title}
                      </span>
                      {item.hint && (
                        <span className="max-w-[45%] truncate text-[12px] text-faint">
                          {item.hint}
                        </span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
