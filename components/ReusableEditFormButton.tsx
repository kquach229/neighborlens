'use client';

import { useState, useEffect } from 'react';
import { Edit } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ReusableEditFormButton({
  data,
  FormComponent,
  dataId,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

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

  return (
    <div className='mt-10 w-full'>
      <button
        onClick={() => setIsEditing((prev) => !prev)}
        className='w-5 hover:opacity-75 text-right'>
        <Edit />
      </button>
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
