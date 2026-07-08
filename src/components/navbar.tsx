"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  House,
  BriefcaseBusiness,
  FolderGit2,
  Layers,
  Mail,
  FileText,
  Command,
} from "lucide-react";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "hero", label: "Home", icon: House },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "project", label: "Projects", icon: FolderGit2 },
  { id: "stacks-skills", label: "Stack", icon: Layers },
  { id: "contact", label: "Contact", icon: Mail },
] as const;

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export function Navbar() {
  const active = useActiveSection(SECTION_IDS);
  const reduced = useReducedMotion();

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <motion.nav
        initial={reduced ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        aria-label="Primary"
        className="flex items-center gap-1 rounded-full border border-line bg-card/85 py-1.5 pl-1.5 pr-1.5 shadow-(--shadow-card) backdrop-blur-md"
      >
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors duration-200",
                isActive
                  ? "bg-ink text-white"
                  : "text-soft hover:bg-surface hover:text-ink",
              )}
            >
              <Icon size={15} strokeWidth={2} aria-hidden />
              <span className="hidden sm:inline">{label}</span>
              <span className="sr-only sm:hidden">{label}</span>
            </a>
          );
        })}

        <span className="mx-1 h-5 w-px bg-line" aria-hidden />

        <button
          type="button"
          aria-label="Open command palette (Cmd+K)"
          title="Command palette (⌘K)"
          onClick={() =>
            window.dispatchEvent(
              new KeyboardEvent("keydown", { key: "k", metaKey: true }),
            )
          }
          className="hidden items-center gap-1 rounded-full px-2.5 py-1.5 font-mono text-[11px] font-medium text-soft transition-colors duration-200 hover:bg-surface hover:text-ink sm:flex"
        >
          <Command size={12} aria-hidden />K
        </button>

        <a
          href="#resume"
          className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-[13px] font-medium text-white transition-opacity duration-200 hover:opacity-90"
        >
          <FileText size={15} strokeWidth={2} aria-hidden />
          <span className="hidden sm:inline">Resume</span>
          <span className="sr-only sm:hidden">View resume</span>
        </a>
      </motion.nav>
    </header>
  );
}
