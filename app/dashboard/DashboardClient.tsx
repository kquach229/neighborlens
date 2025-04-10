'use client';
import IdeaCard from '@/components/IdeaCard';
import { ROLES, useRoleStore } from '@/stores/roleStore';
import RoleToggle from '@/components/RoleToggle';

const FounderView = ({ ideas }) => {
  console.log(ideas);
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} />
      ))}
    </div>
  );
};

const ValidatorView = ({}) => {
  return <div>ayoooo</div>;
};

const DashboardClient = ({ ideas }) => {
  const { role } = useRoleStore();
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col'>
          <h2>Dashboard</h2>
          <h5 className='mt-10 text-muted-foreground'>
            {role === ROLES.FOUNDER ? 'My Ideas' : 'Ideas to Validate'}
          </h5>
        </div>
        <RoleToggle />
      </div>
      {role === ROLES.FOUNDER ? (
        <FounderView ideas={ideas} />
      ) : (
        <ValidatorView />
      )}
    </div>
  );
};

export default DashboardClient;
