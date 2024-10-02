'use client';

import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

import { nextApi } from '@/services/api.service';
import { SingleNote } from '@/types/TActivityCenter';
import { TZDate } from '@date-fns/tz';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  addMinutes,
  format,
  isAfter,
  isToday,
  setHours,
  setMinutes,
  startOfToday,
} from 'date-fns';
import { BellPlus, CalendarIcon } from 'lucide-react';
import { z } from 'zod';

import { useNotes } from '@/store/useNotes';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { cn } from '@/lib/utils';

const formSchema = z.object({
  title: z.string().min(2).max(50),
  date: z
    .date()
    .refine((date) => isAfter(date, startOfToday()) || isToday(date), {
      message: 'Date must be today or later',
    }),
  time: z.string().min(1, 'Please select a valid time'),
});

// Función para generar intervalos de media hora
const generateTimeIntervals = (startHour = 0, startMinute = 0) => {
  const intervals = [];
  let currentTime = setHours(new Date(), startHour);
  currentTime = setMinutes(currentTime, startMinute);

  // Hora máxima: 11:30 PM
  const maxTime = setHours(new Date(), 23);
  setMinutes(maxTime, 30);

  while (currentTime <= maxTime) {
    intervals.push(format(currentTime, 'HH:mm'));
    currentTime = addMinutes(currentTime, 30);
  }

  return intervals;
};

// Función para calcular el próximo intervalo de media hora
const getNextHalfHour = (date: Date) => {
  const minutes = date.getMinutes();
  const nextHalfHour = minutes < 30 ? 30 : 60;
  return addMinutes(setMinutes(date, nextHalfHour), 0); // Salta al siguiente intervalo
};

interface NotesReminderModalProps {
  note: string;
  isDisabled: boolean;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  resetFather: () => void;
}

export const NotesReminderModal = ({
  note,
  isDisabled,
  resetFather,
  isOpen,
  setIsOpen,
}: NotesReminderModalProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      date: new Date(),
      time: '',
    },
  });

  const { activeNote, addNoteToActive } = useNotes();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { date, time } = values;
    const [hours, minutes] = time.split(':').map(Number);
    const combinedDateTime = setHours(
      setMinutes(new Date(date), minutes),
      hours,
    );

    const createdReminder = {
      title: values.title,
      content: note,
      referenceId: activeNote?.referenceId || '',
      referenceType: activeNote?.referenceType || '',
      dueDate: format(
        new TZDate(combinedDateTime),
        "yyyy-MM-dd'T'HH:mm:ss.SSSXXX",
      ),
    };

    const { data } = await nextApi.post<SingleNote>({
      url: '/client/activity-center/reminders',
      body: createdReminder,
    });

    addNoteToActive(data);

    setIsOpen(false);
    form.reset();
    resetFather();
  };

  const availableTimes = isToday(form.watch('date'))
    ? generateTimeIntervals(
        getNextHalfHour(new Date()).getHours(),
        getNextHalfHour(new Date()).getMinutes(),
      ) // Desde la hora actual si es hoy
    : generateTimeIntervals(); // Si no es hoy, empezar desde medianoche

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button disabled={isDisabled} variant={'outline'}>
          <BellPlus className='my-auto mr-2 h-4 w-4' />
          Add note and Create Reminder
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Reminder</DialogTitle>
          <DialogDescription>
            Set date and time for a reminder.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 md:px-6'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <div className='space-y-2 md:flex md:space-x-4 md:space-y-0'>
                    <FormLabel className='md:my-auto'>Title</FormLabel>
                    <FormControl>
                      <Input placeholder='Title for the reminder' {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='date'
              render={({ field }) => (
                <FormItem>
                  <div className='space-y-2 md:flex md:space-x-4 md:space-y-0'>
                    <FormLabel className='md:my-auto'>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full justify-start text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            <CalendarIcon className='mr-2 h-4 w-4' />
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < startOfToday()} // Solo fechas desde hoy
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='time'
              render={({ field }) => (
                <FormItem>
                  <div className='space-y-2 md:flex md:space-x-4 md:space-y-0'>
                    <FormLabel className='md:my-auto'>Time</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select time' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableTimes.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type='button' variant={'outline'}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type='submit' variant={'outline'}>
                <BellPlus className='my-auto mr-2 h-4 w-4' />
                Add Reminder
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
