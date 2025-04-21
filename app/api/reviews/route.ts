import auth from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { Session } from 'next-auth';

interface ReviewRequest {
  rating: number;
  comment: string;
  whatILike: string;
  whatIDislike: string;
  suggestions: string;
  wouldIPayForThis: boolean;
  ideaId: string;
}

type CreditType = 'CREDIT' | 'DEBIT';
type CreditReason = 'REVIEW_REWARD' | 'PURCHASE' | 'REDEMPTION' | string; // Add other possible reasons

export async function POST(req: NextRequest): Promise<NextResponse> {
  const session: Session | null = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let requestData: ReviewRequest;
  try {
    requestData = await req.json();
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }

  const {
    rating,
    comment,
    whatILike,
    whatIDislike,
    suggestions,
    wouldIPayForThis,
    ideaId,
  } = requestData;

  try {
    const result = await prisma.$transaction(async (tx) => {
      // Validate rating is between 1-5
      if (rating < 1 || rating > 5) {
        throw new Error('Rating must be between 1 and 5');
      }

      const newReview = await tx.review.create({
        data: {
          rating: Number(rating),
          comment: String(comment),
          whatILike: String(whatILike),
          whatIDislike: String(whatIDislike),
          suggestions: String(suggestions),
          wouldIPayForThis: String(wouldIPayForThis), // Fixed from String() to Boolean()
          idea: { connect: { id: String(ideaId) } },
          user: { connect: { id: String(userId) } },
        },
      });

      const reviewCount = await tx.review.count({
        where: { userId },
      });

      // Award credit every 5 reviews
      if (reviewCount % 5 === 0) {
        await tx.user.update({
          where: { id: userId },
          data: {
            credits: { increment: 1 },
          },
        });
      }

      return newReview;
    });

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error('[REVIEW_ERROR]', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Failed to create review';

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
