import { Reminders } from '@/types/TActivityCenter';
import { create } from 'zustand';

type RemindersState = {
  isLoading: boolean;
  reminders: Reminders[];
  activeReminder: Reminders | null;
};

type RemindersActions = {
  setIsLoading: (loading: boolean) => void;
  setReminders: (reminders: Reminders[]) => void;
  setActiveReminder: (reminder: Reminders) => void;
};

const InitialState: RemindersState = {
  isLoading: false,
  reminders: [],
  activeReminder: null,
};

export const useReminders = create<RemindersState & RemindersActions>()(
  (set) => ({
    ...InitialState,
    setReminders: (reminders) => {
      set({ reminders: reminders });
    },
    setIsLoading: (isLoading) => {
      set({ isLoading });
    },
    setActiveReminder: (reminder) => {
      set({
        activeReminder: reminder,
      });
    },
  }),
);
