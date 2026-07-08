import {
  Boxes,
  BrainCircuit,
  Code2,
  Container,
  Server,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { TechMarquee } from "@/components/tech-marquee";
import { Stagger, StaggerItem } from "@/components/motion";
import { skillGroups } from "@/data/site";

const GROUP_ICONS: Record<string, LucideIcon> = {
  "Programming Languages": Code2,
  "AI & LLM Systems": BrainCircuit,
  "AI Tooling & Models": Boxes,
  Backend: Server,
  "Infrastructure & DevOps": Container,
};

/**
 * One glance, no decoration: labeled rows of skills, then the toolbox
 * as a scrolling logo marquee.
 */
export function SkillsSection() {
  return (
    <Section id="stacks-skills" title="Stack & Skills">
      <Stagger className="rounded-card border border-line bg-card px-5 shadow-(--shadow-card) sm:px-6">
        {skillGroups.map((group, index) => {
          const Icon = GROUP_ICONS[group.title];
          return (
            <StaggerItem key={group.title}>
              <div
                className={`flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:gap-6 ${
                  index > 0 ? "separator-dashed" : ""
                }`}
              >
                <h3 className="flex shrink-0 items-center gap-2 font-mono text-[11.5px] font-medium uppercase tracking-[0.06em] text-soft sm:w-44">
                  {Icon && (
                    <Icon size={13} aria-hidden className="text-faint" />
                  )}
                  {group.title}
                </h3>
                <p className="text-[14px] leading-[1.9] text-ink">
                  {group.skills.map((skill, skillIndex) => (
                    <span key={skill} className="whitespace-nowrap">
                      {skill}
                      {skillIndex < group.skills.length - 1 && (
                        <span aria-hidden className="mx-2 text-faint">
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>

      <div className="mt-8">
        <TechMarquee />
      </div>
    </Section>
  );
}
