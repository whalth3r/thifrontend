'use server';

import { Reminders } from '@/types/TActivityCenter';

import { ReminderTabsState } from '@/store/useReminders';

export const getFilteredRemindersAction = async (
  reminders: Reminders[],
  filter: ReminderTabsState,
  search: string,
): Promise<Reminders[]> => {
  let filteredReminders: Reminders[];

  switch (filter) {
    case 'completed':
      filteredReminders = reminders.filter((n) => n.state === 'Completed');
      break;
    case 'overdue':
      filteredReminders = reminders.filter((n) => n.state === 'Overdue');
      break;
    case 'upcoming':
      filteredReminders = reminders.filter((n) => n.state === 'Upcoming');
      break;
    case 'all':
    default:
      filteredReminders = reminders;
  }

  // Filtrar por búsqueda en el título
  if (search) {
    filteredReminders = filteredReminders.filter((n) =>
      n.title.toLowerCase().includes(search.toLowerCase()),
    );
  }

  return filteredReminders;
};
