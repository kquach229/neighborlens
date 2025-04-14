import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const PrivacyPolicyPage = () => {
  return (
    <div className='max-w-4xl mx-auto mt-16 px-4'>
      <h1 className='text-3xl font-bold mb-8 text-center'>Privacy Policy</h1>

      <Card>
        <CardContent className='p-6 md:p-10 space-y-8 text-sm md:text-base leading-relaxed'>
          <section>
            <h2 className='text-xl font-semibold mb-2'>1. Introduction</h2>
            <p>
              Welcome to ValidateLens. This Privacy Policy explains how we
              collect, use, and protect your information when you use our app,
              which allows founders to submit startup ideas and validators to
              review and validate those ideas.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className='text-xl font-semibold mb-2'>
              2. Information We Collect
            </h2>
            <ul className='list-disc pl-5 space-y-2'>
              <li>
                <strong>Account Information:</strong> When you sign up, we
                collect your name, email address, and profile photo.
              </li>
              <li>
                <strong>Usage Data:</strong> We may collect data on how you use
                the platform to improve our services.
              </li>
              <li>
                <strong>Submitted Content:</strong> This includes ideas you
                submit, reviews you make, and other interactions.
              </li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className='text-xl font-semibold mb-2'>
              3. How We Use Your Information
            </h2>
            <ul className='list-disc pl-5 space-y-2'>
              <li>To operate and maintain the ValidateLens platform.</li>
              <li>To personalize user experience and improve our service.</li>
              <li>
                To send occasional updates or service-related notifications.
              </li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className='text-xl font-semibold mb-2'>
              4. Sharing of Information
            </h2>
            <p>
              We do not sell your data. Your information may be shared only with
              trusted service providers to help us run ValidateLens (e.g.,
              authentication, hosting), and only as needed.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className='text-xl font-semibold mb-2'>5. Data Retention</h2>
            <p>
              Your data is retained as long as your account is active. You may
              request deletion of your data at any time by contacting us.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className='text-xl font-semibold mb-2'>6. Your Rights</h2>
            <ul className='list-disc pl-5 space-y-2'>
              <li>You can access, update, or delete your personal data.</li>
              <li>You can opt out of non-essential communications.</li>
              <li>You can request a copy of your data.</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className='text-xl font-semibold mb-2'>7. Plan Information</h2>
            <p>
              ValidateLens offers both a Free and Pro plan. We do not store any
              payment details directly — all transactions are processed securely
              through our payment provider.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className='text-xl font-semibold mb-2'>
              8. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We’ll notify
              users of any significant changes via the app or email.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className='text-xl font-semibold mb-2'>9. Contact</h2>
            <p>
              If you have any questions about this policy or your data, please
              reach out to us at{' '}
              <a href='mailto:support@validatelens.com' className='underline'>
                support@validatelens.com
              </a>
              .
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicyPage;
