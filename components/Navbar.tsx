'use client';
import React from 'react';
import ThemeToggler from './ThemeToggler';
import { Glasses } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { useDialogStore } from '@/stores/dialogStore';
import IdeaForm from './IdeaForm';
import { Avatar } from './ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useSession } from 'next-auth/react';

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
        <Button
          onClick={() =>
            openDialog(IdeaForm, {
              title: 'Submit Idea',
            })
          }>
          Submit Idea
        </Button>

        <Link href='/dashboard'>Dashboard</Link>
        <Link href='/pricing'>Pricing</Link>
        <ThemeToggler />
        <Avatar>
          <AvatarImage src={session.data?.user?.image} alt='image' />
          <AvatarFallback>
            {session.data?.user?.name?.split(' ')[0][0]}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
