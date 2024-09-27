'use client';

import { useCallback, useEffect } from 'react';

import { nextApi } from '@/services/api.service';
import {
  NotesCompanyMember,
  TransformedNotesMember,
} from '@/types/TActivityCenter';
import { usePathname, useSearchParams } from 'next/navigation';

import { useNotes } from '@/store/useNotes';

import { CardListAC } from '../../components/CardListAC';
import { getFilteredNotesAction } from '../actions/getFilteredNotesAction';
import { NoteCard } from './NoteCard';
import { NotesDetailCard } from './NotesDetailCard';

export const NotesList = () => {
  const {
    isLoading,
    notes,
    filters,
    setIsLoading,
    setNotes,
    setFilteredNotes,
    setResetState,
  } = useNotes();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const transformNotesMember = (
    members: NotesCompanyMember[],
  ): TransformedNotesMember[] => {
    return members.map((member) => ({
      title: member.companyName,
      description: member.lastNoteContent,
      lastNoteCreatedDate: member.lastNoteCreatedDate,
      allNotes: member.allNotes,
    }));
  };

  const loadNotesFromApi = useCallback(async () => {
    setIsLoading(true);
    nextApi
      .get<NotesCompanyMember[]>({ url: '/client/activity-center/notes' })
      .then(({ data }) => {
        setNotes(data);
        setFilteredNotes(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }, [setFilteredNotes, setIsLoading, setNotes]);

  const applyFilter = useCallback(async () => {
    setIsLoading(true);
    try {
      const filteredNotes = await getFilteredNotesAction(notes, filters.search);
      setFilteredNotes(filteredNotes);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [filters.search, notes, setFilteredNotes, setIsLoading]);

  useEffect(() => {
    if (notes.length > 0) {
      applyFilter();
    }
  }, [applyFilter, notes.length]);

  // Detectar el cambio de ruta y resetear los filtros
  useEffect(() => {
    setResetState();
  }, [pathname, searchParams, setResetState]);

  useEffect(() => {
    loadNotesFromApi();
  }, [loadNotesFromApi]);

  return (
    <CardListAC
      isLoading={isLoading}
      items={transformNotesMember(filters.notes)}
      CardComponent={NoteCard}
      DetailComponent={NotesDetailCard}
      emptyText='No notes available to review at the moment.'
    />
  );
};
