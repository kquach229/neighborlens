'use client';

import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { Button } from './ui/button';
import { Label } from '@radix-ui/react-dropdown-menu';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useDialogStore } from '@/stores/dialogStore';
import { Textarea } from './ui/textarea';
import { ReusableMultiSelct } from './ReusableMultiselect';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title must be at least 1 character',
  }),
  briefDescription: z.string().optional(),
  problem: z.string().min(5, {
    message: 'Problem must be at least 5 characters',
  }),
  solution: z.string().min(5, {
    message: 'Solution must be at least 5 characters',
  }),
  categories: z.coerce
    .string()
    .array()
    .min(1, { message: 'Select at least one category' }),
  pricingDetails: z
    .string()
    .min(5, { message: 'Pricing Details must be at least 5 characters' }),
  pricingModel: z.string().min(5, { message: 'Must select a pricing model' }),
});

type FormSchema = z.infer<typeof formSchema>;

const categoriesList = [
  { value: 'marketplace', label: 'Marketplace' },
  { value: 'b2b saas', label: 'B2B SaaS' },
  { value: 'fintech', label: 'Fintech' },
  { value: 'health & wellness', label: 'Health & Wellness' },
  { value: 'e-commerce', label: 'E-commerce' },
  { value: 'productivity', label: 'Productivity' },
  { value: 'education/learning', label: 'Education/Learning' },
  { value: 'social/community', label: 'Social/Community' },
  { value: 'climate/ustainability', label: 'Climate/Sustainability' },
];

const IdeaForm = () => {
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();
  const { closeDialog } = useDialogStore();
  const selectedCategories = watch('categories') || [];

  const onSubmit = async (data: FormSchema) => {
    await fetch('/api/ideas', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    reset();
    router.refresh();
    closeDialog();
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
        <Label>Brief Description</Label>
        <Textarea
          id='problem'
          {...register('briefDescription')}
          className='border p-2 w-full h-[3rem]'
        />
        {errors.briefDescription && (
          <p className='text-red-500 text-sm'>
            {errors.briefDescription.message}
          </p>
        )}
      </div>

      <div>
        <Label>Problem</Label>
        <Textarea
          id='problem'
          {...register('problem')}
          className='border p-2 w-full h-[7rem]'
        />
        {errors.problem && (
          <p className='text-red-500 text-sm'>{errors.problem.message}</p>
        )}
      </div>

      <div>
        <Label>Solution</Label>
        <Textarea
          id='solution'
          {...register('solution')}
          className='border p-2 w-full h-[7rem]'
        />
        {errors.solution && (
          <p className='text-red-500 text-sm'>{errors.solution.message}</p>
        )}
      </div>

      <div>
        <Label>Categories</Label>
        <div className='z-50'>
          <ReusableMultiSelct
            {...register('categories')}
            className='z-50'
            id='categories'
            options={categoriesList}
            onValueChange={(values) => {
              setValue('categories', values);
            }}
            defaultValue={selectedCategories}
            placeholder='Select categories'
            variant='inverted'
            animation={2}
            maxCount={3}
          />
          {errors.categories && (
            <p className='text-red-500 text-sm'>{errors.categories.message}</p>
          )}
        </div>
        <div className='mt-4'>
          <h2 className='text-xl font-semibold'>Selected Categories:</h2>
          <ul className='list-disc list-inside'>
            {Array.isArray(selectedCategories)
              ? selectedCategories?.map((category) => (
                  <li key={category}>{category}</li>
                ))
              : []}
          </ul>
        </div>
      </div>

      <div className='w-full'>
        <Label>Pricing Model</Label>
        <Controller
          {...register('pricingModel')}
          control={control}
          rules={{ required: true }}
          name='pricingModel'
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Pricing Model' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='light'>Free</SelectItem>
                <SelectItem value='dark'>Paid</SelectItem>
                <SelectItem value='system'>Free + Paid</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        {errors.pricingModel && (
          <p className='text-red-500 text-sm'>{errors.pricingModel.message}</p>
        )}
      </div>

      <div>
        <Label>Pricing Details</Label>
        <Textarea
          id='pricingDetails'
          {...register('pricingDetails')}
          className='border p-2 w-full'
        />
        {errors.pricingDetails && (
          <p className='text-red-500 text-sm'>
            {errors.pricingDetails.message}
          </p>
        )}
      </div>

      <Button type='submit'>Submit</Button>
    </form>
  );
};

export default IdeaForm;

// model Idea {
//   id String @id @default(uuid())
//   title String
//   problem String
//   solution String
//   authorId String
//   categories String[]
//   // images  Image[]

//   pricingModel String?
//   pricingDetails String?
//   author User @relation(fields: [authorId], references: [id])
//   reviews Review[]
//   updatedAt DateTime @updatedAt
//   createdAt DateTime @default(now())
// }
