'use client';

import { useNotes } from '@/store/useNotes';

import { SearchForm } from '../../components/SearchForm';

export const NotesSearch = () => {
  const { setSearchFilter } = useNotes();

  const handleSearch = (value: string) => {
    setSearchFilter(value);
  };

  return (
    <SearchForm
      placeholder='Search by Company or Contact Name'
      onSearch={handleSearch} // Pasar la función de búsqueda al componente
    />
  );
};
