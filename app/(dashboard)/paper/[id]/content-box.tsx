'use client';

import { useState } from 'react';

export default function ContentBox({ title }: { title: string }) {
  const [content, setContent] = useState('');

  return (
    <div className="border p-4 rounded">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <textarea
        className="w-full h-32 p-2 border rounded"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add your content here..."
      />
    </div>
  );
}