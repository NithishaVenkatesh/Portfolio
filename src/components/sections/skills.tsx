import Image from "next/image";
import { Section } from "@/components/ui/section";
import { SkillTag } from "@/components/skill-tag";
import { Stagger, StaggerItem, HoverLift } from "@/components/motion";
import { skillGroups, tools, type Tool } from "@/data/site";

function ToolTile({ tool }: { tool: Tool }) {
  const inner = (
    <HoverLift className="h-full">
      <div className="flex h-full flex-col items-center gap-2.5 rounded-card border border-line bg-card p-4 shadow-(--shadow-card) transition-shadow duration-300 hover:shadow-(--shadow-lift)">
        {tool.logo ? (
          <Image
            src={tool.logo}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-[10px] object-contain"
          />
        ) : (
          <span
            aria-hidden
            className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-line bg-surface font-mono text-[15px] font-semibold text-soft"
          >
            {tool.name.charAt(0).toUpperCase()}
          </span>
        )}
        <span className="text-center text-[12px] font-medium leading-tight text-soft">
          {tool.name}
        </span>
      </div>
    </HoverLift>
  );

  if (!tool.url) return inner;

  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={tool.name}
      className="block h-full"
    >
      {inner}
    </a>
  );
}

export function SkillsSection() {
  return (
    <Section id="stacks-skills" title="Stack & Skills">
      <Stagger className="flex flex-col gap-6">
        {skillGroups.map((group) => (
          <StaggerItem key={group.title}>
            <h3 className="font-mono text-[12.5px] font-medium uppercase tracking-[0.06em] text-faint">
              {group.title}
            </h3>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <SkillTag key={skill} skill={skill} />
              ))}
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-12">
        <h3 className="font-mono text-[12.5px] font-medium uppercase tracking-[0.06em] text-faint">
          Tech Stacks
        </h3>
        <Stagger className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {tools.map((tool) => (
            <StaggerItem key={tool.name} className="h-full">
              <ToolTile tool={tool} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
