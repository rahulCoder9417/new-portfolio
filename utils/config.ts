import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export type Project = {
  title: string;
  /** Route segment under /projects when the project has a detail page. */
  slug?: string;
  year?: string;
  category: string;
  /** One or two sentences for the project list. */
  summary: string;
  /** Longer intro for the detail page. */
  description?: string;
  status?: string;
  imageUrl?: string;
  githubRepo?: string;
  liveUrl?: string;
  liveLabel?: string;
  highlights?: string[];
  tags: string[];
};

const textcrew: Project = {
  title: "Textcrew",
  slug: "Textcrew",
  year: "2026",
  category: "Personal AI agent platform",
  status: "Live",
  summary:
    "A personal AI agent you text on Telegram or the web app. A lead agent splits each job and calls in specialist agents for code, pull request reviews and research. Each user's agent runs in its own gVisor sandbox. I designed the system and built the backend and the Go container manager.",
  description:
    "Textcrew is a messaging-first personal assistant, live on the web and Telegram. Each user texts Tex, their own AI agent. Tex splits the job into steps and calls in specialists when they fit: Byte writes code, Patch reviews pull requests and Scout searches the web. The crew works in the user's apps (Gmail, GitHub, Google Calendar, Google Docs and more), asks before anything risky, runs automations, and is billed in credits, or users bring their own Claude plan or API key.\n\nI did the system design and backend engineering: the architecture, the API contract, the backend (api + worker) and the Go service that manages every user's container.",
  imageUrl: "/Textcrew-Main.jpg",
  liveUrl: "https://textcrew.in",
  liveLabel: "textcrew.in",
  tags: ["TypeScript", "Go", "gRPC", "MCP", "BullMQ", "gVisor"],
};

const devsync: Project = {
  title: "DevSync",
  slug: "DevSync",
  year: "2025",
  category: "Collaborative cloud IDE",
  summary:
    "A browser IDE where up to 15 people edit the same repository at once. Each room gets its own Docker container with a shared terminal, live preview and GUI app support.",
  description:
    "DevSync lets a team open the same project in the browser and work on it together. Edits, cursors and selections sync through Yjs CRDTs over WebSockets, and every room runs in its own Docker container, so the terminal, dev servers and even Tkinter apps behave like they would on a local machine. Project state is saved, so a room can be picked up again later.",
  imageUrl: "/DevSync-Main.png",
  githubRepo: "dev-sync",
  highlights: [
    "Up to 15 people editing the same repository at once through Yjs CRDTs over WebSockets, with cursor and selection sync.",
    "Collaboration (WebSocket, CRDT sync, presence) runs as its own service, separate from persistence and code execution, so each part scales on its own.",
    "A Docker execution backend with isolated disk per room that runs React and Express apps and GUI apps (Tkinter), exposed through a reverse proxy.",
    "Team chat next to the editor on the same connection.",
  ],
  tags: ["Next.js", "Yjs", "WebSocket", "Docker", "Express", "Prisma", "Xvfb"],
};

const goredis: Project = {
  title: "GoRedis",
  slug: "GoRedis",
  year: "2026",
  category: "Redis-compatible database, written from scratch",
  summary:
    "A Redis-compatible server in Go. The official redis-cli and client libraries connect to it unchanged. Covers strings with TTL, lists, streams, sorted sets, transactions, replication and persistence.",
  description:
    "GoRedis is an in-memory database written from scratch in Go. It speaks the RESP wire protocol, so the official redis-cli and existing client libraries connect without knowing the difference. It has strings with TTL, lists with blocking pops, streams with consumer groups, sorted sets on a skip list and geospatial indexes, plus MULTI/EXEC transactions with WATCH, master-replica replication, RDB snapshots, an append-only log, Pub/Sub and password auth.",
  imageUrl: "/GoRedis-Main.svg",
  githubRepo: "Redis-In-go",
  highlights: [
    "A hand-written RESP parser, so redis-cli and client libraries connect natively. In-memory GET/SET stays under a millisecond.",
    "Strings with TTL, lists with blocking operations (BLPOP), streams with consumer groups, sorted sets on a skip list, and geospatial indexing.",
    "MULTI/EXEC transactions with WATCH-based optimistic concurrency, plus master-replica replication, RDB snapshots, AOF logging, Pub/Sub and auth.",
  ],
  tags: ["Go", "TCP", "RESP"],
};

const renderer: Project = {
  title: "3D Renderer",
  category: "Rust",
  summary:
    "A wireframe 3D renderer in Rust. Projection, rotation matrices and a free-look camera are written by hand; SDL3 only draws the pixels.",
  githubRepo: "3d-Render-",
  tags: ["Rust", "SDL3", "Linear algebra"],
};

const webServer: Project = {
  title: "Multi-threaded Web Server",
  category: "Rust",
  summary:
    "An HTTP server on raw TCP with a hand-written thread pool. Workers pull jobs from a shared channel and shut down cleanly when the pool is dropped.",
  githubRepo: "Multi-threaded-Web-server",
  tags: ["Rust", "TCP", "Threads"],
};

const bookwise: Project = {
  title: "Bookwise",
  slug: "Bookwise",
  year: "2025",
  category: "Library management system",
  summary:
    "A library app with approval-based sign-up, an admin dashboard, rate limiting and scheduled overdue-reminder emails.",
  description:
    "Bookwise is a full-stack library management system. Members discover, borrow and return books through an approval-based flow. Admins manage users and inventory behind protected routes. Background jobs send emails, reminders and overdue notices.",
  imageUrl: "/Library-Main.png",
  githubRepo: "Library",
  liveUrl: "https://library-beta-seven.vercel.app",
  highlights: [
    "A protected admin dashboard for member approvals, inventory and borrowing.",
    "QStash background workflows with Nodemailer that send overdue-book reminders.",
    "Rate limiting on the API to slow down abuse and scraping.",
  ],
  tags: ["Next.js", "Drizzle", "Upstash Redis", "QStash", "Nodemailer"],
};

const newtube: Project = {
  title: "NewTube",
  category: "Social media platform",
  summary:
    "A MERN app that combines long videos, vertical shorts, text posts and photos, with nested comments, playlists, watch history and subscriptions.",
  githubRepo: "3-Newtube",
  tags: ["React", "Node.js", "Express", "MongoDB"],
};

export const config = {
  // ─── Personal ──────────────────────────────────────────────
  name: "Rahul Kumar",
  title: "AI Software Engineer",
  freelanceTagline: "Available for freelance work",
  location: "Chandigarh, India",
  resumePath: "/Resume.pdf",
  email: "rahulkum94l94@gmail.com",

  // ─── SEO / Metadata ───────────────────────────────────────
  seo: {
    title: "Rahul Kumar · AI Software Engineer",
    description:
      "AI software engineer building scalable backends, machine learning systems, AI agents and LinkedIn scraping and automation in TypeScript, Python, Go and Rust. Open to freelance work.",
  },

  // ─── Hero ──────────────────────────────────────────────────
  hero: {
    intro:
      "I build scalable backends, machine learning systems, AI agents and LinkedIn scraping and automation, and the infrastructure they run on. Most of my work is in TypeScript, Python, Go and Rust.",
  },

  // ─── Navigation ────────────────────────────────────────────
  navLinks: [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ],

  // ─── About ─────────────────────────────────────────────────
  about: {
    age: 19,
    open_to_work: true,
    bio: [
      "I'm an AI software engineer. I work on three things: backends that hold up under load, the machine learning underneath AI features, and agents that do real work. I like owning a feature from the database schema to the UI, and the part I care about most is the backend: data models, queues, retries, and what happens when something fails.",
      "At InboxKit I build the Enrich platform: the Next.js frontend, services in Go and Node, and ClickHouse analytics over 300M+ records. Keeping it fast as the data grows means partitioned tables, Redis caching in front of heavy queries, and job queues with retries, backoff and rate limits. I write raw SQL when an ORM gets in the way.",
      "For the last 10 months I've also worked on LinkedIn scraping and automation. I built a Puppeteer service that pulls any company's followers from Sales Navigator through a pool of managed accounts and proxies, with accounts allocated by remaining daily capacity, failover on rate limits and bans, and checkpoint resume. I also shipped two Chrome extensions for LinkedIn, Company Followers and Find Phone.",
      "On the ML side I work in Python: preparing data, training and evaluating models with PyTorch and scikit-learn, and using embeddings and vector search for retrieval. I want to know what the model is doing, not only which API to call.",
      "A lot of my recent work is agentic AI. I build on the Claude API and MCP: agents that call tools, ask before risky actions and remember the user, like Textcrew. I build RAG pipelines and multi-agent workflows with LangChain and LangGraph, and Claude Code is part of how I work every day: I break a design into phases and run parallel agents on separate git branches.",
      "For operations I run services in Docker and set up monitoring with Prometheus, Grafana, Loki and Tempo, so metrics, logs and traces are in one place.",
      "Outside work I write systems code to see how things work underneath: a Redis-compatible server in Go, and a thread-pool web server and a small 3D renderer in Rust.",
    ],
  },

  // ─── Tech Stack ────────────────────────────────────────────
  techStack: {
    categories: [
      { label: "Languages", items: ["TypeScript", "Python", "Go", "Rust", "JavaScript", "SQL"] },
      { label: "Frontend", items: ["Next.js", "React", "Redux Toolkit", "Tailwind CSS", "shadcn/ui"] },
      { label: "Backend", items: ["Node.js", "Hono", "Express", "Fastify", "FastAPI", "Fiber", "Echo", "gRPC", "WebSockets", "OpenAPI"] },
      { label: "Machine learning", items: ["PyTorch", "scikit-learn", "NumPy", "pandas", "Hugging Face Transformers", "Jupyter"] },
      { label: "AI & agents", items: ["Claude API", "Claude Code", "MCP", "LangChain", "LangGraph", "RAG", "Embeddings", "Qdrant", "Chroma", "LiteLLM"] },
      { label: "Data", items: ["PostgreSQL", "ClickHouse", "MongoDB", "Redis", "BullMQ", "Drizzle", "Prisma"] },
      { label: "Scraping & automation", items: ["Puppeteer", "Chromium", "Xvfb", "LinkedIn Sales Navigator", "Chrome extensions (MV3)", "Plasmo", "Proxy pools"] },
      { label: "DevOps", items: ["Docker", "gVisor", "GitHub Actions", "Caddy", "AWS SES"] },
      { label: "Observability", items: ["Prometheus", "Grafana", "Loki", "Tempo"] },
    ],
  },

  // ─── GitHub ────────────────────────────────────────────────
  gitMonths: 6,
  githubUsername: "rahulCoder9417",
  githubProfile: "https://github.com/rahulCoder9417",

  // ─── LeetCode ──────────────────────────────────────────────
  leetCodeStats: {
    solved: 210,
    easy: 64,
    medium: 138,
    hard: 8,
    beats: 93.5,
  },
  leetCodeProfile: "https://leetcode.com/user7867575/",

  // ─── Projects ──────────────────────────────────────────────
  projects: { textcrew, devsync, goredis, renderer, webServer, bookwise, newtube },
  featuredProjects: [textcrew, devsync, goredis],
  otherProjects: [renderer, webServer, bookwise, newtube],

  // ─── Experience ────────────────────────────────────────────
  experience: [
    {
      role: "Full-Stack Software Engineer",
      company: "InboxKit",
      companyUrl: "https://inboxkit.com",
      location: "Remote",
      period: "Jan 2026 – Present",
      description: "Building the Enrich platform end to end, including its LinkedIn scraping and automation.",
      highlights: [
        "Owned the Enrich platform end to end: frontend, backend, infrastructure and deployment, including the REST API behind the customer dashboard and an internal admin dashboard for monitoring and abuse detection.",
        "Built the customer UI in Next.js, Tailwind and shadcn/ui: dashboards, billing, analytics, and a shared component library with accessible, responsive layouts.",
        "Designed ClickHouse analytics over 300M+ records, using multi-tier Redis caching, query rewriting and partitioning to keep dashboard queries under a second at p95.",
        "Built LinkedIn scraping with Puppeteer (Chromium on Xvfb) that pulls any company's followers from Sales Navigator through a pool of managed accounts and proxies: capacity-based allocation (20K per account a day), failover on rate limits and bans, 2FA logins, checkpoint resume, and admission control for jobs up to 300K followers.",
        "Shipped two Chrome extensions for LinkedIn (Plasmo, React, MV3), Company Followers and Find Phone, with Fastify backends, OTP sign-up, free-tier quotas and encrypted profile capture.",
        "Built Go and Node services on Redis-backed BullMQ queues with retries, backoff and rate-limited dispatch, and moved a 271M-document MongoDB usage collection to Redis counters to end a recurring outage.",
        "Added rate limiting, RBAC, signed sessions, strict input validation and audit logging across the platform.",
      ],
      tags: ["Go", "Fiber", "Fastify", "Next.js", "ClickHouse", "Redis", "BullMQ", "Puppeteer", "Chrome Extensions", "Plasmo", "AWS SES", "Docker", "MongoDB"],
      current: true,
    },
  ],

  // ─── Contact ───────────────────────────────────────────────
  primaryContact: [
    {
      icon: Mail,
      label: "rahulkum94l94@gmail.com",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=rahulkum94l94@gmail.com&su=Work%20Opportunity&body=Hi%20Rahul",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/rahul-kumar-511054360/",
    },
  ],

  secondaryContact: [
    { label: "GitHub", href: "https://github.com/rahulCoder9417" },
    { label: "X / Twitter", href: "https://x.com/RahulKumar9417" },
    { label: "Fiverr", href: "https://www.fiverr.com/s/EgLENK7" },
    { label: "Upwork", href: "https://www.upwork.com/freelancers/~0131fa79af2d84bdfa" },
  ],

  // ─── Socials ───────────────────────────────────────────────
  socials: [
    { icon: Github, label: "GitHub", href: "https://github.com/rahulCoder9417" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/rahul-kumar-511054360/" },
    { icon: Twitter, label: "X / Twitter", href: "https://x.com/RahulKumar9417" },
  ],
};

export const githubUrl = (repo: string) => `https://github.com/${config.githubUsername}/${repo}`;
