'use server';

import { getReminders } from '@/services/reminder.services';
import { Reminders } from '@/types/TActivityCenter';

export const getRemindersAction = async (
  filter: 'all' | 'upcoming' | 'overdue' | 'completed',
): Promise<Reminders[]> => {
  const response = await getReminders(filter);
  return response;
};
