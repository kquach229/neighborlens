'use client';

import IdeaForm from '@/components/IdeaForm';
import ReusableEditFormButton from '@/components/ReusableEditFormButton';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { getTimeDifference } from '@/lib/utils';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const IdeaDetails = () => {
  const params = useParams();
  const [idea, setIdea] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchIdea = async () => {
      const res = await fetch(`/api/ideas/${params.ideaId}`);
      const data = await res.json();
      setIdea(data);
    };

    fetchIdea();
  }, [params.ideaId]);

  if (!idea) return <div>Loading...</div>;

  const numberOfDaysSincePosting = getTimeDifference(idea.createdAt);
  const numberOfDaysSinceUpdated = getTimeDifference(idea.updatedAt);

  return (
    <div className='min-h-[90vh] p-5'>
      <div className='flex justify-end'>
        <ReusableEditFormButton
          dataId={params.ideaId}
          data={idea}
          FormComponent={IdeaForm}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </div>

      {!isEditing && (
        <>
          <div className='flex justify-between items-center mt-10'>
            <div>
              <h1>{idea.title}</h1>
              <span className='text-muted-foreground'>
                Posted {numberOfDaysSincePosting} ago
              </span>
            </div>
          </div>

          <div className='mt-5'>
            <Label className='text-xl'>Brief Description</Label>
            <span>{idea?.briefDescription}</span>
          </div>

          <div className='mt-5'>
            <Label className='text-xl'>Problem</Label>
            <span>{idea?.problem}</span>
          </div>

          <div className='mt-5'>
            <Label className='text-xl'>Solution</Label>
            <span>{idea?.solution}</span>
          </div>

          <div className='mt-5'>
            <Label className='text-xl'>Pricing Model</Label>
            <span>{idea?.pricingModel}</span>
          </div>

          <div className='mt-5'>
            <Label className='text-xl'>Pricing Details</Label>
            <span>{idea?.pricingDetails}</span>
          </div>

          <div className='mt-10'>
            {idea.categories.map((category: string) => (
              <Badge className='mr-2 mt-2 text-xs' key={category}>
                {category.toUpperCase()}
              </Badge>
            ))}
          </div>

          {numberOfDaysSinceUpdated !== numberOfDaysSincePosting && (
            <div className='text-xs text-muted-foreground text-right mt-2'>
              Updated {numberOfDaysSinceUpdated} ago
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default IdeaDetails;
