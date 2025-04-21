import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import Stripe from 'stripe';
// This disables Next.js's default body parsing so we can verify Stripe's signature
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const rawBody = await req.arrayBuffer();
  const sig = headers().get('stripe-signature');

  if (!sig) {
    return new NextResponse('Missing stripe signature', { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed.', err);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const userSession = await auth();
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session.metadata?.userId;
    const credits = parseInt(session.metadata?.credits || '0', 10);

    if (!userId || !credits) {
      console.error('Missing userId or credits from session metadata');
      return new NextResponse('Bad Request', { status: 400 });
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        credits: {
          increment: credits,
        },
      },
    });

    console.log(`✅ Updated ${credits} credits for user ${userId}`);
  }

  return new NextResponse('Received', { status: 200 });
}
