import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/motion";
import { experience } from "@/data/site";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  return (
    <Section id="experience" title="Experience">
      <Stagger className="relative flex flex-col">
        {/* Timeline rail, aligned to the center of the logo nodes. */}
        <span
          aria-hidden
          className="absolute bottom-6 left-[22px] top-6 w-px bg-line"
        />

        {experience.map((job, index) => (
          <StaggerItem key={`${job.company}-${job.role}`}>
            <article
              className={cn(
                "relative flex gap-4 pl-0",
                index < experience.length - 1 && "pb-8",
              )}
            >
              <div className="relative z-10 shrink-0">
                {job.logo ? (
                  <Image
                    src={job.logo}
                    alt={`${job.company} logo`}
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full border border-line bg-card object-contain p-0.5 shadow-(--shadow-card)"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface font-mono text-[13px] font-semibold text-ink"
                  >
                    {job.company.slice(0, 2)}
                  </span>
                )}
                {job.current && (
                  <span
                    className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-card"
                    title="Current role"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                    </span>
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                  <h3 className="text-[15px] font-semibold leading-snug">
                    {job.role}
                  </h3>
                  <p
                    className={cn(
                      "shrink-0 font-mono text-[12px] font-medium",
                      job.current ? "text-accent" : "text-soft",
                    )}
                  >
                    {job.period}
                  </p>
                </div>
                <p className="text-[13.5px] text-soft">{job.company}</p>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-soft">
                  {job.description}
                </p>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
