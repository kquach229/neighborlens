import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';

const IdeaCard = ({ idea }) => {
  return (
    <Card>
      <CardHeader>
        <h3>{idea.title}</h3>
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
