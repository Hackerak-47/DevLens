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
    { label: 'Stars', value: repo.stars, icon: HiMiniStar, color: 'orange' },
    { label: 'Commits', value: repo.commits, icon: FiGitCommit, color: 'green' },
    { label: 'Contributors', value: repo.contributors, icon: FiUsers, color: 'green' },
    { label: 'Total Files', value: repo.totalFiles, icon: FiFile, color: 'orange' },
    { label: 'Lines of Code', value: repo.linesOfCode, icon: HiMiniCodeBracket, color: 'green' },
    { label: 'Branches', value: repo.branches, icon: FiGitBranch, color: 'orange' },
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
