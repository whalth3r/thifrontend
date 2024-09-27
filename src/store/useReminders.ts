import { Reminders } from '@/types/TActivityCenter';
import { create } from 'zustand';

export type ReminderTabsState = 'all' | 'upcoming' | 'overdue' | 'completed';

type RemindersState = {
  isLoading: boolean;
  reminders: Reminders[];
  activeReminder: Reminders | null;
  filters: {
    tabs: ReminderTabsState;
    search: string;
    reminders: Reminders[];
  };
};

type RemindersActions = {
  setIsLoading: (loading: boolean) => void;
  setReminders: (reminders: Reminders[]) => void;
  setActiveReminder: (reminder: Reminders) => void;
  setTabsFilter: (tabFilter: ReminderTabsState) => void;
  setSearchFilter: (searchFilter: string) => void;
  setFilteredReminders: (reminders: Reminders[]) => void;
  setResetState: () => void;
};

const InitialState: RemindersState = {
  isLoading: false,
  reminders: [],
  activeReminder: null,
  filters: {
    tabs: 'all',
    search: '',
    reminders: [],
  },
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
    setTabsFilter: (filterTab) => {
      set((state) => ({
        filters: {
          ...state.filters,
          tabs: filterTab,
        },
      }));
    },
    setSearchFilter: (searchFilter) => {
      set((state) => ({
        filters: {
          ...state.filters,
          search: searchFilter,
        },
      }));
    },
    setFilteredReminders: (reminders) => {
      set((state) => ({
        filters: {
          ...state.filters,
          reminders,
        },
      }));
    },
    setResetState: () => {
      set(() => ({
        ...InitialState,
      }));
    },
  }),
);
