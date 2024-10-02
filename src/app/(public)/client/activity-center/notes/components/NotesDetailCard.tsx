'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { nextApi } from '@/services/api.service';
import { SingleNote } from '@/types/TActivityCenter';
import { zodResolver } from '@hookform/resolvers/zod';
import { FilePlus2 } from 'lucide-react';
import { z } from 'zod';

import { useNotes } from '@/store/useNotes';

import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

import { NonDisplay } from '../../components/NonDisplay';
import { NotesReminderModal } from './NotesReminderModal';
import { NotesTimeline } from './NotesTimeline';

const formSchema = z.object({
  note: z.string().min(2).max(300),
});

export const NotesDetailCard = () => {
  const { activeNote, addNoteToActive } = useNotes();

  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { reset, watch } = form;

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    if (isOpen) {
      return;
    }
    const createdNote = {
      note: formData.note,
      referenceId: activeNote?.referenceId || '',
      referenceType: activeNote?.referenceType || '',
    };
    const { data, status } = await nextApi.post<SingleNote>({
      url: '/client/activity-center/notes',
      body: createdNote,
    });

    if (status !== 200) {
      // TODO: Manejo de errores
      console.error('Error');
      return;
    }

    addNoteToActive(data);

    reset({
      note: '',
    });
  };

  const resetFather = () => {
    reset({
      note: '',
    });
  };

  useEffect(() => {
    reset({
      note: '',
    });
  }, [reset, activeNote]);

  // Deshabilitar los botones si no hay texto en el textarea
  const isDisabled = !watch('note')?.trim();

  if (!activeNote)
    return (
      <NonDisplay
        topText={"It looks like there's nothing here yet."}
        bottomText={
          'Select a business add a note to see its details displayed in this space.'
        }
        imgSrc={'/images/activity-center/Notes.svg'}
      />
    );

  return (
    <div className='flex h-full w-full flex-col justify-between'>
      <NotesTimeline activeNote={activeNote} />
      <div className='border-t border-input p-3'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='relative flex w-full rounded-md border border-input bg-background p-4 pb-28 sm:pb-14 lg:pb-28 xl:pb-14'
          >
            <FormField
              control={form.control}
              name='note'
              render={({ field }) => (
                <Textarea
                  className='resize-none border-0'
                  placeholder='Enter note description...'
                  {...field}
                />
              )}
            />
            <div className='absolute bottom-2 left-2 right-2 mx-auto flex w-fit flex-col justify-end gap-4 rounded-md sm:left-auto sm:mx-0 sm:flex-row lg:left-4 lg:mx-auto lg:flex-col xl:left-auto xl:mx-0 xl:flex-row'>
              <NotesReminderModal
                note={form.watch('note')}
                isDisabled={isDisabled}
                resetFather={resetFather}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
              <Button disabled={isDisabled} type='submit' variant={'outline'}>
                <FilePlus2 className='my-auto mr-2 h-4 w-4' />
                Add Note
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
