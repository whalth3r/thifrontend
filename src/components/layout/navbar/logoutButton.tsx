'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export const LogoutButton = () => {
  const router = useRouter();
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
      className='flex w-full gap-2 text-black'
      variant='link'
      onClick={handleLogout}
    >
      <LogOut size={16} />
      Sign out
    </Button>
  );
};
