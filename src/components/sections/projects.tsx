import { ExternalLink, Github } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { Stagger, StaggerItem, HoverLift } from "@/components/motion";
import { projects, type Project } from "@/data/site";

function ProjectLinks({ links }: { links: Project["links"] }) {
  return (
    <div className="flex items-center gap-2">
      {links.map((link) => {
        const isGithub = link.href.includes("github.com");
        const Icon = isGithub ? Github : ExternalLink;
        return (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-card px-3 py-1.5 text-[12.5px] font-medium text-ink transition-colors duration-200 hover:bg-surface"
          >
            <Icon size={13} aria-hidden />
            {link.label}
          </a>
        );
      })}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <HoverLift>
      <article className="rounded-card border border-line bg-card p-5 shadow-(--shadow-card) transition-shadow duration-300 hover:shadow-(--shadow-lift) sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-[17px] font-semibold leading-snug tracking-tight">
              {project.title}
            </h3>
            <p className="mt-0.5 font-display text-[13.5px] text-soft">
              {project.tagline}
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[11px] font-medium leading-none text-soft">
            {project.kind}
          </span>
        </div>

        <p className="mt-4 text-[14px] leading-relaxed text-soft">
          {project.description}
        </p>

        <ul className="mt-3 flex flex-col gap-2">
          {project.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex gap-2.5 text-[13.5px] leading-relaxed text-soft"
            >
              <span
                aria-hidden
                className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-faint"
              />
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.stack.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>

        <div className="mt-5">
          <ProjectLinks links={project.links} />
        </div>
      </article>
    </HoverLift>
  );
}

export function ProjectsSection() {
  return (
    <Section id="project" title="Selected Projects">
      <Stagger className="flex flex-col gap-5">
        {projects.map((project) => (
          <StaggerItem key={project.title}>
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
