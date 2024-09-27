'use server';

import { getNotifications } from '@/services/notification.services';
import { Notification } from '@/types/TActivityCenter';

export const getNotificationsAction = async (
  filter: 'all' | 'unread' | 'read',
): Promise<Notification[]> => {
  const response = await getNotifications(filter);
  return response;
};
