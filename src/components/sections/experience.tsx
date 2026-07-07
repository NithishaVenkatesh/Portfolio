import { Section } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/motion";
import { experience } from "@/data/site";

export function ExperienceSection() {
  return (
    <Section id="experience" title="Experience">
      <Stagger className="flex flex-col gap-4">
        {experience.map((job) => (
          <StaggerItem key={`${job.company}-${job.role}`}>
            <article className="rounded-card border border-line bg-card p-5 shadow-(--shadow-card) sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <span
                    aria-hidden
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-surface font-mono text-[13px] font-semibold text-ink"
                  >
                    {job.company.slice(0, 2)}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-semibold leading-snug">
                      {job.role}
                    </h3>
                    <p className="text-[13px] text-soft">{job.company}</p>
                  </div>
                </div>
                <p className="shrink-0 pt-0.5 font-mono text-[12.5px] font-medium text-soft">
                  {job.period}
                </p>
              </div>

              <p className="mt-4 text-[14px] leading-relaxed text-soft">
                {job.summary}
              </p>

              <ul className="mt-3 flex flex-col gap-2">
                {job.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-2.5 text-[14px] leading-relaxed text-soft"
                  >
                    <span
                      aria-hidden
                      className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-faint"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
