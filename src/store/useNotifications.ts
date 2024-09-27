import { Notification } from '@/types/TActivityCenter';
import { create } from 'zustand';

type NotificationsState = {
  isLoading: boolean;
  notifications: Notification[];
  activeNotification: Notification | null;
};

type NotificationsActions = {
  setIsLoading: (loading: boolean) => void;
  setNotifications: (notifications: Notification[]) => void;
  setActiveNotification: (notification: Notification) => void;
};

const InitialState: NotificationsState = {
  isLoading: false,
  notifications: [],
  activeNotification: null,
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
}));
