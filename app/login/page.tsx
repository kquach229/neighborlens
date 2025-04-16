import auth from '@/auth';
import SignInButton from '@/components/SignInButton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { redirect } from 'next/navigation';
import React from 'react';

const LoginPage = async () => {
  const session = await auth();
  if (session?.user) redirect('/dashboard');

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 px-4'>
      <Card className='w-full max-w-md shadow-lg border-none'>
        <CardHeader className='text-center'>
          <CardTitle className='text-3xl font-bold tracking-tight'>
            ValidatorLens
          </CardTitle>
          <CardDescription className='mt-2 text-gray-500'>
            Validate your startup ideas before investing your time and money.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <SignInButton />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
