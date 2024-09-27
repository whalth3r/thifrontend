'use server';

import { NotesCompanyMember } from '@/types/TActivityCenter';

export const getFilteredNotesAction = async (
  notes: NotesCompanyMember[],
  search: string,
): Promise<NotesCompanyMember[]> => {
  let filteredNotes: NotesCompanyMember[];

  filteredNotes = notes;

  if (search) {
    filteredNotes = notes.filter((n) =>
      n.companyName.toLowerCase().includes(search.toLowerCase()),
    );
  }

  return filteredNotes;
};
