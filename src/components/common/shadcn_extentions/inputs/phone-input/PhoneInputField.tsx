import { useState } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import PhoneInput, { type Country } from 'react-phone-number-input/input';

// import { getExampleNumber, parsePhoneNumber } from 'libphonenumber-js';
import { getExampleNumber } from 'libphonenumber-js';
import examples from 'libphonenumber-js/mobile/examples';

import { FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { cn } from '@/lib/utils';

import { ComboboxCountryInput } from './combobox';
import {
  getCountriesOptions,
  isoToEmoji,
  replaceNumbersWithZeros,
} from './helpers';

type CountryOption = {
  value: Country;
  label: string;
  indicatif: string;
};

interface PhoneInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>; // Generic to allow reuse in any form
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  error?: FieldError | undefined;
}

export const PhoneInputField: React.FC<PhoneInputProps> = ({
  control,
  name,
  className,
  label = 'Phone Number',
  placeholder = 'Enter your phone number',
  error,
}) => {
  const options = getCountriesOptions();
  const defaultCountry = 'US';
  const defaultCountryOption = options.find(
    (option) => option.value === defaultCountry,
  );
  const [country, setCountry] = useState<CountryOption>(
    defaultCountryOption || options[0]!,
  );

  const handleCountryChange = (value: CountryOption) => {
    setCountry(value);
  };

  const countryPlaceholder = replaceNumbersWithZeros(
    getExampleNumber(country.value, examples)!.formatInternational(),
  );

  return (
    <FormItem className={cn('', className)}>
      <FormLabel>{label}</FormLabel>
      <div className='flex gap-2'>
        <ComboboxCountryInput
          value={country}
          onValueChange={handleCountryChange}
          options={options}
          placeholder='Find your country...'
          renderOption={({ option }) =>
            `${isoToEmoji(option.value)} ${option.label}`
          }
          renderValue={(option) => option.label}
          emptyMessage='No country found.'
        />
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <PhoneInput
              international
              withCountryCallingCode
              country={country.value.toUpperCase() as Country}
              value={field.value}
              inputComponent={Input}
              placeholder={placeholder || countryPlaceholder}
              onChange={(value) => field.onChange(value)}
            />
          )}
        />
      </div>
      {error && (
        <FormMessage className='text-red-500'>{error.message}</FormMessage>
      )}
    </FormItem>
  );
};
