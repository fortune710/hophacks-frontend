import ContentBox from './content-box';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function PaperPage({ params }: { params: { id: string } }) {
  const response = await fetch(`http://127.0.0.1:5000/paper/${params.id}`, {
    next: {
      tags: ["paper", params.id]
    }
  });

  const paper = await response.json();

  const recommendations = await fetch('http://127.0.0.1:5000/recommend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      limit: 5,
      identifier: paper.arxiv_id,
      abstract: paper.abstract,
      title: paper.title,
    }),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{paper.title}</h1>
      <p className="text-xl mb-2">{Array.isArray(paper.authors) ? paper.authors.join(', ') : paper.authors}</p>
      <p className="text-sm mb-4">Published on {new Date(paper.published_date).toLocaleDateString()}</p>
      <p className="text-sm mb-4 font-semibold">Paper ID: {paper.id}</p>
      <div className="bg-gray-100 p-4 rounded mb-8">
        <h2 className="text-2xl font-semibold mb-2">Abstract</h2>
        <p>{paper.abstract}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <ContentBox title="Additional Content 1" />
        <ContentBox title="Additional Content 2" />
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Recommendations</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(recommendations, null, 2)}
        </pre>
      </div>
    </div>
  );
}