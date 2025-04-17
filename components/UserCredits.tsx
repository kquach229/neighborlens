// components/UserCredits.tsx
'use client';

import { TooltipProvider } from '@radix-ui/react-tooltip';
import { CoinsIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

type Props = {
  credits: number | null;
};

const UserCredits = ({ credits }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <div className='text-sm text-muted-foreground max-w-[80px] text-center'>
          <TooltipContent>
            <p>You have {credits} credits to use towards creating ideas</p>
          </TooltipContent>
          <div>{credits !== null ? `${credits}` : 'Loading...'}</div>
          <TooltipTrigger>
            <CoinsIcon className='w-5 h-5' />
          </TooltipTrigger>
        </div>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UserCredits;
