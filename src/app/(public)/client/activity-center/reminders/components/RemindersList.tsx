'use client';

import { useReminders } from '@/store/useReminders';

import { CardListAC } from '../../components/CardListAC';
import { ReminderCard } from './ReminderCard';
import { ReminderDetailCard } from './ReminderDetailCard';

export const RemindersList = () => {
  const { isLoading, filters } = useReminders();

  return (
    <CardListAC
      scrollAreaClass='h-[calc(100vh-48px-36px-48px-95px-80px)]'
      isLoading={isLoading}
      items={filters.reminders}
      CardComponent={ReminderCard}
      DetailComponent={ReminderDetailCard}
      emptyText={'No reminders available to review at the moment'}
    />
  );
};
