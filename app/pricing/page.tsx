import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';
import React from 'react';

const PricingPage = async () => {
  const plans = await prisma.plan.findMany({
    orderBy: {
      priceInCents: 'asc',
    },
  });

  return (
    <div className='min-h-[90vh] p-5'>
      <div className=''>
        <h2 className='mt-16'>Pricing</h2>
        <div className='mt-16 flex justify-between items-center gap-5'>
          {plans.map((plan) => (
            <Card className='w-3xl min-h-96'>
              <CardHeader>
                <div className='text-4xl'>{plan.id}</div>
                <div className='text-2xl'>${plan.priceInCents * 0.01}</div>
              </CardHeader>
              <CardContent>
                <ul>
                  {Object.entries(plan.features).map(([key, value]) => (
                    <li key={key} className='pt-2 pb-2'>
                      {key}: {value?.toString()}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
