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
  status: "Pre-launch",
  summary:
    "A personal AI agent you text on WhatsApp, Telegram or iMessage. Each user's agent runs in its own gVisor sandbox and does real work in their apps. I designed the system and built the backend and the Go container manager.",
  description:
    "Textcrew is a messaging-first personal assistant. Each user talks to their own AI agent on WhatsApp, Telegram, iMessage or the web app. The agent runs in its own sandboxed container, works in about 25 apps (Gmail, Calendar, Notion, Slack, GitHub and others) through Composio, asks before risky actions, remembers the user, runs reminders and automations, and is billed in credits.\n\nI did the system design and backend engineering: the architecture, the API contract, the backend (api + worker) and the Go service that manages every user's container.",
  imageUrl: "/Textcrew-Main.png",
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
  liveUrl: "https://dev-sync-blush.vercel.app/",
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
  title: "Software Engineer",
  freelanceTagline: "Available for freelance work",
  location: "Chandigarh, India",
  resumePath: "/Resume.pdf",
  email: "rahulkum94l94@gmail.com",

  // ─── SEO / Metadata ───────────────────────────────────────
  seo: {
    title: "Rahul Kumar · Software Engineer",
    description:
      "Software engineer building backends, AI agents and the infrastructure they run on, in TypeScript, Go and Rust. Open to freelance work.",
  },

  // ─── Hero ──────────────────────────────────────────────────
  hero: {
    intro:
      "I build backends and the systems around them: APIs, job queues, AI agents, and the infrastructure they run on. Most of my work is in TypeScript, Go and Postgres, with Rust on the side.",
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
    status: "BCA Student",
    open_to_work: true,
    bio: [
      "I'm a software engineer and BCA student. I like owning a feature from the database schema to the UI, and the part I care about most is the backend: data models, queues, retries, and what happens when something fails.",
      "At InboxKit I build the Enrich platform: the Next.js frontend, services in Go and Node, and ClickHouse analytics over 300M+ records. I write raw SQL when an ORM gets in the way.",
      "A lot of my recent work is AI agents. I build on the Claude API and MCP, and Claude Code is part of how I work every day: I break a design into phases and run parallel agents on separate git branches. I also build RAG pipelines and agent workflows with LangChain and LangGraph.",
      "For operations I run services in Docker and set up monitoring with Prometheus, Grafana, Loki and Tempo, so metrics, logs and traces are in one place.",
      "Outside work I write systems code to see how things work underneath: a Redis-compatible server in Go, and a thread-pool web server and a small 3D renderer in Rust.",
    ],
  },

  // ─── Tech Stack ────────────────────────────────────────────
  techStack: {
    categories: [
      { label: "Languages", items: ["TypeScript", "JavaScript", "Go", "Rust", "Python", "SQL"] },
      { label: "Frontend", items: ["Next.js", "React", "Redux Toolkit", "Tailwind CSS", "shadcn/ui"] },
      { label: "Backend", items: ["Node.js", "Hono", "Express", "Fastify", "Fiber", "Echo", "gRPC", "WebSockets", "OpenAPI"] },
      { label: "AI & agents", items: ["Claude API", "Claude Code", "MCP", "LangChain", "LangGraph", "RAG", "LiteLLM"] },
      { label: "Data", items: ["PostgreSQL", "ClickHouse", "MongoDB", "Redis", "BullMQ", "Drizzle", "Prisma"] },
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
      description: "Building the Enrich platform end to end.",
      highlights: [
        "Owned the Enrich platform end to end: frontend, backend, infrastructure and deployment, including the REST API behind the customer dashboard and an internal admin dashboard for monitoring and abuse detection.",
        "Built the customer UI in Next.js, Tailwind and shadcn/ui: dashboards, billing, analytics, and a shared component library with accessible, responsive layouts.",
        "Designed ClickHouse analytics over 300M+ records, using multi-tier Redis caching, query rewriting and partitioning to keep dashboard queries under a second at p95.",
        "Added rate limiting, RBAC, signed sessions, strict input validation and audit logging across the platform.",
        "Built services and automation pipelines (browser automation, transactional email, LinkedIn scraping) on Redis-backed BullMQ queues with retries, backoff and rate-limited dispatch.",
      ],
      tags: ["Go", "Fiber", "Fastify", "Next.js", "ClickHouse", "Redis", "BullMQ", "Puppeteer", "AWS SES", "Docker", "MongoDB"],
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
