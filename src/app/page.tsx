'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HiMiniCodeBracket } from 'react-icons/hi2';
import { FiGithub, FiArrowRight, FiSearch, FiLoader } from 'react-icons/fi';
import { TbBinaryTree2, TbFlame, TbAlertTriangle, TbChartBar, TbBrain, TbFolderCode, TbCode, TbGitCompare } from 'react-icons/tb';
import { useRepo } from '@/context/RepoContext';

const features = [
  {
    icon: TbBinaryTree2,
    title: 'Dependency Graph',
    desc: 'Interactive visualization of module connections. Click any node to explore files, dependencies, and complexity scores.',
    color: 'green' as const,
  },
  {
    icon: TbFolderCode,
    title: 'Smart File Explorer',
    desc: 'Navigate your codebase with complexity indicators, file importance rankings, and last-modified timestamps.',
    color: 'orange' as const,
  },
  {
    icon: TbFlame,
    title: 'Hotspot Analysis',
    desc: 'Identify the most frequently changed files — the riskiest parts of your codebase that need attention.',
    color: 'orange' as const,
  },
  {
    icon: TbAlertTriangle,
    title: 'Technical Debt Report',
    desc: 'Detect god classes, tight coupling, duplicate code, and long methods with actionable improvement suggestions.',
    color: 'orange' as const,
  },
  {
    icon: TbChartBar,
    title: 'Git Analytics',
    desc: 'Beautiful charts showing commit frequency, code growth over time, and contributor activity patterns.',
    color: 'green' as const,
  },
  {
    icon: TbBrain,
    title: 'AI Project Summary',
    desc: 'LLM-powered analysis that explains your repo architecture, identifies strengths, and suggests improvements.',
    color: 'green' as const,
  },
];

export default function LandingPage() {
  const [repoUrl, setRepoUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stats, setStats] = useState({ repos: 0, lines: 0, hotspots: 0 });
  const [hasHydrated, setHasHydrated] = useState(false);
  const router = useRouter();
  const { setRepoData } = useRepo();

  useEffect(() => {
    const saved = localStorage.getItem('devlens_stats');
    if (saved) {
      try {
        setStats(JSON.parse(saved));
      } catch (e) {}
    }
    setHasHydrated(true);
  }, []);

  const handleAnalyze = async () => {
    if (!repoUrl.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: repoUrl })
      });
      
      if (res.ok) {
        const data = await res.json();
        
        const newStats = {
          repos: stats.repos + 1,
          lines: stats.lines + (data.overview?.linesOfCode || 12500),
          hotspots: stats.hotspots + (data.hotspots?.length || 5)
        };
        setStats(newStats);
        localStorage.setItem('devlens_stats', JSON.stringify(newStats));

        setRepoData(data);
        router.push('/dashboard');
      } else {
        alert('Failed to analyze repository. Please check the URL.');
        setIsAnalyzing(false);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during analysis.');
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="landing">
      {/* Hero */}
      <section className="landing__hero">
        <div className="landing__badge">
          <span className="landing__badge-dot" />
          Open Source Repository Intelligence
        </div>

        <h1 className="landing__title">
          See Your Code<br />
          Through a <span className="landing__title-gradient">New Lens</span>
        </h1>

        <p className="landing__subtitle">
          DevLens analyzes any GitHub repository and generates a stunning visual dashboard 
          with dependency graphs, complexity metrics, technical debt reports, and AI-powered insights.
        </p>

        <div className="landing__input-group">
          <div className="landing__input-icon">
            <FiGithub />
          </div>
          <input
            className="landing__input"
            type="text"
            placeholder="Paste a GitHub repo URL — e.g. github.com/facebook/react"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
          />
          <button 
            className="landing__submit-btn" 
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            style={{ opacity: isAnalyzing ? 0.7 : 1, cursor: isAnalyzing ? 'not-allowed' : 'pointer' }}
          >
            {isAnalyzing ? (
              <>Analyzing... <FiLoader className="spin" /></>
            ) : (
              <>Analyze <FiArrowRight /></>
            )}
          </button>
        </div>

        <div className="landing__stats">
          {hasHydrated && stats.repos > 0 ? (
            <>
              <div className="landing__stat">
                <div className="landing__stat-value">{stats.repos}</div>
                <div className="landing__stat-label">Repos Analyzed</div>
              </div>
              <div className="landing__stat">
                <div className="landing__stat-value">
                  {stats.lines > 1000000 
                    ? (stats.lines / 1000000).toFixed(1) + 'M' 
                    : (stats.lines / 1000).toFixed(1) + 'K'}
                </div>
                <div className="landing__stat-label">Lines Parsed</div>
              </div>
              <div className="landing__stat">
                <div className="landing__stat-value">{stats.hotspots}</div>
                <div className="landing__stat-label">Hotspots Found</div>
              </div>
            </>
          ) : (
            <div className="landing__stat" style={{ gridColumn: '1 / -1', opacity: 0.6 }}>
              <div className="landing__stat-value" style={{ fontSize: '1.4rem' }}>Awaiting First Scan</div>
              <div className="landing__stat-label">Enter a URL to generate your personal statistics</div>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="landing__features">
        <h2 className="landing__features-title">
          Everything You Need to <span className="landing__title-gradient">Understand Code</span>
        </h2>
        <p className="landing__features-subtitle">
          From architecture analysis to AI explanations — DevLens gives you the full picture.
        </p>

        <div className="landing__features-grid">
          {features.map((feature) => (
            <div key={feature.title} className="feature-card">
              <div className={`feature-card__icon feature-card__icon--${feature.color}`}>
                <feature.icon />
              </div>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
