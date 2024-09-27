import { Notification } from '@/types/TActivityCenter';
import { create } from 'zustand';

export type NotificationTabsState = 'all' | 'read' | 'unread';

type NotificationsState = {
  isLoading: boolean;
  notifications: Notification[];
  activeNotification: Notification | null;
  filters: {
    tabs: NotificationTabsState;
    search: string;
    notifications: Notification[];
  };
};

type NotificationsActions = {
  setIsLoading: (loading: boolean) => void;
  setNotifications: (notifications: Notification[]) => void;
  setActiveNotification: (notification: Notification) => void;
  setTabsFilter: (tabFilter: NotificationTabsState) => void;
  setSearchFilter: (searchFilter: string) => void;
  setFilteredNotifications: (notifications: Notification[]) => void;
  setResetState: () => void;
};

const InitialState: NotificationsState = {
  isLoading: false,
  notifications: [],
  activeNotification: null,
  filters: {
    tabs: 'all',
    search: '',
    notifications: [],
  },
};

export const useNotifications = create<
  NotificationsState & NotificationsActions
>()((set) => ({
  ...InitialState,
  setNotifications: (notifications) => {
    set({ notifications });
  },
  setIsLoading: (isLoading) => {
    set({ isLoading });
  },
  setActiveNotification: (notification) => {
    set({
      activeNotification: notification,
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
  setFilteredNotifications: (notifications) => {
    set((state) => ({
      filters: {
        ...state.filters,
        notifications,
      },
    }));
  },
  setResetState: () => {
    set(() => ({
      ...InitialState,
    }));
  },
}));
