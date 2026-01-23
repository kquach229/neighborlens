import type { NextRequest } from 'next/server';
import { auth } from '@/auth';
import authConfig from '@/auth.config';
import NextAuth from 'next-auth';

export const config = { match: ['/dashboard'] };

export const { auth: middleware } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  // Your custom middleware logic goes here and here
});
