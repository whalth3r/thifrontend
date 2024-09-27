import React from 'react';
import { FieldError } from 'react-hook-form';

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { cn } from '@/lib/utils';

interface Option {
  id: string | number;
  name: string;
}

interface SelectFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any; // Control from react-hook-form
  name: string;
  label: string;
  className?: string;
  placeholder: string;
  options: Option[]; // Options to render in the select dropdown
  error?: FieldError | undefined; // Error from react-hook-form
  isOptional?: boolean;
}

export const SelectInputField: React.FC<SelectFieldProps> = ({
  control,
  name,
  label,
  className,
  placeholder,
  options,
  error,
  isOptional = false,
}) => {
  return (
    <FormItem className={cn('', className)}>
      <FormLabel className='font-medium text-blackcustom-900'>
        {label}{' '}
        {isOptional && (
          <span className='ml-2 text-inputs-100'>{'(optional)'}</span>
        )}
      </FormLabel>
      <FormControl>
        <div className='relative font-normal'>
          <div className='rounded-sm border border-gray-200 bg-white'>
            <select
              {...control.register(name)} // Register the select field with react-hook-form
              className={cn(
                'relative flex h-10 w-full cursor-pointer select-none appearance-none items-center rounded-sm border !px-2 py-1.5 text-sm outline-none focus-visible:border focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                {
                  ['border-red-500']: error,
                },
              )}
              style={{
                background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='21' viewBox='0 0 20 21' fill='none'%3E%3Cpath d='M6.75 9.25L10 12.75L13.25 9.25' stroke='%234A545E' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat right 0.5rem center`,
                backgroundSize: '1rem', // Adjust size based on your preference
              }}
            >
              <option value='' disabled>
                {placeholder}
              </option>
              {options.map((option) => (
                <option key={option.id} value={option.id.toString()}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
