import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { GitHubHeatmap } from "@/components/GitHubHeatmap";
import { LeetCodeStats } from "@/components/LeetCodeStats";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-6">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <GitHubHeatmap />
        <LeetCodeStats />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
