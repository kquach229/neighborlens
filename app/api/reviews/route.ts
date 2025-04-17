import auth from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const {
    rating,
    comment,
    biggestRisk,
    competitors,
    wouldIPayForThis,
    ideaId,
  } = await req.json();

  try {
    const result = await prisma.$transaction(async (tx) => {
      const newReview = await tx.review.create({
        data: {
          rating,
          comment,
          competitors,
          biggestRisk,
          wouldIPayForThis,
          idea: { connect: { id: ideaId } },
          user: { connect: { id: userId } },
        },
      });

      const reviewCount = await tx.review.count({
        where: { userId },
      });

      if (reviewCount % 10 === 0) {
        await tx.user.update({
          where: { id: userId },
          data: {
            credits: { increment: 1 },
          },
        });

        await tx.creditHistory.create({
          data: {
            userId,
            amount: 1,
            reason: 'REVIEW_REWARD',
            metadata: `Awarded 1 credit for submitting ${reviewCount} reviews`,
          },
        });
      }

      return newReview;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('[REVIEW_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}
