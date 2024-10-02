'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { sendPasswordResetEmail } from 'firebase/auth';
import { z } from 'zod';

import { TextInputField } from '@/components/common/shadcn_extentions/inputs/TextInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { auth } from '@/lib/firebase.config';

const formSchema = z.object({
  code: z
    .string(
      //eslint-disable-next-line @typescript-eslint/naming-convention
      { required_error: 'Code is required' },
    )
    .min(6, { message: 'Code must be at least 6 characters long' }),
});

export const VerifyCode = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Redirigir al usuario a la página principal
    console.warn('Email sent', values.code);
    sendPasswordResetEmail(auth, values.code);
  }

  return (
    <div className='mx-auto flex w-full flex-col items-center gap-2'>
      <div className='w-full py-2'>
        <div className='w-full text-start text-sm font-medium leading-7 text-[#99A0AE]'>
          {1}/{4}
        </div>
        <h2 className='text-start text-2xl font-semibold leading-8 tracking-tighter'>
          Verify your Email
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
          <TextInputField
            control={form.control}
            name='code'
            label='Enter verification code'
            placeholder='Enter verification code'
            className='text-sm'
            error={form.formState.errors.code}
          />
          <div className='flex flex-col items-center justify-center gap-4 md:flex-row md:justify-end'>
            <Button
              type='button'
              variant={'secondary'}
              className='font-inter order-2 w-full !border !border-[#D3D3D3] font-medium shadow-sm hover:opacity-75 md:order-1 md:w-fit'
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
