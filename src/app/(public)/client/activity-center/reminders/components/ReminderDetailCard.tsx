'use client';

import { DetailedHTMLProps, HTMLAttributes } from 'react';
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
    titleReminder,
    reminderStatus,
    referenceEmail,
    referencePhoneNumber,
    referenceName,
    createdDate,
    dueDate,
    content,
    comment,
  } = activeReminder;
  return (
    <>
      <CardACRoot className='gap-0'>
        <div className='flex justify-between'>
          <div className='flex flex-col gap-1'>
            <p className='text-left text-base font-semibold'>{titleReminder}</p>
            <StateParser state={reminderStatus} />
          </div>
          <p className='text-right text-xs font-normal text-muted-foreground'>
            {format(createdDate, 'MM/dd/yyyy, HH:mm aaaa')}
          </p>
        </div>
        <div className='grid w-full grid-cols-2 gap-4 text-left'>
          <LabelContent
            label='Created'
            content={format(createdDate, 'eeee, dd LLL yyyy')}
          />
          <LabelContent
            label='Due date'
            content={formatDateRelative(dueDate)}
          />
          <p className='col-span-full text-muted-foreground'>{content}</p>
          <LabelContent label='Company name:' content={referenceName} />
          <LabelContent
            label='Email Address:'
            className='break-all'
            content={referenceEmail}
          />
          <LabelContent
            label='Phone number:'
            content={formatPhoneNumber(referencePhoneNumber)}
          />
          {reminderStatus !== 'Completed' && <MarkCompletedDialog />}
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

interface LabelContentProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  label: string;
  content: string;
}

export const LabelContent = ({
  content,
  label,
  ...rest
}: LabelContentProps) => {
  return (
    <div className='flex flex-col' {...rest}>
      <p className='text-xs font-medium text-muted-foreground'>{label}</p>
      <p className='text-sm font-medium'>{content}</p>
    </div>
  );
};
