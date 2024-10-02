import React from 'react';
import { FieldError } from 'react-hook-form';

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { cn } from '@/lib/utils';

interface TextInputFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any; // Control from react-hook-form
  name: string;
  label: string;
  className?: string;
  placeholder: string;
  error?: FieldError | undefined; // Error from react-hook-form
  isOptional?: boolean;
  suffix?: React.ReactNode; // Suffix element (icon, button, etc.)
  toggle?: () => void; // Toggle function for interactions like visibility
  type?: string; // Allows for 'text', 'password', etc.
}

export const TextInputField: React.FC<TextInputFieldProps> = ({
  control,
  name,
  label,
  className,
  placeholder,
  error,
  isOptional = false,
  suffix,
  toggle,
  type = 'text', // Default input type is 'text'
}) => {
  return (
    <FormItem className={cn('text-sm font-medium leading-4', className)}>
      <FormLabel className='font-medium text-blackcustom-900'>
        {label}{' '}
        {isOptional && (
          <span className='ml-2 text-inputs-100'>{'(optional)'}</span>
        )}
      </FormLabel>
      <FormControl>
        <div className='relative font-normal'>
          <Input
            type={type}
            placeholder={placeholder}
            {...control.register(name)} // Register the input field with react-hook-form
            // className={cn({
            //   ['border-red-500']: error,
            // })}
          />
          {suffix && (
            <span
              className='absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3'
              onClick={toggle} // Handle toggle action
            >
              {suffix}
            </span>
          )}
        </div>
      </FormControl>
      {error && <FormMessage>{error.message}</FormMessage>}
    </FormItem>
  );
};
