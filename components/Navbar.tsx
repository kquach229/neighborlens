import React from 'react';
import ThemeToggler from './ThemeToggler';
import { Glasses } from 'lucide-react';

export const NavLogo = () => {
  return (
    <div className='inline-flex items-center gap-2'>
      <h3>NeighborLens</h3>
      <Glasses className='h-8 w-8' />
    </div>
  );
};

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-5 h-[10vh] font-oleo'>
      <NavLogo />
      <ThemeToggler />
    </div>
  );
};

export default Navbar;
