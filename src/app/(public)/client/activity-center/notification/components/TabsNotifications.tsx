'use client';

import { useCallback, useEffect } from 'react';

import { useNotifications } from '@/store/useNotifications';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { getNotificationsAction } from '../actions/getNotifications';

export const TabsNotifications = () => {
  const { setIsLoading, setNotifications } = useNotifications();

  const loadNotifications = useCallback(
    async (value: string) => {
      setIsLoading(true);
      try {
        const result = await getNotificationsAction(
          value as 'all' | 'read' | 'unread',
        );
        setNotifications(result);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    },
    [setIsLoading, setNotifications],
  );

  const handleTabChange = (value: string) => {
    loadNotifications(value);
  };

  useEffect(() => {
    loadNotifications('all');
  }, [loadNotifications]);

  return (
    <Tabs
      className='self-end'
      defaultValue='all'
      dir='ltr'
      onValueChange={handleTabChange}
    >
      <TabsList>
        <TabsTrigger value='all'>All Notifications</TabsTrigger>
        <TabsTrigger value='unread'>Unread</TabsTrigger>
        <TabsTrigger value='read'>Read</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
