import {
  Boxes,
  BrainCircuit,
  Code2,
  Container,
  Server,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { SkillTag } from "@/components/skill-tag";
import { TechMarquee } from "@/components/tech-marquee";
import { Stagger, StaggerItem } from "@/components/motion";
import { skillGroups, skillUsage } from "@/data/site";
import { cn } from "@/lib/utils";

const GROUP_ICONS: Record<string, LucideIcon> = {
  "Programming Languages": Code2,
  "AI & LLM Systems": BrainCircuit,
  "AI Tooling & Models": Boxes,
  Backend: Server,
  "Infrastructure & DevOps": Container,
};

function groupByTitle(title: string) {
  const group = skillGroups.find((g) => g.title === title);
  return group?.skills ?? [];
}

function CardShell({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const Icon = GROUP_ICONS[title];
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-card border border-line bg-card p-5 shadow-(--shadow-card)",
        className,
      )}
    >
      <div className="flex items-center gap-2.5">
        {Icon && (
          <span
            aria-hidden
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface text-soft"
          >
            <Icon size={15} />
          </span>
        )}
        <h3 className="font-mono text-[12px] font-medium uppercase tracking-[0.06em] text-soft">
          {title}
        </h3>
      </div>
      <div className="mt-4 flex-1">{children}</div>
    </div>
  );
}

function ChipCard({ title }: { title: string }) {
  return (
    <CardShell title={title}>
      <div className="flex flex-wrap gap-1.5">
        {groupByTitle(title).map((skill) => (
          <SkillTag key={skill} skill={skill} />
        ))}
      </div>
    </CardShell>
  );
}

/**
 * Bento layout: a featured AI-systems card, a typographic languages card
 * with real shipped-in provenance, themed capability cards, and the
 * toolbox as a counter-scrolling logo marquee.
 */
export function SkillsSection() {
  return (
    <Section id="stacks-skills" title="Stack & Skills">
      <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Featured: the core competency, full width */}
        <StaggerItem className="sm:col-span-2">
          <CardShell title="AI & LLM Systems" className="border-accent/20">
            <p className="font-display text-[19px] font-semibold leading-snug tracking-tight">
              Agents, retrieval, guardrails, evaluation.
              <span className="text-soft"> The layer where LLMs become systems.</span>
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {groupByTitle("AI & LLM Systems").map((skill) => (
                <SkillTag key={skill} skill={skill} />
              ))}
            </div>
          </CardShell>
        </StaggerItem>

        {/* Languages: typographic, with real shipped-in provenance */}
        <StaggerItem className="h-full">
          <CardShell title="Programming Languages">
            <ul className="flex h-full flex-col justify-between gap-4">
              {groupByTitle("Programming Languages").map((language) => (
                <li key={language}>
                  <p className="font-display text-[18px] font-semibold tracking-tight">
                    {language}
                  </p>
                  {skillUsage[language] && (
                    <p className="mt-0.5 font-mono text-[11px] leading-relaxed text-faint">
                      {skillUsage[language].join(" · ")}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </CardShell>
        </StaggerItem>

        <StaggerItem className="h-full">
          <ChipCard title="Backend" />
        </StaggerItem>

        <StaggerItem className="h-full">
          <ChipCard title="AI Tooling & Models" />
        </StaggerItem>

        <StaggerItem className="h-full">
          <ChipCard title="Infrastructure & DevOps" />
        </StaggerItem>

        {/* The toolbox marquee, full width */}
        <StaggerItem className="sm:col-span-2">
          <div className="pt-3">
            <h3 className="font-mono text-[12px] font-medium uppercase tracking-[0.06em] text-soft">
              The Toolbox
            </h3>
            <p className="mt-1 text-[12.5px] text-faint">
              Hover to pause. Tags with a blue dot above reveal where each
              skill shipped.
            </p>
            <div className="mt-4">
              <TechMarquee />
            </div>
          </div>
        </StaggerItem>
      </Stagger>
    </Section>
  );
}
