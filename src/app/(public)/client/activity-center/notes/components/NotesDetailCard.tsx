'use client';

import { BellPlus, FilePlus2 } from 'lucide-react';

import { useNotes } from '@/store/useNotes';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export const NotesDetailCard = () => {
  const { activeNote } = useNotes();
  return (
    <div className='flex h-full w-full flex-col justify-between'>
      <span>{JSON.stringify(activeNote?.allNotes)}</span>
      <div className='relative flex border border-input bg-background p-4 pb-14'>
        <Textarea
          className='border-0'
          placeholder='Enter note description...'
        />
        <div className='absolute bottom-2 right-6 flex w-full justify-end gap-4 rounded-md'>
          <Button variant={'outline'}>
            <BellPlus className='my-auto mr-2 h-4 w-4' />
            Add note and Create Reminder
          </Button>
          <Button variant={'outline'}>
            <FilePlus2 className='my-auto mr-2 h-4 w-4' />
            Add Note
          </Button>
        </div>
      </div>
    </div>
  );
};
