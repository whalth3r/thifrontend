import { Group } from '@/types/TMenu';
import { Building2, House, LaptopMinimal, Mail, Rss } from 'lucide-react';

export function getMenuList(): Group[] {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/client',
          label: 'Home',
          icon: House,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Contents',
      menus: [
        {
          href: '',
          label: 'Business Directory',
          icon: Building2,
          submenus: [
            {
              href: '/client/business/search',
              label: 'Search',
            },
            {
              href: '/client/business/contacts',
              label: 'Contacts',
            },
            {
              href: '/client/business/ancillaries-companies',
              label: 'Ancillaries Companies',
            },
          ],
        },
        {
          href: '',
          label: 'Activity Center',
          icon: LaptopMinimal,
          submenus: [
            {
              href: '/client/activity-center/notification',
              label: 'Notification',
            },
            {
              href: '/client/activity-center/notes',
              label: 'Notes',
            },
            {
              href: '/client/activity-center/reminders',
              label: 'Reminders',
            },
          ],
        },
        {
          href: '/client/marketing',
          label: 'Marketing',
          icon: Mail,
          submenus: [],
        },
        {
          href: '/client/news',
          label: 'News',
          icon: Rss,
          submenus: [],
        },
        // {
        //   href: '/client/events',
        //   label: 'Events',
        //   icon: Ticket,
        //   submenus: [],
        // },
      ],
    },
  ];
}
