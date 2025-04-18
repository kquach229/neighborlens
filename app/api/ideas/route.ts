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
    const newIdea = await prisma.idea.create({
      data: {
        title: body.title,
        briefDescription: body.briefDescription,
        problemItSolves: body.problemItSolves,
        authorId: session.user.id,
        categories: body.categories,
        pricingModel: body.pricingModel,
        pricingDetails: body.pricingDetails,
      },
    });

    return NextResponse.json(newIdea);
  } catch (err) {
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}
