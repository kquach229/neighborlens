import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Label } from './ui/label';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Review as PrismaReview, User as PrismaUser } from '@prisma/client';

interface ExtendedReview extends PrismaReview {
  user: PrismaUser;
}

interface ReviewCardProps {
  review: ExtendedReview;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const {
    rating,
    comment,
    whatILike,
    whatIDislike,
    suggestions,
    wouldIPayForThis,
    createdAt,
    user,
  } = review;

  // Validate rating is between 1-5
  const validatedRating = Math.min(Math.max(Math.round(rating), 1), 5);

  const stars = Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={cn(
        'h-4 w-4',
        i < validatedRating
          ? 'fill-yellow-400 text-yellow-400'
          : 'text-gray-300'
      )}
    />
  ));

  // Format date safely
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

  // Safely handle user name
  const userName = user?.name?.split(' ')[0] || 'Anonymous';

  return (
    <Card className='hover:shadow-md transition-shadow duration-200'>
      <CardHeader className='space-y-2'>
        <div className='flex items-center gap-2'>
          <span className='text-sm text-muted-foreground'>
            <Link
              href={`/users/user-profile/${user.id}`}
              className='hover:text-primary transition-colors'>
              {userName}
            </Link>
            {formattedDate && ` · ${formattedDate}`}
          </span>
        </div>
        <div className='flex gap-1'>{stars}</div>
        {comment && (
          <p className='text-base text-muted-foreground leading-relaxed italic'>
            &ldquo;{comment}&rdquo;
          </p>
        )}
      </CardHeader>

      <CardContent className='space-y-4 text-sm'>
        {whatILike && (
          <div>
            <Label className='text-xs'>What I Like</Label>
            <p className='text-muted-foreground'>{whatILike}</p>
          </div>
        )}
        {whatIDislike && (
          <div>
            <Label className='text-xs'>What I Dislike</Label>
            <p className='text-muted-foreground'>{whatIDislike}</p>
          </div>
        )}
        {wouldIPayForThis && (
          <div>
            <Label className='text-xs'>Would I pay for this?</Label>
            <p className='text-muted-foreground'>
              {wouldIPayForThis === 'true' ? 'Yes' : 'No'}
            </p>
          </div>
        )}
        {suggestions && (
          <div>
            <Label className='text-xs'>Suggestions</Label>
            <p className='text-muted-foreground'>{suggestions}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
