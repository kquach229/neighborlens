import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }) {
  const { id } = await params;
  const body = await req.json();

  try {
    const updatedIdea = await prisma.idea.update({
      where: {
        id: id,
      },
      data: body,
    });

    return NextResponse.json(updatedIdea);
  } catch (err) {
    return new NextResponse('Failed to update idea', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const idea = await prisma.idea.findUnique({
    where: { id: params.id },
  });

  return NextResponse.json(idea);
}
