import React from 'react';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import DashboardClient from './DashboardClient';

const getIdeas = async () => {
  const ideas = await prisma.idea.findMany();
  return ideas;
};

const DashboardPage = async () => {
  const ideas = await getIdeas();

  return (
    <div className='min-h-[90vh] p-5'>
      <DashboardClient ideas={ideas} />
    </div>
  );
};

export default DashboardPage;
