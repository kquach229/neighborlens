'use client';

import { useEffect, useState } from 'react';
import { Users, Lightbulb, MessageSquare, TrendingUp } from 'lucide-react';

interface PlatformStats {
  totalUsers: number;
  totalIdeas: number;
  totalReviews: number;
  uniqueValidators: number;
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

export default function StatsSection() {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const displayStats = [
    {
      icon: Users,
      value: stats ? formatNumber(stats.totalUsers) : '...',
      label: 'Total Users',
      description: 'Founders and validators on the platform',
    },
    {
      icon: Lightbulb,
      value: stats ? formatNumber(stats.totalIdeas) : '...',
      label: 'Ideas Submitted',
      description: 'Startup concepts submitted for validation',
    },
    {
      icon: MessageSquare,
      value: stats ? formatNumber(stats.totalReviews) : '...',
      label: 'Reviews Given',
      description: 'Total feedback and insights shared',
    },
    {
      icon: TrendingUp,
      value: stats ? formatNumber(stats.uniqueValidators) : '...',
      label: 'Active Validators',
      description: 'Users who have provided feedback',
    },
  ];

  return (
    <section className='py-16 md:py-24 bg-muted/30'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold mb-3'>
            Growing Community of Founders
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Join founders who are validating smarter and building better products.
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {displayStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className='text-center p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow duration-300'>
                <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4'>
                  <Icon className='w-8 h-8 text-primary' />
                </div>
                <div className='text-4xl font-bold mb-2'>{stat.value}</div>
                <div className='text-lg font-semibold mb-1'>{stat.label}</div>
                <div className='text-sm text-muted-foreground'>
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
