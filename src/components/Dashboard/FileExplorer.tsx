'use client';
import { useState, useMemo } from 'react';
import { FiFolder, FiFile, FiChevronRight, FiChevronDown, FiSearch, FiClock } from 'react-icons/fi';
import { TbFolderCode } from 'react-icons/tb';
import { FileItem } from '@/types';
import { useRepo } from '@/context/RepoContext';

function FileTreeItem({ item, depth = 0 }: { item: FileItem; depth?: number }) {
  const [expanded, setExpanded] = useState(depth < 1);

  return (
    <div>
      <div
        className={`file-tree__item ${item.type === 'directory' ? 'file-tree__item--dir' : ''}`}
        style={{ paddingLeft: `${12 + depth * 20}px` }}
        onClick={() => item.type === 'directory' && setExpanded(!expanded)}
      >
        {item.type === 'directory' ? (
          expanded ? <FiChevronDown className="file-tree__item-icon" /> : <FiChevronRight className="file-tree__item-icon" />
        ) : null}
        {item.type === 'directory' ? (
          <FiFolder className="file-tree__item-icon file-tree__item-icon--folder" />
        ) : (
          <FiFile className="file-tree__item-icon file-tree__item-icon--file" />
        )}
        <span className="file-tree__item-name">{item.name}</span>
        {item.type === 'file' && (
          <div className="file-tree__item-meta">
            {item.complexity && (
              <span className={`file-tree__item-complexity file-tree__item-complexity--${item.complexity}`}>
                {item.complexity}
              </span>
            )}
            {item.lastModified && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <FiClock size={10} />
                {item.lastModified}
              </span>
            )}
          </div>
        )}
      </div>
      {item.type === 'directory' && expanded && item.children && (
        <div className="file-tree__children">
          {item.children.map((child) => (
            <FileTreeItem key={child.path} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FileExplorer() {
  const { repoData } = useRepo();
  const [searchQuery, setSearchQuery] = useState('');

  if (!repoData) return <div style={{ padding: '2rem', textAlign: 'center' }}>No repository analyzed yet.</div>;

  return (
    <div className="file-explorer">
      <div className="section-header">
        <div className="section-header__left">
          <div className="section-header__icon section-header__icon--green">
            <TbFolderCode />
          </div>
          <div>
            <div className="section-header__title">File Explorer</div>
            <div className="section-header__subtitle">Smart code navigation with complexity indicators</div>
          </div>
        </div>
      </div>
      <div className="file-explorer__container">
        <div className="file-explorer__header">
          <div className="file-explorer__title">
            <FiFolder /> Project Structure
          </div>
          <div className="file-explorer__search">
            <FiSearch size={14} />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="file-tree">
          {repoData.fileTree.map((item) => (
            <FileTreeItem key={item.path} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
