'use client';

import { useEffect, useState } from 'react';
import { generateAICompetitorInsights } from '@/lib/aiCompetitors';

const IdeaAICompetitors = ({ idea }: { idea: any }) => {
  const [competitors, setCompetitors] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompetitors = async () => {
      setLoading(true);
      const results = await generateAICompetitorInsights({ title: idea.title });
      setCompetitors(results);
      setLoading(false);
    };
    fetchCompetitors();
  }, [idea]);

  if (!competitors || competitors.length === 0) return null;

  return (
    <div className='mt-10 p-4 border rounded-md'>
      <h2 className='font-semibold text-lg mb-2'>
        Similar Ideas / Competitors
      </h2>
      {loading && <p className='text-gray-500'>Analyzing competitors...</p>}
      <ul className='list-disc pl-5 space-y-1'>
        {competitors.map((c, idx) => (
          <li key={idx}>{c}</li>
        ))}
      </ul>
    </div>
  );
};

export default IdeaAICompetitors;
