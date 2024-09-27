import { Notification } from '@/types/TActivityCenter';

import { notifications } from '@/lib/mocks/notifications-mocks';

// Tipo de filtro
type NotificationState = 'all' | 'unread' | 'read';

// Simulación del servicio
export const getNotifications = async (
  filter: NotificationState,
): Promise<Notification[]> => {
  return new Promise((resolve) => {
    // Simular un retraso de 2 segundos
    setTimeout(() => {
      let filteredNotifications: Notification[];

      // Filtrar por el estado (leídos/no leídos)
      switch (filter) {
        case 'read':
          filteredNotifications = notifications.filter(
            (n) => n.state === 'Readed',
          );
          break;
        case 'unread':
          filteredNotifications = notifications.filter(
            (n) => n.state === 'Unreaded',
          );
          break;
        case 'all':
        default:
          filteredNotifications = notifications;
      }

      resolve(filteredNotifications);
    }, 2000); // Retraso de 2 segundos
  });
};
