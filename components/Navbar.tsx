import React from 'react';
import ThemeToggler from './ThemeToggler';
import Image from 'next/image';

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-2 h-[10vh]'>
      <div>Neighborlens</div>
      <ThemeToggler />
    </div>
  );
};

export default Navbar;
