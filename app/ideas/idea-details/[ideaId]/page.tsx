import auth from '@/auth';
import AiBuddy from '@/components/AiBuddy';
import IdeaForm from '@/components/IdeaForm';
import ReusableEditFormButton from '@/components/ReusableEditFormButton';
import ReviewForm from '@/components/ReviewForm';
import ReviewsComponent from '@/components/ReviewsComponent';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { generateAIReview } from '@/lib/aiReview';
import { prisma } from '@/lib/prisma';
import { getTimeDifference } from '@/lib/utils';
import { Star } from 'lucide-react';
import Link from 'next/link';

const emptyReview: Review = {
  id: '',
  userId: '',
  ideaId: '',
  rating: 0,
  feedback: '',
};

interface Review {
  id: string;
  userId: string;
  ideaId: string;
  rating: number;
  feedback: string;
  user?: User;
}

interface User {
  id: string;
  name: string | null;
  email: string | null;
}

interface IdeaDetailsProps {
  params: any;
  searchParams: any;
}

const getIdea = async (ideaId: string) => {
  return await prisma.idea.findUnique({
    where: { id: ideaId },
    include: { reviews: true, author: true },
  });
};

const getReviewsForIdea = async (ideaId: string) => {
  return await prisma.review.findMany({
    where: {
      ideaId: ideaId,
    },
    include: { user: true },
  });
};

const IdeaDetails = async ({ params, searchParams }: IdeaDetailsProps) => {
  const { ideaId } = await params;
  const idea = await getIdea(ideaId);
  const reviews = await getReviewsForIdea(ideaId);

  const session = await auth();

  const urlSearchParams = await searchParams;
  const isEditing = urlSearchParams?.isEditing?.toString() === 'true';
  const numberOfDaysSincePosting =
    idea?.createdAt && getTimeDifference(idea.createdAt);
  const numberOfDaysSinceUpdated =
    idea?.updatedAt && getTimeDifference(idea.updatedAt);
  const isAuthor = idea?.authorId === session?.user?.id;
  const alreadyReviewed = idea?.reviews.find(
    (review) => review.userId === session?.user?.id
  );

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  if (!idea) {
    return <div>Idea not found</div>;
  }

  return (
    <div className='min-h-[90vh] p-5 w-full'>
      <Link href='/dashboard' className='text-sm text-blue-500 hover:underline'>
        <Button>Back to Dashboard</Button>
      </Link>

      <div className='flex justify-between gap-16 items-baseline flex-col md:flex-row'>
        {!isEditing && (
          <div className='w-full'>
            <div className='flex justify-between items-center mt-10'>
              <div>
                <h1 className='mb-3'>{idea.title}</h1>
                <span
                  className='text-muted-foreground'
                  title={idea.createdAt.toLocaleString()}>
                  Posted {numberOfDaysSincePosting} ago by{' '}
                  <Link
                    className='text-blue-300'
                    href={`/users/user-profile/${idea.authorId}`}>
                    {idea?.author?.name?.split(' ')[0] || 'Anonymous'}
                  </Link>
                </span>

                {reviews.length > 0 && (
                  <div className='flex items-center gap-2 mt-2 text-sm text-muted-foreground'>
                    <Star className='h-4 w-4 text-yellow-500' />
                    {averageRating.toFixed(1)} / 5 from {reviews.length}{' '}
                    {reviews.length === 1 ? 'review' : 'reviews'}
                  </div>
                )}
              </div>
            </div>

            <div className='mt-5 space-y-5'>
              <div>
                <Label className='text-xl'>Brief Description</Label>
                <p>{idea.briefDescription}</p>
              </div>

              <div>
                <Label className='text-xl'>Problem It Solves</Label>
                <p>{idea.problemItSolves}</p>
              </div>

              <div>
                <Label className='text-xl'>Pricing Model</Label>
                <p>{idea.pricingModel}</p>
              </div>

              <div>
                <Label className='text-xl'>Pricing Details</Label>
                <p>{idea.pricingDetails}</p>
              </div>

              <div className='mt-5'>
                {idea.categories.map((category: string) => (
                  <Badge key={category} className='mr-2 mt-2 text-xs'>
                    {category.toUpperCase()}
                  </Badge>
                ))}
              </div>

              {numberOfDaysSinceUpdated !== numberOfDaysSincePosting && (
                <div
                  title={idea.updatedAt.toLocaleString()}
                  className='text-xs text-muted-foreground'>
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

      {reviews.length === 0 && (
        <div className='mt-10 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800'>
          Be the first to validate this idea and share your thoughts.
        </div>
      )}

      <div className='mt-32'>
        <ReviewsComponent reviews={reviews} ideaTitle={idea.title} />
      </div>

      <div className='mt-32'>
        <AiBuddy idea={idea} />
      </div>
    </div>
  );
};

export default IdeaDetails;
