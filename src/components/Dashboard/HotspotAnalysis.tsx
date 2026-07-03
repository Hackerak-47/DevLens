'use client';
import { TbFlame } from 'react-icons/tb';
import { useRepo } from '@/context/RepoContext';

export default function HotspotAnalysis() {
  const { repoData } = useRepo();
  if (!repoData) return <div style={{ padding: '2rem', textAlign: 'center' }}>No repository analyzed yet.</div>;
  
  const maxChanges = Math.max(...repoData.hotspots.map(h => h.changes));

  return (
    <div className="hotspots">
      <div className="section-header">
        <div className="section-header__left">
          <div className="section-header__icon section-header__icon--orange">
            <TbFlame />
          </div>
          <div>
            <div className="section-header__title">Hotspot Analysis</div>
            <div className="section-header__subtitle">Most frequently modified files — potential risk areas</div>
          </div>
        </div>
      </div>
      <div className="hotspot-list">
        {repoData.hotspots.map((file, index) => (
          <div key={file.path} className="hotspot-item">
            <div className={`hotspot-item__rank ${index < 3 ? 'hotspot-item__rank--top' : ''}`}>
              #{index + 1}
            </div>
            <div className="hotspot-item__info">
              <div className="hotspot-item__name">{file.name}</div>
              <div className="hotspot-item__path">{file.path}</div>
            </div>
            <div className="hotspot-item__bar-container">
              <div className="hotspot-item__bar">
                <div
                  className="hotspot-item__bar-fill"
                  style={{ width: `${(file.changes / maxChanges) * 100}%`, animationDelay: `${index * 0.1}s` }}
                />
              </div>
            </div>
            <div className="hotspot-item__count">
              {file.changes} changes
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
