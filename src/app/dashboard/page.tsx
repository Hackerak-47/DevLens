'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Sidebar from '@/components/Dashboard/Sidebar';
import Overview from '@/components/Dashboard/Overview';
import FileExplorer from '@/components/Dashboard/FileExplorer';
import HotspotAnalysis from '@/components/Dashboard/HotspotAnalysis';
import TechDebtReport from '@/components/Dashboard/TechDebtReport';
import AISummary from '@/components/Dashboard/AISummary';
import CodeSearch from '@/components/Dashboard/CodeSearch';
import BranchCompare from '@/components/Dashboard/BranchCompare';
import { FiSearch, FiBell, FiSettings } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useRepo } from '@/context/RepoContext';

// Dynamic import for React Flow (needs client-side only)
const DependencyGraph = dynamic(
  () => import('@/components/Dashboard/DependencyGraph'),
  { ssr: false }
);

// Dynamic import for Chart.js components
const GitAnalytics = dynamic(
  () => import('@/components/Dashboard/GitAnalytics'),
  { ssr: false }
);

const sectionTitles: Record<string, string> = {
  overview: '📊 Overview',
  dependencies: '🌳 Dependency Graph',
  files: '📁 File Explorer',
  hotspots: '🔥 Hotspot Analysis',
  techdebt: '⚠️ Technical Debt',
  analytics: '📈 Git Analytics',
  'ai-summary': '🧠 AI Summary',
  search: '🔍 Code Search',
  branches: '🧪 Branch Compare',
};

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const router = useRouter();
  const { repoData } = useRepo();

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview />;
      case 'dependencies':
        return <DependencyGraph />;
      case 'files':
        return <FileExplorer />;
      case 'hotspots':
        return <HotspotAnalysis />;
      case 'techdebt':
        return <TechDebtReport />;
      case 'analytics':
        return <GitAnalytics />;
      case 'ai-summary':
        return <AISummary />;
      case 'search':
        return <CodeSearch />;
      case 'branches':
        return <BranchCompare />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <div className="dashboard__main">
        <header className="dashboard__header">
          <h1 className="dashboard__header-title">
            {sectionTitles[activeSection] || 'Dashboard'}
          </h1>
          <div className="dashboard__header-actions">
            <button className="btn--icon" title="Search" onClick={() => setActiveSection('search')}>
              <FiSearch />
            </button>
            <div style={{ position: 'relative' }}>
              <button className="btn--icon" title="Notifications" onClick={() => { setShowNotifications(!showNotifications); setShowSettings(false); }}>
                <FiBell />
                <span style={{ position: 'absolute', top: '2px', right: '2px', width: '8px', height: '8px', background: '#ff6b35', borderRadius: '50%' }} />
              </button>
              {showNotifications && (
                <div style={{ position: 'absolute', top: '100%', right: 0, width: '250px', background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: '12px', marginTop: '12px', zIndex: 100, boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, borderBottom: '1px solid var(--border-default)', paddingBottom: '8px', marginBottom: '8px', color: 'var(--text-primary)' }}>Notifications</div>
                  <div style={{ fontSize: '0.75rem', padding: '8px', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', marginBottom: '8px', color: 'var(--text-secondary)' }}>Analysis completed for <strong>{repoData?.name || 'repository'}</strong></div>
                  <div style={{ fontSize: '0.75rem', padding: '8px', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)' }}>New technical debt hotspots identified.</div>
                </div>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <button className="btn--icon" title="Settings" onClick={() => { setShowSettings(!showSettings); setShowNotifications(false); }}>
                <FiSettings />
              </button>
              {showSettings && (
                <div style={{ position: 'absolute', top: '100%', right: 0, width: '150px', background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: '8px', marginTop: '12px', zIndex: 100, boxShadow: '0 10px 40px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <button style={{ padding: '8px 12px', fontSize: '0.8rem', color: '#ff6b35', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', borderRadius: 'var(--radius-sm)' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255,107,53,0.1)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'} onClick={() => router.push('/')}>Log Out</button>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="dashboard__content">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}
