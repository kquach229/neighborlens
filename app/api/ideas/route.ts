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
    });

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
    ]);

    return NextResponse.json(newIdea);
  } catch (err: unknown) {
    console.error('Error submitting idea:', err);
    const errorMessage =
      err instanceof Error ? err.message : 'Something went wrong';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
