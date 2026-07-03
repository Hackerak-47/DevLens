'use client';
import { useState, useCallback, useMemo } from 'react';
import ReactFlow, { Background, Controls, Node, Edge, useNodesState, useEdgesState, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import { TbBinaryTree2, TbX } from 'react-icons/tb';
import { FiFile, FiGitBranch, FiBox } from 'react-icons/fi';
import { useRepo } from '@/context/RepoContext';

const nodeColors: Record<string, string> = {
  module: '#00d97e',
  service: '#ff6b35',
  controller: '#3b82f6',
  util: '#8b5cf6',
  config: '#6b7280',
};

const nodeIcons: Record<string, string> = {
  module: '📦',
  service: '⚙️',
  controller: '🔀',
  util: '🔧',
  config: '⚡',
};

// Custom Node component
function CustomNode({ data }: { data: any }) {
  const borderColor = nodeColors[data.nodeType] || '#00d97e';
  const isHighComplexity = data.complexity > 60;

  return (
    <div
      className={`graph-node ${data.selected ? 'graph-node--selected' : ''} ${isHighComplexity ? 'graph-node--critical' : ''}`}
      style={{ borderColor: data.selected ? borderColor : undefined }}
    >
      <div className="graph-node__header">
        <span className="graph-node__icon">{nodeIcons[data.nodeType] || '📦'}</span>
        <span className="graph-node__name">{data.label}</span>
      </div>
      <div className="graph-node__meta">
        <span className="graph-node__meta-item">
          <FiFile size={10} /> {data.fileCount} files
        </span>
        <span className="graph-node__meta-item">
          <FiGitBranch size={10} /> {data.deps} deps
        </span>
        <span className="graph-node__meta-item" style={{ color: isHighComplexity ? '#ff6b35' : '#00d97e' }}>
          C:{data.complexity}
        </span>
      </div>
    </div>
  );
}

const nodeTypes = { custom: CustomNode };

export default function DependencyGraph() {
  const { repoData } = useRepo();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const initialNodes: Node[] = useMemo(() => {
    if (!repoData) return [];
    
    const totalNodes = repoData.dependencyNodes.length;
    const nodeWidth = 280;
    const nodeHeight = 90;
    const horizontalGap = 50;
    const verticalGap = 70;

    // Columns per row (fit nicely in the viewport)
    const cols = Math.min(4, totalNodes - 1 || 1);

    return repoData.dependencyNodes.map((node, index) => {
      let x = 0;
      let y = 0;

      if (index === 0) {
        // Root node: centered at top
        const rowWidth = Math.min(cols, totalNodes - 1) * (nodeWidth + horizontalGap) - horizontalGap;
        x = rowWidth / 2 - nodeWidth / 2;
        y = 0;
      } else {
        // Dependency nodes: arranged in rows below root
        const depIndex = index - 1;
        const col = depIndex % cols;
        const row = Math.floor(depIndex / cols);
        x = col * (nodeWidth + horizontalGap);
        y = (row + 1) * (nodeHeight + verticalGap) + 40; // +40 gap from root
      }

      return {
        id: node.id,
        type: 'custom',
        position: { x, y },
      data: {
        label: node.label,
        nodeType: node.type,
        fileCount: node.files.length,
        deps: node.dependencies,
        complexity: node.complexity,
        files: node.files,
        linesOfCode: node.linesOfCode,
        selected: selectedNodeId === node.id,
        }
      };
    });
  }, [repoData, selectedNodeId]);

  const initialEdges: Edge[] = useMemo(() => {
    if (!repoData) return [];
    return repoData.dependencyEdges.map((edge, index) => ({
      id: `e-${index}`,
      source: edge.source,
      target: edge.target,
      animated: true,
      style: {
        stroke: selectedNodeId === edge.source || selectedNodeId === edge.target ? '#00d97e' : 'rgba(255,255,255,0.15)',
        strokeWidth: selectedNodeId === edge.source || selectedNodeId === edge.target ? 2 : 1,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: selectedNodeId === edge.source || selectedNodeId === edge.target ? '#00d97e' : 'rgba(255,255,255,0.15)',
        width: 15,
        height: 15,
      },
    }));
  }, [repoData, selectedNodeId]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((_: any, node: Node) => {
    setSelectedNodeId((prev: string | null) => prev === node.id ? null : node.id);
  }, []);

  const selectedNodeData = repoData?.dependencyNodes.find(n => n.id === selectedNodeId);

  return (
    <div className="dep-graph">
      <div className="section-header">
        <div className="section-header__left">
          <div className="section-header__icon section-header__icon--green">
            <TbBinaryTree2 />
          </div>
          <div>
            <div className="section-header__title">Dependency Graph</div>
            <div className="section-header__subtitle">Interactive module dependency visualization</div>
          </div>
        </div>
      </div>
      <div className="dep-graph__container">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.25 }}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          panOnDrag={false} // Locks the graph in the middle
          nodesDraggable={false}
          proOptions={{ hideAttribution: true }}
          style={{ background: '#111111' }}
        >
          <Background color="rgba(255,255,255,0.03)" gap={24} size={1} />
        </ReactFlow>

        {selectedNodeData && (
          <div className="node-detail-overlay" onClick={() => setSelectedNodeId(null)}>
            <div className="node-detail" onClick={(e) => e.stopPropagation()}>
            <div className="node-detail__title">
              <span>{nodeIcons[selectedNodeData.type]} {selectedNodeData.label}</span>
              <span className="node-detail__close" onClick={() => setSelectedNodeId(null)}><TbX /></span>
            </div>
            <div className="node-detail__section">
              <div className="node-detail__label">Files</div>
              <div className="node-detail__files">
                {selectedNodeData.files.map(f => (
                  <div key={f} className="node-detail__file">{f}</div>
                ))}
              </div>
            </div>
            <div className="node-detail__section">
              <div className="node-detail__label">Complexity</div>
              <div className="node-detail__complexity">
                <div className="node-detail__complexity-bar">
                  <div
                    className={`node-detail__complexity-fill node-detail__complexity-fill--${selectedNodeData.complexity > 70 ? 'high' : selectedNodeData.complexity > 40 ? 'medium' : 'low'}`}
                    style={{ width: `${selectedNodeData.complexity}%` }}
                  />
                </div>
                <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: selectedNodeData.complexity > 70 ? '#ff6b35' : '#00d97e' }}>
                  {selectedNodeData.complexity}/100
                </span>
              </div>
            </div>
            <div className="node-detail__section">
              <div className="node-detail__label">Lines of Code</div>
              <div style={{ fontSize: '0.9rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                {selectedNodeData.linesOfCode.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
