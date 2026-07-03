'use client';
import { TbAlertTriangle } from 'react-icons/tb';
import { useRepo } from '@/context/RepoContext';

function ScoreRing({ score, label, color }: { score: number; label: string; color: string }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="tech-debt__score-card">
      <div className="tech-debt__score-ring">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
          <circle
            cx="50" cy="50" r={radius} fill="none" stroke={color} strokeWidth="8"
            strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
          />
        </svg>
        <div className="tech-debt__score-value" style={{ color }}>{score}</div>
      </div>
      <div className="tech-debt__score-label">{label}</div>
    </div>
  );
}

export default function TechDebtReport() {
  const { repoData } = useRepo();
  if (!repoData) return <div style={{ padding: '2rem', textAlign: 'center' }}>No repository analyzed yet.</div>;

  return (
    <div className="tech-debt">
      <div className="section-header">
        <div className="section-header__left">
          <div className="section-header__icon section-header__icon--orange">
            <TbAlertTriangle />
          </div>
          <div>
            <div className="section-header__title">Technical Debt Report</div>
            <div className="section-header__subtitle">Code quality analysis and improvement suggestions</div>
          </div>
        </div>
      </div>
      <div className="tech-debt__summary">
        <ScoreRing score={repoData.techDebtScore.overall} label="Overall Score" color="#ff6b35" />
        <ScoreRing score={repoData.techDebtScore.maintainability} label="Maintainability" color="#f59e0b" />
        <ScoreRing score={repoData.techDebtScore.reliability} label="Reliability" color="#00d97e" />
        <ScoreRing score={repoData.techDebtScore.security} label="Security" color="#ff6b35" />
      </div>
      <div className="tech-debt__issues">
        {repoData.techDebtIssues.map((issue, index) => (
          <div key={index} className="debt-issue">
            <div className="debt-issue__header">
              <span className={`debt-issue__severity debt-issue__severity--${issue.severity}`}>
                {issue.severity}
              </span>
              <span className="debt-issue__file">{issue.file}</span>
            </div>
            <div className="debt-issue__tags">
              {issue.tags.map((tag) => (
                <span key={tag} className="debt-issue__tag">{tag}</span>
              ))}
            </div>
            <div className="debt-issue__desc">{issue.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
