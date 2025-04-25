import Link from 'next/link';
import React from 'react';
import { NavLogo } from './Navbar';

const Footer = () => {
  return (
    <footer className='w-full border-t py-10 mt-20'>
      <div className='max-w-6xl mx-auto px-4 flex flex-col items-center'>
        <div className='mb-6'>
          <NavLogo />
        </div>

        <nav className='flex flex-wrap justify-center gap-6 text-sm text-muted-foreground'>
          <Link href='/dashboard' className='transition'>
            Dashboard
          </Link>
          <Link href='/about' className='transition'>
            About
          </Link>
          <Link href='/pricing' className='transition'>
            Pricing
          </Link>
          <Link href='/blog/posts' className='transition'>
            Blog
          </Link>
        </nav>

        <div className='mt-6 text-xs text-muted-foreground'>
          <Link href='/privacy-policy' className='underline transition'>
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
