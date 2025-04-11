import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { getTimeDifference, substring } from '@/lib/utils';
import { Badge } from './ui/badge';
import { Label } from './ui/label';

const IdeaCard = ({ idea }) => {
  const {
    title,
    briefDescription,
    problem,
    updatedAt,
    solution,
    pricingModel,
    pricingDetails,
    createdAt,
    categories,
  } = idea;
  const numberOfDaysSincePosting = getTimeDifference(createdAt);
  const numberOfDaysSinceUpdated = getTimeDifference(updatedAt);
  console.log(idea);
  return (
    <Card className='h-auto cursor-pointer hover:shadow-2xl duration-1000'>
      <CardHeader>
        <div className='text-xs text-muted-foreground text-right'>
          Posted {numberOfDaysSincePosting} Ago
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
    </Card>
  );
};

export default IdeaCard;
