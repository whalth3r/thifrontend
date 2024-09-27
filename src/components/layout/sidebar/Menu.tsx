'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ButtonLogout } from '@/components/common/button-logout';

import { getMenuList } from '@/lib/mocks/menu-list.mock';
import { cn } from '@/lib/utils';

import { Button } from '../../ui/button';
import { ScrollArea } from '../../ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../ui/tooltip';
import { CollapseMenuButton } from './CollapseMenuButton';

interface MenuProps {
  isOpen: boolean | undefined;
}

export const Menu = ({ isOpen }: MenuProps) => {
  const pathname = usePathname();
  const menu = getMenuList();
  return (
    <ScrollArea className='[&>div>div[style]]:!block'>
      <nav className='mt-8 h-full w-full'>
        <ul className='flex min-h-[calc(100vh-48px-36px-16px-32px)] flex-col items-start space-y-1 px-2 lg:min-h-[calc(100vh-32px-40px-32px)]'>
          {menu.map(({ menus }, index) => (
            <li className={'w-full'} key={index}>
              {menus.map(({ href, label, icon: Icon, submenus }, index) =>
                submenus.length === 0 ? (
                  <div className='w-full' key={index}>
                    <TooltipProvider disableHoverableContent>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Button
                            variant={pathname === href ? 'accent' : 'ghost'}
                            className='mb-1 h-10 w-full justify-start'
                            asChild
                          >
                            <Link href={href}>
                              <span className={cn(isOpen ? '' : 'mr-4')}>
                                <Icon size={18} />
                              </span>
                              <p
                                className={cn(
                                  'max-w-[200px] truncate text-sm font-normal',
                                  isOpen
                                    ? '-translate-x-96 opacity-0'
                                    : 'translate-x-0 opacity-100',
                                )}
                              >
                                {label}
                              </p>
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        {isOpen && (
                          <TooltipContent side='right'>{label}</TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ) : (
                  <div className='w-full' key={index}>
                    <CollapseMenuButton
                      icon={Icon}
                      label={label}
                      // active={active}
                      submenus={submenus}
                      isOpen={isOpen}
                    />
                  </div>
                ),
              )}
            </li>
          ))}
          <li className='flex w-full grow items-end'>
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <ButtonLogout />
                </TooltipTrigger>
                {isOpen && (
                  <TooltipContent side='right'>Sign out</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
};
