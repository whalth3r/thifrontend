'use client';

import { useNotifications } from '@/store/useNotifications';

import { CardListAC } from '../../components/CardListAC';
import { NotificationCard } from './NotificationCard';
import { NotificationDetailCard } from './NotificationDetailCard';

export const NotificationsList = () => {
  const { isLoading, notifications } = useNotifications();
  return (
    <>
      <CardListAC
        isLoading={isLoading}
        items={notifications}
        CardComponent={NotificationCard}
        DetailComponent={NotificationDetailCard}
        emptyText={
          'No notifications at the moment. You’ll see updates here as they come in.'
        }
      />
    </>
  );
};
