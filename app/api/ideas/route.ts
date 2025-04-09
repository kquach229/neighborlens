import { prisma } from '@/lib/prisma';
import auth from '@/auth';

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const session = await auth();

  const newIdea = await prisma.idea.create({
    data: {
      title: body.title,
      description: body.description,
      targetUsers: body.targetUsers,
      authorId: session.user.id,
    },
  });

  return NextResponse.json(newIdea);
}
