import { cn } from "@/lib/utils";

/** Small pill for tech-stack and skill labels. */
export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-surface px-2.5 py-1 text-[12px] font-medium leading-none text-soft",
        className,
      )}
    >
      {children}
    </span>
  );
}
