import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

import { stripe } from '@/lib/stripe';

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin');
    const body = await req.json();
    const { product_name } = body;

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
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
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode || 500 }
    );
  }
}
