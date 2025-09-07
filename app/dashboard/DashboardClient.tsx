'use client';

import React, { FC, Suspense, useEffect, useMemo, useState } from 'react';
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
import { Button } from '@/components/ui/button';

type DashboardClientProps = { allIdeas: Idea[] };

type IdeasGridProps = {
  ideas: Idea[];
  sortOption: string;
  currentPage: number;
  itemsPerPage: number;
};

type SectionProps = {
  title: string;
  ideas: Idea[];
  emptyMessage: string;
  sortOption: string;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

type FounderViewProps = {
  ownIdeas: Idea[];
  sortOption: string;
  itemsPerPage: number;
};

type ValidatorViewProps = {
  reviewedIdeas: Idea[];
  notYetValidated: Idea[];
  sortOption: string;
  itemsPerPage: number;
};

const sortIdeas = (ideas: Idea[], sortOption: string): Idea[] => {
  const sorted = [...ideas];
  if (sortOption === 'title')
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  else if (sortOption === 'newest')
    sorted.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  else if (sortOption === 'oldest')
    sorted.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  return sorted;
};

const IdeasGrid: FC<IdeasGridProps> = ({
  ideas,
  sortOption,
  currentPage,
  itemsPerPage,
}) => {
  const sortedIdeas = useMemo(
    () => sortIdeas(ideas, sortOption),
    [ideas, sortOption]
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedIdeas = sortedIdeas.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Grid layout calculations
  const rows = Math.ceil(itemsPerPage / 3); // 3 columns on lg
  const rowHeight = 350; // approximate height of IdeaCard + gap
  const minGridHeight = rows * rowHeight;

  const placeholders = Array(itemsPerPage - paginatedIdeas.length).fill(null);

  return (
    <div
      className='transition-all duration-300 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'
      style={{ minHeight: `${minGridHeight}px` }}>
      {paginatedIdeas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} />
      ))}
      {placeholders.map((_, i) => (
        <div key={`placeholder-${i}`} className='invisible' />
      ))}
    </div>
  );
};

const PaginationControls: FC<{
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  return (
    <div className='flex justify-center items-center gap-3 mt-8'>
      <Button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className='px-4 py-2 rounded disabled:opacity-50'>
        Previous
      </Button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className='px-4 py-2 rounded disabled:opacity-50'>
        Next
      </Button>
    </div>
  );
};

const Section: FC<SectionProps> = ({
  title,
  ideas,
  emptyMessage,
  sortOption,
  currentPage,
  itemsPerPage,
  onPageChange,
}) => (
  <section className='mt-10'>
    <h4 className='text-lg font-semibold'>{title}</h4>
    {ideas.length > 0 ? (
      <>
        <IdeasGrid
          ideas={ideas}
          sortOption={sortOption}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
        <PaginationControls
          currentPage={currentPage}
          totalItems={ideas.length}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
        />
      </>
    ) : (
      <p className='text-muted-foreground mt-5'>{emptyMessage}</p>
    )}
  </section>
);

const FounderView: FC<FounderViewProps> = ({
  ownIdeas,
  sortOption,
  itemsPerPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [ownIdeas, sortOption]);

  if (ownIdeas.length === 0)
    return (
      <div className='flex flex-col items-center justify-center min-h-[50vh]'>
        <h3 className='text-center mt-10'>You currently have no ideas.</h3>
      </div>
    );

  return (
    <div>
      <div className='flex justify-end'>
        <CreateIdeaButton />
      </div>
      <IdeasGrid
        ideas={ownIdeas}
        sortOption={sortOption}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
      <PaginationControls
        currentPage={currentPage}
        totalItems={ownIdeas.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

const ValidatorView: FC<ValidatorViewProps> = ({
  notYetValidated,
  reviewedIdeas,
  sortOption,
  itemsPerPage,
}) => {
  const [waitingPage, setWaitingPage] = useState(1);
  const [reviewedPage, setReviewedPage] = useState(1);

  useEffect(() => setWaitingPage(1), [notYetValidated, sortOption]);
  useEffect(() => setReviewedPage(1), [reviewedIdeas, sortOption]);

  return (
    <div>
      <Section
        title='Waiting for Validation'
        ideas={notYetValidated}
        emptyMessage='No new ideas to validate.'
        sortOption={sortOption}
        currentPage={waitingPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setWaitingPage}
      />
      <Section
        title='Already Validated by You'
        ideas={reviewedIdeas}
        emptyMessage="You haven't reviewed any ideas yet."
        sortOption={sortOption}
        currentPage={reviewedPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setReviewedPage}
      />
    </div>
  );
};

export const FreeDialog = () => (
  <div className='space-y-5'>
    <DialogTitle className='text-2xl font-semibold'>
      ValidateLens is now <span className='text-green-600'>FREE</span> 🎉
    </DialogTitle>
    <p className='mt-2 text-sm text-muted-foreground'>
      You can now submit unlimited ideas without using credits. We appreciate
      the support and hope everyone can continue to enjoy the platform!
    </p>
  </div>
);

const DashboardClient: FC<DashboardClientProps> = ({ allIdeas }) => {
  const { watch, setValue } = useForm<{ categories?: string[] }>({
    defaultValues: { categories: [] },
  });
  const selectedCategories = watch('categories') || [];
  const { data: session, status } = useSession();
  const { role } = useRoleStore();
  const { openDialog } = useDialogStore();

  const [sortOption, setSortOption] = useState('newest');
  const itemsPerPage = 6;

  const filterByCategories = (ideas: Idea[], categories: string[]) => {
    if (!categories.length) return ideas;
    return ideas.filter((idea) =>
      idea.categories?.some((c) => categories.includes(c))
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
      if (now - parsed.timestamp > ONE_HOUR)
        localStorage.setItem(
          FIRST_VISIT_KEY,
          JSON.stringify({ value: 'false', timestamp: now })
        );
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
      (r) => r.userId === currentUserId
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

      {role === ROLES.FOUNDER ? (
        <FounderView
          ownIdeas={filterByCategories(ownIdeas, selectedCategories)}
          sortOption={sortOption}
          itemsPerPage={itemsPerPage}
        />
      ) : (
        <ValidatorView
          notYetValidated={filterByCategories(
            notYetValidated,
            selectedCategories
          )}
          reviewedIdeas={filterByCategories(reviewedIdeas, selectedCategories)}
          sortOption={sortOption}
          itemsPerPage={itemsPerPage}
        />
      )}

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
