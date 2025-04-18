import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import auth from '@/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');

    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    if (!role) {
      return NextResponse.json(
        { error: 'Role parameter is required' },
        { status: 400 }
      );
    }

    let data = {};

    if (role === 'FOUNDER') {
      const [ideas, reviews] = await Promise.all([
        prisma.idea.findMany({
          where: { authorId: userId },
          select: { id: true, title: true },
        }),
        prisma.review.findMany({
          where: {
            idea: { authorId: userId },
          },
          select: { rating: true },
        }),
      ]);

      const avgRating =
        reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1);

      data = {
        role: 'FOUNDER',
        ideaCount: ideas.length,
        reviewCount: reviews.length,
        averageRating: avgRating.toFixed(1),
      };
    } else if (role === 'VALIDATOR') {
      const [reviewCount, ideasReviewed, credits] = await Promise.all([
        prisma.review.count({ where: { userId } }),
        prisma.review.findMany({
          where: { userId },
          select: { ideaId: true },
          distinct: ['ideaId'],
        }),
        prisma.user.findUnique({
          where: { id: userId },
          select: { credits: true },
        }),
      ]);

      data = {
        role: 'VALIDATOR',
        totalReviews: reviewCount,
        uniqueIdeasReviewed: ideasReviewed.length,
        credits: credits?.credits || 0,
      };
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('[DASHBOARD_METRICS_ERROR]', err);
    return NextResponse.json(
      { error: 'Failed to load dashboard metrics' },
      { status: 500 }
    );
  }
}
