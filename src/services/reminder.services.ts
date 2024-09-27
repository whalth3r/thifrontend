import { Reminders } from '@/types/TActivityCenter';

import { reminders } from '@/lib/mocks/reminders-mocks';

// Tipo de filtro
type ReminderState = 'all' | 'upcoming' | 'overdue' | 'completed';

// Simulación del servicio
export const getReminders = async (
  filter: ReminderState,
): Promise<Reminders[]> => {
  return new Promise((resolve) => {
    // Simular un retraso de 2 segundos
    setTimeout(() => {
      let filteredReminders: Reminders[];

      // Filtrar por el estado (leídos/no leídos)
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

      resolve(filteredReminders);
    }, 2000); // Retraso de 2 segundos
  });
};
