import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { getTimeDifference, substring } from '@/lib/utils';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import Link from 'next/link';

const IdeaCard = ({ idea }) => {
  const {
    id,
    title,
    briefDescription,
    pricingModel,
    pricingDetails,
    updatedAt,
    problemItSolves,
    createdAt,
    categories,
    reviews,
  } = idea;
  const numberOfDaysSincePosting = getTimeDifference(createdAt);
  const numberOfDaysSinceUpdated = getTimeDifference(updatedAt);
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);

  return (
    <Card className='h-auto cursor-pointer hover:shadow-2xl duration-1000'>
      <Link href={`/ideas/idea-details/${id}`}>
        <CardHeader>
          <div className='text-right space-y-2'>
            <div className='text-xs text-muted-foreground '>
              {' '}
              Posted {numberOfDaysSincePosting} Ago{' '}
            </div>
            <div>
              {reviews.length > 0 && (
                <div className='text-sm font-medium'>
                  Avg Rating: {totalRating} / {reviews.length * 5}
                </div>
              )}
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <h5>{title}</h5>
          </div>
        </CardHeader>
        <CardContent className='mt-5'>
          <div>
            <Label>Brief Description</Label>
            {briefDescription && (
              <div className='text-muted-foreground text-sm mt-2 mb-5'>
                {substring(briefDescription, 150)}
              </div>
            )}
          </div>

          <div>
            <Label>Problem It Solves</Label>
            <div className='text-muted-foreground text-sm mt-2 mb-5'>
              {substring(problemItSolves, 300)}
            </div>
          </div>

          <div>
            <Label>Pricing Details</Label>
            <div className='text-muted-foreground text-sm mt-2 mb-5'>
              {substring(pricingDetails, 300)}
            </div>
          </div>

          <div>
            <Label>Pricing Model</Label>
            <div className='text-muted-foreground text-sm mt-2 mb-5'>
              {pricingModel}
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex flex-col items-start'>
          <div>
            {categories.map((category: string) => (
              <Badge className='mr-2 mt-2 text-xs' key={category}>
                {category.toUpperCase()}
              </Badge>
            ))}
          </div>

          {numberOfDaysSinceUpdated !== numberOfDaysSincePosting && (
            <div className='text-xs text-muted-foreground text-right mt-2'>
              Updated {numberOfDaysSinceUpdated} Ago
            </div>
          )}
        </CardFooter>
      </Link>
    </Card>
  );
};

export default IdeaCard;
