'use client';
import IdeaCard from '@/components/IdeaCard';
import { ROLES, useRoleStore } from '@/stores/roleStore';
import RoleToggle from '@/components/RoleToggle';
import { Button } from '@/components/ui/button';
import { useDialogStore } from '@/stores/dialogStore';
import IdeaForm from '@/components/IdeaForm';
import auth from '@/auth';
import { useSession } from 'next-auth/react';

const FounderView = ({ ownIdeas }) => {
  const { openDialog } = useDialogStore();
  if (ownIdeas.length < 1) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[50vh]'>
        <h3>You currently have no ideas. Create One?</h3>
        <div className='mt-10'>
          <Button
            onClick={() => openDialog(IdeaForm, { title: 'Create Your Idea' })}>
            Create Idea
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
      {ownIdeas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} />
      ))}
    </div>
  );
};

const ValidatorView = ({ allIdeas }) => {
  return (
    <div>
      <h4 className='mt-20'>Waiting for Validation</h4>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
        {allIdeas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>
      <div>
        <h4 className='mt-20'>Already Validated</h4>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
          {/* {ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))} */}
        </div>
      </div>
    </div>
  );
};

const DashboardClient = ({ allIdeas, allReviews }) => {
  const { role } = useRoleStore();
  const session = useSession();
  const ownIdeas = allIdeas.filter(
    (idea) => idea.authorId === session.data?.user.id
  );
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col'>
          <h2>Dashboard</h2>
          <h5 className='mt-10 text-muted-foreground'>
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
        <ValidatorView allIdeas={allIdeas} allReviews={allReviews} />
      )}
    </div>
  );
};

export default DashboardClient;
