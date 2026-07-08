import { Section } from "@/components/ui/section";
import { ProjectShowcase } from "@/components/project-showcase";
import { Stagger, StaggerItem } from "@/components/motion";
import { projects } from "@/data/site";

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
    </Section>
  );
}
