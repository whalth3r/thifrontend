import { Search } from 'lucide-react';
import Link from 'next/link';

export const LinkFinder = () => {
  return (
    <Link href='/'>
      <div className='flex h-full items-center gap-2 rounded-md border px-3 py-2 text-xs lg:px-4 lg:py-2 lg:text-sm'>
        Search <Search size={16} className='hidden lg:flex' />
      </div>
    </Link>
  );
};
