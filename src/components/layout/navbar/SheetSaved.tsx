import { Bookmark } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export const SheetSaved = () => {
  return (
    <Sheet>
      <SheetTrigger className='flex items-center gap-2 rounded-md border px-3 py-2 text-xs lg:px-4 lg:py-2 lg:text-sm'>
        Saved searches <Bookmark size={16} className='hidden lg:flex' />
      </SheetTrigger>
      <SheetContent className='min-w-[100%] lg:min-w-[60%]'>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>This is favorite Sheet style</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
