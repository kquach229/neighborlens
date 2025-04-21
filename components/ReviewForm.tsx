'use client';

import React from 'react';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { z } from 'zod';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from './ui/select';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

// ---- Zod schema for validation
const formSchema = z.object({
  rating: z.preprocess((val) => Number(val), z.number().min(1).max(5)),
  comment: z.string().min(5, { message: 'Minimum of 5 characters required' }),
  whatILike: z.string().min(5, { message: 'Minimum of 5 characters required' }),
  whatIDislike: z
    .string()
    .min(5, { message: 'Minimum of 5 characters required' }),
  wouldIPayForThis: z.enum(['yes', 'no', 'not sure']),
  suggestions: z
    .string()
    .min(5, { message: 'Minimum of 5 characters required' }),
});

type FormSchema = z.infer<typeof formSchema>;

type AlreadyReviewed = {
  rating: number;
  comment: string;
  whatILike: string;
  whatIDislike: string;
  suggestions: string;
  wouldIPayForThis: 'yes' | 'no' | 'not sure';
};

interface ReviewFormProps {
  ideaId: string;
  idea?: { title: string };
  alreadyReviewed?: AlreadyReviewed;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  ideaId,
  idea,
  alreadyReviewed,
}) => {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: alreadyReviewed
      ? { ...alreadyReviewed }
      : {
          rating: 1,
          comment: '',
          whatILike: '',
          whatIDislike: '',
          suggestions: '',
          wouldIPayForThis: 'not sure',
        },
  });

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, ideaId }),
      });

      if (!res.ok) throw new Error('Failed to submit review');

      reset();
      router.refresh();
      toast.success('Review submitted!');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <Card className='shadow-md'>
      <form
        onSubmit={handleSubmit((data: FormSchema) => onSubmit(data))}
        className='flex flex-col space-y-6 p-6 rounded-2xl'>
        <h3 className='text-xl font-semibold'>
          Leave a Review for "{idea?.title}"
        </h3>

        {alreadyReviewed && (
          <span className='text-xs text-red-500'>
            * You have already reviewed this idea. Each user can have 1 review
            for each idea *
          </span>
        )}

        {/* Rating */}
        <div className='space-y-3'>
          <Label htmlFor='rating'>Rating (1–5)</Label>
          <Input
            id='rating'
            type='number'
            step='0.5'
            min='1'
            max='5'
            disabled={!!alreadyReviewed}
            {...register('rating')}
          />
          {errors.rating && (
            <p className='text-sm text-red-500'>{errors.rating.message}</p>
          )}
        </div>

        {/* Comment */}
        <div className='space-y-3'>
          <Label htmlFor='comment'>Comment</Label>
          <Textarea
            id='comment'
            className='w-full min-h-[100px]'
            disabled={!!alreadyReviewed}
            {...register('comment')}
          />
          {errors.comment && (
            <p className='text-sm text-red-500'>{errors.comment.message}</p>
          )}
        </div>

        {/* What I Like */}
        <div className='space-y-3'>
          <Label htmlFor='whatILike'>What I Like</Label>
          <Textarea
            id='whatILike'
            className='w-full'
            disabled={!!alreadyReviewed}
            {...register('whatILike')}
          />
          {errors.whatILike && (
            <p className='text-sm text-red-500'>{errors.whatILike.message}</p>
          )}
        </div>

        {/* What I Dislike */}
        <div className='space-y-3'>
          <Label htmlFor='whatIDislike'>What I Dislike</Label>
          <Textarea
            id='whatIDislike'
            className='w-full'
            disabled={!!alreadyReviewed}
            {...register('whatIDislike')}
          />
          {errors.whatIDislike && (
            <p className='text-sm text-red-500'>
              {errors.whatIDislike.message}
            </p>
          )}
        </div>

        {/* Would You Pay For This */}
        <div className='space-y-3'>
          <Label htmlFor='wouldIPayForThis'>Would you pay for this?</Label>
          <Controller
            control={control}
            name='wouldIPayForThis'
            render={({ field }) => (
              <Select
                disabled={!!alreadyReviewed}
                value={field.value}
                onValueChange={field.onChange}>
                <SelectTrigger id='wouldIPayForThis'>
                  <SelectValue placeholder='Select an option' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select One</SelectLabel>
                    <SelectItem value='yes'>Yes</SelectItem>
                    <SelectItem value='no'>No</SelectItem>
                    <SelectItem value='not sure'>Not Sure</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.wouldIPayForThis && (
            <p className='text-sm text-red-500'>
              {errors.wouldIPayForThis.message}
            </p>
          )}
        </div>

        {/* Suggestions */}
        <div className='space-y-3'>
          <Label htmlFor='suggestions'>Suggestions</Label>
          <Textarea
            id='suggestions'
            className='w-full'
            disabled={!!alreadyReviewed}
            {...register('suggestions')}
          />
          {errors.suggestions && (
            <p className='text-sm text-red-500'>{errors.suggestions.message}</p>
          )}
        </div>

        <div className='pt-2'>
          <Button type='submit' className='w-full' disabled={!!alreadyReviewed}>
            Submit Review
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ReviewForm;
