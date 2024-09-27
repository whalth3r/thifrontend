'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: React.ReactNode;
  toggle?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, suffix, toggle, type, ...props }, ref) => {
    return (
      <>
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        {suffix && (
          <div className='absolute bottom-0 right-0 flex items-center px-3 pb-[0.625rem]'>
            <span
              className='cursor-pointer'
              onClick={(e) => {
                e.preventDefault();
                toggle && toggle();
              }}
            >
              {suffix}
            </span>
          </div>
        )}
      </>
    );
  },
);
Input.displayName = 'Input';

export { Input };
