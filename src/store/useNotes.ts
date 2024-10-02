import {
  NotesCompanyMember,
  SingleNote,
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
  addNoteToActive: (newNote: SingleNote) => void;
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
        referenceName: activeNote.title,
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
  addNoteToActive: (newNote) => {
    set((state) => {
      const { activeNote } = state;

      if (!activeNote) return state; // Si no hay activeNote, no hacer nada

      // 1. Actualizar activeNote
      const updatedActiveNote = {
        ...activeNote,
        allNotes: [...activeNote.allNotes, newNote],
        lastNoteContent: newNote.content,
        lastNoteCreatedDate: newNote.createdDate,
      };

      // // 2. Actualizar notes (modificar solo la nota correspondiente)
      // const updatedNotes = notes.map((note) =>
      //   note.referenceId === activeNote.referenceId ? updatedActiveNote : note,
      // );

      // // 3. Actualizar filters.notes si contiene activeNote
      // const updatedFilteredNotes = filters.notes.some(
      //   (note) => note.referenceId === activeNote.referenceId,
      // )
      //   ? filters.notes.map((note) =>
      //       note.referenceId === activeNote.referenceId
      //         ? updatedActiveNote
      //         : note,
      //     )
      //   : filters.notes;

      // console.log({
      //   updatedActiveNote,
      //   updatedNotes,
      //   updatedFilteredNotes,
      // });

      return {
        ...state,
        activeNote: updatedActiveNote,
        // notes: updatedNotes,
        // filters: {
        //   ...filters,
        //   notes: updatedFilteredNotes,
        // },
      };
    });
  },
}));
