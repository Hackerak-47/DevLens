'use client';
import { TbBrain } from 'react-icons/tb';
import { FiAlertTriangle, FiCheck, FiZap } from 'react-icons/fi';
import { useRepo } from '@/context/RepoContext';

export default function AISummary() {
  const { repoData } = useRepo();
  if (!repoData) return <div style={{ padding: '2rem', textAlign: 'center' }}>No repository analyzed yet.</div>;
  const summary = repoData.aiSummary;

  return (
    <div className="ai-summary">
      <div className="section-header">
        <div className="section-header__left">
          <div className="section-header__icon section-header__icon--green">
            <TbBrain />
          </div>
          <div>
            <div className="section-header__title">AI Project Summary</div>
            <div className="section-header__subtitle">Intelligent analysis powered by LLM</div>
          </div>
        </div>
      </div>
      <div className="ai-summary__container">
        <div className="ai-summary__header">
          <div className="ai-summary__header-icon"><TbBrain /></div>
          <div className="ai-summary__header-title">Analysis Report</div>
          <span className="ai-summary__header-badge">AI Generated</span>
        </div>
        <div className="ai-summary__body">
          <div className="ai-summary__section">
            <div className="ai-summary__section-title"><FiZap /> Project Overview</div>
            <p className="ai-summary__text" dangerouslySetInnerHTML={{ __html: summary.overview }} />
          </div>

          <div className="ai-summary__section">
            <div className="ai-summary__section-title"><FiZap /> Architecture</div>
            <p className="ai-summary__text" dangerouslySetInnerHTML={{ __html: summary.architecture }} />
          </div>

          <div className="ai-summary__section">
            <div className="ai-summary__section-title" style={{ color: '#00d97e' }}><FiCheck /> Strengths</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {summary.strengths.map((s, i) => (
                <li key={i} className="ai-summary__text" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#00d97e', fontSize: '0.9rem' }}>✓</span> {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="ai-summary__section">
            <div className="ai-summary__section-title" style={{ color: '#ff6b35' }}><FiAlertTriangle /> Weaknesses</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {summary.weaknesses.map((w, i) => (
                <li key={i} className="ai-summary__text" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#ff6b35', fontSize: '0.9rem' }}>✗</span> {w}
                </li>
              ))}
            </ul>
          </div>

          <div className="ai-summary__section">
            <div className="ai-summary__warning">
              <FiAlertTriangle className="ai-summary__warning-icon" />
              <div className="ai-summary__warning-text" dangerouslySetInnerHTML={{ __html: summary.suggestion }} />
            </div>
          </div>

          <div className="ai-summary__tags">
            {summary.tags.map((tag) => (
              <span key={tag} className="ai-summary__tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
