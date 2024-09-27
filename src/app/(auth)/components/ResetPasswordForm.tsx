'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { confirmPasswordReset } from 'firebase/auth';
import { useRouter, useSearchParams } from 'next/navigation';
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
  password: z.string().min(6).max(50),
});

export const ResetPasswordForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
    },
  });

  const searchParams = useSearchParams();
  const oobCode = searchParams.get('oobCode');
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (oobCode) {
      try {
        await confirmPasswordReset(auth, oobCode, values.password);
        alert('Password reset successful');
        router.push('/login'); // Redirige al login después de cambiar la contraseña
      } catch (error) {
        console.error('Error resetting password:', error);
      }
    } else {
      console.error('Invalid password reset link.');
    }
  }

  return (
    <div className='w-full'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full max-w-md space-y-8'
        >
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='***' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className='flex flex-col gap-4'>
            <Button type='submit'>Login with Email</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
