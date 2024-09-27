import { UserAuth } from '@/types/TAuth';
import { cookies } from 'next/headers';

import { LinkFinder } from './LinkFinder';
import { SheetFavorites } from './SheetFavorites';
import { SheetMenu } from './SheetMenu';
import { SheetSaved } from './SheetSaved';
import { UserNav } from './UserNav';

interface NavbarProps {
  title: string;
}

export const Navbar = ({ title }: NavbarProps) => {
  const cookieStore = cookies();
  const userCookie = cookieStore.get('user')?.value;

  if (!userCookie) {
    return <div>No user data found</div>;
  }

  const user: UserAuth = JSON.parse(userCookie);

  return (
    <header className='sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary'>
      <div className='mx-4 flex h-14 items-center justify-between sm:mx-8'>
        <div className='flex items-center space-x-4 lg:space-x-0'>
          <SheetMenu />
          <h1 className='font-bold'>{title}</h1>
        </div>

        {title === 'Welcome' && (
          <div className='hidden gap-5 lg:flex'>
            <LinkFinder />
            <SheetSaved />
            <SheetFavorites />
          </div>
        )}

        <div className='flex items-center justify-end'>
          <UserNav email={user.email} name={user.name} src={user.picture} />
        </div>
      </div>
    </header>
  );
};
