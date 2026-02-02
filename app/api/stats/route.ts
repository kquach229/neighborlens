import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [totalUsers, totalIdeas, totalReviews] = await Promise.all([
      prisma.user.count(),
      prisma.idea.count(),
      prisma.review.count(),
    ]);

    // Get unique validators (users who have given at least one review)
    const uniqueValidators = await prisma.review.findMany({
      select: { userId: true },
      distinct: ['userId'],
    });

    return NextResponse.json({
      totalUsers,
      totalIdeas,
      totalReviews,
      uniqueValidators: uniqueValidators.length,
    });
  } catch (error) {
    console.error('[STATS_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to load stats' },
      { status: 500 }
    );
  }
}
