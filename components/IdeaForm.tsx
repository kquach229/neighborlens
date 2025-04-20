'use client';

import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDialogStore } from '@/stores/dialogStore';
import { Textarea } from './ui/textarea';
import { ReusableMultiSelct } from './ReusableMultiselect';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from './ui/select';
import { Input } from './ui/input';
import { toast } from 'sonner';

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title must be at least 1 character',
  }),
  briefDescription: z
    .string()
    .min(5, { message: 'Brief description must be at least 5 characters' }),
  problemItSolves: z.string().min(5, {
    message: 'Problem Solved must be at least 5 characters',
  }),
  categories: z.coerce
    .string()
    .array()
    .min(1, { message: 'Select at least one category' }),
  pricingDetails: z
    .string()
    .min(5, { message: 'Pricing Details must be at least 5 characters' }),
  pricingModel: z.string().nonempty({ message: 'Must select a pricing model' }),
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

const IdeaForm = ({ dataId, data, onSuccess, onClose, setCredits }) => {
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<FormSchema>({
    defaultValues: data || {
      title: '',
      briefDescription: '',
      problemItSolves: '',
      categories: [],
      pricingModel: '',
      pricingDetails: '',
    },
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();
  const { closeDialog } = useDialogStore();
  const selectedCategories = watch('categories') || [];
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');

  const onSubmit = async (data: FormSchema) => {
    const method = isEditing ? 'PUT' : 'POST';
    const endpoint = isEditing ? `/api/ideas/${dataId}` : `/api/ideas/`;

    const res = await fetch(endpoint, {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      toast.success(isEditing ? 'Idea updated!' : 'Idea created!');
    } else {
      const error = await res.json();
      toast.error(error.message || 'Something went wrong');
    }

    reset();
    closeDialog();
    onClose?.();
    router.refresh();
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <h3 className='text-xl font-semibold'>Submit an Idea</h3>

      <div className='space-y-2'>
        <Label>Title</Label>
        <Input
          {...register('title')}
          type='text'
          className='border p-2 w-full'
        />
        {errors.title && (
          <p className='text-red-500 text-sm'>{errors.title.message}</p>
        )}
      </div>

      <div className='space-y-2'>
        <Label>Brief Description</Label>
        <Textarea
          {...register('briefDescription')}
          className='border p-2 w-full h-[7rem]'
        />
        {errors.briefDescription && (
          <p className='text-red-500 text-sm'>
            {errors.briefDescription.message}
          </p>
        )}
      </div>
      <div className='space-y-2'>
        <Label>Problem It Solves</Label>
        <Textarea
          {...register('problemItSolves')}
          className='border p-2 w-full h-[10rem]'
        />
        {errors.problemItSolves && (
          <p className='text-red-500 text-sm'>
            {errors.problemItSolves.message}
          </p>
        )}
      </div>

      <div className='space-y-2'>
        <Label>Categories</Label>
        <ReusableMultiSelct
          className='z-50'
          options={categoriesList}
          onValueChange={(values) => setValue('categories', values)}
          defaultValue={selectedCategories}
          placeholder='Select categories'
          variant='inverted'
          animation={2}
          maxCount={3}
        />
        {errors.categories && (
          <p className='text-red-500 text-sm'>{errors.categories.message}</p>
        )}
        {selectedCategories.length > 0 && (
          <ul className='mt-2 list-disc list-inside text-sm text-gray-700'>
            {selectedCategories.map((category) => (
              <li key={category}>{category}</li>
            ))}
          </ul>
        )}
      </div>

      <div className='space-y-2'>
        <Label>Pricing Model</Label>
        <Controller
          control={control}
          name='pricingModel'
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Pricing Model' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Plans</SelectLabel>
                  <SelectItem value='free'>Free</SelectItem>
                  <SelectItem value='paid'>Paid</SelectItem>
                  <SelectItem value='free + paid'>Free + Paid</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.pricingModel && (
          <p className='text-red-500 text-sm'>{errors.pricingModel.message}</p>
        )}
      </div>

      <div className='space-y-2'>
        <Label>Pricing Details</Label>
        <Textarea
          {...register('pricingDetails')}
          className='border p-2 w-full'
        />
        {errors.pricingDetails && (
          <p className='text-red-500 text-sm'>
            {errors.pricingDetails.message}
          </p>
        )}
      </div>

      <Button
        type='submit'
        className='bg-black text-white py-2 px-4 rounded hover:bg-gray-900 transition'>
        {data ? 'Update Idea' : 'Create Idea'}
      </Button>
    </form>
  );
};

export default IdeaForm;
