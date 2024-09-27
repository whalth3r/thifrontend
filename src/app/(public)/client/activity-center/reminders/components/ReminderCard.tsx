import { Reminders } from '@/types/TActivityCenter';

import { useReminders } from '@/store/useReminders';

import {
  CardACDescription,
  CardACHeader,
  CardACRoot,
} from '../../components/CardAC';
import { StateParser } from './StateParser';

interface Props {
  item: Reminders;
}
export const ReminderCard = ({ item }: Props) => {
  const { setActiveReminder } = useReminders();
  return (
    <CardACRoot onClick={() => setActiveReminder(item)}>
      <CardACHeader date={item.date}>
        <div className='flex flex-col gap-1'>
          <p>{item.title}</p>
          <StateParser state={item.state} />
        </div>
      </CardACHeader>
      <CardACDescription description={item.description} />
    </CardACRoot>
  );
};
