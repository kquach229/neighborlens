import Link from 'next/link';
import React from 'react';
import { NavLogo } from './Navbar';

const Footer = () => {
  return (
    <div className='h-[30vh] w-full flex flex-col justify-end'>
      <div className='mx-auto flex justify-center flex-col items-center gap-2 mb-20'>
        <div className='mt-5 mb-5'>
          <NavLogo />
        </div>
        <div className='gap-5 flex'>
          <Link href='/'>Link 1</Link>
          <Link href='/'>Link 2</Link>
          <Link href='/'>Link 3</Link>
          <Link href='/'>Link 4</Link>
          <Link href='/'>Link 5</Link>
        </div>
      </div>

      <div className='flex justify-between'>
        <span>© 2025 Relume. All rights reserved.</span>
        <div className='flex gap-5 mb-5 underline'>
          <Link href='/'>Privacy Policy</Link>
          <Link href='/'>Terms of Service</Link>
          <Link href='/'>Cookies Settings</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
