'use client';

import { useSidebar } from '@/store/useSidebar';

import { cn } from '@/lib/utils';

import { Sidebar } from './sidebar/Sidebar';

export default function PanelLayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen } = useSidebar();

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          'min-h-[calc(100vh_-_56px)] bg-zinc-50 transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900',
          isOpen ? 'lg:ml-[90px]' : 'lg:ml-72',
        )}
      >
        {children}
      </main>
    </>
  );
}
