"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/section";
import { ProjectCard } from "@/components/projects/card";
import { ProjectDetail } from "@/components/projects/detail";
import { Stagger, StaggerItem } from "@/components/motion";
import { projects } from "@/data/site";
import { projectSlug } from "@/lib/utils";

/**
 * Preview grid + case-study overlay. The open project is reflected in the
 * URL hash (#nexthire-ai), so browser back closes the case study and a
 * shared link opens it directly.
 */
export function ProjectsSection() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    const syncFromHash = () => {
      const slug = window.location.hash.replace(/^#/, "");
      const match = projects.find((p) => projectSlug(p.title) === slug);
      setActiveSlug(match ? slug : null);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const close = useCallback(() => {
    // Replace the #slug entry so back doesn't reopen the case study.
    history.replaceState(null, "", window.location.pathname + window.location.search);
    setActiveSlug(null);
  }, []);

  const activeIndex = projects.findIndex(
    (p) => projectSlug(p.title) === activeSlug,
  );
  const activeProject = activeIndex >= 0 ? projects[activeIndex] : null;
  const nextProject = projects[(activeIndex + 1) % projects.length];

  return (
    <Section id="project" title="Selected Projects">
      <Stagger className="flex flex-col gap-5">
        {projects.map((project) => (
          <StaggerItem key={project.title} className="h-full">
            <ProjectCard
              project={project}
              onOpen={() => {
                window.location.hash = projectSlug(project.title);
              }}
            />
          </StaggerItem>
        ))}
      </Stagger>

      <AnimatePresence>
        {activeProject && (
          <ProjectDetail
            key={activeProject.title}
            project={activeProject}
            nextProject={nextProject}
            onClose={close}
            onNext={() => {
              window.location.hash = projectSlug(nextProject.title);
            }}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}
