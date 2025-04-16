'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const router = useRouter();

  const handleGoToCheckout = async (product_name: string) => {
    try {
      const res = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_name }),
      });

      if (!res.ok) {
        throw new Error('Failed to create checkout session.');
      }

      const data = await res.json();
      router.push(data.url);
    } catch (error) {}
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-white via-neutral-50 to-slate-100 py-16 px-4'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold mb-3 text-gray-800'>
          Pick Your Plan
        </h1>
        <p className='text-gray-600 max-w-md mx-auto'>
          Each credit lets you submit <strong>one idea</strong> for expert
          validation. Choose the plan that works for your current stage.
        </p>
      </div>

      <div className='grid gap-10 sm:grid-cols-1 md:grid-cols-2'>
        {/* Single Credit Plan */}
        <Card className='w-full max-w-sm transition-all duration-300 hover:shadow-xl border border-gray-200'>
          <CardContent className='p-6'>
            <h2 className='text-2xl font-semibold mb-2'>1 Credit</h2>
            <p className='mb-3 text-gray-500'>
              Perfect for trying out ValidateLens.
            </p>
            <p className='text-4xl font-bold text-gray-800 mb-6'>$5</p>
            <ul className='text-sm space-y-2 text-gray-700 mb-6'>
              <li>✅ Submit 1 idea</li>
              <li>✅ Expert feedback</li>
              <li>✅ Response within 24 hours</li>
            </ul>
            <Button
              onClick={() => handleGoToCheckout('single')}
              className='w-full'>
              Buy 1 Credit
            </Button>
          </CardContent>
        </Card>

        {/* Bundle Plan */}
        <Card className='w-full max-w-sm transition-all duration-300 hover:shadow-xl border border-gray-200'>
          <CardContent className='p-6'>
            <h2 className='text-2xl font-semibold mb-2'>3 Credits</h2>
            <p className='mb-3 text-gray-500'>
              Best value for ongoing idea validation.
            </p>
            <p className='text-4xl font-bold text-gray-800 mb-6'>$10</p>
            <ul className='text-sm space-y-2 text-gray-700 mb-6'>
              <li>✅ Submit 3 ideas</li>
              <li>✅ Expert feedback</li>
              <li>✅ Response within 24 hours each</li>
            </ul>
            <Button
              onClick={() => handleGoToCheckout('bundle')}
              className='w-full'>
              Buy 3 Credits
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
