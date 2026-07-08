import { Mail, Phone, Github, Linkedin } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion";
import { CopyEmail } from "@/components/copy-email";
import { site } from "@/data/site";

export function ContactSection() {
  return (
    <Section id="contact" title="Contact">
      <Reveal>
        <div className="rounded-card border border-line bg-surface p-6 sm:p-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/8 px-3 py-1.5 font-mono text-[11px] font-medium text-emerald-700">
            <span className="relative flex h-1.5 w-1.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            {site.availability}
          </div>
          <h3 className="font-display text-[18px] font-semibold tracking-tight">
            Sound relevant? Let&apos;s talk.
          </h3>
          <p className="mt-2 max-w-prose text-[14px] leading-relaxed text-soft">
            I&apos;m looking for my next role building AI systems that ship. If
            the work here feels relevant to what your team is building, I&apos;d
            love to hear from you. Email is the fastest way, and I read
            everything.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-[13.5px] font-medium text-white transition-opacity duration-200 hover:opacity-90"
            >
              <Mail size={14} aria-hidden />
              {site.email}
            </a>
            <CopyEmail />
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-card px-4 py-2 text-[13.5px] font-medium text-ink transition-colors duration-200 hover:bg-surface"
            >
              <Phone size={14} aria-hidden />
              {site.phone}
            </a>
          </div>

          <div className="mt-5 flex items-center gap-4">
            <a
              href="https://github.com/NithishaVenkatesh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-soft transition-colors duration-200 hover:text-ink"
            >
              <Github size={14} aria-hidden />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/nithisha-v"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-soft transition-colors duration-200 hover:text-ink"
            >
              <Linkedin size={14} aria-hidden />
              LinkedIn
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
