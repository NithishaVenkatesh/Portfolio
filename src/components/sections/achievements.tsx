import Image from "next/image";
import { Trophy } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/motion";
import { achievements } from "@/data/site";

export function AchievementsSection() {
  return (
    <Section id="achievements" title="Achievements">
      <Stagger className="flex flex-col gap-3">
        {achievements.map((achievement) => (
          <StaggerItem key={achievement.title}>
            <article className="flex items-start gap-3.5 rounded-card border border-line bg-card p-4 shadow-(--shadow-card) sm:p-5">
              <span
                aria-hidden
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-soft"
              >
                {achievement.title.includes("Microsoft") ? (
                  <Image
                    src="/microsoft.svg"
                    alt=""
                    width={15}
                    height={15}
                    className="h-[15px] w-[15px]"
                  />
                ) : (
                  <Trophy size={15} />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[14px] font-semibold leading-snug">
                    {achievement.title}
                  </h3>
                  <span className="shrink-0 font-mono text-[12px] font-medium text-soft">
                    {achievement.year}
                  </span>
                </div>
                <p className="mt-0.5 text-[13px] leading-relaxed text-soft">
                  {achievement.detail}
                </p>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
