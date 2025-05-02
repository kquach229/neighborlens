'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

interface AIReviewProps {
  rating: number;
  feedback: string;
  pursue: string;
}

const AiBuddy = ({ idea }: { idea: any }) => {
  const [aiReview, setAIReview] = useState<AIReviewProps | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetReview = async () => {
    if (aiReview || loading) return;

    setLoading(true);
    try {
      const res = await fetch('/api/generate-ai-review', {
        method: 'POST',
        body: JSON.stringify({ ideaId: idea.id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      setAIReview(data);
    } catch (error) {
      console.error('Error generating review:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className='flex items-center space-x-1'>
        {Array.from({ length: 5 }).map((_, i) =>
          i < rating ? (
            <Star key={i} className='w-5 h-5 text-yellow-500 fill-yellow-500' />
          ) : (
            <Star key={i} className='w-5 h-5 text-gray-300' />
          )
        )}
      </div>
    );
  };

  return (
    <div className='p-6 border border-gray-200 rounded-lg shadow-lg'>
      <h2 className='text-xl font-semibold mb-4'>AI Cody Suggests</h2>

      {!aiReview ? (
        <div className='flex flex-col items-center'>
          <Button
            onClick={handleGetReview}
            disabled={loading}
            className={`${
              loading && 'bg-gray-400'
            } transition-colors duration-300`}>
            {loading ? (
              <span className='animate-pulse'>Generating...</span>
            ) : (
              'Generate AI Review'
            )}
          </Button>
          {loading && (
            <p className='mt-3 text-gray-500 text-sm'>
              Please wait while we generate feedback...
            </p>
          )}
        </div>
      ) : (
        <div className='mt-6'>
          <div className='flex items-center space-x-2'>
            <span className='font-semibold'>Rating:</span>
            <span className='text-xl font-medium'>
              <span>{aiReview.rating}</span> / 5
            </span>
            {renderStars(aiReview.rating)}
          </div>
          <p className='mt-4 text-sm'>
            <span className='font-semibold text-xl'>Feedback:</span>
            <span className='ml-2'>{aiReview.feedback}</span>
          </p>
          <div className='mt-8'>
            <p className='mt-2 text-xl font-semibold'>Should Pursue?</p>
            <span>{aiReview.pursue}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiBuddy;
