import auth from '@/auth';
import IdeaForm from '@/components/IdeaForm';
import ReusableEditFormButton from '@/components/ReusableEditFormButton';
import ReviewForm from '@/components/ReviewForm';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { prisma } from '@/lib/prisma';
import { getTimeDifference } from '@/lib/utils';

const getIdea = async (ideaId) => {
  const idea = await prisma.idea.findUnique({
    where: {
      id: ideaId,
    },
  });
  return idea;
};

const IdeaDetails = async ({ params, searchParams }) => {
  const { ideaId } = await params;
  const idea = await getIdea(ideaId);
  const numberOfDaysSincePosting = getTimeDifference(idea.createdAt);
  const numberOfDaysSinceUpdated = getTimeDifference(idea.updatedAt);
  const { isEditing } = await searchParams;
  const session = await auth();

  return (
    <div className='min-h-[90vh] p-5 flex justify-between gap-10 items-baseline'>
      {!isEditing && (
        <div>
          <div className='flex justify-between items-cetner'>
            <div className='mt-10'>
              <h1 className='mb-3'>{idea.title}</h1>
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
              Updated {numberOfDaysSinceUpdated} Ago
            </div>
          )}
        </div>
      )}

      {
        // Founder specific
        idea?.authorId === session?.user.id ? (
          <div className='flex justify-end'>
            <div className='flex-1'>
              <ReusableEditFormButton
                dataId={ideaId}
                data={idea}
                FormComponent={IdeaForm}
              />
              {/* 👈 client button toggle */}
            </div>
          </div>
        ) : (
          <div className='flex-1'>
            <ReviewForm ideaId={ideaId} idea={idea} />
          </div>
        )
      }

      {
        // Validator Specific
      }
    </div>
  );
};

export default IdeaDetails;
