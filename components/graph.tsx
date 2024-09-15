"use client"
import React, { useState, useCallback } from 'react';
import { KnowledgeGraph } from 'react-knowledge-graph';
import "react-knowledge-graph/KnowledgeGraph/index.css";

const ArxivKnowledgeGraph = ({ data }: { data: any }) => {
  const [exploredNodes, setExploredNodes] = useState<any>({});

  const explore = useCallback(async (id: string) => {
    if (exploredNodes[id]) {
      return exploredNodes[id];
    }

    let result = {
      inside: [],
      outside: [],
      edge: []
    } as {
        inside: any[],
        outside: any[],
        edge: any[]
    };

    if (id === 'root') {
      result.inside = [{
        id: data.arxiv_id,
        name: data.title,
        type: 'paper',
        hasMore: true,
        direction: 'inside'
      }];
    } else if (id === data.arxiv_id) {
      // Authors
      result.outside = data.authors.map((author: any, index: any) => ({
        id: `author-${index}`,
        name: author,
        type: 'author',
        hasMore: false,
        direction: 'outside'
      }));

      // Top citations
      result.inside = data.top_citations.map((citation: any, index: any) => ({
        id: `citation-${index}`,
        name: citation.title,
        type: 'citation',
        hasMore: false,
        direction: 'inside'
      }));

      // Edges
      result.edge = [
        ...data.authors.map((_: any, index: any) => ({
          id: `edge-author-${index}`,
          fromId: data.arxiv_id,
          toId: `author-${index}`,
          description: 'authored by'
        })),
        ...data.top_citations.map((_: any, index: any) => ({
          id: `edge-citation-${index}`,
          fromId: data.arxiv_id,
          toId: `citation-${index}`,
          description: 'cites'
        }))
      ];
    }

    setExploredNodes((prev: any) => ({...prev, [id]: result}));
    return result;
  }, [data, exploredNodes]);

  return (
    <KnowledgeGraph
      explore={explore}
      basicDistence={200}
      position={{ x: 400, y: 300 }}
      node={{
        id: "root",
        type: "root",
        hasMore: true,
        direction: "root",
        name: "ArXiv Paper",
      }}
      width={500}
      height={500}
      onExploreEnd={() => {
        console.log("Reached end node!");
      }}
      edgeConfig={{
        hoveredColor: "#e27272",
        stroke: "#DEDEDE",
        strokeWidth: 1,
      }}
      typeConfig={{
        root: {
          radius: 25,
          fill: "#747ba6",
          hoverStyle: {
            fill: "#3949a3",
          },
        },
        paper: {
          radius: 20,
          fill: "#b4e5a2",
          typeSize: 10,
          nameSize: 12,
          hoverStyle: {
            fill: "#6be73e",
          },
        },
        author: {
          radius: 15,
          fill: "#ea52ea",
          typeSize: 8,
          nameSize: 10,
          hoverStyle: {
            fill: "#e5a2e5",
          },
        },
        citation: {
          radius: 18,
          fill: "#89c4fb",
          typeSize: 8,
          nameSize: 10,
          hoverStyle: {
            fill: "#2f8fe8",
          },
        },
      }}
    />
  );
};

export default ArxivKnowledgeGraph;