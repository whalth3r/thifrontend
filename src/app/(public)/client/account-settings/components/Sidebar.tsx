'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
            <Link
              href={item.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-start gap-2 rounded-md bg-white p-2 text-sm font-medium hover:bg-[#E5EEFF] hover:text-[#0072B4] md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                  'bg-blue-100 text-blue-600': pathName === item.href,
                },
              )}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarProfile;
