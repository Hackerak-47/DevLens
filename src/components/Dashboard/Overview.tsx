'use client';
import { HiMiniStar, HiMiniCodeBracket } from 'react-icons/hi2';
import { FiGitCommit, FiUsers, FiFile, FiGitBranch } from 'react-icons/fi';
import { TbBrandTypescript } from 'react-icons/tb';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { useRepo } from '@/context/RepoContext';

export default function Overview() {
  const { repoData } = useRepo();
  if (!repoData) return <div style={{ padding: '2rem', textAlign: 'center' }}>No repository analyzed yet.</div>;
  
  const repo = repoData.overview;
  const stats = [
    { label: 'Stars', value: repo.stars, icon: HiMiniStar, color: 'orange', trend: '+124', trendDir: 'up' as const },
    { label: 'Commits', value: repo.commits, icon: FiGitCommit, color: 'green', trend: '+89', trendDir: 'up' as const },
    { label: 'Contributors', value: repo.contributors, icon: FiUsers, color: 'green', trend: '+5', trendDir: 'up' as const },
    { label: 'Total Files', value: repo.totalFiles, icon: FiFile, color: 'orange', trend: '+23', trendDir: 'up' as const },
    { label: 'Lines of Code', value: repo.linesOfCode, icon: HiMiniCodeBracket, color: 'green', trend: '+11.2K', trendDir: 'up' as const },
    { label: 'Branches', value: repo.branches, icon: FiGitBranch, color: 'orange', trend: '-2', trendDir: 'down' as const },
  ];

  return (
    <div className="overview">
      <div className="overview__stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="stat-card__header">
              <div className={`stat-card__icon stat-card__icon--${stat.color}`}>
                <stat.icon />
              </div>
              <div className={`stat-card__trend stat-card__trend--${stat.trendDir}`}>
                {stat.trendDir === 'up' ? '↑' : '↓'} {stat.trend}
              </div>
            </div>
            <div className="stat-card__value">
              <AnimatedCounter value={stat.value} />
            </div>
            <div className="stat-card__label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="language-breakdown">
        <div className="language-breakdown__title">
          <TbBrandTypescript /> Language Breakdown
        </div>
        <div className="language-bar">
          {repo.languages.map((lang) => (
            <div
              key={lang.name}
              className="language-bar__segment"
              style={{ width: `${lang.percentage}%`, background: lang.color }}
              title={`${lang.name}: ${lang.percentage}%`}
            />
          ))}
        </div>
        <div className="language-list">
          {repo.languages.map((lang) => (
            <div key={lang.name} className="language-item">
              <div className="language-item__dot" style={{ background: lang.color }} />
              <span className="language-item__name">{lang.name}</span>
              <span className="language-item__percent">{lang.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
