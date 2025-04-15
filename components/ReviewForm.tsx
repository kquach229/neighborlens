'use client';

import React from 'react';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  rating: z.preprocess((val) => Number(val), z.number().min(1).max(5)),
  comment: z.string().optional(),
  biggestRisk: z.string().optional(),
  competitors: z.string().optional(),
  wouldIPayForThis: z.enum(['yes', 'no', 'not sure']),
});

type FormSchema = z.infer<typeof formSchema>;

const ReviewForm = ({ ideaId, idea, alreadyReviewed }: { ideaId: string }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormSchema>({
    defaultValues: alreadyReviewed
      ? {
          rating: alreadyReviewed.rating?.toString() || '',
          comment: alreadyReviewed.comment || '',
          biggestRisk: alreadyReviewed.biggestRisk || '',
          competitors: alreadyReviewed.competitors || '',
          wouldIPayForThis: alreadyReviewed.wouldIPayForThis || '',
        }
      : {
          rating: '',
          comment: '',
          biggestRisk: '',
          wouldIPayForThis: '',
          competitors: '',
        },
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: FormSchema) => {
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, ideaId }),
      });

      if (!res.ok) throw new Error('Failed to submit review');

      reset();
      router.refresh();

      console.log('Review submitted!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className='shadow-md'>
      <form
        className='flex flex-col space-y-6 p-6 rounded-2xl'
        onSubmit={handleSubmit(onSubmit)}>
        <h3 className='text-xl font-semibold'>
          Leave a Review for "{idea?.title}"
        </h3>
        {alreadyReviewed && (
          <span className='text-xs text-red-500'>
            * You have already reviewed this idea. Each user can have 1 review
            for each idea *
          </span>
        )}

        <div className='space-y-1'>
          <Label htmlFor='rating'>Rating (1–5)</Label>
          <Input
            id='rating'
            type='number'
            step='0.5'
            min='1'
            max='5'
            className='w-full'
            disabled={alreadyReviewed}
            {...register('rating')}
          />
          {errors.rating && (
            <p className='text-sm text-red-500'>{errors.rating.message}</p>
          )}
        </div>

        <div className='space-y-1'>
          <Label htmlFor='comment'>Comment</Label>
          <Textarea
            id='comment'
            className='w-full min-h-[100px]'
            disabled={alreadyReviewed}
            {...register('comment')}
          />
          {errors.comment && (
            <p className='text-sm text-red-500'>{errors.comment.message}</p>
          )}
        </div>

        <div className='space-y-1'>
          <Label htmlFor='biggestRisk'>Biggest Risk</Label>
          <Input
            id='biggestRisk'
            className='w-full'
            disabled={alreadyReviewed}
            {...register('biggestRisk')}
          />
          {errors.biggestRisk && (
            <p className='text-sm text-red-500'>{errors.biggestRisk.message}</p>
          )}
        </div>

        <div className='space-y-1'>
          <Label htmlFor='competitors'>Competitors</Label>
          <Textarea
            id='competitors'
            className='w-full min-h-[80px]'
            disabled={alreadyReviewed}
            {...register('competitors')}
          />
          {errors.competitors && (
            <p className='text-sm text-red-500'>{errors.competitors.message}</p>
          )}
        </div>

        <div className='space-y-1'>
          <Label htmlFor='wouldIPayForThis'>Would you pay for this?</Label>
          <Controller
            control={control}
            name='wouldIPayForThis'
            render={({ field }) => (
              <Select
                disabled={alreadyReviewed}
                value={field.value}
                onValueChange={field.onChange}>
                <SelectTrigger id='wouldIPayForThis' className='w-full'>
                  <SelectValue placeholder='Select an option' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
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

        <div className='pt-2'>
          <Button disabled={alreadyReviewed} type='submit' className='w-full'>
            Submit Review
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ReviewForm;
