'use client';

import { AvatarImage, Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

import { AlertCircle, Gem, MessageCircle, StarIcon } from 'lucide-react';
import Image from 'next/image';
import SignInButton from '@/components/SignInButton';

export const FAQSection = () => {
  return (
    <div className='min-h-screen p-10'>
      <h1 className='text-3xl font-semibold text-center mb-12'>
        Frequently Asked Questions
      </h1>

      <div className='max-w-3xl mx-auto'>
        <Accordion type='single' collapsible>
          <AccordionItem value='item-1'>
            <AccordionTrigger className='text-xl font-medium'>
              1. What is ValidatorLens?
            </AccordionTrigger>
            <AccordionContent>
              ValidatorLens is a platform that allows founders to get real,
              human feedback on their startup ideas from experienced validators.
              It helps validate concepts, spot risks, and gain insights before
              you build, saving you time and resources.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-2'>
            <AccordionTrigger className='text-xl font-medium'>
              2. How does the validation process work?
            </AccordionTrigger>
            <AccordionContent>
              To get your idea validated, you simply submit it via our
              easy-to-use form, including details like the problem, solution,
              pricing model, and more. Validators—who could be users, investors,
              or product experts—will review and provide feedback. You’ll
              receive their ratings, comments, and insights to help improve your
              idea.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-3'>
            <AccordionTrigger className='text-xl font-medium'>
              3. Who are the validators?
            </AccordionTrigger>
            <AccordionContent>
              Validators are experienced professionals in various industries,
              such as entrepreneurs, investors, product managers, and others
              with relevant expertise. You can view their profiles to see their
              background and areas of expertise.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-4'>
            <AccordionTrigger className='text-xl font-medium'>
              4. How do I create an account?
            </AccordionTrigger>
            <AccordionContent>
              Click the "Sign Up" button on the homepage or any other relevant
              page. You can sign up using your email or social media accounts
              for a quick start. Once registered, you’ll be able to submit your
              ideas and start receiving feedback.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-5'>
            <AccordionTrigger className='text-xl font-medium'>
              5. What is included in the free plan?
            </AccordionTrigger>
            <AccordionContent>
              The free plan allows you to submit one idea for validation and
              receive a limited amount of feedback. You can also review others'
              ideas and engage with the community. For more extensive features,
              such as unlimited submissions and premium feedback insights, check
              out our paid plans.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-6'>
            <AccordionTrigger className='text-xl font-medium'>
              6. How do I upgrade my plan?
            </AccordionTrigger>
            <AccordionContent>
              You can upgrade your plan by visiting your account settings or the
              pricing page. Select the plan you want and follow the instructions
              to complete the payment process. Your subscription will
              automatically renew unless you cancel it.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-7'>
            <AccordionTrigger className='text-xl font-medium'>
              7. Can I cancel my subscription?
            </AccordionTrigger>
            <AccordionContent>
              Yes, you can cancel your subscription at any time. Simply go to
              the billing section of your account settings and choose the
              "Cancel Subscription" option. Please note, cancellations will take
              effect at the end of the billing cycle.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-8'>
            <AccordionTrigger className='text-xl font-medium'>
              8. What kind of ideas can I submit for validation?
            </AccordionTrigger>
            <AccordionContent>
              You can submit any type of startup idea—whether it’s a new
              product, service, app, or platform. We recommend providing as much
              detail as possible, including your target market, problem you’re
              solving, and your solution.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-9'>
            <AccordionTrigger className='text-xl font-medium'>
              9. Can I submit multiple ideas?
            </AccordionTrigger>
            <AccordionContent>
              Yes, you can submit multiple ideas. Depending on your subscription
              plan, the number of submissions may vary. You can always upgrade
              to a higher plan for unlimited submissions.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-10'>
            <AccordionTrigger className='text-xl font-medium'>
              10. Can I edit my idea after submission?
            </AccordionTrigger>
            <AccordionContent>
              At the moment, you cannot directly edit a submitted idea. However,
              you can withdraw your idea and submit a new version if needed. If
              you need help with this, feel free to contact our support team.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-11'>
            <AccordionTrigger className='text-xl font-medium'>
              11. How do I receive feedback on my idea?
            </AccordionTrigger>
            <AccordionContent>
              Once your idea is submitted, it will be reviewed by validators who
              will provide feedback in the form of ratings, comments, and
              suggestions. You will be notified via email when feedback is
              available. You can also view feedback directly on your dashboard.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-12'>
            <AccordionTrigger className='text-xl font-medium'>
              12. Can I respond to feedback?
            </AccordionTrigger>
            <AccordionContent>
              Yes, you can engage with feedback! You have the option to ask
              follow-up questions, clarify points, or thank the validator for
              their input. This two-way interaction helps you get more detailed
              insights and refine your idea.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-13'>
            <AccordionTrigger className='text-xl font-medium'>
              13. Is feedback anonymous?
            </AccordionTrigger>
            <AccordionContent>
              Yes, feedback is typically anonymous. Validators can choose
              whether to provide their feedback publicly or privately. You will
              be able to see if the feedback is anonymous or associated with a
              specific validator.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-14'>
            <AccordionTrigger className='text-xl font-medium'>
              14. How can I contact customer support?
            </AccordionTrigger>
            <AccordionContent>
              You can reach our support team via the "Contact Us" page or by
              emailing us at support@validatorlens.com. We’re here to help!
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className='min-h-screen p-5'>
      <div className='mt-24 flex flex-col w-full sm:flex-row justify-between items-center gap-10'>
        <div className='flex flex-col justify-center gap-6 w-full md:w-2/3'>
          <h1 className='font-bold text-4xl leading-tight'>
            Validate Your Startup Idea—Before You Build
          </h1>
          <span className='text-lg'>
            Get real human feedback from experienced validators. No AI, no
            fluff—just actionable insight to help you decide what to build.
          </span>
          <span>
            <SignInButton />
          </span>
        </div>
        <div className='w-full sm:w-1/3'>
          <Image
            className='object-center rounded-sm'
            src={'/idea-card.png'}
            alt='hero-image'
            height={1000}
            width={1000}
          />
        </div>
      </div>

      <div className='mt-24 md:mt-52'>
        <div className='w-full md:w-3/4'>
          <h2 className='mb-5 text-2xl font-semibold'>
            Turn Uncertainty Into Clarity
          </h2>
          <span>
            Submit your startup idea and receive structured, thoughtful feedback
            from real people—your potential users, investors, and advisors.
          </span>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mt-24 text-center'>
          <div>
            <Gem className='place-self-center mb-5 h-[3rem] w-[3rem]' />
            <h6 className='font-semibold mb-2'>Discover What Matters</h6>
            <span>
              Learn what stands out and what needs work in your concept—direct
              from real-world validators.
            </span>
          </div>
          <div className='self-center'>
            <AlertCircle className='place-self-center mb-5 h-[3rem] w-[3rem]' />
            <h6 className='font-semibold mb-2'>Spot the Biggest Risks</h6>
            <span>
              Get early insight into red flags, assumptions, and potential
              dealbreakers.
            </span>
          </div>
          <div className='self-center'>
            <MessageCircle className='place-self-center mb-5 h-[3rem] w-[3rem]' />
            <h6 className='font-semibold mb-2'>Engage With Feedback</h6>
            <span>
              Ask questions, gather feedback, and improve your idea in real
              time.
            </span>
          </div>
        </div>
      </div>

      <div className='mt-24 md:mt-52 flex flex-col md:flex-row justify-around items-center gap-10'>
        <Image
          className='h-[400px] md:h-[500px] w-full md:w-[500px] object-cover'
          src={'/landing-page-macbooks.jpg'}
          alt='hero-image'
          height={600}
          width={600}
          objectFit='cover'
          objectPosition='center'
          loading='lazy'
        />

        <div className='gap-10 flex flex-col w-full md:w-1/2'>
          <h2 className='text-2xl font-semibold'>
            Founders & Validators, All in One Place
          </h2>
          <span>
            Switch roles easily between founder and validator. Submit ideas and
            review others—because better startups start with better feedback
            loops.
          </span>
          <div className='flex flex-col md:flex-row justify-start gap-5'>
            <span className='w-full md:w-80'>
              <h6 className='font-semibold'>Easy Submission</h6>
              <span>
                Fill in a simple form with your idea’s details—title, problem,
                solution, pricing model, and more.
              </span>
            </span>
            <span className='w-full md:w-80'>
              <h6 className='font-semibold'>Structured Validation</h6>
              <span>
                Validators rate, comment, and provide risks, feedback, and
                willingness to pay—all anonymously or publicly.
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className='mt-24 md:mt-52'>
        <h2 className='mb-5 text-2xl font-semibold'>User Testimonials</h2>
        <span>See how others are validating smarter</span>
        <div className='flex flex-col md:flex-row gap-5 mt-5 mb-28'>
          <Card className='p-5 w-full md:w-1/2'>
            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} color='ffee8c' fill='ffee8c' />
              ))}
            </div>

            <span>
              "ValidatorLens helped me realize I was solving a non-problem. That
              insight saved me months of wasted effort."
            </span>
            <CardFooter className='flex gap-5'>
              <Avatar>
                <AvatarImage src='/lily.jpeg' />
                <AvatarFallback>F</AvatarFallback>
              </Avatar>
              <div>
                <div className='font-semibold'>Alex Rivera</div>
                <div className='text-sm'>Early-Stage Founder</div>
              </div>
            </CardFooter>
          </Card>
          <Card className='p-5 w-full md:w-1/2'>
            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} color='ffee8c' fill='ffee8c' />
              ))}
            </div>
            <span>
              "As a validator, I enjoy giving feedback—and I’ve discovered ideas
              I’d actually invest in."
            </span>
            <CardFooter className='flex gap-5'>
              <Avatar>
                <AvatarImage src='/validator.jpeg' />
                <AvatarFallback>V</AvatarFallback>
              </Avatar>
              <div>
                <div className='font-semibold'>Maya Chen</div>
                <div className='text-sm'>Product Manager & Validator</div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className='mt-24 md:mt-52 mb-52'>
        <div className='flex border border-foreground items-center justify-between pl-10 pr-10 h-32'>
          <div>
            <h2 className='text-xl font-semibold'>Validate Before You Build</h2>
            <div className='mt-2'>
              Join ValidatorLens and start turning ideas into validated
              opportunities.
            </div>
          </div>
          <div>
            <Button>Get Started</Button>
          </div>
        </div>
      </div>

      <div className='mt-24 md:mt-32 mb-32'>
        <FAQSection />
      </div>

      <div className='flex flex-col md:flex-row justify-around items-center'>
        <div>
          <h2 className='text-2xl font-semibold'>Get Validation Updates</h2>
          <div className='mt-5'>
            Join our newsletter to hear about top-rated ideas, validator tips,
            and startup validation trends.
          </div>
          <div className='flex gap-2 mt-10'>
            <input
              className='flex-1 bg-muted'
              type='text'
              placeholder='Your email'
            />
            <Button>Subscribe</Button>
          </div>
          <div className='mt-5 text-xs'>
            By subscribing, you agree to our Terms and Privacy Policy.
          </div>
        </div>
      </div>
    </div>
  );
}
