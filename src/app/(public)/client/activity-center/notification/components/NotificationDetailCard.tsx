'use client';

import { format } from 'date-fns';
import Link from 'next/link';

import { useNotifications } from '@/store/useNotifications';

import { Button } from '@/components/ui/button';

import { CardACRoot } from '../../components/CardAC';
import { NonDisplay } from '../../components/NonDisplay';

export const NotificationDetailCard = () => {
  const { activeNotification } = useNotifications();
  if (!activeNotification)
    return (
      <NonDisplay
        topText='No details to show'
        bottomText='Select a notification to view more information here'
        imgSrc='/images/activity-center/Notification.svg'
      />
    );

  const { title, description, date } = activeNotification;
  return (
    <CardACRoot className='gap-0'>
      <div className='flex justify-between'>
        <p className='text-left text-base font-semibold'>{title}</p>
        <p className='text-right text-xs font-normal text-muted-foreground'>
          {format(date, 'MM/dd/yyyy, HH:mm aaaa')}
        </p>
      </div>
      <p className='py-4 text-left text-base font-semibold text-muted-foreground'>
        {description}
      </p>
      <div className='flex justify-end'>
        <Link href={'/client'}>
          <Button className='text-muted-foreground' variant={'outline'}>
            Go to my profile
          </Button>
        </Link>
      </div>
    </CardACRoot>
  );
};
