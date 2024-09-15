"use client"
import React, { useMemo } from 'react';
import { GraphCanvas, GraphCanvasRef } from 'reagraph';

const ArxivKnowledgeGraph = ({ data }: { data: any }) => {
  const { nodes, edges } = useMemo(() => {
    const nodes = [
      {
        id: data.arxiv_id,
        label: data.title,
        fill: '#b4e5a2',
        // You can add more styling properties here
      },
      ...data.authors.map((author: any, index: any) => ({
        id: `author-${index}`,
        label: author,
        fill: '#ea52ea',
      })),
      ...data.top_citations.map((citation: any, index: any) => ({
        id: `citation-${index}`,
        label: citation.title,
        fill: '#89c4fb',
      }))
    ];

    const edges = [
      ...data.authors.map((_: any, index: any) => ({
        id: `edge-author-${index}`,
        source: data.arxiv_id,
        target: `author-${index}`,
        label: 'authored by',
      })),
      ...data.top_citations.map((_: any, index: any) => ({
        id: `edge-citation-${index}`,
        source: data.arxiv_id,
        target: `citation-${index}`,
        label: 'cites',
      }))
    ];

    return { nodes, edges };
  }, [data]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <GraphCanvas
        nodes={nodes}
        edges={edges}
        layoutType="forceDirected2d"
        labelType="all"
        draggable
        animated
        contextMenu={({ data }) => (
          <div>
            <h3>{data.label}</h3>
            {data.id === data.data.arxiv_id && (
              <p>Authors: {data.data.authors.join(', ')}</p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default ArxivKnowledgeGraph;