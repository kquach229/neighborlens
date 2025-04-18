'use client';

import { useState, useEffect } from 'react';
import { Edit, Trash } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Card, CardContent } from './ui/card';
import { useDialogStore } from '@/stores/dialogStore';
import { Button } from './ui/button';

export default function ReusableEditFormButton({
  data,
  FormComponent,
  dataId,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const { openDialog, closeDialog } = useDialogStore();

  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams.toString());

    if (isEditing) {
      currentParams.set('isEditing', 'true');
    } else {
      currentParams.delete('isEditing');
    }

    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
    router.replace(newUrl, { scroll: false });
  }, [isEditing, router, searchParams]);

  const DeleteIdeaDialog = ({ dataId, data }) => {
    return (
      <div className='p-6 text-center space-y-6'>
        <h3 className='text-xl font-semibold'>
          Delete idea <span className='italic'>&quot;{data.title}&quot;</span>?
        </h3>
        <p className='text-muted-foreground text-sm'>
          This action cannot be undone. Are you sure you want to delete this
          idea?
        </p>

        <div className='flex justify-center gap-4 pt-2'>
          <Button
            variant='outline'
            className='w-[6rem]'
            onClick={() => closeDialog()}>
            Cancel
          </Button>
          <Button
            variant='destructive'
            className='w-[6rem]'
            onClick={() => handleDeleteIdea(dataId)}>
            Delete
          </Button>
        </div>
      </div>
    );
  };

  const handleDeleteIdea = async () => {
    const res = await fetch(`/api/ideas/${dataId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    router.push('/dashboard');

    if (res.ok) {
      closeDialog();
      toast.success('Idea deleted successfully');
    }
  };

  return (
    <div className='mt-10 w-full'>
      <div className='flex justify-between mb-5 gap-5'>
        {isEditing && <h3>Editing Mode</h3>}
        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className='w-5 hover:opacity-75 text-right'>
          <Edit />
        </button>

        <Trash onClick={() => openDialog(DeleteIdeaDialog, { dataId, data })} />
      </div>

      {isEditing && (
        <FormComponent
          dataId={dataId}
          data={data}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}
