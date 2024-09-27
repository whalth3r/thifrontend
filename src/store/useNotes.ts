import {
  NotesCompanyMember,
  TransformedNotesMember,
} from '@/types/TActivityCenter';
import { create } from 'zustand';

type NotesState = {
  isLoading: boolean;
  notes: NotesCompanyMember[];
  activeNote: NotesCompanyMember | null;
};

type NotesActions = {
  setIsLoading: (loading: boolean) => void;
  setNotes: (notes: NotesCompanyMember[]) => void;
  setActiveNote: (note: TransformedNotesMember) => void;
};

const InitialState: NotesState = {
  isLoading: false,
  notes: [],
  activeNote: null,
};

export const useNotes = create<NotesState & NotesActions>()((set) => ({
  ...InitialState,
  setIsLoading: (isLoading) => {
    set({ isLoading });
  },
  setNotes: (notes) => {
    set({ notes });
  },
  setActiveNote: (activeNote) => {
    set({
      activeNote: {
        lastNoteContent: activeNote.description,
        companyName: activeNote.title,
        ...activeNote,
      },
    });
  },
}));
