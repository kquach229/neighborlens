import React from 'react';
import ReviewCard from './ReviewCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { getReviewsAverageMarkup } from '@/lib/utils';
import { Review as PrismaReview, User } from '@prisma/client';

// Create an extended type that matches what ReviewCard expects
interface ReviewWithUser extends PrismaReview {
  user: User;
}

interface ReviewsComponentProps {
  reviews: ReviewWithUser[];
  ideaTitle: string;
}

const ReviewsComponent: React.FC<ReviewsComponentProps> = ({
  reviews,
  ideaTitle,
}) => {
  const averageRating =
    reviews.length > 0 ? getReviewsAverageMarkup(reviews, true) : null;

  return (
    <div className='w-full'>
      <h3 className='text-xl font-semibold'>Reviews For {ideaTitle}</h3>

      <div className='mt-10 p-10 w-full'>
        {reviews.length === 0 ? (
          <div className='mx-auto text-xl text-center text-gray-500'>
            No reviews yet for {ideaTitle}
          </div>
        ) : (
          <Carousel
            opts={{
              align: 'center',
              loop: true,
              skipSnaps: false,
            }}
            className='w-full max-w-5xl mx-auto'>
            <CarouselContent>
              {reviews.map((review) => (
                <CarouselItem
                  key={review.id}
                  className='md:basis-1/2 lg:basis-1/3 px-4'>
                  <ReviewCard review={review} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default ReviewsComponent;
