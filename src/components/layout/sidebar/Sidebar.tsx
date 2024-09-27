import Image from 'next/image';
import Link from 'next/link';

import { useSidebar } from '@/store/useSidebar';

import { cn } from '@/lib/utils';

import { Button } from '../../ui/button';
import { Menu } from './Menu';
import { SidebarToggle } from './SidebarToggle';

export const Sidebar = () => {
  const { isOpen } = useSidebar();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-20 h-screen -translate-x-full transition-[width] duration-300 ease-in-out lg:translate-x-0',
        isOpen ? 'w-[90px]' : 'w-72',
      )}
    >
      <SidebarToggle />
      <div className='relative flex h-full flex-col overflow-y-auto px-3 py-4 shadow-md dark:shadow-zinc-800'>
        <Button
          className={cn(
            'mb-1 transition-transform duration-300 ease-in-out',
            isOpen ? 'translate-x-1' : 'translate-x-0',
          )}
          variant='link'
          asChild
        >
          <Link href='/client' className='flex h-9 items-center gap-2'>
            <Image
              src={'/images/sidebar/sidebar_logo.png'}
              alt={'THI_LOGO'}
              width={24}
              height={24}
              className='mr-1'
            />
            <h1
              className={cn(
                'whitespace-nowrap text-lg text-[#929292] transition-[transform,opacity,display] duration-300 ease-in-out',
                isOpen
                  ? 'hidden -translate-x-96 opacity-0'
                  : 'translate-x-0 opacity-100',
              )}
            >
              THE HIGH INDE<span className='text-accent-foreground'>X</span>
            </h1>
          </Link>
        </Button>
        <Menu isOpen={isOpen} />
      </div>
    </aside>
  );
};
