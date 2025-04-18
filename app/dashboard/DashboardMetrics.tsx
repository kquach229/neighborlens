import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { ROLES } from '@/stores/roleStore';

const fetchDashboardData = async (role: string) => {
  const res = await fetch(`/api/dashboard/metrics?role=${role}`);
  if (!res.ok) throw new Error('Failed to fetch dashboard data');
  return res.json();
};

type DashboardData = {
  role: string;
  // Founder
  ideaCount?: number;
  reviewCount?: number;
  averageRating?: string;
  wouldIPayForThisPercent?: string;
  uniqueValidators?: number;
  // Validator
  totalReviews?: number;
  uniqueIdeasReviewed?: number;
  credits?: number;
  helpfulTags?: string[];
  averageResponseTime?: string;
};

const MetricBlock = ({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) => (
  <div className='space-y-1'>
    <p className='text-sm text-muted-foreground'>{label}</p>
    <p className='text-lg font-bold'>{value ?? '-'}</p>
  </div>
);

const DashboardMetrics = ({ role }: { role: string }) => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData(role.toUpperCase())
      .then((res) => setData(res))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [role]);

  if (loading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className='h-[120px] w-full rounded-xl' />
        ))}
      </div>
    );
  }

  if (error) return <div className='text-red-500'>Error: {error}</div>;
  if (!data) return <div className='text-red-500'>No data available</div>;

  return (
    <div className='w-full mt-2 mb-10'>
      <Card className='p-5'>
        <CardContent className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8'>
          {data.role === ROLES.FOUNDER && (
            <>
              <MetricBlock label='Ideas Submitted' value={data.ideaCount} />
              <MetricBlock
                label='Total Reviews Received'
                value={data.reviewCount}
              />
              <MetricBlock
                label='Average Rating'
                value={`${data.averageRating}/5`}
              />
              <MetricBlock
                label='% of Reviews That Would Pay'
                value={`${data.wouldIPayForThisPercent}%`}
              />
              <MetricBlock
                label='Unique Validators'
                value={data.uniqueValidators}
              />
            </>
          )}

          {data.role === ROLES.VALIDATOR && (
            <>
              <MetricBlock
                label='Total Reviews Given'
                value={data.totalReviews}
              />
              <MetricBlock
                label='Unique Ideas Reviewed'
                value={data.uniqueIdeasReviewed}
              />
              <MetricBlock label='Credits Earned' value={data.credits} />
              <MetricBlock
                label='Avg. Response Time'
                value={data.averageResponseTime}
              />
              <MetricBlock
                label='Reviews Until Next Earned Credit'
                value={data.reviewsUntilNextCredit}
              />
              {data.helpfulTags && data.helpfulTags.length > 0 && (
                <div className='space-y-1'>
                  <p className='text-sm text-muted-foreground'>
                    Top Helpful Tags
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {data.helpfulTags.map((tag, i) => (
                      <Badge key={i} variant='outline'>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardMetrics;
