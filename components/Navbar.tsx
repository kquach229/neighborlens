import React from 'react';
import ThemeToggler from './ThemeToggler';
import { Glasses } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export const NavLogo = () => {
  return (
    <Link href='/' className='inline-flex items-center gap-2 font-oleo'>
      <h3>ValidateLens</h3>
      <Glasses className='h-8 w-8' />
    </Link>
  );
};

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-5 h-[10vh]'>
      <div>
        <NavLogo />
      </div>

      <div className='flex gap-5 items-center'>
        <Link href='/submit-idea'>
          <Button>Submit Idea</Button>
        </Link>
        <Link href='/dashboard'>Dashboard</Link>
        <Link href='/pricing'>Pricing</Link>
        <ThemeToggler />
      </div>
    </div>
  );
};

export default Navbar;
