'use server';

import { getNotes } from '@/services/notes.services';
import { NotesCompanyMember } from '@/types/TActivityCenter';

export const getNotesAction = async (): Promise<NotesCompanyMember[]> => {
  const response = await getNotes();
  return response;
};
