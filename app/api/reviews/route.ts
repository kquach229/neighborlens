import auth from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await auth();
  const body = await req.json();
  const {
    rating,
    comment,
    biggestRisk,
    competitors,
    wouldIPayForThis,
    ideaId,
  } = body;

  try {
    const newReview = await prisma.review.create({
      data: {
        rating,
        comment,
        competitors,
        biggestRisk,
        wouldIPayForThis,
        idea: { connect: { id: ideaId } },
        user: { connect: { id: session?.user?.id } },
      },
    });

    return NextResponse.json(newReview);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}

// both validators and founders can see all reviews on idea details page

// model Review {
//   id String @id @default(uuid())
//   rating Float
//   comment String?
//   biggestRisk String?
//   competitors String?
//   wouldIPayForThis String?
//   ideaId String
//   userId String
//   updatedAt DateTime @updatedAt
//   createdAt DateTime @default(now())

//   // Relations

//   idea Idea @relation(fields: [ideaId], references: [id])
//   user User @relation(fields: [userId], references: [id])
// }
