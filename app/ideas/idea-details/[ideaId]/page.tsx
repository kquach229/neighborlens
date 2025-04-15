import auth from '@/auth';
import IdeaForm from '@/components/IdeaForm';
import ReusableEditFormButton from '@/components/ReusableEditFormButton';
import ReviewCard from '@/components/ReviewCard';
import ReviewForm from '@/components/ReviewForm';
import ReviewsComponent from '@/components/ReviewsComponent';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { prisma } from '@/lib/prisma';
import { getTimeDifference } from '@/lib/utils';

const getIdea = async (ideaId) => {
  return await prisma.idea.findUnique({
    where: { id: ideaId },
    include: { reviews: true },
  });
};

const getReviewsForIdea = async (ideaId) => {
  return await prisma.review.findMany({
    where: {
      ideaId: ideaId,
    },
    include: { user: true },
  });
};

const IdeaDetails = async ({ params, searchParams }) => {
  const { ideaId } = params;
  const idea = await getIdea(ideaId);
  const reviews = await getReviewsForIdea(ideaId);
  const session = await auth();
  const isEditing = searchParams?.isEditing;
  const numberOfDaysSincePosting = getTimeDifference(idea.createdAt);
  const numberOfDaysSinceUpdated = getTimeDifference(idea.updatedAt);
  const isAuthor = idea?.authorId === session?.user.id;
  const alreadyReviewed = idea?.reviews.find(
    (review) => review.userId == session?.user?.id
  );

  return (
    <div className='min-h-[90vh] p-5 w-full'>
      <div className='flex justify-between gap-16 items-baseline flex-col md:flex-row'>
        {!isEditing && (
          <div className='w-full'>
            <div className='flex justify-between items-center mt-10'>
              <div>
                <h1 className='mb-3'>{idea.title}</h1>
                <span className='text-muted-foreground'>
                  Posted {numberOfDaysSincePosting} ago
                </span>
              </div>
            </div>

            <div className='mt-5 space-y-5'>
              <div>
                <Label className='text-xl'>Brief Description</Label>
                <p>{idea?.briefDescription}</p>
              </div>

              <div>
                <Label className='text-xl'>Problem</Label>
                <p>{idea?.problem}</p>
              </div>

              <div>
                <Label className='text-xl'>Solution</Label>
                <p>{idea?.solution}</p>
              </div>

              <div>
                <Label className='text-xl'>Pricing Model</Label>
                <p>{idea?.pricingModel}</p>
              </div>

              <div>
                <Label className='text-xl'>Pricing Details</Label>
                <p>{idea?.pricingDetails}</p>
              </div>

              <div className='mt-5'>
                {idea.categories.map((category: string) => (
                  <Badge key={category} className='mr-2 mt-2 text-xs'>
                    {category.toUpperCase()}
                  </Badge>
                ))}
              </div>

              {numberOfDaysSinceUpdated !== numberOfDaysSincePosting && (
                <div className='text-xs text-muted-foreground'>
                  Updated {numberOfDaysSinceUpdated} ago
                </div>
              )}
            </div>
          </div>
        )}

        {isAuthor ? (
          <div
            className={`${
              isEditing ? 'w-full' : 'absolute top-20 right-20 '
            } flex flex-row`}>
            <ReusableEditFormButton
              dataId={ideaId}
              data={idea}
              FormComponent={IdeaForm}
            />
          </div>
        ) : (
          <div className='w-full md:w-2/3'>
            <ReviewForm
              alreadyReviewed={alreadyReviewed}
              ideaId={ideaId}
              idea={idea}
            />
          </div>
        )}
      </div>

      <div className='mt-32'>
        <ReviewsComponent reviews={reviews} ideaTitle={idea?.title} />
      </div>
    </div>
  );
};

export default IdeaDetails;
