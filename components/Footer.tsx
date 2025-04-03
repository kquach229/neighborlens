import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div className='h-[30vh] w-full flex flex-col justify-end'>
      <div className='mx-auto flex justify-center flex-col items-center gap-2 mb-20'>
        <div>Logo</div>
        <div className='gap-5'>
          <Link href='/'>Hello</Link>
          <Link href='/'>Hello</Link>
          <Link href='/'>Hello</Link>
          <Link href='/'>Hello</Link>
          <Link href='/'>Hello</Link>
        </div>
      </div>

      <div className='flex justify-between'>
        <span>© 2025 Relume. All rights reserved.</span>
        <div>
          <Link href='/'>Privacy Policy</Link>
          <Link href='/'>Terms of Service</Link>
          <Link href='/'>Cookies Settings</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
