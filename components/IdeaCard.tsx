import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import {
  getReviewsAverageMarkup,
  getTimeDifference,
  substring,
} from '@/lib/utils';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import Link from 'next/link';
import { Idea } from '@/types/types';

interface IdeaCardProps {
  idea: Idea;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea }) => {
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

  return (
    <Card className='h-auto cursor-pointer hover:shadow-2xl transition-shadow duration-300'>
      <Link href={`/ideas/idea-details/${id}`} passHref>
        <CardHeader>
          <div className='text-right space-y-2'>
            <div className='text-xs text-muted-foreground'>
              Posted {numberOfDaysSincePosting} ago
            </div>

            {reviews && (
              <div className='text-sm font-medium'>
                {getReviewsAverageMarkup(reviews, false)}
              </div>
            )}
          </div>
          <div className='flex justify-between items-center'>
            <h5 className='text-lg font-semibold'>{title}</h5>
          </div>
        </CardHeader>

        <CardContent className='mt-5 space-y-6'>
          <div>
            <Label>Brief Description</Label>
            {briefDescription && (
              <p className='text-muted-foreground text-sm mt-2'>
                {substring(briefDescription, 150)}
              </p>
            )}
          </div>

          <div>
            <Label>Problem It Solves</Label>
            <p className='text-muted-foreground text-sm mt-2'>
              {substring(problemItSolves, 300)}
            </p>
          </div>

          <div>
            <Label>Pricing Details</Label>
            <p className='text-muted-foreground text-sm mt-2'>
              {substring(pricingDetails, 300)}
            </p>
          </div>

          <div>
            <Label>Pricing Model</Label>
            <p className='text-muted-foreground text-sm mt-2'>{pricingModel}</p>
          </div>
        </CardContent>

        <CardFooter className='flex flex-col items-start gap-2'>
          <div className='flex flex-wrap gap-2 mt-2'>
            {categories.map((category) => (
              <Badge
                variant='secondary'
                className='text-xs capitalize'
                key={category}>
                {category}
              </Badge>
            ))}
          </div>

          {numberOfDaysSinceUpdated !== numberOfDaysSincePosting && (
            <div className='text-xs text-muted-foreground w-full text-right mt-2'>
              Updated {numberOfDaysSinceUpdated} ago
            </div>
          )}
        </CardFooter>
      </Link>
    </Card>
  );
};

export default IdeaCard;
