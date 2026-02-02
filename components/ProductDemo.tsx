'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Lightbulb,
  MessageSquare,
  Star,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Users,
  Brain,
} from 'lucide-react';
import SignInButton from '@/components/SignInButton';

const demoSteps = [
  {
    id: 1,
    title: 'Submit Your Idea',
    description: 'Fill out a simple form with your startup idea details',
    icon: Lightbulb,
    content: (
      <div className='space-y-6'>
        <div className='space-y-4'>
          <div>
            <h4 className='font-semibold mb-2'>What You'll Provide:</h4>
            <ul className='space-y-2 text-sm text-muted-foreground'>
              <li className='flex items-start gap-2'>
                <CheckCircle2 className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                <span><strong>Idea Title</strong> - A clear, concise name for your concept</span>
              </li>
              <li className='flex items-start gap-2'>
                <CheckCircle2 className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                <span><strong>Problem Statement</strong> - The specific problem you're solving</span>
              </li>
              <li className='flex items-start gap-2'>
                <CheckCircle2 className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                <span><strong>Your Solution</strong> - How your idea addresses the problem</span>
              </li>
              <li className='flex items-start gap-2'>
                <CheckCircle2 className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                <span><strong>Pricing Model</strong> - How you plan to monetize</span>
              </li>
              <li className='flex items-start gap-2'>
                <CheckCircle2 className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                <span><strong>Target Market</strong> - Who your ideal customers are</span>
              </li>
            </ul>
          </div>
          <div className='bg-muted/50 p-4 rounded-lg border border-border'>
            <p className='text-sm'>
              <strong>Process:</strong> The form takes just a few minutes to complete. Once submitted, your idea is immediately available for validators to review. No waiting, no approval process—just instant access to feedback.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: 'Get Expert Feedback',
    description: 'Validators review your idea and provide structured feedback',
    icon: Users,
    content: (
      <div className='space-y-6'>
        <div className='space-y-4'>
          <div>
            <h4 className='font-semibold mb-3'>What Validators Provide:</h4>
            <div className='grid md:grid-cols-2 gap-4'>
              <Card>
                <CardHeader className='pb-3'>
                  <CardTitle className='text-base'>Rating System</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-muted-foreground'>
                    Validators rate your idea on a 1-5 scale, giving you a quick sense of overall reception and potential.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='pb-3'>
                  <CardTitle className='text-base'>Structured Comments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-muted-foreground'>
                    Detailed feedback covering what they like, what concerns them, and specific suggestions for improvement.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='pb-3'>
                  <CardTitle className='text-base'>Willingness to Pay</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-muted-foreground'>
                    Validators indicate if they would actually pay for your solution, providing real market validation.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='pb-3'>
                  <CardTitle className='text-base'>Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-muted-foreground'>
                    Identified potential challenges, competition concerns, and market risks you should consider.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className='bg-muted/50 p-4 rounded-lg border border-border'>
            <p className='text-sm'>
              <strong>Process:</strong> Validators are experienced founders, product managers, and investors who review ideas in their spare time. You'll typically receive multiple reviews within hours or days, each providing unique perspectives and insights.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: 'AI Sally Analyzes',
    description: 'Get instant insights and pattern recognition from AI',
    icon: Brain,
    content: (
      <div className='space-y-6'>
        <div className='space-y-4'>
          <Card className='bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20'>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <Brain className='w-5 h-5 text-primary' />
                <CardTitle className='text-lg'>AI Sally's Capabilities</CardTitle>
              </div>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <p className='text-sm font-semibold mb-3'>What AI Sally Does:</p>
                <ul className='space-y-2 text-sm'>
                  <li className='flex items-start gap-2'>
                    <CheckCircle2 className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                    <span><strong>Pattern Recognition</strong> - Identifies common themes across all your reviews</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle2 className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                    <span><strong>Sentiment Analysis</strong> - Summarizes overall validator sentiment and confidence levels</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle2 className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                    <span><strong>Actionable Insights</strong> - Provides specific recommendations based on feedback patterns</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle2 className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                    <span><strong>Risk Identification</strong> - Highlights frequently mentioned concerns or potential issues</span>
                  </li>
                </ul>
              </div>
              <div className='pt-3 border-t'>
                <p className='text-xs text-muted-foreground'>
                  <strong>Process:</strong> AI Sally analyzes all your reviews simultaneously, looking for patterns that might not be obvious when reading feedback individually. She provides a comprehensive summary and actionable next steps, helping you make sense of multiple perspectives quickly.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: 'Make Informed Decisions',
    description: 'Use data-driven insights to pivot, refine, or build',
    icon: TrendingUp,
    content: (
      <div className='space-y-6'>
        <div className='space-y-4'>
          <div>
            <h4 className='font-semibold mb-3'>Metrics You'll See:</h4>
            <div className='grid md:grid-cols-2 gap-4 mb-4'>
              <Card>
                <CardContent className='pt-6'>
                  <div className='text-center'>
                    <div className='text-3xl font-bold text-primary mb-1'>Average Rating</div>
                    <div className='text-sm text-muted-foreground'>
                      Overall validator sentiment on a 1-5 scale
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='pt-6'>
                  <div className='text-center'>
                    <div className='text-3xl font-bold text-green-600 mb-1'>Would Pay %</div>
                    <div className='text-sm text-muted-foreground'>
                      Percentage of validators who would purchase
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className='text-base'>Your Decision Framework</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='space-y-2 text-sm'>
                <p className='font-medium'>Based on your feedback, you can:</p>
                <div className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-green-500 mt-0.5 flex-shrink-0' />
                  <span><strong>Proceed with confidence</strong> - If ratings are high and validators see clear value</span>
                </div>
                <div className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0' />
                  <span><strong>Refine and iterate</strong> - Address common concerns and resubmit for validation</span>
                </div>
                <div className='flex items-start gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0' />
                  <span><strong>Pivot strategically</strong> - Use feedback to identify a better direction or target market</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className='bg-muted/50 p-4 rounded-lg border border-border'>
            <p className='text-sm'>
              <strong>Process:</strong> All your feedback, metrics, and AI insights are organized in one dashboard. You can review individual comments, see aggregate statistics, and use AI Sally's analysis to make informed decisions about whether to build, pivot, or refine your idea.
            </p>
          </div>
        </div>
      </div>
    ),
  },
];

export default function ProductDemo() {
  const router = useRouter();
  const session = useSession();
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    // Auto-play the demo
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < demoSteps.length - 1) {
          return prev + 1;
        } else {
          // Loop back to start
          return 0;
        }
      });
    }, 30000); // Change step every 4 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  const currentStep = demoSteps[activeStep];
  const Icon = currentStep.icon;

  return (
    <section className='py-16 md:py-24 bg-gradient-to-b from-background to-muted/20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold mb-3'>
            See ValidateLens in Action
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Watch how easy it is to validate your startup idea and get
            actionable feedback
          </p>
        </div>

        <div className='max-w-5xl mx-auto'>
          {/* Step Indicators */}
          <div className='flex justify-center mb-8'>
            <div className='flex items-center gap-2'>
              {demoSteps.map((step, index) => (
                <div key={step.id} className='flex items-center'>
                  <button
                    onClick={() => {
                      setIsPaused(true);
                      setActiveStep(index);
                    }}
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                      index === activeStep
                        ? 'bg-primary text-primary-foreground border-primary'
                        : index < activeStep
                          ? 'bg-primary/20 text-primary border-primary'
                          : 'bg-background text-muted-foreground border-muted'
                    }`}>
                    <step.icon className='w-5 h-5' />
                  </button>
                  {index < demoSteps.length - 1 && (
                    <div
                      className={`w-12 h-0.5 ${
                        index < activeStep ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Demo Content */}
          <Card className='min-h-[500px]'>
            <CardHeader>
              <div className='flex items-center gap-3'>
                <div className='flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10'>
                  <Icon className='w-6 h-6 text-primary' />
                </div>
                <div>
                  <CardTitle className='text-xl'>
                    {currentStep.title}
                  </CardTitle>
                  <p className='text-sm text-muted-foreground'>
                    {currentStep.description}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>{currentStep.content}</CardContent>
          </Card>

          {/* Navigation */}
          <div className='flex justify-between items-center mt-6'>
            <Button
              variant='outline'
              onClick={() => {
                setIsPaused(true);
                setActiveStep(Math.max(0, activeStep - 1));
              }}
              disabled={activeStep === 0}>
              Previous
            </Button>
            <div className='text-sm text-muted-foreground'>
              Step {activeStep + 1} of {demoSteps.length}
            </div>
            <Button
              onClick={() => {
                setIsPaused(true);
                if (activeStep < demoSteps.length - 1) {
                  setActiveStep(activeStep + 1);
                } else {
                  setActiveStep(0);
                  setIsPaused(false);
                }
              }}>
              {activeStep === demoSteps.length - 1 ? (
                'Restart'
              ) : (
                <>
                  Next
                  <ArrowRight className='ml-2 w-4 h-4' />
                </>
              )}
            </Button>
          </div>

          {/* CTA */}
          <div className='mt-12 text-center'>
            <p className='text-lg font-semibold mb-4'>
              Ready to validate your idea?
            </p>
            {session.data?.user ? (
              <Button
                size='lg'
                className='px-8'
                onClick={() => router.push('/dashboard')}>
                Go to Dashboard
                <ArrowRight className='ml-2 w-5 h-5' />
              </Button>
            ) : (
              <SignInButton />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
