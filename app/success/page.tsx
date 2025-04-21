import { redirect } from 'next/navigation';
import { stripe } from '../../lib/stripe';
import { Stripe } from 'stripe';

interface SuccessPageProps {
  searchParams: {
    session_id?: any;
  };
}

export default async function Success({ searchParams }: SuccessPageProps) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)');
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'payment_intent'],
  });

  if (session.status === 'open') {
    return redirect('/');
  }

  if (session.status === 'complete') {
    const customerEmail = session.customer_details?.email ?? 'your email';

    return (
      <section id='success'>
        <p>
          We appreciate your business! A confirmation email will be sent to{' '}
          {customerEmail}
        </p>
      </section>
    );
  }

  // Handle other status cases if needed
  return redirect('/');
}
