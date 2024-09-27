'use client';

import { useCallback, useEffect } from 'react';

import { useReminders } from '@/store/useReminders';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { getRemindersAction } from '../actions/getReminders';

export const TabsReminders = () => {
  const { setIsLoading, setReminders } = useReminders();

  const loadReminders = useCallback(
    async (value: string) => {
      setIsLoading(true);
      try {
        const result = await getRemindersAction(
          value as 'all' | 'upcoming' | 'overdue' | 'completed',
        );
        setReminders(result);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    },
    [setIsLoading, setReminders],
  );

  const handleTabChange = (value: string) => {
    loadReminders(value);
  };

  useEffect(() => {
    loadReminders('all');
  }, [loadReminders]);

  return (
    <Tabs className='w-full' defaultValue='all' onValueChange={handleTabChange}>
      <TabsList className='w-full'>
        <TabsTrigger value='all'>All reminders</TabsTrigger>
        <TabsTrigger value='upcoming'>Upcoming</TabsTrigger>
        <TabsTrigger value='overdue'>Overdue</TabsTrigger>
        <TabsTrigger value='completed'>Completed</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
