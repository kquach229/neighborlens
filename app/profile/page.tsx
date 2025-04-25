'use client';

import auth from '@/auth';
import { prisma } from '@/lib/prisma';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { Separator } from '@/components/ui/separator';
import type { User, Review, Idea } from '@prisma/client';
import { Star } from 'lucide-react';

type FullUser = User & {
  reviews: Review[];
  ideas: Idea[];
};

const getUserData = async (
  userId: string | undefined
): Promise<FullUser | null> => {
  if (!userId) return null;

  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      reviews: true,
      ideas: true,
    },
  });

  return userData;
};

const ProfilePage = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  const userData = await getUserData(userId);

  if (!userId || !userData) {
    return (
      <div className='text-center mt-16'>User not found or not logged in.</div>
    );
  }

  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const dateRegistered = userData.createdAt
    ? formatter.format(userData.createdAt)
    : 'Unknown';

  const averageRating =
    userData.reviews.length > 0
      ? userData.reviews.reduce((sum, r) => sum + r.rating, 0) /
        userData.reviews.length
      : null;

  return (
    <div className='max-w-4xl mx-auto mt-16 mb-20 px-4'>
      <h1 className='text-3xl font-bold mb-8 text-center'>Your Profile</h1>

      <Card>
        <CardContent className='p-6 md:p-10'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-10'>
            {/* Profile Info */}
            <div className='flex-1 space-y-6 w-full'>
              <div>
                <p className='text-muted-foreground text-sm'>Name</p>
                <p className='text-xl font-medium'>{userData.name}</p>
              </div>
              <div>
                <p className='text-muted-foreground text-sm'>Email</p>
                <p className='text-lg'>{userData.email}</p>
              </div>
              <div>
                <p className='text-muted-foreground text-sm'>Account Created</p>
                <p className='text-lg'>{dateRegistered}</p>
              </div>
            </div>

            {/* Avatar */}
            <div className='flex justify-center md:justify-end w-full md:w-auto'>
              <Avatar className='h-48 w-48'>
                <AvatarImage
                  src={session?.user?.image ?? undefined}
                  alt='Profile image'
                />
                <AvatarFallback className='text-4xl'>
                  {userData.name?.[0] ?? 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          <Separator className='my-8' />

          {/* Stats */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <p className='text-muted-foreground text-sm'>Ideas Submitted</p>
              <p className='text-lg'>{userData.ideas.length}</p>
            </div>
            <div>
              <p className='text-muted-foreground text-sm'>Ideas Reviewed</p>
              <p className='text-lg'>{userData.reviews.length}</p>
            </div>
            {averageRating !== null && (
              <div className='flex items-center gap-2 mt-4 text-muted-foreground'>
                <Star className='h-4 w-4 text-yellow-500' />
                <span className='text-sm'>
                  Avg. Rating Given: {averageRating.toFixed(1)} / 5
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
