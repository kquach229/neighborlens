import React from 'react';
import ThemeToggler from './ThemeToggler';
import Image from 'next/image';
import { Glasses } from 'lucide-react';

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-5 h-[10vh] font-oleo'>
      <div className='inline-flex items-center gap-2'>
        <h3>NeighborLens</h3>
        <Glasses className='h-8 w-8' />
      </div>
      <ThemeToggler />
    </div>
  );
};

export default Navbar;
