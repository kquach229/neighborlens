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
    problem,
    updatedAt,
    solution,
    createdAt,
    categories,
  } = idea;
  const numberOfDaysSincePosting = getTimeDifference(createdAt);
  const numberOfDaysSinceUpdated = getTimeDifference(updatedAt);

  return (
    <Card className='h-auto cursor-pointer hover:shadow-2xl duration-1000'>
      <Link href={`/ideas/idea-details/${id}`}>
        <CardHeader>
          <div className='text-xs text-muted-foreground text-right'>
            Posted {numberOfDaysSincePosting} Ago{' '}
          </div>
          <div className='flex justify-between items-center'>
            <h5>{title}</h5>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <Label>Brief Description</Label>
            {briefDescription && (
              <div className='text-muted-foreground text-sm mt-2 mb-5'>
                {substring(briefDescription, 150)}
              </div>
            )}
          </div>

          <div>
            <Label>Problem</Label>
            <div className='text-muted-foreground text-sm mt-2 mb-5'>
              {substring(problem, 300)}
            </div>
          </div>

          <div>
            <Label>Solution</Label>
            <div className='text-muted-foreground text-sm mt-2 mb-5'>
              {substring(solution, 300)}
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
