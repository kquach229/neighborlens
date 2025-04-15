import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

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

export async function DELETE(req: NextRequest, { params }) {
  const { id } = await params;
  console.log('djflsjfklsjfl', id);
  try {
    await prisma.review.deleteMany({
      where: { ideaId: params.id },
    });

    await prisma.idea.delete({
      where: { id: params.id },
    });
    const deletedIdea = await prisma.idea.delete({
      where: {
        id: id,
      },
    });

    console.log('ideaId', id);

    return NextResponse.json(deletedIdea);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Error deleting idea', err: err });
  }
}
