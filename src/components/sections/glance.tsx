import { Section } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/motion";
import { CountUp } from "@/components/count-up";
import { stats } from "@/data/site";

/** Headline numbers, each verified against public repos and product pages. */
export function GlanceSection() {
  return (
    <Section id="glance" title="AI Systems at a Glance">
      <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat) => (
          <StaggerItem key={stat.label} className="h-full">
            <div className="flex h-full flex-col rounded-card border border-line bg-card p-4 shadow-(--shadow-card)">
              <CountUp
                value={stat.value}
                suffix={stat.suffix}
                className="font-mono text-[24px] font-semibold leading-none text-ink"
              />
              <p className="mt-2 text-[12.5px] leading-snug text-soft">
                {stat.label}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
