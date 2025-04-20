'use client';

import { FC, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import IdeaCard from '@/components/IdeaCard';
import { ROLES, useRoleStore } from '@/stores/roleStore';
import RoleToggle from '@/components/RoleToggle';
import DashboardMetrics from './DashboardMetrics';
import CreateIdeaButton from '@/components/CreateIdeaButton';
import Loading from '../loading';

import type { Idea } from '@/types/types';

type DashboardClientProps = {
  allIdeas: Idea[];
};

type IdeasGridProps = {
  ideas: Idea[];
};

type SectionProps = {
  title: string;
  ideas: Idea[];
  emptyMessage: string;
};

type FounderViewProps = {
  ownIdeas: Idea[];
};

type ValidatorViewProps = {
  reviewedIdeas: Idea[];
  notYetValidated: Idea[];
};

const IdeasGrid: FC<IdeasGridProps> = ({ ideas }) => {
  if (ideas.length === 0) return null;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} />
      ))}
    </div>
  );
};

const Section: FC<SectionProps> = ({ title, ideas, emptyMessage }) => (
  <section className='mt-16'>
    <h4 className='text-lg font-semibold'>{title}</h4>
    {ideas.length > 0 ? (
      <IdeasGrid ideas={ideas} />
    ) : (
      <p className='text-muted-foreground mt-5'>{emptyMessage}</p>
    )}
  </section>
);

const FounderView: FC<FounderViewProps> = ({ ownIdeas }) => {
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

const ValidatorView: FC<ValidatorViewProps> = ({
  notYetValidated,
  reviewedIdeas,
}) => (
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

const DashboardClient: FC<DashboardClientProps> = ({ allIdeas }) => {
  const { data: session, status } = useSession();
  const { role } = useRoleStore();

  if (status === 'loading') return <Loading />;
  if (!session?.user?.id) return null;

  const currentUserId = session.user.id;

  const ownIdeas: Idea[] = [];
  const reviewedIdeas: Idea[] = [];
  const notYetValidated: Idea[] = [];

  for (const idea of allIdeas) {
    const isOwn = idea.authorId === currentUserId;
    const hasReviewed = (idea.reviews ?? []).some(
      (review) => review.userId === currentUserId
    );

    if (isOwn) ownIdeas.push(idea);
    else if (hasReviewed) reviewedIdeas.push(idea);
    else notYetValidated.push(idea);
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

      <div className='w-full mt-20'>
        <h5>Metrics</h5>
        <Suspense fallback={<div>Loading....</div>}>
          <DashboardMetrics role={role} />
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardClient;
