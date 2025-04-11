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

const IdeaDetails = async ({ params }) => {
  const { ideaId } = await params;
  const idea = await getIdea(ideaId);
  const numberOfDaysSincePosting = getTimeDifference(idea.createdAt);
  const numberOfDaysSinceUpdated = getTimeDifference(idea.updatedAt);
  return (
    <div className='min-h-[90vh] p-5'>
      <div className='mt-20'>
        <h1 className=''>{idea.title}</h1>
        <span className='text-muted-foreground'>
          Posted {numberOfDaysSincePosting} ago
        </span>
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
  );
};

export default IdeaDetails;
