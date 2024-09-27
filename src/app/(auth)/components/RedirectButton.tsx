'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const RedirectButton = () => {
  const pathname = usePathname();
  const [redirectTo, setRedirectTo] = useState<string>('register');
  useEffect(() => {
    if (pathname !== '/register' && pathname !== '/forgot-password') {
      setRedirectTo('register');
      return;
    }
    setRedirectTo('login');
  }, [pathname]);
  return (
    <div className='md:left-[89% lg:left-[90%]] absolute left-[80%] top-10 w-full sm:left-[85%]'>
      <Link href={`/${redirectTo}`} className='p-2 hover:opacity-75'>
        {redirectTo === 'register' ? 'Sign up' : 'Sign in'}
      </Link>
    </div>
  );
};
