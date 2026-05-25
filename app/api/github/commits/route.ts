import { NextResponse } from "next/server";
import { config } from "@/utils/config";

export const dynamic = "force-dynamic";

const GITHUB_API = "https://api.github.com/graphql";
const totalDays = config.gitMonths * 30 + 1;

type ContributionDay = { date: string; contributionCount: number };

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME ?? config.githubUsername;

  if (!token) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN not set", dailyCommits: [], totalCommits: 0 },
      { status: 200 },
    );
  }

  const now = new Date();
  const from = new Date();
  from.setDate(now.getDate() - totalDays);

  const recentQuery = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays { date contributionCount }
            }
          }
        }
      }
    }
  `;

  const totalQuery = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar { totalContributions }
        }
      }
    }
  `;

  try {
    const [recentRes, totalRes] = await Promise.all([
      fetch(GITHUB_API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: recentQuery,
          variables: {
            login: username,
            from: from.toISOString(),
            to: now.toISOString(),
          },
        }),
      }),
      fetch(GITHUB_API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: totalQuery,
          variables: { login: username },
        }),
      }),
    ]);

    if (!recentRes.ok || !totalRes.ok) {
      return NextResponse.json(
        { error: "GitHub API error", dailyCommits: [], totalCommits: 0 },
        { status: 200 },
      );
    }

    const recentJson = await recentRes.json();
    const totalJson = await totalRes.json();

    if (recentJson.errors || totalJson.errors) {
      return NextResponse.json(
        { error: "GraphQL query error", dailyCommits: [], totalCommits: 0 },
        { status: 200 },
      );
    }

    const allDays: ContributionDay[] =
      recentJson.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
        (w: { contributionDays: ContributionDay[] }) => w.contributionDays,
      );

    const dailyCommits = allDays.slice(-totalDays).map((d) => ({
      date: d.date,
      count: d.contributionCount,
    }));

    const totalCommits: number =
      totalJson.data.user.contributionsCollection.contributionCalendar
        .totalContributions;

    return NextResponse.json(
      { dailyCommits, totalCommits },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      },
    );
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data", dailyCommits: [], totalCommits: 0 },
      { status: 200 },
    );
  }
}
