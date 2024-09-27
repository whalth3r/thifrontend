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

export const VerifyCode = () => {
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
    <div className='mx-auto flex w-full flex-col items-center gap-2'>
      <div className='w-full py-2'>
        <h2 className='text-start text-2xl font-semibold leading-8 tracking-tighter'>
          Verify your email
        </h2>
        <div className='w-full'>
          <p className='my-7 w-full text-start text-base font-normal leading-7'>
            To keep your account secure, we need to verify your email address.
          </p>
          <div className='w-full border border-dotted'></div>
          <p className='mt-7 w-full text-start text-lg font-normal leading-7'>
            We’ve just sent a verification code to j.doe@gmail.com if it’s not
            in your inbox, be sure to check your spam folder.
          </p>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mt-7 w-full space-y-8'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm'>
                  Enter verification code
                </FormLabel>
                <FormControl>
                  <Input placeholder='Enter verification code' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className='flex flex-col items-center justify-center gap-4 md:flex-row md:justify-end'>
            <Button
              type='button'
              className='order-2 w-full md:order-1 md:w-fit'
            >
              Back
            </Button>
            <Button
              type='submit'
              className='w-max-[6rem] order-1 w-full md:order-2 md:w-[10.18rem]'
            >
              Verify and continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
