'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  RepoOverview, 
  DependencyNode, 
  DependencyEdge, 
  FileItem, 
  HotspotFile, 
  TechDebtIssue, 
  CommitData, 
  ContributorData, 
  CodeGrowthData, 
  SearchResult,
  TechDebtScore,
  AISummary
} from '@/types';

export interface RepoData {
  name?: string;
  owner?: string;
  overview: RepoOverview;
  dependencyNodes: DependencyNode[];
  dependencyEdges: DependencyEdge[];
  fileTree: FileItem[];
  hotspots: HotspotFile[];
  techDebtIssues: TechDebtIssue[];
  commitData: CommitData[];
  contributors: ContributorData[];
  codeGrowth: CodeGrowthData[];
  searchResults: SearchResult[];
  techDebtScore: TechDebtScore;
  aiSummary: AISummary;
}

interface RepoContextType {
  repoData: RepoData | null;
  setRepoData: (data: RepoData | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const RepoContext = createContext<RepoContextType | undefined>(undefined);

export function RepoProvider({ children }: { children: ReactNode }) {
  // Initialize with null to force users to analyze a repo first
  const [repoData, setRepoData] = useState<RepoData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <RepoContext.Provider value={{ repoData, setRepoData, isLoading, setIsLoading, error, setError }}>
      {children}
    </RepoContext.Provider>
  );
}

export function useRepo() {
  const context = useContext(RepoContext);
  if (context === undefined) {
    throw new Error('useRepo must be used within a RepoProvider');
  }
  return context;
}
