// app/api/user/credits/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import auth from '@/auth';

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ credits: 0 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { credits: true },
  });

  return NextResponse.json({ credits: user?.credits ?? 0 });
}
