'use client';

import { Button } from '@/components/ui/button';

export const Congratulations = () => {
  return (
    <div className='flex w-full flex-col items-center gap-2'>
      <div className='py-2'>
        <div className='w-full text-start text-sm font-medium leading-7 text-[#99A0AE]'>
          {3}/{4}
        </div>
        <h2 className='text-start text-2xl font-bold leading-8 tracking-tighter'>
          ¡Congratulations on becoming a part of The High Index community!
        </h2>
        <p className='mt-7 w-full text-start text-lg font-normal leading-7'>
          To ensure we tailor your experience to your preferences and needs,
          we&apos;d love to learn more about you.
        </p>
      </div>
      <div className='flex w-full flex-col items-center justify-center gap-4 md:flex-row md:justify-end'>
        <Button
          type='button'
          variant={'secondary'}
          className='font-inter order-2 w-full !border !border-[#D3D3D3] font-medium shadow-sm hover:opacity-75 md:order-1 md:w-fit'
          // onClick={handleCompleteLater}
        >
          I&apos;ll do this later
        </Button>
        <Button
          type='submit'
          className='font-inter order-1 w-full font-medium shadow-sm md:order-2 md:w-fit'
          // disabled={isButtonDisabled}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};
