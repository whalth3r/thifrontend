'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { sendPasswordResetEmail } from 'firebase/auth';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { auth } from '@/lib/firebase.config';

const formSchema = z.object({
  email: z.string().email(),
});

export const ForgotPassword = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Redirigir al usuario a la página principal
    sendPasswordResetEmail(auth, values.email);
  }

  return (
    <div className='flex w-full flex-col items-center gap-2'>
      <div className='py-2'>
        <h2 className='text-center text-2xl font-semibold leading-8 tracking-tighter'>
          Reset your password
        </h2>
        <p className='mt-7 max-w-[21.875rem] text-center text-xs font-normal leading-5'>
          If the email address you provided is associated with an existing
          account, your password recovery email will be on its way!
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full max-w-md space-y-8'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='email' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className='flex flex-col gap-4'>
            <Button type='submit'>Send instructions</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
