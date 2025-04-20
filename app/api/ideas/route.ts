import { prisma } from '@/lib/prisma';
import auth from '@/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const session = await auth();

    if (!session || !session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    // Check if user has at least 1 credit
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { credits: true },
    });

    if (!user || user.credits < 1) {
      return NextResponse.json(
        { error: 'Not enough credits' },
        { status: 402 }
      );
    }

    const [newIdea] = await prisma.$transaction([
      prisma.idea.create({
        data: {
          title: body.title,
          briefDescription: body.briefDescription,
          problemItSolves: body.problemItSolves,
          authorId: userId,
          categories: body.categories,
          pricingModel: body.pricingModel,
          pricingDetails: body.pricingDetails,
        },
      }),
      prisma.user.update({
        where: { id: userId },
        data: { credits: { decrement: 1 } },
      }),
      prisma.creditHistory.create({
        data: {
          userId,
          amount: 1,
          type: 'DEBIT',
          reason: 'REDEMPTION',
          metadata: 'Idea submission',
        },
      }),
    ]);

    return NextResponse.json(newIdea);
  } catch (err) {
    console.error('Error submitting idea:', err);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}
