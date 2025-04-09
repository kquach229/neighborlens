'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from './ui/button';
import { Label } from '@radix-ui/react-dropdown-menu';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters',
  }),
  description: z.string().min(5, {
    message: 'Description must be at least 5 characters',
  }),
  targetUsers: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

const ReusableForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormSchema) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div>
        <Label>Title</Label>
        <input
          id='title'
          {...register('title')}
          type='text'
          className='border p-2 w-full'
        />
        {errors.title && (
          <p className='text-red-500 text-sm'>{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label>Description</Label>
        <input
          id='description'
          {...register('description')}
          type='text'
          className='border p-2 w-full'
        />
        {errors.description && (
          <p className='text-red-500 text-sm'>{errors.description.message}</p>
        )}
      </div>

      <div>
        <Label>Target Users</Label>
        <input
          id='targetUsers'
          {...register('targetUsers')}
          type='text'
          className='border p-2 w-full'
        />
      </div>

      <Button type='submit'>Submit</Button>
    </form>
  );
};

export default ReusableForm;
