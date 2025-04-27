'use client';

import { FC, Suspense, useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import IdeaCard from '@/components/IdeaCard';
import { ROLES, useRoleStore } from '@/stores/roleStore';
import RoleToggle from '@/components/RoleToggle';
import DashboardMetrics from './DashboardMetrics';
import CreateIdeaButton from '@/components/CreateIdeaButton';
import Loading from '../loading';

import type { Idea } from '@/types/types';
import { useDialogStore } from '@/stores/dialogStore';
import { DialogTitle } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ReusableMultiSelct } from '@/components/ReusableMultiselect';
import { Label } from '@/components/ui/label';
import { categoriesList } from '@/components/IdeaForm';
import { useForm } from 'react-hook-form';

type DashboardClientProps = {
  allIdeas: Idea[];
};

type IdeasGridProps = {
  ideas: Idea[];
  sortOption: string;
};

type SectionProps = {
  title: string;
  ideas: Idea[];
  emptyMessage: string;
  sortOption: string;
};

type FounderViewProps = {
  ownIdeas: Idea[];
};

type ValidatorViewProps = {
  reviewedIdeas: Idea[];
  notYetValidated: Idea[];
};

const sortIdeas = (ideas: Idea[], sortOption: string): Idea[] => {
  const sorted = [...ideas];
  if (sortOption === 'title') {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === 'newest') {
    sorted.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else if (sortOption === 'oldest') {
    sorted.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }
  return sorted;
};

const IdeasGrid: FC<IdeasGridProps> = ({ ideas, sortOption }) => {
  const sortedIdeas = useMemo(
    () => sortIdeas(ideas, sortOption),
    [ideas, sortOption]
  );

  if (sortedIdeas.length === 0) return null;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
      {sortedIdeas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} />
      ))}
    </div>
  );
};

const Section: FC<SectionProps> = ({
  title,
  ideas,
  emptyMessage,
  sortOption,
}) => (
  <section className='mt-10'>
    <h4 className='text-lg font-semibold'>{title}</h4>
    {ideas.length > 0 ? (
      <IdeasGrid ideas={ideas} sortOption={sortOption} />
    ) : (
      <p className='text-muted-foreground mt-5'>{emptyMessage}</p>
    )}
  </section>
);

const FounderView: FC<FounderViewProps & { sortOption: string }> = ({
  ownIdeas,
  sortOption,
}) => {
  return (
    <div>
      <div className='flex justify-end'>
        <CreateIdeaButton />
      </div>

      {ownIdeas.length < 1 ? (
        <div className='flex flex-col items-center justify-center min-h-[50vh]'>
          <h3 className='text-center mt-10'>You currently have no ideas.</h3>
        </div>
      ) : (
        <IdeasGrid ideas={ownIdeas} sortOption={sortOption} />
      )}
    </div>
  );
};

const ValidatorView: FC<ValidatorViewProps & { sortOption: string }> = ({
  notYetValidated,
  reviewedIdeas,
  sortOption,
}) => (
  <div>
    <Section
      title='Waiting for Validation'
      ideas={notYetValidated}
      emptyMessage='No new ideas to validate.'
      sortOption={sortOption}
    />
    <Section
      title='Already Validated by You'
      ideas={reviewedIdeas}
      emptyMessage="You haven't reviewed any ideas yet."
      sortOption={sortOption}
    />
  </div>
);

export const FreeDialog = () => {
  return (
    <div className='space-y-5'>
      <DialogTitle className='text-2xl font-semibold'>
        ValidateLens is now <span className='text-green-600'>FREE</span> 🎉
      </DialogTitle>
      <p className='mt-2 text-sm text-muted-foreground'>
        You can now submit unlimited ideas without using credits. We Appreciate
        the Support and hope everyone can continue to enjoy the platform!
      </p>
    </div>
  );
};

const DashboardClient: FC<DashboardClientProps> = ({ allIdeas }) => {
  const { data: session, status } = useSession();
  const { role } = useRoleStore();
  const { openDialog } = useDialogStore();
  const [sortOption, setSortOption] = useState('newest');
  const { watch, setValue } = useForm();
  const selectedCategories = watch('categories') || [];

  const filterByCategories = (ideas: Idea[], selectedCategories: string[]) => {
    if (selectedCategories.length === 0) return ideas;
    return ideas.filter((idea) =>
      idea.categories?.some((category) => selectedCategories.includes(category))
    );
  };

  useEffect(() => {
    const FIRST_VISIT_KEY = 'first_visit';
    const ONE_HOUR = 60 * 60 * 1000;
    const now = Date.now();

    const stored = localStorage.getItem(FIRST_VISIT_KEY);

    if (!stored) {
      localStorage.setItem(
        FIRST_VISIT_KEY,
        JSON.stringify({ value: 'true', timestamp: now })
      );
      openDialog(FreeDialog, { title: 'Great News!' });
    } else {
      const parsed = JSON.parse(stored);
      const elapsed = now - parsed.timestamp;

      if (elapsed > ONE_HOUR) {
        localStorage.setItem(
          FIRST_VISIT_KEY,
          JSON.stringify({ value: 'false', timestamp: now })
        );
      }
    }
  }, []);

  if (status === 'loading') return <Loading />;
  if (!session?.user?.id) return null;

  const currentUserId = session.user.id;

  const ownIdeas: Idea[] = [];
  const reviewedIdeas: Idea[] = [];
  const notYetValidated: Idea[] = [];

  for (const idea of allIdeas) {
    const isOwn = idea.authorId === currentUserId;
    const hasReviewed = (idea.reviews ?? []).some(
      (review) => review.userId === currentUserId
    );

    if (isOwn) ownIdeas.push(idea);
    else if (hasReviewed) reviewedIdeas.push(idea);
    else notYetValidated.push(idea);
  }

  return (
    <div>
      <div className='flex justify-between items-center space-y-10'>
        <div className='flex flex-col'>
          {session?.user?.name && (
            <h1 className='mt-5 mb-2'>
              Welcome, {session.user.name.split(' ')[0]}
            </h1>
          )}
          <h2 className='text-2xl font-bold'>Dashboard</h2>
        </div>

        <div className='flex flex-col items-end gap-5'>
          <RoleToggle />
        </div>
      </div>
      <div className='flex justify-between items-center w-full gap-5 mb-5'>
        <div className='w-3/4 text-right'>
          <Label className='mb-2'>Categories</Label>
          <ReusableMultiSelct
            className='z-50'
            options={categoriesList}
            onValueChange={(values) => setValue('categories', values)}
            defaultValue={selectedCategories}
            placeholder='Select categories'
            variant='inverted'
            animation={2}
            maxCount={3}
          />
        </div>

        <div className='text-right'>
          <Label className='mb-2 text-right flex justify-end'>Sort</Label>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger>
              <SelectValue placeholder='Sort by' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='newest'>Newest</SelectItem>
              <SelectItem value='oldest'>Oldest</SelectItem>
              <SelectItem value='title'>Title A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        {role === ROLES.FOUNDER ? (
          <FounderView
            ownIdeas={filterByCategories(ownIdeas, selectedCategories)}
            sortOption={sortOption}
          />
        ) : (
          <ValidatorView
            notYetValidated={filterByCategories(
              notYetValidated,
              selectedCategories
            )}
            reviewedIdeas={filterByCategories(
              reviewedIdeas,
              selectedCategories
            )}
            sortOption={sortOption}
          />
        )}
      </div>

      <div className='w-full mt-20'>
        <h5>Metrics</h5>
        <Suspense fallback={<div>Loading....</div>}>
          <DashboardMetrics role={role} />
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardClient;
