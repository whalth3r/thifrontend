import { NotesCompanyMember } from '@/types/TActivityCenter';
import { NextResponse } from 'next/server';

import { notes } from '@/lib/mocks/notes-mocks';

export async function GET(): Promise<NextResponse<NotesCompanyMember[]>> {
  return new Promise((resolve) => {
    // Simular un retraso de 2 segundos
    setTimeout(() => {
      resolve(NextResponse.json(notes));
    }, 2000); // Retraso de 2 segundos
  });
}
