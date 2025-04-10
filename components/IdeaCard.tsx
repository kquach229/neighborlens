import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { getTimeDifference } from '@/lib/utils';

const IdeaCard = ({ idea }) => {
  const numberOfDaysSincePosting = getTimeDifference(idea.createdAt);

  return (
    <Card>
      <CardHeader>
        <h3>{idea.title}</h3>
        <span>Posted {numberOfDaysSincePosting} Ago</span>
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
