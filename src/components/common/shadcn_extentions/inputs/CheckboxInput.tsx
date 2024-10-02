import { Control, FieldError, useController } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { cn } from '@/lib/utils';

interface CheckboxItem {
  id: string;
  label: string;
}

interface CheckboxGroupFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  label: string;
  className?: string;
  items: CheckboxItem[];
  error?: FieldError | undefined;
  description?: string;
  hasMultiple?: boolean; // Add a prop to handle multiple selection
  isOptional?: boolean;
}

export const CheckboxGroupField: React.FC<CheckboxGroupFieldProps> = ({
  control,
  name,
  label,
  items,
  error,
  className,
  description,
  hasMultiple = false, // Default to multiple selection
  isOptional = false,
}) => {
  const { field } = useController({
    name,
    control,
  });

  // Initialize field.value as an empty array if it is undefined for multiple selection
  const fieldValue = hasMultiple ? field.value || [] : field.value || null;
  return (
    <FormItem className={cn('', className)}>
      <div className='mb-4'>
        <FormLabel className='font-medium text-blackcustom-900'>
          {label}{' '}
          {isOptional && (
            <span className='ml-2 text-inputs-100'>{'(optional)'}</span>
          )}
        </FormLabel>
        {description && <p className='text-sm text-muted'>{description}</p>}
      </div>
      {items.map((item) => (
        <FormItem
          key={item.id}
          className='flex flex-row items-start space-x-3 space-y-0'
        >
          <FormControl>
            <Checkbox
              className='rounded-full border-[#525866]'
              checked={
                hasMultiple
                  ? fieldValue.includes(item.id)
                  : fieldValue === item.id
              }
              onCheckedChange={(checked) => {
                if (hasMultiple) {
                  // Handle multiple selection
                  if (checked) {
                    field.onChange([...fieldValue, item.id]);
                  } else {
                    field.onChange(
                      fieldValue.filter((value: string) => value !== item.id),
                    );
                  }
                } else {
                  // Handle single selection
                  if (checked) {
                    field.onChange(item.id); // Replace with the single selected value
                  } else {
                    field.onChange(null); // Clear the selection
                  }
                }
              }}
            />
          </FormControl>
          <FormLabel className='font-normal'>{item.label}</FormLabel>
        </FormItem>
      ))}
      {error && <FormMessage>{error.message}</FormMessage>}
    </FormItem>
  );
};
