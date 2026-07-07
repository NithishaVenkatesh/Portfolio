import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="separator-dashed py-10">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-[13px] text-soft">
          © {new Date().getFullYear()} {site.name}
        </p>
        <nav aria-label="Footer" className="flex items-center gap-4">
          {site.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-[13px] font-medium text-soft transition-colors duration-200 hover:text-ink"
            >
              {social.label}
            </a>
          ))}
          <a
            href={site.resumeUrl}
            download
            className="text-[13px] font-medium text-soft transition-colors duration-200 hover:text-ink"
          >
            Resume
          </a>
        </nav>
      </div>
    </footer>
  );
}
