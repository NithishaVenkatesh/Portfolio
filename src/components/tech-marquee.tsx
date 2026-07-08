import Image from "next/image";
import { tools, type Tool } from "@/data/site";

function ToolChip({ tool }: { tool: Tool }) {
  const chip = (
    <span className="flex items-center gap-2 rounded-full border border-line bg-card py-1.5 pl-1.5 pr-3.5 shadow-(--shadow-card) transition-colors duration-200 hover:border-line-strong">
      {tool.logo ? (
        <Image
          src={tool.logo}
          alt=""
          width={22}
          height={22}
          className="h-[22px] w-[22px] rounded-full object-contain grayscale transition-[filter] duration-300 group-hover/chip:grayscale-0"
        />
      ) : (
        <span
          aria-hidden
          className="flex h-[22px] w-[22px] items-center justify-center rounded-full border border-line bg-surface font-mono text-[10px] font-semibold text-soft"
        >
          {tool.name.charAt(0).toUpperCase()}
        </span>
      )}
      <span className="whitespace-nowrap font-mono text-[12px] font-medium text-soft">
        {tool.name}
      </span>
    </span>
  );

  if (!tool.url) return <span className="group/chip">{chip}</span>;

  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={tool.name}
      tabIndex={-1}
      className="group/chip"
    >
      {chip}
    </a>
  );
}

function MarqueeRow({ items, reverse }: { items: Tool[]; reverse?: boolean }) {
  return (
    <div className="marquee overflow-hidden">
      <div
        className={`marquee-track flex gap-2.5 pr-2.5 ${reverse ? "marquee-reverse" : ""}`}
      >
        {/* List rendered twice for a seamless loop; the copy is aria-hidden. */}
        {[false, true].map((isCopy) => (
          <div
            key={String(isCopy)}
            aria-hidden={isCopy || undefined}
            className="flex shrink-0 gap-2.5"
          >
            {items.map((tool) => (
              <ToolChip key={tool.name} tool={tool} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * The toolbox as two counter-scrolling logo rows. Pauses on hover;
 * degrades to a scrollable strip when reduced motion is preferred.
 */
export function TechMarquee() {
  const midpoint = Math.ceil(tools.length / 2);
  const rowA = tools.slice(0, midpoint);
  const rowB = tools.slice(midpoint);

  return (
    <div
      role="list"
      aria-label="Technologies"
      className="relative flex flex-col gap-2.5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      <MarqueeRow items={rowA} />
      <MarqueeRow items={rowB} reverse />
    </div>
  );
}
