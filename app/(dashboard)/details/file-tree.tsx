"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, File, Folder, Users, BookOpen } from 'lucide-react';

const TreeNode = ({ node, level = 0 }: { node: any, level: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div style={{ marginLeft: `${level * 5}px` }}>
      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={toggleOpen}>
        {hasChildren ? (
          isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />
        ) : (
          <span style={{ width: '16px' }} />
        )}
        {node.type === 'folder' && <Folder size={16} color="#ffd700" style={{ marginRight: '5px' }} />}
        {node.type === 'file' && <File size={16} color="#4caf50" style={{ marginRight: '5px' }} />}
        {node.type === 'authors' && <Users size={16} color="#2196f3" style={{ marginRight: '5px' }} />}
        {node.type === 'citations' && <BookOpen size={16} color="#ff5722" style={{ marginRight: '5px' }} />}
        <span>{node.name}</span>
      </div>
      {isOpen && hasChildren && (
        <div>
          {node.children.map((child: any, index: any) => (
            <TreeNode key={index} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const ArxivFolderTree = ({ data }: { data: any }) => {
  const treeData = {
    name: data.title,
    type: 'folder',
    children: [
      {
        name: 'Authors',
        type: 'authors',
        children: data.authors.map((author: any) => ({ name: author, type: 'file' }))
      },
      {
        name: 'Citations',
        type: 'citations',
        children: data.top_citations.map((citation: any) => ({
          name: citation.title,
          type: citation.top_citations.length > 0 ? 'citations' : 'folder',
          children: citation.top_citations.length > 0 ? 

          data.top_citations.map((citation2: any) => ({
            name: citation2.title,
            type: 'folder'
          }))
          :
          [
            { name: `Year: ${citation.year}`, type: 'file' },
            { name: `Authors: ${citation.authors.join(', ')}`, type: 'file' }
          ]
          
        }))
      },
      { name: `ArXiv ID: ${data.arxiv_id}`, type: 'file' },
      { name: `Published: ${data.published}`, type: 'file' },
      { name: 'Summary', type: 'file' }
    ]
  };

  return (
    <div className='p-3'>
      <h2 className='text-lg font-semibold'>ArXiv Paper Folder Structure</h2>
      <TreeNode node={treeData} level={4} />
    </div>
  );
};

export default ArxivFolderTree;