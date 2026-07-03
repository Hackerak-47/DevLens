import type { Metadata } from "next";
import { RepoProvider } from "@/context/RepoContext";
import WaveBackground from '@/components/ui/WaveBackground';
import ParticleField from '@/components/ui/ParticleField';
import "./globals.css";

export const metadata: Metadata = {
  title: "DevLens — AI-Powered GitHub Repository Analyzer",
  description: "Analyze any GitHub repository's structure, quality, complexity, and evolution with visual + AI-powered insights. Dependency graphs, hotspot analysis, technical debt reports, and more.",
  keywords: ["GitHub", "repository analyzer", "code quality", "dependency graph", "technical debt", "AI analysis"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <WaveBackground />
        <ParticleField />
        <RepoProvider>
          {children}
        </RepoProvider>
      </body>
    </html>
  );
}
