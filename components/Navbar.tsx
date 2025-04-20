'use client';
import React, { useEffect, useState } from 'react';
import ThemeToggler from './ThemeToggler';
import { Glasses, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { useDialogStore } from '@/stores/dialogStore';
import { Avatar } from './ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useSession, signOut } from 'next-auth/react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import SignInButton from './SignInButton';
import UserCredits from './UserCredits';
import CreateIdeaButton from './CreateIdeaButton';

export const NavLogo = () => (
  <Link href='/' className='inline-flex items-center gap-2 font-oleo'>
    <h3>ValidateLens</h3>
    <Glasses className='h-8 w-8' />
  </Link>
);

export const UserButton = () => {
  const session = useSession();
  if (!session.data?.user) return <SignInButton />;

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src={session?.data?.user?.image || ''} alt='image' />
          <AvatarFallback>
            {session.data.user.name?.split(' ')[0][0]}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className='flex flex-col gap-3'>
        <Link
          className='flex items-center gap-2'
          href={`/users/user-profile/${session.data.user.id}`}>
          <User />
          <span>Profile</span>
        </Link>
        <span
          className='w-full flex items-center gap-2 cursor-pointer'
          onClick={() => signOut()}>
          <LogOut />
          <span>Sign Out</span>
        </span>
      </PopoverContent>
    </Popover>
  );
};

const Navbar = () => {
  const { openDialog } = useDialogStore();
  const session = useSession();
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const res = await fetch('/api/user/credits');
        const data = await res.json();
        setCredits(data.credits);
      } catch (error) {
        console.error('Failed to fetch credits', error);
        setCredits(0);
      }
    };

    if (session.data?.user) {
      fetchCredits();

      const handleCreditsUpdated = () => fetchCredits();
      window.addEventListener('credits-updated', handleCreditsUpdated);

      return () => {
        window.removeEventListener('credits-updated', handleCreditsUpdated);
      };
    }
  }, [session.data?.user]);

  return (
    <div className='flex justify-between items-center p-5 h-[10vh]'>
      <NavLogo />
      <div className='flex gap-5 items-center'>
        {session.data?.user && (
          <>
            <CreateIdeaButton />
            <UserCredits credits={credits} />
          </>
        )}
        <Link href='/dashboard'>Dashboard</Link>
        <Link href='/about'>About</Link>
        <Link href='/pricing'>Pricing</Link>
        <ThemeToggler />
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
