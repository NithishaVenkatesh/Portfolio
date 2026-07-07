"use client";

import { skillUsage } from "@/data/site";

/**
 * Skill pill with a hover/focus popover showing where the skill has shipped.
 * Skills without a verified project mapping render as a plain pill.
 */
export function SkillTag({ skill }: { skill: string }) {
  const usage = skillUsage[skill];

  if (!usage) {
    return (
      <span className="inline-flex items-center rounded-full border border-line bg-surface px-3 py-1.5 text-[12.5px] font-medium leading-none text-soft">
        {skill}
      </span>
    );
  }

  return (
    <span className="group relative inline-flex">
      <span
        tabIndex={0}
        aria-describedby={`skill-usage-${skill.replace(/\W/g, "")}`}
        className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-[12.5px] font-medium leading-none text-soft transition-colors duration-200 hover:border-line-strong hover:text-ink focus-visible:text-ink"
      >
        {skill}
        <span
          aria-hidden
          className="h-1 w-1 rounded-full bg-accent/60 transition-colors duration-200 group-hover:bg-accent"
        />
      </span>
      <span
        id={`skill-usage-${skill.replace(/\W/g, "")}`}
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-0 z-30 mb-2 w-max max-w-[240px] rounded-[10px] border border-line bg-card px-3 py-2 opacity-0 shadow-(--shadow-lift) transition-all duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        <span className="block font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-faint">
          Shipped in
        </span>
        <span className="mt-0.5 block text-[12px] font-medium leading-snug text-ink">
          {usage.join(" · ")}
        </span>
      </span>
    </span>
  );
}
