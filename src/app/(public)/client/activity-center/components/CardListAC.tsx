'use client';

import {
  ComponentType,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
} from 'react';

import { MoveLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { useMediaQuery } from '@/hooks/useMediaQuery';

import { cn } from '@/lib/utils';

import { CardACSkeleton } from './CardACSkeleton';

// Definimos una interfaz genérica para los objetos
interface GenericObjectProps {
  title: string;
  description: string;
}

interface CardListACProps<T>
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  loaderComponent?: ReactNode;
  isLoading: boolean;
  items: T[];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  CardComponent: ComponentType<{ item: T }>;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  DetailComponent: ComponentType<{ item: T }>;
  emptyText: string;
  scrollAreaClass?: string;
}

export const CardListAC = <T extends GenericObjectProps>({
  CardComponent,
  DetailComponent,
  emptyText,
  isLoading,
  items,
  scrollAreaClass,
}: CardListACProps<T>) => {
  const isMobile = useMediaQuery('(max-width: 1023px)');
  return (
    <div className='mt-4'>
      {isLoading ? (
        <ScrollArea
          className={cn(`h-[calc(100vh-48px-36px-48px-95px)]`, scrollAreaClass)}
        >
          <CardACSkeleton />
          <CardACSkeleton />
          <CardACSkeleton />
          <CardACSkeleton />
        </ScrollArea>
      ) : items.length > 0 ? (
        <ScrollArea
          className={cn(`h-[calc(100vh-48px-36px-48px-95px)]`, scrollAreaClass)}
        >
          {items.map((item, index) =>
            isMobile ? (
              <Sheet key={index}>
                <SheetTrigger className='mb-2 w-full text-left'>
                  <CardComponent item={item} />
                </SheetTrigger>
                <SheetContent
                  className='w-full sm:max-w-full'
                  defaultCloseButton={false}
                >
                  <div className='flex w-full border-b pb-4'>
                    <SheetClose asChild>
                      <Button variant={'outline'}>
                        <MoveLeft className='my-auto mr-2 h-4 w-4' />
                        Regresar
                      </Button>
                    </SheetClose>
                  </div>
                  <SheetHeader className='mt-4 h-[calc(100dvh-24px-16px-40px-16px-40px)]'>
                    <SheetTitle className='sr-only'>{item.title}</SheetTitle>
                    <SheetDescription className='sr-only'>
                      {item.description}
                    </SheetDescription>
                    <DetailComponent item={item} />
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            ) : (
              <div className='mb-2' key={index}>
                <CardComponent item={item} />
              </div>
            ),
          )}
        </ScrollArea>
      ) : (
        <div
          className={cn(
            'flex h-[calc(100vh-48px-36px-48px-95px)] items-center justify-center text-center',
            scrollAreaClass,
          )}
        >
          <p>{emptyText}</p>
        </div>
      )}
    </div>
  );
};
