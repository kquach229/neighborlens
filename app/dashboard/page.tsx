import React from 'react';
import { prisma } from '@/lib/prisma';
import DashboardClient from './DashboardClient';

const getAllIdeas = async () => {
  const ownIdeas = await prisma.idea.findMany();
  return ownIdeas;
};

const getAllReviews = async () => {
  const allReviews = await prisma.review.findMany();
  return allReviews;
};

const DashboardPage = async () => {
  const allIdeas = await getAllIdeas();
  const allReviews = await getAllReviews();

  return (
    <div className='min-h-[90vh] p-5'>
      <DashboardClient allIdeas={allIdeas} allReviews={allReviews} />
    </div>
  );
};

export default DashboardPage;
