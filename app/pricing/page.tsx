import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { prisma } from '@/lib/prisma';
import { Check } from 'lucide-react';
import React from 'react';

const PricingPage = async () => {
  const plans = await prisma.plan.findMany({
    orderBy: {
      priceInCents: 'asc',
    },
  });

  console.log(plans);

  return (
    <div className='min-h-[90vh] p-5'>
      <div className=''>
        <h2 className='mt-16'>Pricing</h2>

        <div className='mt-16 flex justify-between items-center gap-5'>
          {plans.map((plan) => (
            <Card className='w-3xl min-h-96 p-5'>
              <CardHeader>
                <div>
                  <div className='flex justify-between'>
                    <div className='text-4xl'>{plan.id}</div>
                    <div className='text-2xl mb-5'>
                      ${plan.priceInCents * 0.01}
                    </div>
                  </div>

                  <span className='text-muted-foreground text-sm'>
                    {plan.description}
                  </span>
                </div>
              </CardHeader>
              <Separator />

              <CardContent>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <span className='inline-flex gap-2'>
                        <Check color='green' />
                        {feature}
                      </span>
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
