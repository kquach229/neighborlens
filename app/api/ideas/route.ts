import { prisma } from '@/lib/prisma';
import auth from '@/auth';
import { NextResponse } from 'next/server';
import { Session } from 'next-auth';

interface IdeaRequestBody {
  title: string;
  briefDescription: string;
  problemItSolves: string;
  categories: string[];
  pricingModel: string;
  pricingDetails: string;
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body: IdeaRequestBody = await req.json();
    const session: Session | null = await auth();

    if (!session?.user?.id) {
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
  } catch (err: unknown) {
    console.error('Error submitting idea:', err);
    const errorMessage =
      err instanceof Error ? err.message : 'Something went wrong';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
