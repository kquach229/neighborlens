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

const formSchema = z.object({
  rating: z.preprocess((val) => Number(val), z.number().min(1).max(5)),
  comment: z.string().optional(),
  biggestRisk: z.string().optional(),
  competitors: z.string().optional(),
  wouldIPayForThis: z.enum(['yes', 'no', 'not sure']),
});

type FormSchema = z.infer<typeof formSchema>;

const ReviewForm = ({ ideaId, idea }: { ideaId: string }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

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
      console.log('Review submitted!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      className='flex flex-col space-y-6 p-6 bg-white border border-gray-200 rounded-2xl shadow-md'
      onSubmit={handleSubmit(onSubmit)}>
      <h3 className='text-xl font-semibold text-gray-800'>
        Leave a Review for "{idea.title}"
      </h3>

      <div className='space-y-1'>
        <Label htmlFor='rating'>Rating (1–5)</Label>
        <Input
          id='rating'
          type='number'
          step='0.5'
          min='1'
          max='5'
          className='w-full'
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
            <Select value={field.value} onValueChange={field.onChange}>
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
        <Button type='submit' className='w-full'>
          Submit Review
        </Button>
      </div>
    </form>
  );
};

export default ReviewForm;
