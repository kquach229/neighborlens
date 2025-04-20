import React from 'react';
import { prisma } from '@/lib/prisma';
import DashboardClient from './DashboardClient';
import auth from '@/auth';
import { redirect } from 'next/navigation';
import type { Idea } from '@/types/types'; // Make sure to import your Idea type

const getAllIdeas = async (): Promise<Idea[]> => {
  const ideas = await prisma?.idea?.findMany({
    include: {
      reviews: true,
    },
  });
  return ideas || [];
};

const DashboardPage = async () => {
  const allIdeas = await getAllIdeas();
  const session = await auth();

  if (!session?.user) redirect('/login');

  return (
    <div className='min-h-[90vh] p-5'>
      <DashboardClient allIdeas={allIdeas} />
    </div>
  );
};

export default DashboardPage;
