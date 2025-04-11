import { prisma } from '@/lib/prisma';
import auth from '@/auth';

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const session = await auth();

  const newIdea = await prisma.idea.create({
    data: {
      title: body.title,
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

// id String @id @default(uuid())
// title String
// problem String
// solution String
// authorId String
// categories String[]
// // images  Image[]

// pricingModel String?
// pricingDetails String?
// author User @relation(fields: [authorId], references: [id])
// reviews Review[]
// updatedAt DateTime @updatedAt
// createdAt DateTime @default(now())
