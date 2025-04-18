import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
  // Founder specific
  ideaCount?: number;
  reviewCount?: number;
  averageRating?: string;
  // Validator specific
  totalReviews?: number;
  uniqueIdeasReviewed?: number;
  credits?: number;
};

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
        {[...Array(1)].map((_, i) => (
          <Skeleton key={i} className='h-[120px] w-full rounded-xl' />
        ))}
      </div>
    );
  }

  if (error) return <div className='text-red-500'>Error: {error}</div>;
  if (!data) return <div className='text-red-500'>No data available</div>;

  const renderMetricsContent = (role) => {
    return (
      <>
        {role == ROLES.FOUNDER ? (
          <>
            <div>
              <p className='text-sm text-muted-foreground'>Ideas Submitted</p>
              <p className='text-lg font-bold'>{data.ideaCount}</p>
            </div>

            <div>
              <p className='text-sm text-muted-foreground'>
                Total Reviews Received
              </p>
              <p className='text-lg font-bold'>{data.reviewCount}</p>
            </div>

            <div>
              <p className='text-sm text-muted-foreground'>Average Rating</p>
              <p className='text-lg font-bold'>{data.averageRating}/5</p>
            </div>
          </>
        ) : (
          <>
            <div>
              <p className='text-sm text-muted-foreground'>
                Total Reviews Given
              </p>
              <p className='text-lg font-bold'>{data.totalReviews}</p>
            </div>

            <div>
              <p className='text-sm text-muted-foreground'>
                Unique Ideas Reviewed
              </p>
              <p className='text-lg font-bold'>{data.uniqueIdeasReviewed}</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Credits Earned</p>
              <p className='text-lg font-bold'>{data.credits}</p>
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <div className='w-full mt-2 mb-10'>
      <Card className='p-5 h-[180px] sm:h-[90px]'>
        <CardContent className='pl-10 flex flex-col sm:flex-row justify-start items-start sm:justify-around md:items-center text-left'>
          {renderMetricsContent(role)}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardMetrics;
