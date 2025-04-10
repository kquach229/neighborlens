import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { getTimeDifference } from '@/lib/utils';

const IdeaCard = ({ idea }) => {
  const numberOfDaysSincePosting = getTimeDifference(idea.createdAt);

  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between items-center'>
          <h3>{idea.title}</h3>
          <span className='text-xs text-muted-foreground'>
            Posted {numberOfDaysSincePosting} Ago
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <h6>{idea.description}</h6>
        </div>
      </CardContent>
      <CardFooter>{idea.targetUsers}</CardFooter>
    </Card>
  );
};

export default IdeaCard;
