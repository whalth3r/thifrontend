import FavoriteTable from '@/app/(public)/client/components/favoriteTable/FavoriteTable';
import { Star } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export const SheetFavorites = () => {
  return (
    <Sheet>
      <SheetTrigger className='flex items-center gap-2 rounded-md border px-3 py-2 text-xs lg:px-4 lg:py-2 lg:text-sm'>
        Favorites <Star size={16} className='hidden lg:flex' />
      </SheetTrigger>
      <SheetContent className='min-w-[100%] lg:min-w-[30%]'>
        <SheetHeader>
          <SheetTitle>Favorites</SheetTitle>
          <SheetDescription>
            <FavoriteTable />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
