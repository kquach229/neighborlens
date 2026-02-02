'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { StarIcon, Quote } from 'lucide-react';

const testimonials = [
  {
    quote:
      "ValidateLens helped me realize I was solving a non-problem. That insight saved me months of wasted effort.",
    author: 'Alex Rivera',
    role: 'Early-Stage Founder',
    avatar: '/lily.jpeg',
    rating: 5,
  },
  {
    quote:
      "As a validator, I enjoy giving feedback—and I've discovered ideas I'd actually invest in.",
    author: 'Maya Chen',
    role: 'Product Manager & Validator',
    avatar: '/validator.jpeg',
    rating: 5,
  },
  {
    quote:
      'The structured feedback format is brilliant. It helped me identify critical flaws before I wrote a single line of code.',
    author: 'Sarah Johnson',
    role: 'Tech Founder',
    avatar: '/lily.jpeg',
    rating: 5,
  },
];

export default function EnhancedTestimonials() {
  return (
    <section className='py-16 md:py-24 bg-muted/20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold mb-3'>
            Loved by Founders & Validators
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            See how others are validating smarter and building better products.
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className='hover:shadow-xl transition-shadow duration-300 border-border'>
              <CardContent className='pt-6'>
                <div className='flex items-start gap-3 mb-4'>
                  <Quote className='w-8 h-8 text-primary/20 flex-shrink-0' />
                  <p className='text-sm leading-relaxed italic text-foreground'>
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className='flex gap-1 mb-4'>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className='w-4 h-4 fill-yellow-500 text-yellow-500'
                    />
                  ))}
                </div>
              </CardContent>
              <CardFooter className='flex items-center gap-3 pt-0'>
                <Avatar>
                  <AvatarImage src={testimonial.avatar} />
                  <AvatarFallback>
                    {testimonial.author.split(' ')[0][0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className='font-semibold text-sm'>
                    {testimonial.author}
                  </div>
                  <div className='text-xs text-muted-foreground'>
                    {testimonial.role}
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
