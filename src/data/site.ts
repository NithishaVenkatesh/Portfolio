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
  period: string;
  /** Path under /public. Omit to render a monogram node instead. */
  logo?: string;
  current?: boolean;
  description: string;
  highlights: string[];
  /** Focus-area chips rendered under the entry. */
  focus: string[];
};

export type ProjectMetric = {
  value: string;
  label: string;
};

export type ProjectMedia =
  | {
      type: "video";
      src: string;
      label: string;
      startAt?: number;
      playbackRate?: number;
    }
  | { type: "youtube"; id: string; title: string; poster: string }
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
  /** Award or honor, rendered as a trophy badge on the card. */
  award?: string;
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
  /** Path under /public. Omit to render a trophy icon instead. */
  logo?: string;
};

export type Stat = {
  value: number;
  suffix?: string;
  label: string;
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
    "Applied AI Engineer with 2+ years shipping production AI systems: won the Microsoft Skill Fest Student Award (2026) for a red-team-hardened multi-agent platform that held a 100% block-rate across 232 adversarial cases, and co-built NextHire AI, a SaaS product that evaluates developers on evidence from real debugging sessions. Core strengths: agentic systems, production-grade RAG, hybrid retrieval, LLM evaluation and guardrails, and observability-first backends in Python, FastAPI, and TypeScript.",
  /** Phrase inside `intro` rendered with award styling in the hero. */
  introHighlight: "won the Microsoft Skill Fest Student Award (2026)",
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
    logo: "/companies/iqube.png",
    current: true,
    description:
      "Designing, developing, and deploying scalable end-to-end AI systems spanning machine learning, deep learning, and generative AI, translating complex R&D into production platforms with a strong focus on scalability, reliability, and real-world integration.",
    highlights: [
      "Built production-ready FastAPI-based platforms with RAG pipelines, vector databases, hybrid retrieval, cross-encoder reranking, LLM integration, and robust observability via latency tracing and structured logging.",
      "Architected end-to-end data pipelines for preprocessing, EDA, dimensionality reduction, and model optimization, delivering time-series forecasting, risk classification, and financial analytics models on large-scale datasets for real-world decision-making.",
    ],
    focus: [
      "Generative AI",
      "RAG Pipelines",
      "Hybrid Retrieval",
      "LLM Integration",
      "Time-series Forecasting",
      "Risk Classification",
      "Observability",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "Athenaeum",
    tagline: "Multi-Agent Learning System",
    kind: "Project",
    featured: true,
    award: "Winner · Microsoft Skill Fest Hackathon",
    description:
      "A red-team-hardened, multi-agent tutoring platform on Microsoft Foundry covering learning-path curation, capacity-aware study planning, citation-grounded tutoring, and graded assessments.",
    why: "Built for the Microsoft hackathon's Reasoning Agents track on one stance: routing, gating, grounding, and grading are decisions, not prose. They run at temperature 0 and are checked by code, so the model narrates outcomes it cannot fabricate.",
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
    media: {
      type: "video",
      src: "/media/athenaeum-demo.mp4",
      label: "Athenaeum product demo",
      // The demo opens on a ~15s static intro; start the preview at the action.
      startAt: 18,
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
        href: "https://www.youtube.com/watch?v=JJABHMgUSmg",
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
    title: "NextHire AI",
    tagline: "Dev Evaluation Platform for the Agentic Era",
    kind: "Product",
    description:
      "A SaaS platform that evaluates developers by assigning a real, role-specific production bug to fix in their own IDE, capturing full session trajectories (every prompt, edit, command, run) for evidence-based scoring.",
    why: "Resume screens and leetcode rounds don't show how engineers actually work with AI tools. NextHire hands candidates a real production bug, in a real codebase, with their own AI tooling, and watches how they reason instead of whether they pass.",
    edge: "The hard part is supply: a containerized GitHub indexer turns open-source repositories into runnable, role-specific bug assignments through multi-gate filtering, Levenshtein-based tech-stack extraction, and CI/CD-based local-runnability checks. Every scorecard band traces back to a specific moment in the candidate's session.",
    metrics: [
      { value: "11", label: "competency clusters scored per candidate" },
      { value: "5-min", label: "scorecard for every session" },
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
      { value: "3", label: "vector indexes: pages, chunks, images" },
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
    title: "Grappy",
    tagline: "Governed, Auditable AI Bug-Fix Workflow",
    kind: "Project",
    description:
      'A **governed, human-gated bug-fix workflow** for Python maintainers, built as a Lemma pod with a Vite/React app for the Gappy AI "Ship to Get Hired" hackathon. Coding agents can already write patches; Grappy makes **the trust layer the product**.',
    why: 'The maintainer\'s harder question is not "can an agent write a patch" but **"can I trust this patch enough to let it enter my repository."** Grappy **reproduces the bug with a real failing pytest run before writing code**, fixes against that maintainer-approved oracle, and only opens a pull request after **explicit human approval**.',
    edge: "Every step lands in an **append-only audit log**: RED reproduction, **fault localization from real execution evidence**, the **RED-to-GREEN flip**, nearby regression checks, and a second opinion from a Lemma Agent reviewer. The **pull request body is the evidence trail**, so the run can be inspected later without asking the model to explain itself.",
    metrics: [
      { value: "RED→GREEN", label: "every fix proven against a failing test" },
      { value: "100%", label: "of steps recorded in an append-only audit log" },
      { value: "2", label: "reviews before any PR: agent + human" },
    ],
    architecture: {
      label: "One change run",
      nodes: [
        "Bug report",
        "RED pytest reproduction",
        "Fault localization",
        "Patch against oracle",
        "Regression sweep",
        "Agent review",
        "Human approval",
        "Evidence-trail PR",
      ],
    },
    media: {
      type: "video",
      src: "/media/grappy-demo.mp4",
      label: "Grappy AI demo for the Gappy AI Ship to Get Hired hackathon",
      // Static title screens until ~48s; start the preview at the walkthrough.
      startAt: 48,
      playbackRate: 3,
    },
    highlights: [
      "Built the full workflow as a **Lemma pod (Python 3.14)** with a Vite/React 19 frontend, using the **Lemma SDK** for workflow orchestration, agent review, and GitHub connectivity.",
      "Enforced **reproduce-before-write**: the agent must produce a **maintainer-approved failing pytest run** before it is allowed to touch code, eliminating patches that fix the wrong bug.",
      "Recorded every workflow step to an **append-only audit log with replay support**, making each AI-generated change reproducible, inspectable, and independently validated.",
      "Gated PR creation behind **explicit human approval**, keeping the maintainer in control while delegating the mechanical repair loop.",
    ],
    stack: ["Lemma SDK", "Python 3.14", "pytest", "Vite", "React 19"],
    links: [
      {
        label: "Live",
        href: "https://grappy-app.apps.lemma.work/",
        kind: "live",
      },
      {
        label: "GitHub",
        href: "https://github.com/theCodeForgerHQ/Gappy",
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

/** Logo chips for "The Toolbox" marquee. */
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
    title: "Winner, Microsoft Skill Fest Hackathon",
    detail: "Student Award, Project Athenaeum",
    year: "2026",
    logo: "/microsoft.svg",
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
    logo: "/logos/zoho.png",
  },
];

export const education = {
  degree: "B.Tech, Artificial Intelligence & Data Science",
  institution: "Kumaraguru College of Technology",
  score: "CGPA 8.2",
  logo: "/logos/kct.png",
  // TODO: add graduation year if it should be displayed (not on the resume).
};

// TODO: the resume lists no certifications. Add entries here (and a
// Certifications section on the page) when there are certifications to show.
export const certifications: { title: string; issuer: string; year: string }[] =
  [];
