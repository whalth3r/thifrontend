import { Notification } from '@/types/TActivityCenter';
import { Circle } from 'lucide-react';

import { useNotifications } from '@/store/useNotifications';

import {
  CardACDescription,
  CardACHeader,
  CardACRoot,
} from '../../components/CardAC';

interface Props {
  item: Notification;
}
export const NotificationCard = ({ item: notification }: Props) => {
  const { setActiveNotification } = useNotifications();
  return (
    <>
      <CardACRoot onClick={() => setActiveNotification(notification)}>
        <CardACHeader date={notification.date}>
          <p className='line-clamp-2 text-base font-semibold'>
            {notification.title}
          </p>
          {notification.state === 'Unreaded' && (
            <Circle className='my-auto h-2 w-2 fill-current text-[#3062D4]' />
          )}
        </CardACHeader>
        <CardACDescription description={notification.description} />
      </CardACRoot>
    </>
  );
};
