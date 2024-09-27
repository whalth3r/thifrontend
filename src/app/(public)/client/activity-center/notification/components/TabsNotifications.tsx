'use client';

import { useCallback, useEffect } from 'react';

import { nextApi } from '@/services/api.service';
import { Notification } from '@/types/TActivityCenter';
import { usePathname, useSearchParams } from 'next/navigation';

import {
  NotificationTabsState,
  useNotifications,
} from '@/store/useNotifications';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { getFilteredNotificationsAction } from '../actions/getFilteredNotificationsActions';

export const TabsNotifications = () => {
  const {
    filters,
    notifications,
    setFilteredNotifications,
    setIsLoading,
    setNotifications,
    setResetState,
    setTabsFilter,
  } = useNotifications();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const loadNotificationsFromApi = useCallback(async () => {
    setIsLoading(true);
    nextApi
      .get<Notification[]>({
        url: '/client/activity-center/notification',
      })
      .then(({ data }) => {
        setNotifications(data);
        setFilteredNotifications(data);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [setFilteredNotifications, setIsLoading, setNotifications]);

  const applyFilter = useCallback(async () => {
    setIsLoading(true);
    try {
      const filteredNotifications = await getFilteredNotificationsAction(
        notifications,
        filters.tabs,
        filters.search,
      );
      setFilteredNotifications(filteredNotifications);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [
    filters.search,
    filters.tabs,
    notifications,
    setFilteredNotifications,
    setIsLoading,
  ]);

  const handleTabChange = (value: string) => {
    setTabsFilter(value as NotificationTabsState);
  };

  // Llamar a `applyFilter` cuando cambien los filtros de tab o search
  useEffect(() => {
    if (notifications.length > 0) {
      applyFilter();
    }
  }, [filters.tabs, filters.search, applyFilter, notifications.length]);

  // Detectar el cambio de ruta y resetear los filtros
  useEffect(() => {
    setResetState();
  }, [pathname, searchParams, setResetState]);

  useEffect(() => {
    loadNotificationsFromApi();
  }, [loadNotificationsFromApi]);

  return (
    <Tabs
      className='self-end'
      defaultValue='all'
      dir='ltr'
      onValueChange={handleTabChange}
    >
      <TabsList className='flex h-auto w-full flex-wrap'>
        <TabsTrigger value='all'>All Notifications</TabsTrigger>
        <TabsTrigger value='unread'>Unread</TabsTrigger>
        <TabsTrigger value='read'>Read</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
