import { Navbar } from "@/components/navbar";
import { BackToTop } from "@/components/back-to-top";
import { CommandPalette } from "@/components/command-palette";
import { ResumeViewer } from "@/components/resume-viewer";
import { ScrollProgress } from "@/components/scroll-progress";
import { Hero } from "@/components/sections/hero";
import { GlanceSection } from "@/components/sections/glance";
import { ExperienceSection } from "@/components/sections/experience";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";
import { AchievementsSection } from "@/components/sections/achievements";
import { EducationSection } from "@/components/sections/education";
import { ContactSection } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { site, skillGroups } from "@/data/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  url: site.url,
  sameAs: site.socials
    .map((social) => social.href)
    .filter((href) => href.startsWith("http")),
  knowsAbout: skillGroups.flatMap((group) => group.skills),
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Kumaraguru College of Technology",
  },
};

export default function Home() {
  return (
    <>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <main className="mx-auto w-full max-w-[680px] px-5 sm:px-8">
        <Hero />
        <GlanceSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <AchievementsSection />
        <EducationSection />
        <ContactSection />
        <Footer />
      </main>
      <BackToTop />
      <CommandPalette />
      <ResumeViewer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </>
  );
}
