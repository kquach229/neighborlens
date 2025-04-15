import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Label } from './ui/label';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const ReviewCard = ({ review }) => {
  const {
    rating,
    comment,
    biggestRisk,
    competitors,
    wouldIPayForThis,
    createdAt,
    user,
  } = review;

  const stars = Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={cn(
        'h-4 w-4',
        i < Math.round(rating)
          ? 'fill-yellow-400 text-yellow-400'
          : 'text-gray-300'
      )}
    />
  ));

  return (
    <Card>
      <CardHeader className='space-y-2'>
        <div className='flex items-center gap-2'>
          <span className='text-sm text-muted-foreground'>
            {(
              <Link href={`/users/user-profile/${user.id}`}>
                {user.name.split(' ')[0]}
              </Link>
            ) || 'Anonymous'}
            · {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className='flex gap-1'>{stars}</div>
        {comment && (
          <p className='text-base text-muted-foreground leading-relaxed'>
            {comment}
          </p>
        )}
      </CardHeader>

      <CardContent className='space-y-4 text-sm'>
        {biggestRisk && (
          <div>
            <Label className='text-xs'>Biggest Risk</Label>
            <p className='text-muted-foreground'>{biggestRisk}</p>
          </div>
        )}

        {competitors && (
          <div>
            <Label className='text-xs'>Competitors</Label>
            <p className='text-muted-foreground'>{competitors}</p>
          </div>
        )}
        {wouldIPayForThis && (
          <div className='text-sm'>
            <Label className='text-xs'>Would I pay for this?</Label>
            <p className='text-muted-foreground'>{wouldIPayForThis}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
