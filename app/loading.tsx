import { PropagateLoader } from 'react-spinners';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className='flex h-full items-center justify-center'>
      <PropagateLoader color='#68696b' className='text-foreground' />
    </div>
  );
}
