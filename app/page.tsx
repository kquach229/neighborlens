'use client';

import { AvatarImage, Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { StarIcon } from 'lucide-react';
import Image from 'next/image';
import SignInButton from '@/components/SignInButton';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Parallax, ParallaxBanner } from 'react-scroll-parallax';
import ParalaxParent from '@/components/ParalaxParent';

const FAQSection = () => {
  return (
    <div className='min-h-screen p-10'>
      <h1 className='text-3xl font-semibold text-center mb-12'>
        Frequently Asked Questions
      </h1>

      <div className='max-w-5xl mx-auto'>
        <Accordion type='single' collapsible>
          <AccordionItem value='item-1'>
            <AccordionTrigger className='text-xl font-medium'>
              1. What is ValidateLens?
            </AccordionTrigger>
            <AccordionContent>
              ValidateLens is a platform that allows founders to get real, human
              feedback on their startup ideas from experienced validators. It
              helps validate concepts, spot risks, and gain insights before you
              build, saving you time and resources.
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
              such as entrepreneurs, investors, product managers, yourself, and
              others with relevant expertise. You can view their profiles to see
              their background and areas of expertise.
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
              5. What is included in the feedback?
            </AccordionTrigger>
            <AccordionContent>
              The feedback loop includes information like whether or not the
              reviewer would purchase that product or service, suggestions,
              comments, ratings, etc.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-6'>
            <AccordionTrigger className='text-xl font-medium'>
              6. How do I upgrade my plan?
            </AccordionTrigger>
            <AccordionContent>
              As of 3/15/2025 ValidateLens is now free, so there’s no need to
              upgrade. You can access all features without a subscription.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-7'>
            <AccordionTrigger className='text-xl font-medium'>
              7. Can I cancel my subscription?
            </AccordionTrigger>
            <AccordionContent>
              Since we made the decision to make ValidateLens free, there is no
              subscription to cancel. All users have full access to the platform
              at no cost.
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
              Yes, you can submit multiple ideas. There is no limit to the
              number of submissions as the platform is now free.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-10'>
            <AccordionTrigger className='text-xl font-medium'>
              10. Can I edit my idea after submission?
            </AccordionTrigger>
            <AccordionContent>
              You can edit your own idea submissions.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-11'>
            <AccordionTrigger className='text-xl font-medium'>
              11. How do I receive feedback on my idea?
            </AccordionTrigger>
            <AccordionContent>
              Once your idea is submitted, it will be reviewed by validators who
              will provide feedback in the form of ratings, comments, and
              suggestions. You can also view feedback directly on your
              dashboard.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-12'>
            <AccordionTrigger className='text-xl font-medium'>
              12. How can I contact customer support?
            </AccordionTrigger>
            <AccordionContent>
              You can reach our support team via emailing us at{' '}
              <a href='mailto:kquach229@gmail.com' className='text-blue-300'>
                kquach229@gmail.com
              </a>
              . We’re here to help! <br />
              <strong>Please Note:</strong> Emails sent to
              support@validatelens.com will no longer be received. For
              assistance, please email:{' '}
              <a href='mailto:kquach229@gmail.com' className='text-blue-300'>
                kquach229@gmail.com
              </a>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-13'>
            <AccordionTrigger className='text-xl font-medium'>
              13. What is AI Sally?
            </AccordionTrigger>
            <AccordionContent>
              AI Sally is our built-in AI Feedback Assistant. She helps you spot
              patterns, and even has smart suggestions so you can make informed
              decisions more confidently.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-14'>
            <AccordionTrigger className='text-xl font-medium'>
              14. Is AI Sally Free to Use?
            </AccordionTrigger>
            <AccordionContent>
              AI Sally is now free to use for everyone. We no longer are
              charging credits for the usage of this tool. Simply go to the Idea
              Details page, and scroll to the bottom of the page. You can find
              her there!
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default function Home() {
  const session = useSession();
  const router = useRouter();

  return (
    <ParalaxParent>
      <div className='min-h-screen p-5'>
        <div className='mt-16 flex flex-col w-full sm:flex-row justify-between items-center gap-10'>
          <div className='flex flex-col justify-center gap-6 w-full md:w-2/3'>
            <h1 className='font-bold text-4xl leading-tight'>
              Validate Your Startup Idea—Before You Build
            </h1>
            <span className='text-lg'>
              Get real human feedback from experienced validators. No fluff—just
              actionable insight to help you decide what to build.
            </span>
            {session.data?.user ? (
              <Button
                className='w-[15rem]'
                onClick={() => router.push('/dashboard')}>
                Go to Dashboard
              </Button>
            ) : (
              <div className='w-[200px]'>
                <SignInButton />
              </div>
            )}
            <span></span>
          </div>
          <div className='w-full sm:w-1/3 mt-10 mb-10'>
            <Parallax speed={-12}>
              <Image
                className='object-center rounded-sm shadow-2xl'
                src={'/validate-lens-screenshot.png'}
                alt='hero-image'
                height={1000}
                width={1000}
              />
            </Parallax>
          </div>
        </div>

        <div className='mt-24 mb-10 md:mt-52 flex flex-col md:flex-row justify-around items-center gap-10'>
          <Parallax speed={-10}>
            <Image
              className='rounded-sm mb-20 h-[400px] md:h-[500px] w-full md:w-[500px] object-cover shadow-2xl'
              src={'/landing-page-macbooks.jpg'}
              alt='hero-image'
              height={600}
              width={600}
              objectFit='cover'
              objectPosition='center'
              loading='lazy'
            />
          </Parallax>

          <div className='gap-10 flex flex-col w-full md:w-1/2'>
            <h2 className='text-2xl font-semibold'>
              Founders & Validators, All in One Place
            </h2>
            <span>
              Switch roles easily between founder and validator. Submit ideas
              and review others—because better startups start with better
              feedback loops.
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

        <div className='mt-24 md:mt-52 flex flex-col md:flex-row items-center justify-between gap-5'>
          <div className='w-full md:w-2/4 mb-12'>
            <h2 className='text-2xl font-semibold mb-4'>
              Meet AI Sally — Your Feedback Co-Pilot
            </h2>
            <p className='text-lg'>
              While human validators give you high-quality feedback, AI Sally
              helps you interpret that feedback faster. Summarize insights,
              surface patterns, and get smart suggestions on next steps—all in
              one click.
            </p>
            <div className='mt-20 w-full'>
              <Image
                className='mx-auto rounded-sm'
                src={'/ai-sally-suggestion.png'}
                height={1000}
                width={1000}
                alt='screenshot'
              />
            </div>
          </div>
          <div className='mx-auto w-[90%] md:w-[420px] h-auto'>
            <video
              className='mx-auto rounded-sm'
              autoPlay
              muted
              controls={false}
              preload='none'
              aria-label='Video player'>
              <source src='/ai-sally-greeting.mp4' type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div className='mt-24 md:mt-52'>
          <h2 className='mb-5 text-2xl font-semibold'>User Testimonials</h2>
          <span>See how others are validating smarter</span>
          <div className='flex flex-col md:flex-row gap-5 mt-5 mb-28'>
            <Card className='p-5 w-full md:w-1/2 shadow-2xl'>
              <div className='flex'>
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    color='fill-yellow-500'
                    fill='fill-yellow-500'
                  />
                ))}
              </div>

              <span>
                "ValidateLens helped me realize I was solving a non-problem.
                That insight saved me months of wasted effort."
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
            <Card className='p-5 w-full md:w-1/2 shadow-2xl'>
              <div className='flex'>
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    color='fill-yellow-500'
                    fill='fill-yellow-500'
                  />
                ))}
              </div>
              <span>
                "As a validator, I enjoy giving feedback—and I’ve discovered
                ideas I’d actually invest in."
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

        <div className='relative'>
          <ParallaxBanner
            layers={[{ image: '/garbage-idea.jpg', speed: -15 }]}
            className='aspect-[2/1] rounded-sm'
          />

          <Card className='backdrop-blur-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md shadow-xl rounded-2xl border  bg-transparent p-6'>
            <CardContent className='space-y-4'>
              <div>
                <h5 className='text-xl font-semibold'>
                  Scrap Useless Ideas Before Spending Countless Resources
                </h5>
                <p className='text-sm mt-1'>
                  Get clarity early. Run your concept by real validators and
                  avoid wasting time, money, and energy.
                </p>
              </div>
              <div>
                <p className='text-sm italic'>
                  Fail fast. Iterate smarter. Move forward with confidence.
                </p>
              </div>
              <div className='pt-2'>
                {session.data?.user ? (
                  <Button
                    className='w-[15rem]'
                    onClick={() => router.push('/dashboard')}>
                    Go to Dashboard
                  </Button>
                ) : (
                  <div className='w-[200px]'>
                    <SignInButton />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='mt-24 md:mt-52 mb-52'>
          <div className='flex rounded-sm shadow-2xl border border-foreground items-center justify-between pl-10 pr-10 h-32'>
            <div className='space-x-2'>
              <h2 className='text-sm sm:text-xl font-semibold'>
                Validate Before You Build
              </h2>
              <div className='mt-2 hidden sm:block'>
                Join ValidateLens and start turning ideas into validated
                opportunities.
              </div>
            </div>
            <div>
              {session.data?.user ? (
                <Button onClick={() => router.push('/dashboard')}>
                  Go to Dashboard
                </Button>
              ) : (
                <SignInButton />
              )}
            </div>
          </div>
        </div>

        <div className='mt-24 md:mt-32 mb-32'>
          <FAQSection />
        </div>
      </div>
    </ParalaxParent>
  );
}
