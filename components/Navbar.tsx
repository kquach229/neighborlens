'use client';
import React from 'react';
import ThemeToggler from './ThemeToggler';
import { Glasses, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { useDialogStore } from '@/stores/dialogStore';
import IdeaForm from './IdeaForm';
import { Avatar } from './ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useSession } from 'next-auth/react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { signOut } from 'next-auth/react';
import SignInButton from './SignInButton';

export const NavLogo = () => {
  return (
    <Link href='/' className='inline-flex items-center gap-2 font-oleo'>
      <h3>ValidateLens</h3>
      <Glasses className='h-8 w-8' />
    </Link>
  );
};

const Navbar = () => {
  const { openDialog } = useDialogStore();
  const session = useSession();
  return (
    <div className='flex justify-between items-center p-5 h-[10vh]'>
      <div>
        <NavLogo />
      </div>

      <div className='flex gap-5 items-center'>
        {session.data?.user ? (
          <Button
            onClick={() =>
              openDialog(IdeaForm, {
                title: 'Submit Idea',
              })
            }>
            Submit Idea
          </Button>
        ) : (
          <div className='w-[100px]'>
            <SignInButton />
          </div>
        )}

        <Link href='/dashboard'>Dashboard</Link>
        <Link href='/about'>About</Link>
        <Link href='/pricing'>Pricing</Link>
        <ThemeToggler />
        {session.data?.user && (
          <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarImage src={session.data?.user?.image} alt='image' />
                <AvatarFallback>
                  {session.data?.user?.name?.split(' ')[0][0]}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className='flex flex-col gap-3'>
              <Link
                className='flex items-center gap-2'
                href={`/users/user-profile/${session.data.user.id}`}>
                <User /> <span>Profile</span>
              </Link>
              <span
                className='w-full flex items-center gap-2 cursor-pointer'
                onClick={() => signOut()}>
                <LogOut />
                <span>Sign Out</span>
              </span>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default Navbar;
