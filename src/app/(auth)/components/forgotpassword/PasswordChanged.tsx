'use client';

import { Button } from '@/components/ui/button';

export const PasswordChanged = () => {
  return (
    <div className='flex w-full flex-col items-center gap-2'>
      <div className='py-2'>
        <h2 className='text-center text-2xl font-semibold leading-8 tracking-tighter'>
          All set! Your password is now updated.
        </h2>
        <p className='mt-7 max-w-[21.875rem] text-center text-xs font-normal leading-5'>
          You can now log in with your new credentials.
        </p>
      </div>
      <Button type='button'>Go back to login screen</Button>
    </div>
  );
};
