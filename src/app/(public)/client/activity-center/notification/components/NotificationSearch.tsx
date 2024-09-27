'use client';

import { useNotifications } from '@/store/useNotifications';

import { SearchForm } from '../../components/SearchForm';

export const NotificationSearch = () => {
  const { setSearchFilter } = useNotifications();

  const handleSearch = (value: string) => {
    setSearchFilter(value);
  };

  return (
    <SearchForm
      placeholder='Search by Notification Name'
      onSearch={handleSearch} // Pasar la función de búsqueda al componente
    />
  );
};
