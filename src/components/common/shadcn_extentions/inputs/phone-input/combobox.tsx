import * as React from 'react';

import { ChevronDown } from 'lucide-react';
import { Check } from 'lucide-react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { isoToEmoji } from './helpers';

export type Option = Record<'value' | 'label', string> & Record<string, string>;

type ComboboxCountryInputProps<T extends Option> = {
  value: T;
  onValueChange: (value: T) => void;
  options: T[];
  renderOption: ({
    option,
    isSelected,
  }: {
    option: T;
    isSelected: boolean;
  }) => React.ReactNode;
  renderValue: (option: T) => string;
  emptyMessage: string;
  placeholder?: string;
  className?: string;
};

export function ComboboxCountryInput<T extends Option>({
  value,
  onValueChange,
  options,
  renderOption,
  renderValue,
  placeholder,
  emptyMessage,
}: ComboboxCountryInputProps<T>) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
          role='combobox'
          aria-expanded={isOpen}
          className='inline-flex h-10 items-center justify-between self-start rounded-md border border-stone-200 bg-white px-4 py-2 text-sm font-medium ring-offset-white transition-colors hover:bg-stone-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
        >
          {value.value ? isoToEmoji(value.value) : 'Select framework...'}
          <ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-2 pb-0' align='start'>
        <Command>
          <CommandInput placeholder={placeholder} className='h-9' />
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          <CommandList>
            <CommandGroup className='mt-2 h-full max-h-48 overflow-auto p-0 [&_div[cmdk-group-items]]:flex [&_div[cmdk-group-items]]:flex-col [&_div[cmdk-group-items]]:gap-1'>
              {options.map((option) => {
                const isSelected = value.value === option.value;

                return (
                  <CommandItem
                    key={option.value}
                    value={renderValue(option)}
                    onSelect={() => {
                      onValueChange(option);
                      setIsOpen(false);
                    }}
                  >
                    {renderOption({ option, isSelected: isSelected })}
                    {isSelected ? (
                      <Check className='ml-auto mr-2 h-4 w-4' />
                    ) : null}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
