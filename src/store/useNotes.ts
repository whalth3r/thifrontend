import {
  NotesCompanyMember,
  TransformedNotesMember,
} from '@/types/TActivityCenter';
import { create } from 'zustand';

type NotesState = {
  isLoading: boolean;
  notes: NotesCompanyMember[];
  activeNote: NotesCompanyMember | null;
  filters: {
    search: string;
    notes: NotesCompanyMember[];
  };
};

type NotesActions = {
  setIsLoading: (loading: boolean) => void;
  setNotes: (notes: NotesCompanyMember[]) => void;
  setActiveNote: (note: TransformedNotesMember) => void;
  setSearchFilter: (searchFilter: string) => void;
  setFilteredNotes: (notes: NotesCompanyMember[]) => void;
  setResetState: () => void;
};

const InitialState: NotesState = {
  isLoading: false,
  notes: [],
  activeNote: null,
  filters: {
    search: '',
    notes: [],
  },
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
  setFilteredNotes: (notes) => {
    set((state) => ({
      filters: {
        ...state.filters,
        notes,
      },
    }));
  },
  setSearchFilter: (searchFilter) => {
    set((state) => ({
      filters: {
        ...state.filters,
        search: searchFilter,
      },
    }));
  },
  setResetState: () => {
    set(() => ({
      ...InitialState,
    }));
  },
}));
