'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useSidebar } from '@/store/useSidebar';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';

export const ButtonLogout = () => {
  const router = useRouter();
  const { isOpen } = useSidebar();
  const handleLogout = async () => {
    // Llama a la API de logout
    await fetch('/api/auth/logout', {
      method: 'POST',
    });

    // Redirigir al usuario a la página de login
    router.push('/login');
    router.refresh();
  };
  return (
    <Button
      onClick={handleLogout}
      variant='outline'
      className='mt-5 h-10 w-full justify-center'
    >
      <span className={cn(isOpen ? '' : 'mr-4')}>
        <LogOut size={18} className='text-[#99A0AE]' />
      </span>
      <p
        className={cn(
          'whitespace-nowrap text-[#99A0AE]',
          isOpen ? 'hidden opacity-0' : 'opacity-100',
        )}
      >
        Sign out
      </p>
    </Button>
  );
};
