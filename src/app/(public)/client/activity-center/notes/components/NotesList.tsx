'use client';

import { useCallback, useEffect } from 'react';

import {
  NotesCompanyMember,
  TransformedNotesMember,
} from '@/types/TActivityCenter';

import { useNotes } from '@/store/useNotes';

import { CardListAC } from '../../components/CardListAC';
import { getNotesAction } from '../actions/getNotes';
import { NoteCard } from './NoteCard';
import { NotesDetailCard } from './NotesDetailCard';

export const NotesList = () => {
  const { isLoading, notes, setIsLoading, setNotes } = useNotes();

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

  const loadNotes = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getNotesAction();
      setNotes(result);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, [setIsLoading, setNotes]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  return (
    <CardListAC
      isLoading={isLoading}
      items={transformNotesMember(notes)}
      CardComponent={NoteCard}
      DetailComponent={NotesDetailCard}
      emptyText='No notes available to review at the moment.'
    />
  );
};
