'use client';

import {
  Zap,
  Shield,
  Users,
  Brain,
  Clock,
  BarChart3,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Get feedback within hours, not weeks. Our streamlined process ensures quick turnaround times.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description:
      'Your ideas are protected. Choose between anonymous or public validation based on your comfort level.',
  },
  {
    icon: Users,
    title: 'Expert Validators',
    description:
      'Connect with experienced entrepreneurs, investors, and product experts who understand your journey.',
  },
  {
    icon: Brain,
    title: 'AI-Powered Insights',
    description:
      'AI Sally analyzes feedback patterns and provides actionable insights to help you make better decisions.',
  },
  {
    icon: Clock,
    title: 'Save Time & Money',
    description:
      'Validate before you build. Avoid wasting months on ideas that wont resonate with your target market.',
  },
  {
    icon: BarChart3,
    title: 'Data-Driven Decisions',
    description:
      'Get structured ratings, willingness-to-pay metrics, and detailed feedback to guide your next steps.',
  },
  {
    icon: MessageSquare,
    title: 'Structured Feedback',
    description:
      'Receive comprehensive reviews covering risks, opportunities, and actionable suggestions.',
  },
  {
    icon: CheckCircle2,
    title: 'Free to Use',
    description:
      'No credit card required. Validate unlimited ideas at no cost and focus on building what matters.',
  },
];

export default function FeatureGrid() {
  return (
    <section className='py-16 md:py-24'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold mb-3'>
            Everything You Need to Validate Smarter
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Powerful features designed to help you make informed decisions and
            build products people actually want.
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className='hover:shadow-lg transition-all duration-300 border-border'>
                <CardHeader>
                  <div className='inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-3'>
                    <Icon className='w-6 h-6 text-primary' />
                  </div>
                  <CardTitle className='text-lg'>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-muted-foreground'>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
