'use client';

import { useCallback, useEffect } from 'react';

import { nextApi } from '@/services/api.service';
import { Reminders } from '@/types/TActivityCenter';
import { usePathname, useSearchParams } from 'next/navigation';

import { ReminderTabsState, useReminders } from '@/store/useReminders';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { getFilteredRemindersAction } from '../actions/getFilteredRemindersAction';

export const TabsReminders = () => {
  const {
    filters,
    reminders,
    setFilteredReminders,
    setIsLoading,
    setReminders,
    setResetState,
    setTabsFilter,
  } = useReminders();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Llamada inicial al API solo cuando el componente se monta
  const loadRemindersFromApi = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await nextApi.get<Reminders[]>({
        url: '/client/activity-center/reminders',
      });
      setReminders(data); // Guardar los recordatorios en el store
      setFilteredReminders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [setFilteredReminders, setIsLoading, setReminders]);

  // Filtrado de recordatorios usando los recordatorios almacenados
  const applyFilter = useCallback(async () => {
    setIsLoading(true);
    try {
      const filteredReminders = await getFilteredRemindersAction(
        reminders,
        filters.tabs,
        filters.search,
      );
      setFilteredReminders(filteredReminders);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [
    setIsLoading,
    reminders,
    filters.tabs,
    filters.search,
    setFilteredReminders,
  ]);

  // Llamar a `applyFilter` cuando cambien los filtros de tab o search
  useEffect(() => {
    if (reminders.length > 0) {
      applyFilter();
    }
  }, [filters.tabs, filters.search, reminders, applyFilter]);

  const handleTabChange = (value: string) => {
    setTabsFilter(value as ReminderTabsState); // Cambiar el filtro del tab en el store
  };

  // Detectar el cambio de ruta y resetear los filtros
  useEffect(() => {
    setResetState();
  }, [pathname, searchParams, setResetState]);

  useEffect(() => {
    loadRemindersFromApi(); // Cargar recordatorios solo al montar el componente
  }, [loadRemindersFromApi]);

  return (
    <Tabs defaultValue='all' onValueChange={handleTabChange}>
      <TabsList className='flex h-auto w-full flex-wrap'>
        <TabsTrigger value='all'>All reminders</TabsTrigger>
        <TabsTrigger value='upcoming'>Upcoming</TabsTrigger>
        <TabsTrigger value='overdue'>Overdue</TabsTrigger>
        <TabsTrigger value='completed'>Completed</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
