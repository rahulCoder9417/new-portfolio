import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export const config = {
  // ─── Personal ──────────────────────────────────────────────
  name: "Rahul Kumar",
  logo: "RK",
  title: "Software Engineer",
  location: "Chandigarh, India",
  resumePath: "/Resume.pdf",

  // ─── SEO / Metadata ───────────────────────────────────────
  seo: {
    title: "Rahul Kumar — Software Engineer",
    description:
      "Software engineer building production systems in TypeScript, Go, and Rust. Polished frontend components, reliable services, and high-performance data pipelines.",
  },

  // ─── Hero ──────────────────────────────────────────────────
  hero: {
    greeting: "Hi, I'm",
    subtitle:
      "Software engineer shipping production systems in TypeScript, Go, and Rust. I build polished frontend components in React/Next.js, reliable services in Rust, and high-performance APIs and data pipelines — with a focus on caching, security, and low-latency query scaling.",
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
      "I'm a Software Engineer focused on building things end-to-end — from polished UI to the systems behind them.",
      "Currently I work full-stack on the Enrich platform: shipping the frontend in Next.js, backend services in Go and Node, and data pipelines that handle hundreds of millions of records on ClickHouse.",
      "Outside of work I write low-level systems for fun — most recently a Redis-compatible database engine in Go (RESP protocol, transactions, replication, persistence). I also grind DSA.",
    ],
  },

  // ─── Tech Stack ────────────────────────────────────────────
  techStack: {
    primary: [
      "TypeScript", "JavaScript", "Go", "Rust", "Next.js", "React.js",
      "Node.js", "Express", "Fastify", "Gin", "Fiber",
      "PostgreSQL", "MongoDB", "ClickHouse", "Redis",
      "WebSockets", "Docker", "Prisma", "Drizzle",
    ],
    secondary: ["Python", "C", "C++", "Tailwind", "Shadcn", "gRPC", "BullMQ", "AWS SES", "GitHub Actions"],
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
    category: "Real-Time Collaborative Developer Platform",
    description:
      "DevSync is a real-time collaborative developer platform that enables teams to write code, execute commands, and collaborate live within a shared environment. It features synchronized editors, an integrated terminal for live execution, and WebSocket-driven state sharing to maintain real-time consistency across users. The platform is backed by a scalable Node.js architecture, supports isolated execution using containerized environments, and ensures persistent project state to enable reliable, multi-user collaboration across sessions.",
    imageUrl: "/DevSync-Main.png",
    isFeatured: true,
    githubRepo: "DevSync",
    highlights: [
      "Up to 15 developers editing the same repository simultaneously",
      "Real-time collaboration using Yjs CRDTs over WebSocket",
      "Integrated terminal with live command execution",
      "Headless terminal & GUI processes using Xvfb (X11)",
      "Concurrent file editing with conflict handling",
      "Dockerized environments for isolated execution & deployment",
    ],
    tags: [
      "Next.js", "Express.js", "WebSockets", "Yjs", "Prisma", "Docker", "Xvfb",
    ],
  },

  SecondaryProject: {
    title: "Bookwise",
    year: "2025",
    liveUrl: "",
    category: "Library Management & Access Control System",
    description:
      "BookWise is a full-stack library management system designed with real-world access control and automation.\nUsers can discover, borrow, and return books through a secure, approval-based flow.\nAdmins manage users and inventory with protected routes and fine-grained permissions.\nBackground workflows automate emails, reminders, and overdue handling reliably.",
    isFeatured: false,
    imageUrl: "/Library-Main.png",
    githubRepo: "Bookwise",
    highlights: [
      "User authentication and session management using NextAuth",
      "Admin-only routes with role-based access control",
      "Book borrowing and request approval workflow",
      "Redis-backed rate limiting to prevent abuse",
      "Email notifications for request status updates",
      "Background job processing using QStash",
    ],
    tags: [
      "Next.js", "Drizzle ORM", "NextAuth", "Redis", "QStash", "NodeMailer",
    ],
  },

  ThirdProject: {
    title: "GoRedis",
    year: "2026",
    liveUrl: "",
    category: "Redis-Compatible In-Memory Database (from Scratch)",
    isFeatured: false,
    description:
      "GoRedis is a Redis-compatible in-memory database engine built from scratch in Go. It implements the RESP wire protocol, so the official redis-cli and existing client SDKs connect to it natively. Under the hood it ships strings with TTL, lists with blocking operations, streams with consumer groups, sorted sets via skip-lists, and geospatial indexing — together with MULTI/EXEC transactions backed by WATCH-based optimistic concurrency, master–replica replication, RDB snapshots, AOF write-ahead logging, Pub/Sub fan-out, and password-based authentication. The goal was to internalize how production databases are actually engineered.",
    imageUrl: "/GoRedis-Main.png",
    githubRepo: "GoRedis",
    highlights: [
      "RESP wire protocol — works with the official redis-cli and SDKs",
      "Strings with TTL and lazy expiration",
      "Lists with blocking operations (BLPOP)",
      "Streams with consumer groups (Kafka-lite)",
      "Sorted sets backed by skip-lists",
      "MULTI / EXEC transactions with WATCH-based optimistic concurrency",
      "Master–replica replication with command propagation",
      "Durability via RDB snapshots and AOF write-ahead logging",
      "Pub/Sub fan-out messaging and password-based auth",
    ],
    tags: ["Go", "TCP", "RESP", "Skip List", "Distributed Systems"],
  },

  // ─── Experience ────────────────────────────────────────────
  experience: [
    {
      role: "Full-Stack Software Engineer",
      company: "InboxKit",
      location: "Remote — Gurgaon, India",
      period: "Jan 2026 — Present",
      description:
        "Building scalable full-stack applications end-to-end for the Enrich platform.",
      highlights: [
        "Owned the Enrich Platform end-to-end — frontend, backend, infra, and deployment.",
        "Designed and built the customer-facing UI in Next.js, Tailwind, and Shadcn (dashboards, billing, analytics).",
        "Architected ClickHouse-backed analytics over 300M+ records, applying multi-tier Redis caching, query rewriting, and partitioning to keep dashboard queries at sub-second p95 latency.",
        "Hardened platform security: rate limiting, RBAC, signed sessions, input validation, and audit logging.",
        "Built microservices and automation pipelines (browser automation, transactional email, LinkedIn scraping) with Redis-backed BullMQ queues.",
      ],
      tags: ["Go", "Rust", "Next.js", "Fastify", "ClickHouse", "Redis"],
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
