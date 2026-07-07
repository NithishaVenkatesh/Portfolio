/**
 * Single source of truth for all portfolio content.
 * Content is sourced from the resume. Edit here, never inside components.
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

export type Project = {
  title: string;
  tagline: string;
  kind: "Product" | "Project";
  description: string;
  highlights: string[];
  stack: string[];
  links: { label: string; href: string }[];
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
    description:
      "A SaaS platform that evaluates developers by assigning a real, role-specific production bug to fix in their own IDE, capturing full session trajectories (every prompt, edit, command, run) for evidence-based scoring.",
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
    links: [{ label: "Live", href: "https://nexthire-ai.tech" }],
  },
  {
    title: "Athenaeum",
    tagline: "Multi-Agent Learning System",
    kind: "Project",
    description:
      "A red-team-hardened, multi-agent tutoring platform on Microsoft Foundry covering learning-path curation, capacity-aware study planning, citation-grounded tutoring, and graded assessments. Winner of the Microsoft Agent League Hackathon (Student Award).",
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
        label: "GitHub",
        href: "https://github.com/theCodeForgerHQ/msf-reasoning-agent",
      },
    ],
  },
  {
    title: "Nucleus AI",
    tagline: "Enterprise Knowledge Platform",
    kind: "Project",
    description:
      "A multi-service RAG system ingesting structured knowledge from Confluence, delivering citable responses through reliability-first validation layers.",
    highlights: [
      "Built a fault-tolerant ingestion pipeline with staged indexing, webhook-driven updates, retry logic, and idempotent upserts, preventing index corruption during iterative knowledge updates.",
      "Implemented hybrid retrieval (vector search + cross-encoder reranking) with intent-aware filtering, improving retrieval precision while reducing redundant inference calls.",
      "Instrumented stage-level latency decomposition (~7s local end-to-end) across retrieval, reranking, generation, and validation using LangSmith trace pipelines.",
    ],
    stack: ["FastAPI", "Docker", "Confluence", "LangSmith"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/theCodeForgerHQ/Nucleus-AI",
      },
    ],
  },
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
