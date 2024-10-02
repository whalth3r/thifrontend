'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';

const SidebarProfile = () => {
  const pathName = usePathname();

  // Definimos los enlaces del sidebar en un array
  const sidebarItems = [
    { name: 'Profile', href: '/client/account-settings/profile' },
    {
      name: 'Manage Subscription',
      href: '/client/account-settings/manage-suscription',
    },
    { name: 'Preferences', href: '/client/account-settings/preferences' },
  ];

  return (
    <nav className='p-5'>
      <ul>
        {sidebarItems.map((item) => (
          <li key={item.href}>
            <Button
              className={clsx(
                'flex h-[48px] w-full grow items-center justify-start gap-2 rounded-md bg-white p-0 text-sm font-medium text-black hover:bg-[#E5EEFF] hover:text-[#0072B4] md:flex-none md:justify-start',
                {
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                  'bg-[#E5EEFF] text-[#0072B4]': pathName === item.href,
                },
              )}
            >
              <Link
                href={item.href}
                className='flex h-full w-full items-center justify-start p-2 md:flex-none md:justify-start md:p-2 md:px-3'
              >
                {item.name}
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarProfile;
