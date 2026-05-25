import { Header } from "@/components/Header";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-6">{children}</main>
    </>
  );
}
