import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await req.json();
    const updatedIdea = await prisma.idea.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updatedIdea);
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : 'Failed to update idea';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idea = await prisma.idea.findUnique({
      where: { id: id },
      include: { reviews: true },
    });

    if (!idea) {
      return NextResponse.json({ error: 'Idea not found' }, { status: 404 });
    }

    return NextResponse.json(idea);
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : 'Failed to fetch idea';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // First delete all reviews associated with the idea
    await prisma.review.deleteMany({
      where: { ideaId: id },
    });

    // Then delete the idea itself
    const deletedIdea = await prisma.idea.delete({
      where: { id },
    });

    return NextResponse.json(deletedIdea);
  } catch (err: unknown) {
    console.error(err);
    const errorMessage =
      err instanceof Error ? err.message : 'Error deleting idea';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
