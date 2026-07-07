import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion";

/**
 * Section shell: mono heading (V1's "Selected Projects" / "TECH stacks"
 * treatment) above the content, with the dashed hairline separator on top.
 */
export function Section({
  id,
  title,
  children,
  className,
  separator = true,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  separator?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("py-14 sm:py-16", separator && "separator-dashed", className)}
      aria-label={title}
    >
      <Reveal>
        <h2 className="font-mono text-[15px] font-semibold tracking-[0.02em] text-ink">
          {title}
        </h2>
      </Reveal>
      <div className="mt-8">{children}</div>
    </section>
  );
}
