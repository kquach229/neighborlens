import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import auth from '@/auth';

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin');
    const body = await req.json();
    const userSession = await auth();
    const { product_name } = body;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price:
            product_name == 'single'
              ? 'price_1REajuGhCEdRAWImsmOdJYQp'
              : 'price_1RFMayGhCEdRAWImCS2jdBE4',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
      metadata: {
        credits: product_name === 'single' ? '1' : '7',
        userId: userSession?.user?.id ?? '',
      },
    });

    if (session.status == 'complete') {
      await prisma.user.updateMany({
        where: { id: userSession?.user?.id },
        data: {
          credits: {
            increment: product_name === 'single' ? 1 : 7,
          },
        },
      });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode || 500 }
    );
  }
}
