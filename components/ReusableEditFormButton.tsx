'use client';

import { useState } from 'react';
import { Edit } from 'lucide-react';

export default function ReusableEditFormButton({
  data,
  FormComponent,
  dataId,
  isEditing,
  setIsEditing,
}) {
  if (isEditing) {
    return (
      <div className='mt-10'>
        <FormComponent
          dataId={dataId}
          data={data}
          onClose={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <button onClick={() => setIsEditing(true)} className='hover:opacity-75'>
      <Edit />
    </button>
  );
}
