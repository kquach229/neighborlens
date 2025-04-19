import React from 'react';
import ReviewCard from './ReviewCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

const ReviewsComponent = ({ reviews, ideaTitle }) => {
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (
    <div>
      <h3>Reviews For {ideaTitle} </h3>

      <div className='mt-5'>
        {reviews.length > 0 && (
          <div className='text-sm font-medium'>
            Average Rating: {totalRating} / {reviews.length * 5} Based On{' '}
            {reviews.length} {reviews.length > 1 ? 'Reviews' : 'Review'}
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
