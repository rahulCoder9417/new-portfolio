import { config } from "@/utils/config";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ProjectFooter } from "@/components/project/ProjectFooter";
import { WalkthroughStep } from "@/components/project/WalkthroughStep";
import { ShotFrame } from "@/components/project/ShotFrame";
import { ImageSlider } from "@/components/project/ImageSlider";

const p = config.projects.bookwise;

export const metadata = {
  title: `${p.title} · ${config.name}`,
  description: p.category,
};

const tech = (items: string[]) => (
  <ul className="flex flex-wrap gap-1.5">
    {items.map((t) => (
      <li key={t} className="pill">
        {t}
      </li>
    ))}
  </ul>
);

const detail = (body: React.ReactNode) => (
  <div className="rounded-md border border-[color:var(--border)] bg-bg-soft/60 px-5 py-4 text-[14px] leading-[1.78] text-fg-soft">
    {body}
  </div>
);

export default function BookwisePage() {
  return (
    <>
      <ProjectHero
        title={p.title}
        category={p.category}
        description={p.description ?? p.summary}
        tags={p.tags}
        githubRepo={p.githubRepo}
        liveUrl={p.liveUrl}
        year={p.year}
      />

      <section className="pb-10">
        <h2 className="text-[24px] font-semibold tracking-tight text-fg">
          A tour of Bookwise
        </h2>
        <p className="mt-2 text-[15.5px] text-fg-soft max-w-[65ch]">
          Approval-based sign-up, role-based access for admins, and background
          jobs for email.
        </p>
      </section>

      {/* 01 — Library catalog */}
      <WalkthroughStep
        num="01"
        title="The reader-facing library"
        blurb="The catalog members see after signing in, with search, filters and borrowing."
      >
        <ShotFrame
          src="/Bookwise/library.png"
          alt="Bookwise reader-facing library page"
          caption="member view · catalog"
          priority
        />
        {detail(
          <p>
            The catalog is the entry point for members. Each book exposes
            availability, a borrow CTA, and a request flow that gates writes
            behind authentication and rate limiting.
          </p>,
        )}
        {tech(["Next.js", "App Router", "NextAuth"])}
      </WalkthroughStep>

      {/* 02 — Admin dashboard */}
      <WalkthroughStep
        num="02"
        title="Admin dashboard"
        blurb="Where admins approve members, manage inventory and track borrowing. Every route checks the user's role."
      >
        <ImageSlider
          ariaLabel="Admin dashboard screenshots"
          slides={[
            { src: "/Bookwise/adminMain.png", alt: "Admin dashboard overview", caption: "admin · overview" },
            { src: "/Bookwise/admin1.png", alt: "Admin: members list", caption: "members" },
            { src: "/Bookwise/admin2.png", alt: "Admin: borrow requests", caption: "borrow requests" },
            { src: "/Bookwise/admin3.png", alt: "Admin: inventory management", caption: "inventory" },
            { src: "/Bookwise/admin4.png", alt: "Admin: book detail", caption: "book detail" },
            { src: "/Bookwise/admin5.png", alt: "Admin: borrow record", caption: "borrow record" },
          ]}
        />
        {detail(
          <p>
            Admin routes live behind a middleware that rejects unauthenticated
            and non-admin sessions before the page renders. Inventory and member
            tables update optimistically, with a server confirmation pass that
            rolls the UI back on conflict.
          </p>,
        )}
        {tech(["NextAuth", "RBAC", "Drizzle ORM", "Server Actions"])}
      </WalkthroughStep>

      {/* 03 — Email automation */}
      <WalkthroughStep
        num="03"
        title="Email automation"
        blurb="Emails go out through QStash and Nodemailer. Status changes send an email right away; overdue reminders are scheduled jobs that stay off the request path."
      >
        <ImageSlider
          ariaLabel="Email templates"
          slides={[
            { src: "/Bookwise/email1.png", alt: "Account approved email", caption: "account approved" },
            { src: "/Bookwise/email2.png", alt: "Borrow confirmation email", caption: "borrow confirmed" },
            { src: "/Bookwise/email3.png", alt: "Overdue reminder email", caption: "overdue reminder" },
            { src: "/Bookwise/email4.png", alt: "Return confirmation email", caption: "return confirmed" },
          ]}
        />
        {detail(
          <p>
            QStash holds the schedule and survives application restarts; the
            workers are pure HTTP endpoints, so the email pipeline scales
            independently from the web tier. Failures retry with exponential
            backoff and dead-letter visibility.
          </p>,
        )}
        {tech(["QStash", "Nodemailer", "Webhooks"])}
      </WalkthroughStep>

      {/* 04 — Rate limiting */}
      <WalkthroughStep
        num="04"
        title="Rate limiting"
        blurb="A Redis-backed limiter in front of write endpoints throttles each IP and account to slow down brute-force and scraping."
      >
        <ShotFrame
          src="/Bookwise/rateLimit.png"
          alt="Bookwise rate limit response"
          caption="429 response · throttled client"
        />
        {detail(
          <p>
            The limiter is a sliding window in Upstash Redis. Endpoints expose
            standard <code className="font-mono text-[12px]">X-RateLimit-*</code>{" "}
            headers so honest clients can back off cleanly; abusive clients get
            429s before the database is touched.
          </p>,
        )}
        {tech(["Upstash Redis", "Sliding window", "Middleware"])}
      </WalkthroughStep>

      <ProjectFooter githubRepo={p.githubRepo} />
    </>
  );
}
