import { GraduationCap } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion";
import { education } from "@/data/site";

export function EducationSection() {
  return (
    <Section id="education" title="Education">
      <Reveal>
        <article className="flex items-start gap-3.5 rounded-card border border-line bg-card p-5 shadow-(--shadow-card) sm:p-6">
          <span
            aria-hidden
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-soft"
          >
            <GraduationCap size={18} />
          </span>
          <div>
            <h3 className="text-[15px] font-semibold leading-snug">
              {education.degree}
            </h3>
            <p className="mt-0.5 text-[13.5px] text-soft">
              {education.institution}
            </p>
            <p className="mt-1.5 font-mono text-[12.5px] font-medium text-soft">
              {education.score}
            </p>
          </div>
        </article>
      </Reveal>

      {/* TODO: add a Certifications block here once certifications exist in
          src/data/site.ts. The resume currently lists none. */}
    </Section>
  );
}
