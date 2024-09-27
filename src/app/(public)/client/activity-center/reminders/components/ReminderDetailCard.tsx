'use client';

import { formatPhoneNumber } from 'react-phone-number-input';

import { format, isToday, isYesterday, parseISO } from 'date-fns';

import { useReminders } from '@/store/useReminders';

import { CardACRoot } from '../../components/CardAC';
import { NonDisplay } from '../../components/NonDisplay';
import { MarkCompletedDialog } from './MarkCompletedDialog';
import { StateParser } from './StateParser';

export const ReminderDetailCard = () => {
  const { activeReminder } = useReminders();
  const formatDateRelative = (dateString: string) => {
    const date = parseISO(dateString);

    if (isToday(date)) {
      return `Today, ${format(date, 'p')}`; // Formato para hoy
    } else if (isYesterday(date)) {
      return `Yesterday, ${format(date, 'p')}`; // Formato para ayer
    } else {
      // Fechas lejanas se formatean con el día, fecha y hora
      return format(date, "EEEE, dd MMM yyyy 'at' p"); // e.g., "Wednesday, 18 Sep 2024 at 7:00 AM"
    }
  };

  if (!activeReminder) {
    return (
      <NonDisplay
        topText={'No details available to display'}
        bottomText={
          'Select a business add a note and create a reminder to see the details displayed in this space.'
        }
        imgSrc={'/images/activity-center/Reminder.svg'}
      />
    );
  }

  const {
    title,
    state,
    date,
    createdAt,
    dueAt,
    description,
    companyName,
    email,
    phoneNumber,
    comment,
  } = activeReminder;
  return (
    <>
      <CardACRoot className='gap-0'>
        <div className='flex justify-between'>
          <div className='flex flex-col gap-1'>
            <p className='text-base font-semibold'>{title}</p>
            <StateParser state={state} />
          </div>
          <p className='text-xs font-normal text-muted-foreground'>
            {format(date, 'MM/dd/yyyy, HH:mm aaaa')}
          </p>
        </div>
        <div className='grid w-full grid-cols-2 gap-4 text-left'>
          <LabelContent
            label='Created'
            content={format(createdAt, 'eeee, dd LLL yyyy')}
          />
          <LabelContent label='Due date' content={formatDateRelative(dueAt)} />
          <p className='col-span-full text-muted-foreground'>{description}</p>
          <LabelContent label='Company name:' content={companyName} />
          <LabelContent label='Email Address:' content={email} />
          <LabelContent
            label='Phone number:'
            content={formatPhoneNumber(phoneNumber)}
          />
          {state !== 'Completed' && <MarkCompletedDialog />}
        </div>
      </CardACRoot>
      {comment && (
        <CardACRoot className='mt-4 text-left'>
          <p className='text-base font-semibold'>Comment</p>
          <p className='text-base font-medium text-muted-foreground'>
            {comment}
          </p>
        </CardACRoot>
      )}
    </>
  );
};

interface LabelContentProps {
  label: string;
  content: string;
}

export const LabelContent = ({ content, label }: LabelContentProps) => {
  return (
    <div className='flex flex-col'>
      <p className='text-xs font-medium text-muted-foreground'>{label}</p>
      <p className='text-sm font-medium'>{content}</p>
    </div>
  );
};
