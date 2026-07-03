'use client';
import { useState } from 'react';
import { HiMiniCodeBracket, HiMiniCpuChip } from 'react-icons/hi2';
import { FiGitBranch, FiSearch, FiSettings } from 'react-icons/fi';
import { TbLayoutDashboard, TbBinaryTree2, TbFolderCode, TbFlame, TbAlertTriangle, TbChartBar, TbBrain, TbGitCompare } from 'react-icons/tb';
import { VscGithub } from 'react-icons/vsc';
import { useRepo } from '@/context/RepoContext';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: 'overview', label: 'Overview', icon: TbLayoutDashboard, section: 'Analysis' },
  { id: 'dependencies', label: 'Dependency Graph', icon: TbBinaryTree2, section: 'Analysis', badge: 'Key' },
  { id: 'files', label: 'File Explorer', icon: TbFolderCode, section: 'Analysis' },
  { id: 'hotspots', label: 'Hotspot Analysis', icon: TbFlame, section: 'Analysis' },
  { id: 'techdebt', label: 'Technical Debt', icon: TbAlertTriangle, section: 'Quality', badge: '7' },
  { id: 'analytics', label: 'Git Analytics', icon: TbChartBar, section: 'Quality' },
  { id: 'ai-summary', label: 'AI Summary', icon: TbBrain, section: 'Insights' },
  { id: 'search', label: 'Code Search', icon: FiSearch, section: 'Insights' },
  { id: 'branches', label: 'Branch Compare', icon: TbGitCompare, section: 'Insights' },
];

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const { repoData } = useRepo();
  const sections = [...new Set(navItems.map(item => item.section))];
  const repoName = repoData?.name || 'Unknown Repo';
  const repoUrl = repoData ? `github.com/${repoData.owner}/${repoData.name}` : 'github.com/Unknown';

  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__logo">
          <div className="sidebar__logo-icon">
            <HiMiniCodeBracket />
          </div>
          DevLens
        </div>
        <div className="sidebar__repo-info">
          <div className="sidebar__repo-name">
            <VscGithub />
            {repoName}
          </div>
          <div className="sidebar__repo-url">{repoUrl}</div>
        </div>
      </div>
      <nav className="sidebar__nav">
        {sections.map(section => (
          <div key={section} className="sidebar__nav-section">
            <div className="sidebar__nav-label">{section}</div>
            {navItems.filter(item => item.section === section).map(item => (
              <button
                key={item.id}
                className={`sidebar__nav-item ${activeSection === item.id ? 'sidebar__nav-item--active' : ''}`}
                onClick={() => onSectionChange(item.id)}
              >
                <item.icon className="sidebar__nav-icon" />
                {item.label}
                {item.badge && <span className="sidebar__nav-badge">{item.badge}</span>}
              </button>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
