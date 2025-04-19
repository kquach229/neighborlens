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

const ReviewsComponent = ({ reviews, ideaTitle }) => {
  return (
    <div>
      <h3>Reviews For {ideaTitle} </h3>

      <div className='mt-5'>
        {reviews.length > 0 && (
          <div className='text-sm font-medium'>
            Average Rating: {getReviewsAverageMarkup(reviews, true)}
          </div>
        )}
      </div>

      <div className='mt-10 p-10 w-full'>
        {!reviews.length ? (
          <div className='mx-auto text-xl'>No reviews yet for {ideaTitle} </div>
        ) : (
          <Carousel
            opts={{ align: 'center' }}
            className='w-full max-w-5xl mx-auto'>
            <CarouselContent>
              {reviews.map((review) => (
                <CarouselItem
                  key={review.id}
                  className='md:basis-1/2 lg:basis-1/3'>
                  <ReviewCard review={review} />
                </CarouselItem>
              ))}
            </CarouselContent>
            {reviews.length >= 3 && (
              <div>
                <CarouselPrevious />
                <CarouselNext />
              </div>
            )}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default ReviewsComponent;
