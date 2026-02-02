'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Parallax, ParallaxBanner } from 'react-scroll-parallax';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

import SignInButton from '@/components/SignInButton';
import ParalaxParent from '@/components/ParalaxParent';
import StatsSection from '@/components/StatsSection';
import FeatureGrid from '@/components/FeatureGrid';
import TrustBadges from '@/components/TrustBadges';
import EnhancedTestimonials from '@/components/EnhancedTestimonials';
import ProductDemo from '@/components/ProductDemo';

/* -------------------------------- FAQ -------------------------------- */

const FAQSection = () => {
  return (
    <div className="py-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Everything you need to know about ValidateLens
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {[
            {
              q: 'What is ValidateLens?',
              a: 'ValidateLens helps founders get real human feedback on startup ideas before building.'
            },
            {
              q: 'How does validation work?',
              a: 'Submit your idea and receive ratings, comments, and insights from experienced validators.'
            },
            {
              q: 'Who are the validators?',
              a: 'Entrepreneurs, product managers, investors, and builders across industries.'
            },
            {
              q: 'Is ValidateLens free?',
              a: 'Yes. As of 7/15/2025, all features are free for everyone.'
            },
            {
              q: 'What is AI Sally?',
              a: 'AI Sally summarizes feedback, finds patterns, and suggests next steps.'
            },
          ].map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-xl font-medium">
                {item.q}
              </AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

/* -------------------------------- PAGE -------------------------------- */

export default function Home() {
  const session = useSession();
  const router = useRouter();

  return (
    <ParalaxParent>
      <div className="min-h-screen">

        {/* ------------------------------ HERO ------------------------------ */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20">
          <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  Now Free Forever • No Credit Card Required
                </div>

                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Validate Your Startup Idea{' '}
                  <span className="text-primary">Before You Build</span>
                </h1>

                <p className="text-xl text-muted-foreground max-w-2xl">
                  Get real human feedback from experienced validators.
                  Clear signal, no fluff.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  {session.data?.user ? (
                    <Button size="lg" onClick={() => router.push('/dashboard')}>
                      Go to Dashboard
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  ) : (
                    <SignInButton />
                  )}

                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => router.push('/about')}
                  >
                    Learn More
                  </Button>
                </div>

                <TrustBadges />
              </div>

              <div className="flex-1 w-full">
                <Parallax speed={-12}>
                  <Image
                    src="/validate-lens-screenshot.png"
                    alt="ValidateLens dashboard"
                    width={1000}
                    height={1000}
                    priority
                    className="rounded-lg shadow-2xl"
                  />
                </Parallax>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------ STATS ------------------------------ */}
        <StatsSection />

        {/* ----------------------------- FEATURES ---------------------------- */}
        <FeatureGrid />

        {/* ----------------------------- PRODUCT DEMO ---------------------------- */}
        <ProductDemo />

        {/* ---------------------------- AI SALLY ----------------------------- */}
        <section className="py-20 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Meet AI Sally — Your Feedback Co-Pilot
              </h2>
              <p className="text-muted-foreground mb-6">
                Summarize feedback, surface patterns, and get next-step
                recommendations instantly.
              </p>

              <Image
                src="/ai-sally-suggestion.png"
                alt="AI Sally"
                width={900}
                height={900}
                className="rounded-lg shadow-xl"
              />
            </div>

            <video
              className="rounded-lg shadow-xl"
              autoPlay
              muted
              playsInline
            >
              <source src="/ai-sally-greeting.mp4" type="video/mp4" />
            </video>
          </div>
        </section>

        {/* -------------------------- TESTIMONIALS -------------------------- */}
        <EnhancedTestimonials />

        {/* ------------------------------ CTA ------------------------------- */}
        <section className="relative py-32">
          <ParallaxBanner
            layers={[{ image: '/garbage-idea.jpg', speed: -15 }]}
            className="aspect-[2/1] rounded-lg"
          />

          <div className="absolute inset-0 bg-black/60 rounded-lg" />

          <Card className="absolute inset-0 m-auto max-w-2xl h-fit backdrop-blur-xl bg-card/95 p-8">
            <CardContent className="text-center space-y-6">
              <h3 className="text-3xl font-bold">
                Scrap Bad Ideas Early
              </h3>
              <p className="text-muted-foreground">
                Save months of time and thousands of dollars.
              </p>

              {session.data?.user ? (
                <Button size="lg" onClick={() => router.push('/dashboard')}>
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              ) : (
                <SignInButton />
              )}
            </CardContent>
          </Card>
        </section>

        {/* ------------------------------ FAQ ------------------------------- */}
        <section className="py-24 bg-muted/20">
          <FAQSection />
        </section>

      </div>
    </ParalaxParent>
  );
}
