import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion";
import { education } from "@/data/site";

export function EducationSection() {
  return (
    <Section id="education" title="Education">
      <Reveal>
        <article className="flex items-start gap-3.5 rounded-card border border-line bg-card p-5 shadow-(--shadow-card) sm:p-6">
          <Image
            src={education.logo}
            alt={`${education.institution} logo`}
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 rounded-full border border-line bg-card object-contain shadow-(--shadow-card)"
          />
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
