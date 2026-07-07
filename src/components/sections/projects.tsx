import { ExternalLink, Github } from "lucide-react";
import { Section } from "@/components/ui/section";
import { ProjectShowcase } from "@/components/project-showcase";
import { Stagger, StaggerItem, Reveal } from "@/components/motion";
import { miniBuilds, projects } from "@/data/site";

export function ProjectsSection() {
  return (
    <Section id="project" title="Selected Projects">
      <Stagger className="flex flex-col gap-5">
        {projects.map((project) => (
          <StaggerItem key={project.title}>
            <ProjectShowcase project={project} />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-10">
        <h3 className="font-mono text-[12.5px] font-medium uppercase tracking-[0.06em] text-faint">
          More Builds
        </h3>
      </Reveal>
      <Stagger className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {miniBuilds.map((build) => (
          <StaggerItem key={build.title} className="h-full">
            <article className="flex h-full flex-col rounded-card border border-line bg-card p-4 shadow-(--shadow-card) transition-shadow duration-300 hover:shadow-(--shadow-lift)">
              <h4 className="font-display text-[14.5px] font-semibold tracking-tight">
                {build.title}
              </h4>
              <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-soft">
                {build.description}
              </p>
              <div className="mt-3 flex items-center gap-3">
                {build.links.map((link) => {
                  const Icon = link.kind === "github" ? Github : ExternalLink;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-soft transition-colors duration-200 hover:text-ink"
                    >
                      <Icon size={12} aria-hidden />
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
