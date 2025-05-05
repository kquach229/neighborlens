'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { useState } from 'react';

export default function AiIdeaGeneratorPage() {
  const [interests, setInterests] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);

    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: `
I want you to act as a startup idea generator for a founder who's not sure what to build yet.

Their interests/skills (if any): ${interests || 'Not specified'}

Give 1–2 startup ideas that:
- Solve real problems
- Are unique or underexplored
- Include a target audience and value prop
- Include one action step to validate the idea

Format clearly in Markdown.
        `,
      }),
    });

    const data = await res.json();
    setResult(data.text || 'Something went wrong.');
    setLoading(false);
  };

  return (
    <div className='max-w-5xl mx-auto p-6 space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold place-self-start'>Sally Suggests</h1>
        <div className='w-[80] h-[80]'>
          <Image
            className='rounded-sm border border-foreground'
            src={`/sally_suggests.jpg`}
            alt='sally suggest'
            height={80}
            width={80}
          />
        </div>
      </div>

      <p className='text-gray-400'>
        Don’t know what to build? Enter your interests (or leave it blank), and
        let the AI Sally help you brainstorm. Please note: We do not store this
        info for you, therefore, if AI Sally suggests any ideas you like, please
        be sure to write them down yourself for your own records.
      </p>

      <Textarea
        value={interests}
        rows={500}
        onChange={(e) => setInterests(e.target.value)}
        placeholder='e.g. photography, travel, education, AI tools'
        className='border rounded p-2 w-full h-[10rem]'
      />

      <Button
        onClick={handleGenerate}
        disabled={loading}
        className='disabled:opacity-50'>
        {loading ? 'Generating...' : 'Generate Startup Idea'}
      </Button>

      {result && (
        <div className='border p-4 rounded-sm whitespace-pre-wrap shadow-xl'>
          <div
            dangerouslySetInnerHTML={{
              __html: result.replace(/\n/g, '<br />'),
            }}
          />
        </div>
      )}
    </div>
  );
}
