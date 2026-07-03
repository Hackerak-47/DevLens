'use client';
import { TbChartBar } from 'react-icons/tb';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { useRepo } from '@/context/RepoContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1a1a1a',
      titleColor: '#ffffff',
      bodyColor: '#9ca3af',
      borderColor: 'rgba(255,255,255,0.06)',
      borderWidth: 1,
      cornerRadius: 8,
      padding: 12,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#6b7280', font: { family: 'Inter', size: 11 } },
    },
    y: {
      grid: { color: 'rgba(255,255,255,0.04)' },
      ticks: { color: '#6b7280', font: { family: 'Inter', size: 11 } },
    },
  },
};

export default function GitAnalytics() {
  const { repoData } = useRepo();
  if (!repoData) return <div style={{ padding: '2rem', textAlign: 'center' }}>No repository analyzed yet.</div>;

  const commitChartData = {
    labels: repoData.commitData.map(d => d.week),
    datasets: [{
      label: 'Commits',
      data: repoData.commitData.map(d => d.commits),
      backgroundColor: 'rgba(255, 107, 53, 0.7)',
      borderColor: '#ff6b35',
      borderWidth: 1,
      borderRadius: 6,
      borderSkipped: false,
    }],
  };

  const growthChartData = {
    labels: repoData.codeGrowth.map(d => d.month),
    datasets: [{
      label: 'Lines of Code',
      data: repoData.codeGrowth.map(d => d.lines),
      borderColor: '#00d97e',
      backgroundColor: 'rgba(0, 217, 126, 0.1)',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 3,
      pointBackgroundColor: '#00d97e',
      pointBorderColor: '#0a0a0a',
      pointBorderWidth: 2,
    }],
  };

  return (
    <div className="git-analytics">
      <div className="section-header">
        <div className="section-header__left">
          <div className="section-header__icon section-header__icon--green">
            <TbChartBar />
          </div>
          <div>
            <div className="section-header__title">Git Analytics</div>
            <div className="section-header__subtitle">Commit activity, code growth, and contributor insights</div>
          </div>
        </div>
      </div>
      <div className="git-analytics__grid">
        <div className="chart-card">
          <div className="chart-card__title">📊 Commits per Week</div>
          <div className="chart-card__chart">
            <Bar data={commitChartData} options={chartOptions} />
          </div>
        </div>
        <div className="chart-card">
          <div className="chart-card__title">📈 Code Growth Over Time</div>
          <div className="chart-card__chart">
            <Line data={growthChartData} options={chartOptions} />
          </div>
        </div>
        <div className="chart-card">
          <div className="chart-card__title">👥 Top Contributors</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {repoData.contributors.map((contributor, index) => (
              <div key={contributor.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: index % 2 === 0 ? 'rgba(0,217,126,0.15)' : 'rgba(255,107,53,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 700, color: index % 2 === 0 ? '#00d97e' : '#ff6b35', flexShrink: 0 }}>
                  {contributor.name ? contributor.name.charAt(0).toUpperCase() : '?'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{contributor.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{contributor.commits} commits</div>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                  <span style={{ color: '#00d97e' }}>+{(contributor.additions / 1000).toFixed(1)}K</span>
                  {' / '}
                  <span style={{ color: '#ff6b35' }}>-{(contributor.deletions / 1000).toFixed(1)}K</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
