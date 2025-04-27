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
          select: { id: true, createdAt: true },
        }),
        prisma.review.findMany({
          where: {
            idea: { authorId: userId },
          },
          select: {
            rating: true,
            wouldIPayForThis: true,
            userId: true,
          },
        }),
      ]);

      const avgRating = reviews.length
        ? (
            reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
          ).toFixed(1)
        : null;

      const wouldIPayForThisYes = reviews.filter(
        (r) => r.wouldIPayForThis === 'yes'
      ).length;

      const wouldIPayForThisPercent =
        reviews.length > 0
          ? ((wouldIPayForThisYes / reviews.length) * 100).toFixed(1)
          : '0.0';

      const uniqueValidatorIds = new Set(reviews.map((r) => r.userId));

      data = {
        role: 'FOUNDER',
        ideaCount: ideas.length,
        reviewCount: reviews.length,
        averageRating: avgRating ?? 'N/A',
        wouldIPayForThisPercent,
        uniqueValidators: uniqueValidatorIds.size,
      };
    } else if (role === 'VALIDATOR') {
      const [reviews, user] = await Promise.all([
        prisma.review.findMany({
          where: { userId },
          select: {
            ideaId: true,
            createdAt: true,
            idea: { select: { createdAt: true } },
          },
        }),
        prisma.user.findUnique({
          where: { id: userId },
        }),
      ]);

      const ideaIds = new Set(reviews.map((r) => r.ideaId));
      const totalReviews = reviews.length;

      const responseTimes = reviews
        .map((r) =>
          r.idea?.createdAt
            ? new Date(r.createdAt).getTime() -
              new Date(r.idea.createdAt).getTime()
            : null
        )
        .filter(Boolean) as number[];

      const avgResponseTimeMs =
        responseTimes.reduce((acc, ms) => acc + ms, 0) /
        (responseTimes.length || 1);
      const avgResponseTime = `${Math.round(
        avgResponseTimeMs / 1000 / 60
      )} min`;

      const sorted = responseTimes.sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      const medianMs =
        sorted.length % 2 !== 0
          ? sorted[mid]
          : (sorted[mid - 1] + sorted[mid]) / 2;
      const medianResponseTime = `${Math.round(medianMs / 1000 / 60)} min`;

      const REVIEWS_PER_CREDIT = 5;
      const reviewsSinceLastCredit = totalReviews % REVIEWS_PER_CREDIT;
      const reviewsUntilNextCredit =
        reviewsSinceLastCredit === 0
          ? REVIEWS_PER_CREDIT
          : REVIEWS_PER_CREDIT - reviewsSinceLastCredit;

      data = {
        role: 'VALIDATOR',
        totalReviews,
        uniqueIdeasReviewed: ideaIds.size,
        credits: user?.credits || 0,
        averageResponseTime: avgResponseTime,
        medianResponseTime,
        reviewsUntilNextCredit,
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
