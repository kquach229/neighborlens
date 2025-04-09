'use client';
import IdeaCard from '@/components/IdeaCard';
import React, { useEffect } from 'react';
import { ROLES, useRoleStore } from '@/stores/roleStore';
import RoleToggle from '@/components/RoleToggle';
const DashboardClient = ({ ideas }) => {
  const { role, toggleRole, setRole } = useRoleStore();
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col'>
          <h2>Dashboard</h2>
          <h5 className='mt-10 text-muted-foreground'>
            {role === ROLES.FOUNDER ? 'Your Ideas' : 'Ideas to Validate'}
          </h5>
        </div>
        <RoleToggle />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>
    </div>
  );
};

export default DashboardClient;
