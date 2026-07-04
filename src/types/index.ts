// ============================================
// DEVLENS - Type Definitions
// ============================================

export interface RepoOverview {
  name: string;
  fullName: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  issues: number;
  commits: number;
  contributors: number;
  totalFiles: number;
  linesOfCode: number;
  branches: number;
  lastUpdated: string;
  createdAt: string;
  license: string;
  languages: LanguageBreakdown[];
}

export interface LanguageBreakdown {
  name: string;
  percentage: number;
  color: string;
  linesOfCode: number;
}

export interface DependencyNode {
  id: string;
  label: string;
  type: 'module' | 'service' | 'controller' | 'util' | 'config';
  files: string[];
  complexity: number;
  dependencies: number;
  linesOfCode: number;
  totalFiles?: number;
}

export interface DependencyEdge {
  source: string;
  target: string;
  type: 'import' | 'extends' | 'implements';
}

export interface FileItem {
  name: string;
  path: string;
  type: 'file' | 'directory';
  size?: number;
  complexity?: 'low' | 'medium' | 'high' | number;
  lastModified?: string;
  changes?: number;
  children?: FileItem[];
  language?: string;
}

export interface HotspotFile {
  name: string;
  path: string;
  changes: number;
  complexity: number;
  risk: 'high' | 'medium' | 'low';
  lastAuthor: string;
  lastModified: string;
}

export interface TechDebtIssue {
  file: string;
  severity: 'high' | 'medium' | 'low';
  type: string;
  description: string;
  tags: string[];
  linesAffected: number;
}

export interface CommitData {
  week: string;
  commits: number;
}

export interface ContributorData {
  name: string;
  commits: number;
  additions: number;
  deletions: number;
  avatar: string;
}

export interface CodeGrowthData {
  month: string;
  lines: number;
}

export interface SearchResult {
  file: string;
  line: number;
  type: 'function' | 'class' | 'variable';
  name: string;
  code: string;
}

export interface TechDebtScore {
  overall: number;
  maintainability: number;
  reliability: number;
  security: number;
}

export interface AISummary {
  overview: string;
  architecture: string;
  strengths: string[];
  weaknesses: string[];
  suggestion: string;
  tags: string[];
}
