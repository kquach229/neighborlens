import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { prisma } from './lib/prisma';

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: user.email!,
        },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email!,
            name: user.name,
            avatarUrl: user.image,
          },
        });
      }

      return true;
    },
    async session({ session }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email ?? '' },
      });

      if (dbUser) {
        session.user.id = dbUser.id;
      }

      return session;
    },
  },
});

export default auth;
