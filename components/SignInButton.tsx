'use client';

import { signIn } from 'next-auth/react';
import { Button } from './ui/button';

export default function SignInButton() {
  return (
    <Button className='w-full' onClick={() => signIn('google')}>
      Sign In
    </Button>
  );
}
