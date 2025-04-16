import auth from '@/auth';
import SignInButton from '@/components/SignInButton';
import { Glasses } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react';

const LoginPage = async () => {
  const session = await auth();
  if (session?.user) redirect('/dashboard');

  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='w-full max-w-md text-center space-y-8'>
        <div className='flex flex-col items-center space-y-4'>
          <Glasses className='h-20 w-20' />
          <h1 className='text-4xl font-bold tracking-tight'>ValidatorLens</h1>
          <p className='max-w-sm'>
            Validate your startup ideas before investing your time and money.
          </p>
        </div>

        <div className='flex flex-col items-center gap-4'>
          <SignInButton />
          <p className='text-sm'>You’ll be redirected to securely sign in.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
