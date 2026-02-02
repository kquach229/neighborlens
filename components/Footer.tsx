'use client';

import Link from 'next/link';
import React from 'react';
import { NavLogo } from './Navbar';
import { Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='w-full border-t bg-muted/30 mt-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
          <div className='space-y-4'>
            <NavLogo />
            <p className='text-sm text-muted-foreground max-w-xs'>
              Validate your startup ideas before you build. Get real feedback from
              experienced validators.
            </p>
          </div>

          <div>
            <h3 className='font-semibold mb-4'>Product</h3>
            <nav className='flex flex-col gap-3 text-sm'>
              <Link
                href='/dashboard'
                className='text-muted-foreground hover:text-foreground transition-colors'>
                Dashboard
              </Link>
              <Link
                href='/suggest'
                className='text-muted-foreground hover:text-foreground transition-colors'>
                SallySuggest
              </Link>
              <Link
                href='/pricing'
                className='text-muted-foreground hover:text-foreground transition-colors'>
                Pricing
              </Link>
            </nav>
          </div>

          <div>
            <h3 className='font-semibold mb-4'>Company</h3>
            <nav className='flex flex-col gap-3 text-sm'>
              <Link
                href='/about'
                className='text-muted-foreground hover:text-foreground transition-colors'>
                About
              </Link>
              <Link
                href='/blog/posts'
                className='text-muted-foreground hover:text-foreground transition-colors'>
                Blog
              </Link>
              <Link
                href='/privacy-policy'
                className='text-muted-foreground hover:text-foreground transition-colors'>
                Privacy Policy
              </Link>
            </nav>
          </div>

          <div>
            <h3 className='font-semibold mb-4'>Connect</h3>
            <div className='flex gap-4'>
              <a
                href='mailto:kquach229@gmail.com'
                className='text-muted-foreground hover:text-foreground transition-colors'
                aria-label='Email'>
                <Mail className='w-5 h-5' />
              </a>
            </div>
            <p className='text-sm text-muted-foreground mt-4'>
              Questions? Reach out to{' '}
              <a
                href='mailto:kquach229@gmail.com'
                className='underline hover:text-foreground transition-colors'>
                kquach229@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className='border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-sm text-muted-foreground'>
            © {currentYear} ValidateLens. All rights reserved.
          </p>
          <div className='flex items-center gap-4 text-sm text-muted-foreground'>
            <span>Made with ❤️ for founders</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
