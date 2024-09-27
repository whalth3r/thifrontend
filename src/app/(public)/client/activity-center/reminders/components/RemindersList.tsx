'use client';

import { useReminders } from '@/store/useReminders';

import { CardListAC } from '../../components/CardListAC';
import { ReminderCard } from './ReminderCard';
import { ReminderDetailCard } from './ReminderDetailCard';

export const RemindersList = () => {
  const { isLoading, reminders } = useReminders();
  return (
    <CardListAC
      isLoading={isLoading}
      items={reminders}
      CardComponent={ReminderCard}
      DetailComponent={ReminderDetailCard}
      emptyText={'No reminders available to review at the moment'}
    />
  );
};
