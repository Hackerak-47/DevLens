'use client';

import { useState } from 'react';
import { useRepo } from '@/context/RepoContext';
import { TbGitCompare, TbCheck, TbArrowRight, TbFlame, TbCode } from 'react-icons/tb';

export default function BranchCompare() {
  const { repoData } = useRepo();
  const [targetBranch, setTargetBranch] = useState('feature/new-architecture');
  const [isComparing, setIsComparing] = useState(false);

  const handleCompare = () => {
    setIsComparing(true);
    setTimeout(() => {
      setIsComparing(false);
    }, 1500);
  };

  const diffFiles = [
    { name: 'src/core/Engine.ts', status: 'modified', lines: '+45 -12' },
    { name: 'src/api/auth.ts', status: 'modified', lines: '+102 -4' },
    { name: 'src/utils/helpers.ts', status: 'removed', lines: '-230' },
    { name: 'src/services/PaymentService.ts', status: 'added', lines: '+450' },
    { name: 'package.json', status: 'modified', lines: '+2 -1' },
  ];

  return (
    <div className="branch-compare" style={{ animation: 'fade-in-up 0.5s ease-out' }}>
      <div className="section-header">
        <div className="section-header__left">
          <div className="section-header__icon section-header__icon--orange">
            <TbGitCompare />
          </div>
          <div>
            <div className="section-header__title">Branch Comparison</div>
            <div className="section-header__subtitle">Compare architectural impact between branches</div>
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Base Branch</div>
            <div style={{ background: 'var(--bg-input)', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TbCheck color="var(--accent-green)" /> main
            </div>
          </div>
          
          <div style={{ padding: '0 16px', color: 'var(--text-dim)', paddingTop: '24px' }}>
            <TbArrowRight size={24} />
          </div>
          
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Compare Branch</div>
            <select 
              value={targetBranch}
              onChange={(e) => setTargetBranch(e.target.value)}
              style={{ width: '100%', background: 'var(--bg-input)', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', fontWeight: 600, appearance: 'none', cursor: 'pointer' }}
            >
              <option value="feature/new-architecture">feature/new-architecture</option>
              <option value="fix/memory-leak">fix/memory-leak</option>
              <option value="update-dependencies">update-dependencies</option>
              <option value="experimental/v2">experimental/v2</option>
            </select>
          </div>
          
          <div style={{ paddingTop: '24px' }}>
            <button 
              onClick={handleCompare}
              style={{ background: 'var(--accent-orange)', color: '#000', padding: '12px 24px', borderRadius: 'var(--radius-md)', fontWeight: 700, border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {isComparing ? 'Analyzing...' : 'Compare'}
            </button>
          </div>
        </div>

        {!isComparing && (
          <div style={{ animation: 'fade-in 0.3s ease-out' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
              <div style={{ background: 'var(--bg-input)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>Complexity Delta</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent-orange)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  +14% <TbFlame size={20} />
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '4px' }}>Increase in cyclomatic complexity</div>
              </div>
              <div style={{ background: 'var(--bg-input)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>Files Changed</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  5
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '4px' }}>3 modified, 1 added, 1 removed</div>
              </div>
              <div style={{ background: 'var(--bg-input)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>Code Churn</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent-green)' }}>
                  811
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '4px' }}>Lines inserted or deleted</div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Changed Files</h3>
              <div style={{ border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                {diffFiles.map((file, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: i % 2 === 0 ? 'transparent' : 'var(--bg-input)', borderBottom: i < diffFiles.length - 1 ? '1px solid var(--border-default)' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <TbCode color="var(--text-muted)" />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{file.name}</span>
                      <span style={{ 
                        fontSize: '0.7rem', 
                        padding: '2px 8px', 
                        borderRadius: 'var(--radius-full)', 
                        background: file.status === 'added' ? 'rgba(0, 217, 126, 0.1)' : file.status === 'removed' ? 'rgba(255, 107, 53, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                        color: file.status === 'added' ? 'var(--accent-green)' : file.status === 'removed' ? 'var(--accent-orange)' : '#3b82f6',
                        textTransform: 'uppercase',
                        fontWeight: 600
                      }}>
                        {file.status}
                      </span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                      <span style={{ color: 'var(--accent-green)', marginRight: '8px' }}>{file.lines.split(' ')[0]}</span>
                      <span style={{ color: 'var(--accent-orange)' }}>{file.lines.split(' ')[1] || ''}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
