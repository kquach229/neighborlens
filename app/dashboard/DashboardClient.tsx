'use client';

import IdeaCard from '@/components/IdeaCard';
import { ROLES, useRoleStore } from '@/stores/roleStore';
import RoleToggle from '@/components/RoleToggle';
import { Button } from '@/components/ui/button';
import { useDialogStore } from '@/stores/dialogStore';
import IdeaForm from '@/components/IdeaForm';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import SignInButton from '@/components/SignInButton';

// Reusable grid for displaying ideas
const IdeasGrid = ({ ideas }) => {
  if (ideas.length === 0) return null;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} />
      ))}
    </div>
  );
};

// Section block with heading + grid
const Section = ({ title, ideas, emptyMessage }) => (
  <section className='mt-16'>
    <h4 className='text-lg font-semibold'>{title}</h4>
    {ideas.length > 0 ? (
      <IdeasGrid ideas={ideas} />
    ) : (
      <p className='text-muted-foreground mt-5'>{emptyMessage}</p>
    )}
  </section>
);

// Create Idea Button
const CreateIdeaButton = () => {
  const { openDialog } = useDialogStore();

  return (
    <Button onClick={() => openDialog(IdeaForm, { title: 'Create Your Idea' })}>
      Create Idea
    </Button>
  );
};

// Founder View
const FounderView = ({ ownIdeas }) => {
  return (
    <div>
      <div className='flex justify-end'>
        <CreateIdeaButton />
      </div>

      {ownIdeas.length < 1 ? (
        <div className='flex flex-col items-center justify-center min-h-[50vh]'>
          <h3 className='text-center mt-10'>You currently have no ideas.</h3>
        </div>
      ) : (
        <IdeasGrid ideas={ownIdeas} />
      )}
    </div>
  );
};

// Validator View
const ValidatorView = ({ notYetValidated, reviewedIdeas }) => (
  <div>
    <Section
      title='Waiting for Validation'
      ideas={notYetValidated}
      emptyMessage='No new ideas to validate.'
    />
    <Section
      title='Already Validated by You'
      ideas={reviewedIdeas}
      emptyMessage="You haven't reviewed any ideas yet."
    />
  </div>
);

// Main Dashboard Client
const DashboardClient = ({ allIdeas }) => {
  const { role } = useRoleStore();
  const session = useSession();
  const currentUserId = session.data?.user.id;

  const { ownIdeas, reviewedIdeas, notYetValidated } = useMemo(() => {
    const own = [];
    const reviewed = [];
    const notValidated = [];

    for (const idea of allIdeas) {
      const isOwn = idea.authorId === currentUserId;
      const hasReviewed = idea.reviews.some(
        (review) => review.userId === currentUserId
      );

      if (isOwn) own.push(idea);
      else if (hasReviewed) reviewed.push(idea);
      else notValidated.push(idea);
    }

    return {
      ownIdeas: own,
      reviewedIdeas: reviewed,
      notYetValidated: notValidated,
    };
  }, [allIdeas, currentUserId]);

  if (!session.data?.user) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4'>
        <Card className='w-full max-w-md shadow-xl'>
          <CardHeader>
            <h2 className='text-2xl font-bold text-center'>Welcome Back</h2>
            <p className='text-sm text-gray-500 text-center mt-1'>
              Sign in to continue to ValidatorLens
            </p>
          </CardHeader>
          <CardContent className='space-y-4'>
            <SignInButton />
            <div className='text-center text-sm text-gray-500'>
              Don’t have an account? Contact the admin to join.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col'>
          <h2 className='text-2xl font-bold'>Dashboard</h2>
          <h5 className='mt-2 text-muted-foreground'>
            {role === ROLES.FOUNDER
              ? `My Ideas (${ownIdeas.length})`
              : 'Ideas to Validate'}
          </h5>
        </div>
        <RoleToggle />
      </div>

      {role === ROLES.FOUNDER ? (
        <FounderView ownIdeas={ownIdeas} />
      ) : (
        <ValidatorView
          notYetValidated={notYetValidated}
          reviewedIdeas={reviewedIdeas}
        />
      )}
    </div>
  );
};

export default DashboardClient;
