'use client';

import CreateIdeaButton from '@/components/CreateIdeaButton';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import SignInButton from '@/components/SignInButton';

export default function AiIdeaGeneratorPage() {
  const [interests, setInterests] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const isLoggedIn = session?.user?.id;

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
    <div className='mx-auto p-6 space-y-8'>
      {/* Header Section */}
      <div className='gap-5 flex flex-col md:flex-row md:justify-between items-start md:items-center'>
        <h1 className='text-3xl font-bold place-self-start'>
          AI Sally Suggests
        </h1>
        <div className='w-[80px] h-[80px]'>
          <Image
            className='rounded-sm border border-foreground'
            src={`/sally_suggests.jpg`}
            alt='AI Sally'
            height={80}
            width={80}
          />
        </div>
      </div>

      {/* Intro / Disclaimer */}
      <p className='text-gray-400 leading-relaxed'>
        Don’t know what to build? Enter your interests (or leave it blank), and
        let AI Sally help you brainstorm potential startup ideas.
        <br />
        <span className='text-gray-500 text-sm block mt-2'>
          Note: We do not store this information. If AI Sally suggests ideas you
          like, please write them down or save them somewhere safe for your own
          records.
        </span>
      </p>

      {/* How It Works */}
      <section className='space-y-3'>
        <h2 className='text-xl font-semibold'>How It Works</h2>
        <ol className='list-decimal pl-5 space-y-2 text-gray-600 text-base'>
          <li>
            Share your interests, skills, or any themes you want AI Sally to
            consider (or leave it blank for general ideas).
          </li>
          <li>
            Click <strong>Generate Startup Idea</strong> and wait a few seconds
            while Sally comes up with unique suggestions.
          </li>
          <li>
            Review the ideas, then use{' '}
            <span className='font-semibold'>ValidateLens</span> to gather real
            human feedback on which ones are worth pursuing.
          </li>
        </ol>
      </section>

      {/* Input Field */}
      <Textarea
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
        placeholder='e.g. photography, travel, education, AI tools'
        className='border rounded p-2 w-full h-[10rem]'
      />

      {/* Action Button */}
      <Button
        onClick={handleGenerate}
        disabled={loading}
        className='disabled:opacity-50'>
        {loading ? 'Generating...' : 'Generate Startup Idea'}
      </Button>

      {/* Result Section */}
      {result && (
        <div className='border p-4 rounded-sm shadow-md bg-gray-50'>
          <h3 className='font-bold text-lg mb-2'>Your Ideas:</h3>
          <div
            className='prose prose-sm max-w-none'
            dangerouslySetInnerHTML={{
              __html: result.replace(/\n/g, '<br />'),
            }}
          />
        </div>
      )}

      {/* Helpful Tips */}
      <section className='mt-10 space-y-3'>
        <h2 className='text-xl font-semibold'>Helpful Tips</h2>
        <ul className='list-disc pl-5 space-y-2 text-gray-600'>
          <li>Be specific with your interests for more targeted ideas.</li>
          <li>
            Ask yourself, “Would I personally use this?” as a quick gut check.
          </li>
          <li>
            Don’t fall in love with the first idea — explore multiple options
            before committing.
          </li>
          <li>
            After narrowing down your favorite, submit it to ValidateLens for
            real-world feedback.
          </li>
        </ul>
      </section>

      {/* CTA to ValidateLens */}
      <div className='border-t pt-8 text-center space-y-3'>
        <p className='text-gray-700'>
          Got an idea you like? Take the next step and validate it with real
          human feedback.
        </p>
        {isLoggedIn ? <CreateIdeaButton /> : <SignInButton />}
      </div>
    </div>
  );
}
