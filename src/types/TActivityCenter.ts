export interface Notification {
  title: string;
  description: string;
  state: 'Readed' | 'Unreaded';
  date: string;
}

export interface Reminders {
  title: string;
  description: string;
  state: 'Upcoming' | 'Overdue' | 'Completed';
  date: string;
  createdAt: string;
  dueAt: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  comment: string | null;
}

export interface NotesCompanyMember {
  companyName: string;
  lastNoteContent: string;
  lastNoteCreatedDate: string;
  allNotes: SingleNote[];
}

interface SingleNote {
  noteId: number;
  content: string;
  createdDate: string;
}

export interface TransformedNotesMember {
  title: string;
  description: string;
  lastNoteCreatedDate: string;
  allNotes: SingleNote[];
}
