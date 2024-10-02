import { useState } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import PhoneInput, { type Country } from 'react-phone-number-input/input';

import i18nIsoCountries from 'i18n-iso-countries';
import enCountries from 'i18n-iso-countries/langs/en.json';
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

i18nIsoCountries.registerLocale(enCountries);

interface PhoneNumberInputFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>; // replace 'any' with the appropriate form schema type
  name: string;
  label?: string;
  error?: FieldError | undefined;
  className?: string;
}

export const PhoneInputField: React.FC<PhoneNumberInputFieldProps> = ({
  control,
  name,
  label = 'Phone Number',
  className,
  error,
}) => {
  const options = getCountriesOptions();
  const [country, setCountry] = useState<CountryOption>(
    options.find((option) => option.value === 'US') || options[0]!,
  );
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();

  const placeholder = replaceNumbersWithZeros(
    getExampleNumber(country.value, examples)?.formatInternational() || '',
  );

  const onCountryChange = (value: CountryOption) => {
    setCountry(value);
    setPhoneNumber(''); // Reset phone number when country changes
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn('leading-4', className)}>
          <FormLabel className='font-medium text-blackcustom-900'>
            {label}
          </FormLabel>
          <div className='flex gap-2'>
            <ComboboxCountryInput
              value={country}
              onValueChange={(value) => {
                onCountryChange(value);
              }}
              options={options}
              placeholder='Find your country...'
              renderOption={({ option }) =>
                `${isoToEmoji(option.value)} ${option.label}`
              }
              renderValue={(option) => option.label}
              emptyMessage='No country found.'
            />
            <PhoneInput
              international
              withCountryCallingCode
              country={country.value.toUpperCase() as Country}
              value={phoneNumber}
              inputComponent={Input}
              placeholder={placeholder}
              onChange={(value) => {
                setPhoneNumber(value || '');
                field.onChange(value); // only update the form with the phone number
              }}
            />
          </div>
          {error && <FormMessage>{error.message}</FormMessage>}
        </FormItem>
      )}
    />
  );
};
