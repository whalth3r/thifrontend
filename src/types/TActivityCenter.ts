export interface Notification {
  title: string;
  description: string;
  state: 'Readed' | 'Unreaded';
  date: string;
}

export interface Reminders {
  reminderId: number;
  titleReminder: string;
  content: string;
  reminderStatus: 'Upcoming' | 'Overdue' | 'Completed';
  createdDate: string;
  dueDate: string;
  referenceName: string;
  referenceEmail: string;
  referencePhoneNumber: string;
  comment: string | null;
}

export interface TransformedReminders
  extends Omit<Reminders, 'titleReminder' | 'content'> {
  title: string;
  description: string;
}

export interface NotesCompanyMember {
  referenceId: number;
  referenceType: string;
  referenceName: string;
  lastNoteContent: string;
  lastNoteCreatedDate: string;
  allNotes: SingleNote[];
}

export interface SingleNote {
  noteId: number;
  content: string;
  createdDate: string;
}

export interface TransformedNotesMember
  extends Omit<NotesCompanyMember, 'referenceName' | 'lastNoteContent'> {
  title: string;
  description: string;
}
