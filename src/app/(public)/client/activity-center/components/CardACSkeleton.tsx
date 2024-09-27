import { Skeleton } from '@/components/ui/skeleton';

export const CardACSkeleton = () => {
  return (
    <div className='mb-2 flex w-full flex-col gap-4 rounded-xl border border-input p-4 shadow'>
      <div className='flex justify-between'>
        <div className='flex'>
          <Skeleton className='h-6 w-36 rounded-full' />
        </div>
        <p className='text-xs font-normal text-muted-foreground'>
          <Skeleton className='h-6 w-12 rounded-full' />
        </p>
      </div>
      <p className='text-sm font-medium text-muted-foreground'>
        <Skeleton className='h-20 w-full' />
      </p>
    </div>
  );
};
