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
          <Link href='/dashboard'>Dashboard</Link>
          <Link href='/about'>About</Link>
          <Link href='/pricing'>Pricing</Link>
          <Link href='/blog/posts'>Blog</Link>
        </div>
      </div>

      <div className='flex justify-between'>
        <div className='flex gap-5 mb-5 underline'>
          <Link href='/privacy-policy'>Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
