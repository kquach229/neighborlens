import { NextRequest, NextResponse } from 'next/server';
import { generateAIReview } from '@/lib/aiReview';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const { ideaId } = await req.json();

  const idea = await prisma.idea.findUnique({ where: { id: ideaId } });
  if (!idea)
    return NextResponse.json({ error: 'Idea not found' }, { status: 404 });

  const result = await generateAIReview(idea);

  return NextResponse.json(result);
}
