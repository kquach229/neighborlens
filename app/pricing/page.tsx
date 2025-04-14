import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { prisma } from '@/lib/prisma';
import { Check } from 'lucide-react';
import React from 'react';

const formatPrice = (cents: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(cents / 100);
};

const PricingPage = async () => {
  const plans = await prisma.plan.findMany({
    orderBy: {
      priceInCents: 'asc',
    },
  });

  return (
    <div className='min-h-screen px-6 py-16 max-w-7xl mx-auto'>
      <header className='text-center mb-12'>
        <h1 className='text-5xl font-bold'>Choose Your Plan</h1>
        <p className='text-muted-foreground mt-2'>
          Simple and transparent pricing. No hidden fees.
        </p>
      </header>

      <div className='flex flex-wrap gap-10 justify-center'>
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className='hover:scale-110 duration-150 w-full sm:w-[300px] shadow-lg'>
            <CardHeader className='space-y-2'>
              <div className='flex justify-between items-center'>
                <h3 className='text-2xl font-semibold capitalize'>
                  {plan.name ?? plan.id}
                </h3>
                <span className='text-xl font-bold'>
                  {formatPrice(plan.priceInCents)}
                </span>
              </div>
              <p className='text-sm text-muted-foreground'>
                {plan.description}
              </p>
            </CardHeader>

            <Separator />

            <CardContent className='mt-4'>
              <ul className='space-y-2'>
                {plan.features.map((feature, index) => (
                  <li key={index} className='flex items-start gap-2 text-sm'>
                    <Check className='text-green-600 w-4 h-4 mt-1' />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
