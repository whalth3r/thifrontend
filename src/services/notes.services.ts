import { NotesCompanyMember } from '@/types/TActivityCenter';

import { notes } from '@/lib/mocks/notes-mocks';

export const getNotes = async (): Promise<NotesCompanyMember[]> => {
  return new Promise((resolve) => {
    // Simular un retraso de 2 segundos
    setTimeout(() => {
      resolve(notes);
    }, 2000); // Retraso de 2 segundos
  });
};
