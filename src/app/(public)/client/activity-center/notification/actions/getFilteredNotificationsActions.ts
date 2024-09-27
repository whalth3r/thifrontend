'use server';

import { Notification } from '@/types/TActivityCenter';

import { NotificationTabsState } from '@/store/useNotifications';

export const getFilteredNotificationsAction = async (
  notifications: Notification[],
  filter: NotificationTabsState,
  search: string,
): Promise<Notification[]> => {
  let filteredNotifications: Notification[];

  switch (filter) {
    case 'read':
      filteredNotifications = notifications.filter((n) => n.state === 'Readed');
      break;
    case 'unread':
      filteredNotifications = notifications.filter(
        (n) => n.state === 'Unreaded',
      );
      break;
    case 'all':
    default:
      filteredNotifications = notifications;
      break;
  }

  if (search) {
    filteredNotifications = filteredNotifications.filter((n) =>
      n.title.toLowerCase().includes(search.toLowerCase()),
    );
  }
  return filteredNotifications;
};
