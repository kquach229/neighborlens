import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { getTimeDifference } from '@/lib/utils';

const IdeaCard = ({ idea }) => {
  const numberOfDaysSincePosting = getTimeDifference(idea.createdAt);

  return (
    <Card>
      <CardHeader>
        <div className='text-xs text-muted-foreground text-right'>
          Posted {numberOfDaysSincePosting} Ago
        </div>
        <div className='flex justify-between items-center'>
          <h3>{idea.title}</h3>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <span>{idea.problem}</span>
        </div>
      </CardContent>
      <CardFooter>{idea.targetUsers}</CardFooter>
    </Card>
  );
};

export default IdeaCard;

// id String @id @default(uuid())
// title String
// problem String
// solution String
// authorId String
// categories String[]
// // images  Image[]

// pricingModel String?
// pricingDetails String?
// author User @relation(fields: [authorId], references: [id])
// reviews Review[]
// updatedAt DateTime @updatedAt
// createdAt DateTime @default(now())
