'use client';

import { useState } from 'react';

import { Submenu } from '@/types/TMenu';
import { DropdownMenuArrow } from '@radix-ui/react-dropdown-menu';
import { ChevronDown, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../ui/collapsible';

interface CollapseMenuButtonProps {
  icon: LucideIcon;
  label: string;
  // active: boolean;
  submenus: Submenu[];
  isOpen: boolean | undefined;
}

export const CollapseMenuButton = ({
  icon: Icon,
  label,
  // active,
  submenus,
  isOpen,
}: CollapseMenuButtonProps) => {
  const pathname = usePathname();
  const isSubmenuActive = submenus.find((value) => value.href === pathname);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(!!isSubmenuActive);

  return !isOpen ? (
    <Collapsible
      open={isCollapsed}
      onOpenChange={setIsCollapsed}
      className='w-full'
    >
      <CollapsibleTrigger
        className='mb-1 [&[data-state=open]>div>div>svg]:rotate-180'
        asChild
      >
        <Button
          variant={isSubmenuActive ? 'accent' : 'ghost'}
          className='h-10 w-full justify-start'
        >
          <div className='flex w-full items-center justify-between'>
            <div className='flex items-center'>
              <span className='mr-4'>
                <Icon size={18} />
              </span>
              <p
                className={cn(
                  'max-w-[150px] truncate text-sm font-normal',
                  !isOpen
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-96 opacity-0',
                )}
              >
                {label}
              </p>
            </div>
            <div
              className={cn(
                'whitespace-nowrap',
                !isOpen
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-96 opacity-0',
              )}
            >
              <ChevronDown
                size={18}
                className='transition-transform duration-200'
              />
            </div>
          </div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className='data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden'>
        {submenus.map(({ href, label }, index) => (
          <Button
            key={index}
            variant={isSubmenuActive?.href === href ? 'accent' : 'ghost'}
            className='mb-1 h-10 w-full justify-start'
            asChild
          >
            <Link href={href}>
              <p
                className={cn(
                  'ml-6 max-w-[170px] truncate text-sm font-normal',
                  !isOpen
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-96 opacity-0',
                )}
              >
                {label}
              </p>
            </Link>
          </Button>
        ))}
      </CollapsibleContent>
    </Collapsible>
  ) : (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant={isSubmenuActive ? 'accent' : 'ghost'}
                className='mb-1 h-10 w-full justify-start'
              >
                <div className='flex w-full items-center justify-between'>
                  <div className='flex items-center'>
                    <span className={cn(isOpen ? '' : 'mr-4')}>
                      <Icon size={18} />
                    </span>
                    <p
                      className={cn(
                        'max-w-[200px] truncate',
                        isOpen ? 'opacity-0' : 'opacity-100',
                      )}
                    >
                      {label}
                    </p>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side='right' align='start' alignOffset={2}>
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent side='right' sideOffset={25} align='start'>
        <DropdownMenuLabel className='max-w-[190px] truncate'>
          {label}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {submenus.map(({ href, label }, index) => (
          <DropdownMenuItem key={index} asChild>
            <Link className='cursor-pointer' href={href}>
              <p className='max-w-[180px] truncate'>{label}</p>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuArrow className='fill-border' />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
