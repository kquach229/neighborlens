import auth from '@/auth';
import { prisma } from '@/lib/prisma';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { Separator } from '@/components/ui/separator';
import { maskName } from '@/lib/utils';

const getUserData = async (userId) => {
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

const ProfilePage = async ({ params }) => {
  const { userId } = await params;

  const session = await auth();
  const userData = await getUserData(userId);

  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const dateRegistered = formatter.format(userData?.createdAt);
  const isCurrentUser = userId === session?.user?.id;
  return (
    <div className='max-w-4xl mx-auto mt-16 px-4'>
      <h1 className='text-3xl font-bold mb-8 text-center'>
        {isCurrentUser
          ? 'Your Profile'
          : `${userData?.name?.split(' ')[0]}'s Profile`}
      </h1>

      <Card>
        <CardContent className='p-6 md:p-10'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-10'>
            {/* Profile Info */}
            <div className='flex-1 space-y-6 w-full'>
              <div>
                <p className='text-muted-foreground text-sm'>Name</p>
                <p className='text-xl font-medium'>
                  {isCurrentUser ? userData?.name : maskName(userData?.name)}
                </p>
              </div>
              <div>
                <p className='text-muted-foreground text-sm'>Email</p>
                <p className='text-lg'>
                  {isCurrentUser ? userData?.email : maskName(userData?.email)}
                </p>
              </div>
              <div>
                <p className='text-muted-foreground text-sm'>Account Created</p>
                <p className='text-lg'>{dateRegistered}</p>
              </div>
              <div>
                <p className='text-muted-foreground text-sm'>Plan Tier</p>
                <p className='text-lg capitalize'>
                  {userData?.planTier ?? 'Free'}
                </p>
              </div>
            </div>

            {/* Avatar */}
            <div className='flex justify-center md:justify-end w-full md:w-auto'>
              <Avatar className='h-48 w-48'>
                <AvatarImage src={session?.user?.image} alt='Profile image' />
                <AvatarFallback className='text-4xl'>
                  {userData?.name?.[0]}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          <Separator className='my-8' />

          {/* Stats */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <p className='text-muted-foreground text-sm'>Ideas Submitted</p>
              <p className='text-lg'>{userData?.ideas.length}</p>
            </div>
            <div>
              <p className='text-muted-foreground text-sm'>Ideas Reviewed</p>
              <p className='text-lg'>{userData?.reviews.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
