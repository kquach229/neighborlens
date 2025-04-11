import { prisma } from '@/lib/prisma';
import auth from '@/auth';

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const session = await auth();

  const newIdea = await prisma.idea.create({
    data: {
      title: body.title,
      briefDescription: body.briefDescription,
      problem: body.problem,
      solution: body.solution,
      authorId: session.user.id,
      categories: body.categories,
      pricingModel: body.pricingModel,
      pricingDetails: body.pricingDetails,
    },
  });

  return NextResponse.json(newIdea);
}
