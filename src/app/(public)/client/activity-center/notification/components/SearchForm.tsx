'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
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
  search: z.string().min(2).max(50),
});

export const SearchForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.warn(values);
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
            <FormItem className='w-full space-y-0'>
              <FormLabel className='sr-only'>
                Search by Company or Contact
              </FormLabel>
              <FormControl>
                <Input placeholder='Search by Company or Contact' {...field} />
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
