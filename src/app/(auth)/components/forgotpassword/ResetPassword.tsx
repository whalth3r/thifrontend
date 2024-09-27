import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';

import { EyeIcon } from '@/components/icons/EyeIcon';
import { EyeLineIcon } from '@/components/icons/EyeLineIcon';
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

import { cn } from '@/lib/utils';

export const ResetPassword = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [didRequestSent, setDidRequestSent] = useState(false);
  const [isVisble, setIsVisible] = useState(false);
  const [isVisbleConfirm, setIsVisibleConfirm] = useState(false);

  const passwordSchema = z
    .object({
      password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long.' })
        .regex(/[a-zA-Z]/, 'Must contain at least one letter.')
        .regex(/(?=.*[!@#$&*])/, 'Must contain at least one special character.')
        .regex(/[0-9]/, 'Must contain at least one number.'),
      confirmPassword: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long.' })
        .regex(/[a-zA-Z]/, 'Must contain at least one letter.')
        .regex(/(?=.*[!@#$&*])/, 'Must contain at least one special character.')
        .regex(/[0-9]/, 'Must contain at least one number.'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords must match.',
      path: ['confirmPassword'],
    });

  const multiForm = useForm<Form>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  type Form = z.infer<typeof passwordSchema>;
  const {
    formState: { errors },
  } = multiForm;

  const onSubmit = async (data: Form) => {
    setDidRequestSent(!didRequestSent);
    setIsButtonDisabled(!isButtonDisabled);
    try {
      console.warn(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      setDidRequestSent(false);
      setIsButtonDisabled(false);
    }
  };

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
      <Form {...multiForm}>
        <form
          onSubmit={multiForm.handleSubmit(onSubmit)}
          className='w-full max-w-md space-y-8'
        >
          <FormField
            name='password'
            control={multiForm.control}
            render={({ field }) => (
              <FormItem className='text-sm leading-5'>
                <FormLabel className='text-custom-black font-medium'>
                  Password
                </FormLabel>
                <FormControl>
                  <div className='relative font-normal'>
                    <Input
                      suffix={isVisble ? <EyeLineIcon /> : <EyeIcon />}
                      toggle={() => setIsVisible(!isVisble)}
                      type={isVisble ? 'text' : 'password'}
                      placeholder='Enter your password'
                      {...field}
                      className={cn({
                        ['border-red-500']: errors.password,
                      })}
                    />
                  </div>
                </FormControl>
                {errors.password && (
                  <FormMessage>{errors.password.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            name='confirmPassword'
            control={multiForm.control}
            render={({ field }) => (
              <FormItem className='text-sm leading-5'>
                <FormLabel className='text-custom-black font-medium'>
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <div className='relative font-normal'>
                    <Input
                      suffix={isVisbleConfirm ? <EyeLineIcon /> : <EyeIcon />}
                      toggle={() => setIsVisibleConfirm(!isVisbleConfirm)}
                      type={isVisbleConfirm ? 'text' : 'password'}
                      placeholder='Enter your password'
                      {...field}
                      className={cn({
                        ['border-red-500']: errors?.confirmPassword,
                      })}
                    />
                  </div>
                </FormControl>
                {errors.confirmPassword && (
                  <FormMessage>{errors.confirmPassword.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <Button disabled={isButtonDisabled} className='w-full' type='submit'>
            Reset Password
            {didRequestSent && (
              <Loader2 className='ml-2 h-4 w-4 animate-spin' />
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
