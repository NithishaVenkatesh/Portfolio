import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/motion";
import { Tag } from "@/components/ui/tag";
import { experience } from "@/data/site";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  return (
    <Section id="experience" title="Experience">
      <Stagger className="flex flex-col gap-4">
        {experience.map((job) => (
          <StaggerItem key={`${job.company}-${job.role}`}>
            <article className="rounded-card border border-line bg-card p-5 shadow-(--shadow-card) sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative shrink-0">
                    {job.logo ? (
                      <Image
                        src={job.logo}
                        alt={`${job.company} logo`}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full border border-line bg-card object-contain p-0.5 shadow-(--shadow-card)"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface font-mono text-[13px] font-semibold text-ink"
                      >
                        {job.company.slice(0, 2)}
                      </span>
                    )}
                    {job.current && (
                      <span
                        className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-card"
                        title="Current role"
                      >
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                        </span>
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold leading-snug">
                      {job.role}
                    </h3>
                    <p className="text-[13.5px] text-soft">{job.company}</p>
                  </div>
                </div>
                <p
                  className={cn(
                    "shrink-0 pt-0.5 font-mono text-[12px] font-medium",
                    job.current ? "text-accent" : "text-soft",
                  )}
                >
                  {job.period}
                </p>
              </div>

              <p className="mt-4 text-[14px] leading-relaxed text-soft">
                {job.description}
              </p>

              {job.highlights.length > 0 && (
                <div className="mt-4 rounded-[13px] border border-line bg-surface p-4">
                  <h4 className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-faint">
                    Impact
                  </h4>
                  <ul className="mt-2.5 flex flex-col gap-2.5">
                    {job.highlights.map((highlight) => (
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
                </div>
              )}

              {job.focus.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-faint">
                    Focus areas
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {job.focus.map((area) => (
                      <Tag key={area}>{area}</Tag>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
