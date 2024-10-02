'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { UserCredential, signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { TextInputField } from '@/components/common/shadcn_extentions/inputs/TextInput';
import { EyeIcon } from '@/components/icons/EyeIcon';
import { EyeLineIcon } from '@/components/icons/EyeLineIcon';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FacebookI } from '@/components/icons/FacebookI';
import { GoogleI } from '@/components/icons/GoogleI';
import { TwitterI } from '@/components/icons/TwitterI';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import {
  loginWithFacebook,
  loginWithGoogle,
  loginWithTwitter,
} from '@/lib/auth';
import { auth } from '@/lib/firebase.config';

const formLoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string(
      //eslint-disable-next-line @typescript-eslint/naming-convention
      { required_error: 'Password is required' },
    )
    .min(8, {
      message: 'Password must be at least 8 characters long',
    }),
});
type FormLogin = z.infer<typeof formLoginSchema>;
const formRegisterSchema = z.object({
  email: z
    .string({
      //eslint-disable-next-line @typescript-eslint/naming-convention
      required_error: 'Email is required',
    })
    .email(),
});
type FormRegister = z.infer<typeof formRegisterSchema>;

interface AuthFormProps {
  currentForm: 'login' | 'register';
}

export const AuthForm: React.FC<AuthFormProps> = ({ currentForm }) => {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loginDefaultValues = {
    email: '',
    password: '',
  };
  const registerDefaultValues = {
    email: '',
  };
  const schema = currentForm === 'login' ? formLoginSchema : formRegisterSchema;
  const form = useForm<FormLogin | FormRegister>({
    resolver: zodResolver(schema),
    defaultValues:
      currentForm === 'login' ? loginDefaultValues : registerDefaultValues,
  });

  const setCookie = async (token: string) => {
    // Llamar a una Server Action para guardar el token en una cookie
    const res = await fetch('/api/auth/cookie', {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
      },
    });

    return res;
  };

  async function onSubmit(values: FormLogin | FormRegister) {
    if (currentForm === 'login' && 'password' in values) {
      try {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password,
        );
        const token = await userCredential.user.getIdToken();

        await setCookie(token);
        // Redirigir al usuario a la página principal
        router.push('/client');
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        }
      }
    }
    if (currentForm === 'register' && 'email' in values) {
      try {
        console.warn('Registering user');
      } catch (err) {
        if (err instanceof Error) {
          console.error('Error while registering the user, try again');
        }
      }
    }
  }

  const handleEasyLogin = async (
    loginMethod: () => Promise<UserCredential>,
  ) => {
    setIsLoading(true);
    try {
      const { user } = await loginMethod();
      const token = await user.getIdToken();

      const res = await setCookie(token);

      if (res.ok) {
        router.push('/client');
      } else {
        console.error('Failed to store cookie');
      }
    } catch (error) {
      console.error('Login failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='py-2'>
        {currentForm === 'login' ? (
          <>
            <h2 className='text-center text-2xl font-semibold leading-8 tracking-tighter'>
              Sign in
            </h2>
            <p className='text-center text-sm font-normal leading-5'>
              Great to see you again! Please enter your details to log in.
            </p>
          </>
        ) : (
          <>
            <h2 className='text-center text-2xl font-semibold leading-8 tracking-tighter'>
              Sign up
            </h2>
            <p className='text-center text-sm font-normal leading-5'>
              Enter your email below to create your account
            </p>
          </>
        )}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mx-auto w-full max-w-md space-y-8'
        >
          <div className='flex flex-col gap-4'>
            <TextInputField
              control={form.control}
              name='email'
              label='Email'
              placeholder='Enter your email address'
              error={form.formState.errors.email}
            />
            {currentForm === 'login' && (
              <TextInputField
                control={form.control}
                name='password'
                className='col-span-1 md:col-span-2 lg:col-span-1'
                label='Confirm Password'
                placeholder='Enter your password'
                type={isPasswordVisible ? 'text' : 'password'}
                suffix={isPasswordVisible ? <EyeLineIcon /> : <EyeIcon />}
                toggle={() => setIsPasswordVisible(!isPasswordVisible)}
                //eslint-disable-next-line @typescript-eslint/no-explicit-any
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                error={
                  'password' in form.formState.errors
                    ? form.formState.errors.password
                    : undefined
                }
              />
            )}
            {currentForm === 'login' && (
              <div className='flex justify-end'>
                <Link
                  href='/forgot-password'
                  className='text-sm font-medium leading-5 text-[#0072B4] hover:opacity-75'
                >
                  Forgot password?
                </Link>
              </div>
            )}
            <Button type='submit'>Login with Email</Button>
          </div>
          <div className='relative my-6'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='bg-white px-2 text-gray-500'>OR</span>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <Button
              type='button'
              variant={'outline'}
              onClick={() => handleEasyLogin(loginWithGoogle)}
              disabled={isLoading}
            >
              <span className='mr-2'>
                <GoogleI />
              </span>
              Login with Google
            </Button>
            <Button
              type='button'
              variant={'outline'}
              onClick={() => handleEasyLogin(loginWithFacebook)}
              disabled={isLoading}
            >
              <span className='mr-2'>
                <FacebookI />
              </span>
              Login with Facebook
            </Button>
            <Button
              type='button'
              variant={'outline'}
              onClick={() => handleEasyLogin(loginWithTwitter)}
              disabled={isLoading}
            >
              <span className='mr-2'>
                <TwitterI />
              </span>
              Login with X
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
