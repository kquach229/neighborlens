import React from 'react';
import ReviewCard from './ReviewCard';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';

const ReviewsComponent = ({ reviews, ideaTitle }) => {
  return (
    <div>
      <h3>Reviews For {ideaTitle} </h3>

      <Carousel>
        <CarouselContent>
          {reviews.map((review) => (
            <CarouselItem key={review.id}>
              <ReviewCard review={review} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* <div>
        {reviews.length ? (
          reviews.map((review) => <ReviewCard review={review} />)
        ) : (
          <div>No reviews yet for {ideaTitle}</div>
        )}
      </div> */}
    </div>
  );
};

export default ReviewsComponent;
