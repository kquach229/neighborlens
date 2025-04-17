// components/UserCredits.tsx
'use client';

type Props = {
  credits: number | null;
};

const UserCredits = ({ credits }: Props) => {
  return (
    <div className='text-sm text-muted-foreground min-w-[80px] text-center'>
      {credits !== null ? `${credits} credits` : 'Loading...'}
    </div>
  );
};

export default UserCredits;
