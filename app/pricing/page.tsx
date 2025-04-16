'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

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
    <main className='flex min-h-screen flex-col items-center justify-center py-16 px-4'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold mb-3'>Pick Your Price</h1>
        <p className=' max-w-md mx-auto'>
          Each credit lets you submit <strong>one idea</strong> for expert
          validation. Choose the plan that works for your current stage.
        </p>
      </div>

      <div className='grid gap-10 sm:grid-cols-1 md:grid-cols-2'>
        {/* Single Credit Plan */}
        <Card className='w-full max-w-sm transition-all duration-300 hover:shadow-xl'>
          <CardHeader className='flex justify-between'>
            <h2>Single</h2>
            <Badge>Popular</Badge>
          </CardHeader>
          <CardContent className='p-6'>
            <div className='flex justify-between'>
              <h2 className='text-2xl font-semibold mb-2'>1 Credit</h2>
            </div>

            <p className='mb-3 '>Perfect for trying out ValidateLens.</p>
            <p className='text-4xl font-bold  mb-6'>$5</p>
            <ul className='text-sm space-y-2  mb-6'>
              <li>✅ Submit 1 idea</li>
              <li>✅ Get started for just $5</li>
            </ul>
            <Button
              onClick={() => handleGoToCheckout('single')}
              className='w-full cursor-pointer'>
              Buy 1 Credit
            </Button>
          </CardContent>
        </Card>

        {/* Bundle Plan */}
        <Card className='w-full max-w-sm transition-all duration-300 hover:shadow-xl'>
          <CardHeader>
            <h2 className=''>Bundle</h2>
          </CardHeader>
          <CardContent className='p-6'>
            <h2 className='text-2xl font-semibold mb-2'>3 Credits</h2>
            <p className='mb-3 '>Best value for ongoing idea validation.</p>
            <p className='text-4xl font-bold  mb-6'>$10</p>
            <ul className='text-sm space-y-2  mb-6'>
              <li>✅ Submit 3 ideas</li>
              <li>✅ Save by purchasing more upfront</li>
            </ul>
            <Button
              onClick={() => handleGoToCheckout('bundle')}
              className='w-full cursor-pointer'>
              Buy 3 Credits
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
