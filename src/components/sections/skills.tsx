import { TechMarquee } from "@/components/tech-marquee";
import { Reveal } from "@/components/motion";

/** The Toolbox: a centered heading and two counter-scrolling logo rows. */
export function SkillsSection() {
  return (
    <section
      id="stacks-skills"
      aria-label="The Toolbox"
      className="separator-dashed py-14 sm:py-16"
    >
      <Reveal>
        <h2 className="text-center font-mono text-[15px] font-semibold tracking-[0.02em] text-ink">
          The Toolbox
        </h2>
      </Reveal>
      <div className="mt-8">
        <Reveal>
          <TechMarquee />
        </Reveal>
      </div>
    </section>
  );
}
