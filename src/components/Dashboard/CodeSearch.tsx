'use client';
import { useState, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import { TbCode } from 'react-icons/tb';
import { useRepo } from '@/context/RepoContext';

export default function CodeSearch() {
  const { repoData } = useRepo();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'function', label: 'Functions' },
    { id: 'class', label: 'Classes' },
    { id: 'variable', label: 'Variables' },
  ];

  if (!repoData) return <div style={{ padding: '2rem', textAlign: 'center' }}>No repository analyzed yet.</div>;

  const filtered = useMemo(() => {
    let results = repoData.searchResults;
    if (activeFilter !== 'all') {
      results = results.filter(r => r.type === activeFilter.replace(/s$/, ''));
    }
    if (query) {
      results = results.filter(r =>
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.file.toLowerCase().includes(query.toLowerCase())
      );
    }
    return results;
  }, [query, activeFilter]);

  const highlightMatch = (code: string, name: string) => {
    if (!code) return '';
    if (!name) return code;
    const parts = code.split(new RegExp(`(${name})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === name.toLowerCase()
        ? `<span class="highlight">${part}</span>`
        : part
    ).join('');
  };

  return (
    <div className="code-search">
      <div className="section-header">
        <div className="section-header__left">
          <div className="section-header__icon section-header__icon--green">
            <TbCode />
          </div>
          <div>
            <div className="section-header__title">Code Search</div>
            <div className="section-header__subtitle">Search functions, classes, and variables across the codebase</div>
          </div>
        </div>
      </div>

      <div className="code-search__input-wrapper">
        <FiSearch className="code-search__icon" />
        <input
          className="code-search__input"
          type="text"
          placeholder="Search for functions, classes, variables..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="code-search__filters">
        {filters.map((f) => (
          <button
            key={f.id}
            className={`code-search__filter ${activeFilter === f.id ? 'code-search__filter--active' : ''}`}
            onClick={() => setActiveFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="search-results">
        {filtered.map((result, index) => (
          <div key={index} className="search-result">
            <div className="search-result__header">
              <span className={`search-result__type search-result__type--${result.type}`}>
                {result.type}
              </span>
              <span className="search-result__file">{result.file}</span>
              <span className="search-result__line">Line {result.line}</span>
            </div>
            <div
              className="search-result__code"
              dangerouslySetInnerHTML={{ __html: highlightMatch(result.code, result.name) }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
