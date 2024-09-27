import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { Menu } from '../sidebar/Menu';

export const SheetMenu = () => {
  return (
    <Sheet>
      <SheetTrigger className='lg:hidden' asChild>
        <Button className='h-8' variant='outline' size='icon'>
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className='flex h-full flex-col px-3 sm:w-72' side='left'>
        <SheetHeader>
          <Button
            className='flex items-center justify-center pb-2 pt-1'
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
              <SheetTitle className='text-lg font-bold text-[#929292]'>
                THE HIGH INDE<span className='text-accent-foreground'>X</span>
              </SheetTitle>
            </Link>
          </Button>
          <SheetDescription className='sr-only'>
            The High Index Menu
          </SheetDescription>
        </SheetHeader>
        <Menu isOpen={false} />
      </SheetContent>
    </Sheet>
  );
};
