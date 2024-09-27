'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  search: z.string().max(50),
});

interface SearchFormProps {
  placeholder: string;
  onSearch: (value: string) => void;
}

export const SearchForm = ({ placeholder, onSearch }: SearchFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSearch(values.search);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-full gap-4'
      >
        <FormField
          control={form.control}
          name='search'
          render={({ field }) => (
            <FormItem className='relative w-full space-y-0'>
              <FormLabel className='sr-only'>{placeholder}</FormLabel>
              <FormControl>
                <>
                  <Input placeholder={placeholder} {...field} />
                  {form.getValues('search').length !== 0 && (
                    <Button
                      type='button'
                      variant={'ghost'}
                      size={'sm'}
                      className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent hover:text-red-500'
                      onClick={() => {
                        form.reset();
                        onSearch('');
                      }}
                    >
                      <X className='h-4 w-4' />
                    </Button>
                  )}
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Search</Button>
      </form>
    </Form>
  );
};
