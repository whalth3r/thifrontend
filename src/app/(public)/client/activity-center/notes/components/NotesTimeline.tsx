import { NotesCompanyMember } from '@/types/TActivityCenter';
import { format } from 'date-fns';

import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  TimelineTitle,
} from '@/components/ui/timeline';

interface NotesTimelineProps {
  activeNote: NotesCompanyMember;
}
export const NotesTimeline = ({ activeNote }: NotesTimelineProps) => {
  return (
    <ScrollArea className='h-full max-h-[calc(100vh-56px-32px-16px-300px)] pl-3'>
      <Timeline>
        {activeNote?.allNotes.map((note) => (
          <TimelineItem className='px-2' key={note.noteId}>
            <TimelineConnector className='-translate-x-4 border border-l border-dashed border-input bg-transparent' />
            <TimelineHeader>
              <TimelineIcon className='z-50 items-center justify-center border border-input bg-background'>
                <div className='size-1 rounded-full bg-primary'></div>
              </TimelineIcon>
              <TimelineTitle className='text-xs font-normal text-muted-foreground'>
                {format(note.createdDate, 'HH:mmaa - MMMM dd, yyyy')}
              </TimelineTitle>
            </TimelineHeader>
            <TimelineContent className='pb-0'>
              <TimelineDescription className='w-full max-w-full rounded-xl bg-background p-4 text-sm font-medium'>
                {note.content}
              </TimelineDescription>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </ScrollArea>
  );
};
