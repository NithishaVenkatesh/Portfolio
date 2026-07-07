/**
 * Single source of truth for all portfolio content.
 * Sources: resume, plus public assets verified on 2026-07-07 (GitHub READMEs,
 * live product sites, and V1 portfolio media). Edit here, never inside components.
 */

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail" | "phone" | "file";
};

export type Experience = {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
};

export type ProjectMetric = {
  value: string;
  label: string;
};

export type ProjectMedia =
  | { type: "video"; src: string; label: string }
  | {
      type: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
      href?: string;
    };

export type ProjectLink = {
  label: string;
  href: string;
  kind: "live" | "github" | "video" | "docs";
};

export type Project = {
  title: string;
  tagline: string;
  kind: "Product" | "Project";
  period?: string;
  featured?: boolean;
  description: string;
  /** The story: why it exists, and what makes it technically interesting. */
  why: string;
  edge: string;
  metrics: ProjectMetric[];
  /** Linear system flow, rendered as an animated pipeline diagram. */
  architecture?: { label: string; nodes: string[] };
  media?: ProjectMedia;
  highlights: string[];
  stack: string[];
  links: ProjectLink[];
};

export type SkillGroup = {
  title: string;
  skills: string[];
};

export type Tool = {
  name: string;
  /** Path under /public. Omit to render a monogram tile instead. */
  logo?: string;
  url?: string;
};

export type Achievement = {
  title: string;
  detail: string;
  year: string;
};

export type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

export type MiniBuild = {
  title: string;
  description: string;
  links: ProjectLink[];
};

const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/NithishaVenkatesh",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/nithisha-v",
    icon: "linkedin",
  },
  {
    label: "Email",
    href: "mailto:nithishaleni1806@gmail.com",
    icon: "mail",
  },
];

export const site = {
  name: "Nithisha Venkatesh",
  shortName: "Nithisha",
  role: "Applied AI Engineer",
  // TODO: replace with the final production domain once deployed.
  url: "https://nithisha.vercel.app",
  headline:
    "Applied AI Engineer specializing in agentic systems and production-grade RAG.",
  intro:
    "Applied AI Engineer specializing in agentic systems and production-grade RAG, with a backend-first focus on FastAPI, data pipelines, and LLM orchestration (LangGraph, OpenAI Agentic SDK). Built a multi-agent tutoring platform (winner of the Microsoft Skill Fest Student Award) with a hardened safety layer and citation-grounded retrieval, and co-built NextHire AI, a SaaS agentic developer-evaluation product.",
  currentlyBuilding: {
    label: "Currently building NextHire AI",
    href: "https://nexthire-ai.tech",
  },
  email: "nithishaleni1806@gmail.com",
  phone: "+91 6379 074 239",
  resumeUrl: "/resume.pdf",
  socials,
};

export const experience: Experience[] = [
  {
    role: "Artificial Intelligence Engineer",
    company: "iQube",
    period: "June 2024 - Present",
    summary:
      "Designing, developing, and deploying scalable end-to-end AI systems spanning machine learning, deep learning, and generative AI.",
    highlights: [
      "Built production-ready FastAPI-based platforms with RAG pipelines, vector databases, hybrid retrieval, cross-encoder reranking, LLM integration, and robust observability via latency tracing and structured logging.",
      "Architected end-to-end data pipelines for preprocessing, EDA, dimensionality reduction, and model optimization, delivering time-series forecasting, risk classification, and financial analytics models on large-scale datasets for real-world decision-making.",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "NextHire AI",
    tagline: "Dev Evaluation Platform for the Agentic Era",
    kind: "Product",
    featured: true,
    description:
      "A SaaS platform that evaluates developers by assigning a real, role-specific production bug to fix in their own IDE, capturing full session trajectories (every prompt, edit, command, run) for evidence-based scoring.",
    why: "Resume screens and leetcode rounds don't show how engineers actually work with AI tools. NextHire hands candidates a real production bug, in a real codebase, with their own AI tooling, and watches how they reason instead of whether they pass.",
    edge: "The hard part is supply: a containerized GitHub indexer turns open-source repositories into runnable, role-specific bug assignments through multi-gate filtering, Levenshtein-based tech-stack extraction, and CI/CD-based local-runnability checks. Every scorecard band traces back to a specific moment in the candidate's session.",
    metrics: [
      { value: "11", label: "competency clusters scored per candidate" },
      { value: "5 min", label: "from session to full scorecard" },
      { value: "100%", label: "of scores grounded in session evidence" },
    ],
    architecture: {
      label: "Evaluation pipeline",
      nodes: [
        "Job description",
        "GitHub indexer",
        "Multi-gate filtering",
        "Neon Postgres",
        "IDE session capture",
        "Agentic evaluation",
        "Evidence scorecard",
      ],
    },
    media: {
      type: "image",
      src: "/media/nexthire.jpg",
      alt: "NextHire AI landing page: Hire AI-native engineers shipping outcomes",
      width: 1200,
      height: 630,
      href: "https://nexthire-ai.tech",
    },
    highlights: [
      "Engineered a containerized GitHub indexer with a multi-gate filtering pipeline, Levenshtein-based tech-stack extraction, paid-API exclusion, and CI/CD YAML-based local-runnability checks, persisting qualified repositories to Neon Postgres for SQL retrieval against any job description.",
      "Built an evidence-grounded agentic evaluation pipeline generating a per-competency scorecard across 11 clusters, with every score grounded in the candidate's actual session rather than pass/fail signals.",
      "Integrated Groq inference to power a low-latency AI assistant supporting recruiters throughout the hiring workflow.",
    ],
    stack: [
      "Next.js",
      "Convex",
      "Docker",
      "Neon Postgres",
      "OpenAI Agentic SDK",
      "Kimi API",
      "Groq",
    ],
    links: [{ label: "Live", href: "https://nexthire-ai.tech", kind: "live" }],
  },
  {
    title: "Athenaeum",
    tagline: "Multi-Agent Learning System",
    kind: "Project",
    description:
      "A red-team-hardened, multi-agent tutoring platform on Microsoft Foundry covering learning-path curation, capacity-aware study planning, citation-grounded tutoring, and graded assessments. Winner of the Microsoft Agent League Hackathon (Student Award).",
    why: "Built for the Microsoft Agents League Reasoning Agents track on one stance: routing, gating, grounding, and grading are decisions, not prose. They run at temperature 0 and are checked by code, so the model narrates outcomes it cannot fabricate.",
    edge: "Every turn streams through an inspectable reasoning pipeline: the model, tier, latency, confidence, and grounding source are visible per phase instead of hidden behind a chat bubble. The safety gate survived roughly 464 live adversarial runs across two full rounds without a single over-refusal regression.",
    metrics: [
      { value: "232", label: "adversarial cases across 13 batteries" },
      { value: "100%", label: "direct block-rate, 96% converter-sweep" },
      { value: "611", label: "backend tests with an 80% coverage gate" },
      { value: "~29k", label: "lines of application code" },
    ],
    architecture: {
      label: "One turn through the pipeline",
      nodes: [
        "User prompt",
        "5-layer safety gate",
        "Agent router",
        "Foundry IQ grounding",
        "4-tier LLM fallback",
        "Citation re-verify",
        "Streamed SSE trace",
      ],
    },
    highlights: [
      "Designed a 3-node reasoning pipeline (gate → router → answer) streaming 12 typed SSE event types with a phase-by-phase trace exposing model, tier, latency, confidence, and grounding source, making reasoning inspectable rather than hidden in a chat window.",
      "Engineered a 5-layer defense-in-depth safety gate (regex and deterministic heuristics handling 24 homoglyphs, Groq Prompt Guard 2, Azure FAST classifier, Azure RAI filter), validated across 13 adversarial batteries and 232 cases, achieving a 100% direct block-rate and 96% converter-sweep block-rate with zero over-refusal regression.",
      "Built hybrid Foundry IQ grounding (Azure AI Search agentic retrieval plus IDF-gated lexical fallback), Azure AI Evaluation scoring, and a re-dispatch reflection loop ensuring every cited claim is verifiable.",
      "Implemented a 4-tier model fallback chain with per-provider circuit breakers, exponential-backoff retry, and a typed unsafe-vs-unreachable distinction so safety refusals never silently fail open.",
    ],
    stack: [
      "FastAPI",
      "Next.js 16",
      "Python 3.12",
      "Microsoft Foundry",
      "Azure AI Search",
      "Groq",
    ],
    links: [
      {
        label: "Live app",
        href: "https://frontend-eight-red-15.vercel.app",
        kind: "live",
      },
      {
        label: "GitHub",
        href: "https://github.com/theCodeForgerHQ/msf-reasoning-agent",
        kind: "github",
      },
      {
        label: "Demo video",
        href: "https://drive.google.com/drive/folders/1zazruW7PRIStqxByv-luRYTnXf_uCSo5?usp=sharing",
        kind: "video",
      },
      {
        label: "API docs",
        href: "https://athenaeum-backend-thy8.onrender.com/docs",
        kind: "docs",
      },
    ],
  },
  {
    title: "Nucleus AI",
    tagline: "Enterprise Knowledge Platform",
    kind: "Project",
    description:
      "A multi-service RAG system ingesting structured knowledge from Confluence, delivering citable responses through reliability-first validation layers.",
    why: "Internal knowledge rots quietly in Confluence, and an answer nobody can verify is an answer nobody trusts. Nucleus treats retrieval quality, data freshness, and operability as explicit design goals rather than afterthoughts.",
    edge: "Answers are validated, not just generated: candidate chunks are reranked by a cross-encoder, the LLM generates only from provided context, and an NLI service scores contradiction between context and answer before anything is returned. Ingestion computes deltas by content hash, so stale chunks deactivate instead of corrupting the index.",
    metrics: [
      { value: "~7s", label: "local end-to-end query latency" },
      { value: "6", label: "instrumented pipeline stages per query" },
      { value: "3", label: "vector indexes fused at query time" },
    ],
    architecture: {
      label: "Query pipeline",
      nodes: [
        "Confluence ingestion",
        "Neon + Pinecone",
        "Intent router",
        "Hybrid retrieval",
        "Cross-encoder rerank",
        "LLM generation",
        "NLI validation",
        "Cited answer",
      ],
    },
    media: {
      type: "video",
      src: "/media/nucleus-demo.mp4",
      label: "Nucleus AI product demo",
    },
    highlights: [
      "Built a fault-tolerant ingestion pipeline with staged indexing, webhook-driven updates, retry logic, and idempotent upserts, preventing index corruption during iterative knowledge updates.",
      "Implemented hybrid retrieval (vector search + cross-encoder reranking) with intent-aware filtering, improving retrieval precision while reducing redundant inference calls.",
      "Instrumented stage-level latency decomposition (~7s local end-to-end) across retrieval, reranking, generation, and validation using LangSmith trace pipelines, with pipeline telemetry flowing to ClickHouse and Metabase dashboards.",
    ],
    stack: [
      "FastAPI",
      "LangGraph",
      "Pinecone",
      "Docker",
      "ClickHouse",
      "Confluence",
      "LangSmith",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/theCodeForgerHQ/Nucleus-AI",
        kind: "github",
      },
    ],
  },
  {
    title: "AutoDocs",
    tagline: "AI-Powered Documentation Platform",
    kind: "Project",
    description:
      "An AI-powered platform that automatically generates and maintains technical documentation from GitHub repositories, keeping docs updated in real time using webhooks and AI-based content understanding.",
    why: "Documentation goes stale the moment code changes, so most teams simply stop writing it. AutoDocs makes docs a side effect of shipping: connect a repository and structured documentation stays current on its own.",
    edge: "Documentation is generated as ordered chunks persisted to Postgres and rendered as structured HTML, with Clerk-enforced repository ownership checks and webhook-driven regeneration keeping output in sync with the codebase.",
    metrics: [],
    architecture: {
      label: "Docs pipeline",
      nodes: [
        "GitHub repository",
        "Webhook triggers",
        "AI doc generation",
        "Ordered chunks in Postgres",
        "Structured docs UI",
      ],
    },
    media: {
      type: "image",
      src: "/media/autodocs.png",
      alt: "AutoDocs landing page: Because developers love shipping, not writing",
      width: 1496,
      height: 792,
      href: "https://auto-docs-version1.vercel.app",
    },
    highlights: [
      "Built repository management end-to-end: fetching repositories from GitHub, persisting selections to Neon Postgres, and triggering documentation generation workflows per repository.",
      "Rendered documentation from ordered chunk storage with Clerk authentication and per-repository ownership enforcement.",
    ],
    stack: ["Next.js", "Clerk", "Neon Postgres", "GitHub API"],
    links: [
      {
        label: "Live demo",
        href: "https://auto-docs-version1.vercel.app",
        kind: "live",
      },
      {
        label: "GitHub",
        href: "https://github.com/NithishaVenkatesh/AutoDocs_v1",
        kind: "github",
      },
    ],
  },
];

/** Smaller public builds, shown as a compact strip below the main showcases. */
export const miniBuilds: MiniBuild[] = [
  {
    title: "Quirk",
    description:
      "GitHub automation for product teams: turns GitHub activity into real execution across Slack and Asana using a visual workflow builder and typed backend services.",
    links: [
      { label: "Live", href: "https://quirk-v2.vercel.app", kind: "live" },
      {
        label: "GitHub",
        href: "https://github.com/theCodeForgerHQ/Quirk-V3",
        kind: "github",
      },
    ],
  },
  {
    title: "Neuronote",
    description:
      "An AI-native note system that atomizes raw thought dumps into clean, typed notes with semantic embeddings and low-friction retrieval.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/theCodeForgerHQ/Neuronote",
        kind: "github",
      },
    ],
  },
  {
    title: "Glide",
    description:
      "A lightweight macOS menu-bar utility that controls the mouse cursor with hand gestures captured through the built-in webcam.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/theCodeForgerHQ/Glide-MacOS",
        kind: "github",
      },
    ],
  },
];

/** Headline numbers for the "AI systems at a glance" band. All source-verified. */
export const stats: Stat[] = [
  { value: 4, label: "AI products and platforms shipped" },
  { value: 232, label: "adversarial cases hardened against" },
  { value: 611, label: "tests behind a single system" },
  { value: 3, label: "hackathon honors" },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Programming Languages",
    skills: ["Python", "TypeScript", "SQL"],
  },
  {
    title: "AI & LLM Systems",
    skills: [
      "OpenAI Agentic SDK",
      "Claude Agentic SDK",
      "RAG Architecture",
      "Hybrid Retrieval",
      "Vector Search",
      "Embeddings",
      "LLM Evaluation",
      "Guardrails",
      "NLI-based Validation",
      "LangGraph",
    ],
  },
  {
    title: "AI Tooling & Models",
    skills: [
      "Cohere",
      "Pinecone",
      "Milvus",
      "LangSmith",
      "PromptLayer",
      "HuggingFace",
      "TensorFlow",
      "PyTorch",
    ],
  },
  {
    title: "Backend",
    skills: [
      "FastAPI",
      "REST APIs",
      "PostgreSQL (Neon)",
      "Drizzle ORM",
      "ClickHouse",
      "Caching",
    ],
  },
  {
    title: "Infrastructure & DevOps",
    skills: ["Docker", "Vercel", "n8n", "Observability (Metabase)"],
  },
];

/**
 * Where each skill has actually shipped. Rendered as a hover/focus popover on
 * skill tags. Only skills with a verifiable project mapping appear here.
 */
export const skillUsage: Record<string, string[]> = {
  Python: ["Athenaeum", "Nucleus AI", "iQube"],
  TypeScript: ["NextHire AI", "AutoDocs", "Athenaeum"],
  SQL: ["NextHire AI", "Nucleus AI"],
  "OpenAI Agentic SDK": ["NextHire AI"],
  "RAG Architecture": ["Nucleus AI", "Athenaeum", "iQube"],
  "Hybrid Retrieval": ["Nucleus AI", "Athenaeum", "iQube"],
  "Vector Search": ["Nucleus AI", "iQube"],
  "LLM Evaluation": ["Athenaeum", "NextHire AI"],
  Guardrails: ["Athenaeum", "Nucleus AI"],
  "NLI-based Validation": ["Nucleus AI"],
  LangGraph: ["Nucleus AI"],
  Pinecone: ["Nucleus AI"],
  LangSmith: ["Nucleus AI"],
  FastAPI: ["Athenaeum", "Nucleus AI", "iQube"],
  "PostgreSQL (Neon)": ["NextHire AI", "AutoDocs", "Nucleus AI"],
  ClickHouse: ["Nucleus AI"],
  Docker: ["NextHire AI", "Nucleus AI"],
  Vercel: ["NextHire AI", "AutoDocs", "Athenaeum"],
  "Observability (Metabase)": ["Nucleus AI"],
};

/** Logo tiles for the "TECH stacks" grid, carried over from the V1 site's visual identity. */
export const tools: Tool[] = [
  { name: "Python", logo: "/tech/python.jpg", url: "https://www.python.org/" },
  {
    name: "TypeScript",
    logo: "/tech/typescript.webp",
    url: "https://www.typescriptlang.org/",
  },
  {
    name: "FastAPI",
    logo: "/tech/fastapi.png",
    url: "https://fastapi.tiangolo.com/",
  },
  { name: "Next.js", logo: "/tech/nextjs.jpg", url: "https://nextjs.org/" },
  { name: "React", logo: "/tech/react.png", url: "https://react.dev/" },
  {
    name: "LangGraph",
    logo: "/tech/langgraph.png",
    url: "https://www.langchain.com/langgraph",
  },
  {
    name: "LangChain",
    logo: "/tech/langchain.png",
    url: "https://www.langchain.com/",
  },
  {
    name: "LangSmith",
    logo: "/tech/langsmith.png",
    url: "https://smith.langchain.com/",
  },
  {
    name: "Hugging Face",
    logo: "/tech/hugging-face.jpg",
    url: "https://huggingface.co/",
  },
  {
    name: "TensorFlow",
    logo: "/tech/tensorflow.webp",
    url: "https://www.tensorflow.org/",
  },
  { name: "PyTorch", logo: "/tech/pytorch.png", url: "https://pytorch.org/" },
  {
    name: "Scikit-learn",
    logo: "/tech/scikit-learn.jpg",
    url: "https://scikit-learn.org/",
  },
  { name: "Groq", logo: "/tech/groq.png", url: "https://groq.com/" },
  { name: "Cohere", url: "https://cohere.com/" },
  {
    name: "Pinecone",
    logo: "/tech/pinecone.png",
    url: "https://www.pinecone.io/",
  },
  { name: "Milvus", logo: "/tech/milvus.png", url: "https://milvus.io/" },
  {
    name: "PromptLayer",
    logo: "/tech/promptlayer.jpg",
    url: "https://www.promptlayer.com/",
  },
  {
    name: "Guardrails",
    logo: "/tech/guardrails.png",
    url: "https://www.guardrailsai.com/",
  },
  { name: "Neon", logo: "/tech/neon.png", url: "https://neon.tech/" },
  {
    name: "Drizzle",
    logo: "/tech/drizzle.png",
    url: "https://orm.drizzle.team/",
  },
  {
    name: "ClickHouse",
    logo: "/tech/clickhouse.png",
    url: "https://clickhouse.com/",
  },
  { name: "Docker", logo: "/tech/docker.png", url: "https://www.docker.com/" },
  { name: "Vercel", logo: "/tech/vercel.png", url: "https://vercel.com/" },
  { name: "n8n", logo: "/tech/n8n.png", url: "https://n8n.io/" },
  { name: "Metabase", url: "https://www.metabase.com/" },
  { name: "Git", logo: "/tech/git.png", url: "https://git-scm.com/" },
];

export const achievements: Achievement[] = [
  {
    title: "Winner, Microsoft Agent League Hackathon",
    detail: "Student Award, Project Athenaeum",
    year: "2026",
  },
  {
    title: "Achiever's Award, NIDAR",
    detail: "National Innovation Challenge for Drone Application & Research",
    year: "2026",
  },
  {
    title: "Finalist, Zoho Creator Hackathon",
    detail: "Zoho Corporation",
    year: "2025",
  },
];

export const education = {
  degree: "B.Tech, Artificial Intelligence & Data Science",
  institution: "Kumaraguru College of Technology",
  score: "CGPA 8.2",
  // TODO: add graduation year if it should be displayed (not on the resume).
};

// TODO: the resume lists no certifications. Add entries here (and a
// Certifications section on the page) when there are certifications to show.
export const certifications: { title: string; issuer: string; year: string }[] =
  [];
