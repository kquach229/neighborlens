'use client';

import { useEffect, useState } from 'react';
import { generateAISuggestions } from '@/lib/aiSuggestions';

const IdeaAISuggestions = ({ idea }: { idea: any }) => {
  const [suggestions, setSuggestions] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoading(true);
      const response = await generateAISuggestions({
        title: idea.title,
        problem: idea.problemItSolves,
        pricing: idea.pricingModel,
      });
      setSuggestions(response);
      setLoading(false);
    };
    fetchSuggestions();
  }, [idea]);

  return (
    <div className='mt-10 p-4 border rounded-md'>
      <h2 className='font-semibold text-lg mb-2'>
        AI Idea Submission Improvement
      </h2>
      {loading && <p className='text-gray-500'>Generating suggestions...</p>}
      {suggestions && (
        <ul className='list-disc pl-5 space-y-1'>
          {suggestions.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IdeaAISuggestions;
