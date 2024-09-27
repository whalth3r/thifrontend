'use client';

import { useReminders } from '@/store/useReminders';

import { SearchForm } from '../../components/SearchForm';

export const ReminderSearch = () => {
  const { setSearchFilter } = useReminders();

  const handleSearch = (value: string) => {
    setSearchFilter(value);
  };

  return (
    <SearchForm
      placeholder='Search by Reminder Title'
      onSearch={handleSearch} // Pasar la función de búsqueda al componente
    />
  );
};
