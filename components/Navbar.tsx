'use client';
import React from 'react';
import ThemeToggler from './ThemeToggler';
import { Glasses } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { useDialogStore } from '@/stores/dialogStore';

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
  return (
    <div className='flex justify-between items-center p-5 h-[10vh]'>
      <div>
        <NavLogo />
      </div>

      <div className='flex gap-5 items-center'>
        <Button onClick={openDialog}>Submit Idea</Button>

        <Link href='/dashboard'>Dashboard</Link>
        <Link href='/pricing'>Pricing</Link>
        <ThemeToggler />
      </div>
    </div>
  );
};

export default Navbar;
