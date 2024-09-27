'use client';

import { useNotifications } from '@/store/useNotifications';

import { CardListAC } from '../../components/CardListAC';
import { NotificationCard } from './NotificationCard';
import { NotificationDetailCard } from './NotificationDetailCard';

export const NotificationsList = () => {
  const { isLoading, filters } = useNotifications();
  return (
    <>
      <CardListAC
        scrollAreaClass='h-[calc(100vh-48px-36px-48px-95px-80px)]'
        isLoading={isLoading}
        items={filters.notifications}
        CardComponent={NotificationCard}
        DetailComponent={NotificationDetailCard}
        emptyText={
          'No notifications at the moment. You’ll see updates here as they come in.'
        }
      />
    </>
  );
};
