import React from 'react';
import ThemeToggler from './ThemeToggler';
import { Glasses } from 'lucide-react';
import Link from 'next/link';

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
        <Link href='/pricing'>Pricing</Link>
        <ThemeToggler />
      </div>
    </div>
  );
};

export default Navbar;
