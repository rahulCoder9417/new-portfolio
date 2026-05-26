import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export const config = {
  // ─── Personal ──────────────────────────────────────────────
  name: "Rahul Kumar",
  logo: "RK",
  title: "Software Engineer",
  freelanceTagline: "Available for full-stack & low-level freelance work",
  location: "Chandigarh, India",
  resumePath: "/Resume.pdf",

  // ─── SEO / Metadata ───────────────────────────────────────
  seo: {
    title: "Rahul Kumar · Software Engineer",
    description:
      "Software engineer shipping production systems in TypeScript, Go, and Rust. Polished frontend components in React/Next.js, reliable services, and high-performance data pipelines. Open to freelance work.",
  },

  // ─── Hero ──────────────────────────────────────────────────
  hero: {
    greeting: "Hi, I'm",
    subtitle:
      "Software engineer shipping production systems in TypeScript, Go, and Rust. I craft polished, accessible frontend components in React/Next.js, build reliable services in Rust, and engineer high-performance APIs and data pipelines end to end, with a focus on caching, security, and low-latency query scaling.",
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
      "I'm a Software Engineer focused on building things end to end, from polished UI to the systems behind them.",
      "Currently I work full-stack on the Enrich platform: shipping the frontend in Next.js, backend services in Go and Node, and ClickHouse-backed analytics over hundreds of millions of records. Comfortable writing raw SQL by hand when an ORM gets in the way.",
      "Outside professional work I build DevSync, a collaborative low-latency cloud IDE, and write low-level systems for fun, like a Redis-compatible database engine in Go. I also solve DSA.",
    ],
  },

  // ─── Tech Stack (mirrors resume categories) ────────────────
  techStack: {
    categories: [
      { label: "Languages",  items: ["TypeScript", "JavaScript", "Go", "Rust", "SQL"] },
      { label: "Frontend",   items: ["Next.js", "React.js", "Redux Toolkit", "Tailwind CSS", "Shadcn UI"] },
      { label: "Backend",    items: ["Node.js", "Express.js", "Fastify", "Echo", "Fiber", "gRPC", "WebSockets", "REST APIs"] },
      { label: "Databases",  items: ["PostgreSQL", "MongoDB", "ClickHouse", "Redis"] },
      { label: "DevOps",     items: ["Docker", "GitHub Actions", "AWS (SES)", "Prisma", "Drizzle ORM", "BullMQ"] },
    ],
  },

  coreExpertise: [
    "Full-Stack Engineering",
    "Backend Architecture",
    "Data Structures & Algorithms",
    "Real-Time Systems",
    "System Design Fundamentals",
    "API Design & Integration",
    "Performance & Scalability",
  ],

  architecture: [
    "Real-time systems using WebSockets",
    "Dockerized backend services",
    "REST + WebSocket hybrid APIs",
    "Database-driven scalable architectures",
  ],

  // ─── GitHub ────────────────────────────────────────────────
  gitMonths: 4,
  githubUsername: "rahulCoder9417",
  githubProfile: "https://github.com/rahulCoder9417",

  // ─── LeetCode ──────────────────────────────────────────────
  leetCodeStats: {
    solved: 126,
    easy: 24,
    medium: 99,
    hard: 3,
  },
  leetCodeProfile: "https://leetcode.com/user7867575/",

  // ─── Projects ──────────────────────────────────────────────
  FeaturedProject: {
    title: "DevSync",
    year: "2025",
    liveUrl: "https://dev-sync-blush.vercel.app/",
    category: "Real-Time Collaborative Coding Platform",
    description:
      "DevSync is a real-time collaborative developer platform that enables teams to write code, execute commands, and collaborate live within a shared environment. It features synchronized editors, an integrated terminal for live execution, and WebSocket-driven state sharing to maintain real-time consistency across users. The platform is backed by a scalable Node.js architecture, supports isolated execution using containerized environments, and ensures persistent project state to enable reliable, multi-user collaboration across sessions.",
    imageUrl: "/DevSync-Main.png",
    isFeatured: true,
    githubRepo: "DevSync",
    highlights: [
      "Built a Next.js collaborative coding platform supporting up to 15 developers editing the same repository simultaneously in real time via Yjs CRDTs over WebSocket, with low-latency cursor and selection sync.",
      "Architected a distributed microservices system separating collaboration (WebSocket, CRDT sync, presence) from persistence and execution layers for horizontal scalability.",
      "Developed a Dockerized execution backend with isolated disk storage, capable of running React, Express, and GUI apps (Tkinter), exposed securely via a reverse proxy.",
      "Integrated a real-time chat system alongside the editor for seamless team communication during sessions.",
    ],
    tags: ["Next.js", "Prisma", "Yjs", "Xvfb", "WebSocket", "Express", "Docker"],
  },

  SecondaryProject: {
    title: "Bookwise",
    year: "2025",
    liveUrl: "",
    category: "Enterprise Library Management System",
    description:
      "BookWise is a full-stack library management system designed with real-world access control and automation. Users can discover, borrow, and return books through a secure, approval-based flow. Admins manage users and inventory with protected routes and fine-grained permissions. Background workflows automate emails, reminders, and overdue handling reliably.",
    isFeatured: false,
    imageUrl: "/Library-Main.png",
    githubRepo: "Bookwise",
    highlights: [
      "Implemented a protected admin dashboard for user approvals, inventory management, and borrowing workflows.",
      "Integrated QStash background workflows with Nodemailer to automatically send overdue-book reminder emails.",
      "Hardened the API surface with rate limiting and request throttling to mitigate abuse and DDoS risk.",
    ],
    tags: ["Next.js", "Upstash", "Drizzle", "Redis", "Nodemailer"],
  },

  ThirdProject: {
    title: "GoRedis",
    year: "2026",
    liveUrl: "",
    category: "Redis-Compatible In-Memory Database (from Scratch)",
    isFeatured: false,
    description:
      "GoRedis is a Redis-compatible in-memory database engine built from scratch in Go. It implements the RESP wire protocol so the official redis-cli and existing client SDKs connect natively, with sub-millisecond GET/SET latency on in-memory operations. Under the hood it ships strings with TTL, lists with blocking operations, streams with consumer groups, sorted sets via skip-lists, and geospatial indexing, together with MULTI/EXEC transactions backed by WATCH-based optimistic concurrency, master-replica replication, RDB snapshots, AOF write-ahead logging, Pub/Sub fan-out, and password-based authentication.",
    imageUrl: "/GoRedis-Main.png",
    githubRepo: "GoRedis",
    highlights: [
      "Built a Redis-compatible database engine in Go implementing the RESP wire protocol, so the official redis-cli and client SDKs connect natively, with sub-millisecond GET/SET latency on in-memory operations.",
      "Implemented core data structures and commands: strings with TTL, lists with blocking ops (BLPOP), streams with consumer groups, sorted sets via skip-lists, and geospatial indexing.",
      "Engineered MULTI/EXEC transactions with WATCH-based optimistic concurrency control, plus master-replica replication, RDB snapshots, AOF write-ahead logging, Pub/Sub, and auth.",
    ],
    tags: ["Go", "TCP", "RESP Protocol"],
  },

  // ─── Experience ────────────────────────────────────────────
  experience: [
    {
      role: "Full-Stack Software Engineer",
      company: "InboxKit",
      location: "Remote",
      period: "Jan 2026 → Present",
      description:
        "Building scalable full-stack applications end to end for the Enrich platform.",
      highlights: [
        "Owned the Enrich Platform end to end: designed and shipped the full product (frontend, backend, infra, deployment), including the REST API surface powering the customer dashboard and an internal admin dashboard for monitoring and abuse detection.",
        "Designed and built the customer-facing UI in Next.js, Tailwind, and Shadcn: dashboards, billing, analytics, and a reusable component library with accessible, responsive layouts across breakpoints.",
        "Architected ClickHouse-backed analytics over 300M+ records, applying multi-tier Redis caching, query rewriting, and partitioning to keep dashboard queries at sub-second p95 latency.",
        "Hardened platform security: rate limiting, RBAC, signed sessions, strict input validation, and audit logging to prevent abuse, injection, and account takeover.",
        "Built microservices and automation pipelines (browser automation, transactional email, LinkedIn scraping) with Redis-backed BullMQ queues handling retries, backoff, and rate-limited dispatch.",
      ],
      tags: ["Go", "Fiber", "Fastify", "Next.js", "ClickHouse", "Redis", "BullMQ", "Puppeteer", "AWS SES", "Docker", "MongoDB"],
      current: true,
    },
  ],

  // ─── Contact ───────────────────────────────────────────────
  primaryContact: [
    {
      icon: Linkedin,
      label: "Connect on LinkedIn",
      href: "https://www.linkedin.com/in/rahul-kumar-511054360/",
      primary: true,
    },
    {
      icon: Mail,
      label: "Email Me",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=rahulkum94l94@gmail.com&su=Work%20Opportunity&body=Hi%20Rahul",
      primary: true,
    },
  ],

  secondaryContact: [
    { icon: Github, label: "GitHub", href: "https://github.com/rahulCoder9417" },
    { icon: Twitter, label: "Twitter", href: "https://x.com/RahulKumar9417" },
    { label: "Fiverr", href: "https://www.fiverr.com/s/EgLENK7" },
    { label: "Upwork", href: "https://www.upwork.com/freelancers/~0131fa79af2d84bdfa" },
  ],

  // ─── Socials ───────────────────────────────────────────────
  socials: [
    { icon: Github, label: "GitHub", href: "https://github.com/rahulCoder9417" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/rahul-kumar-511054360/" },
    { icon: Twitter, label: "Twitter", href: "https://x.com/RahulKumar9417" },
  ],

  // ─── Footer ────────────────────────────────────────────────
  footer: {
    tagline: "Built with Next.js and Tailwind CSS.",
  },
};
