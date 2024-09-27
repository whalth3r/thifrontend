import { Circle } from 'lucide-react';

import { cn } from '@/lib/utils';

interface StateParserProps {
  state: 'Upcoming' | 'Overdue' | 'Completed';
}

export const StateParser = ({ state }: StateParserProps) => {
  return (
    <div
      className={cn(
        'flex gap-2',
        state == 'Overdue' && 'text-[#6F2020]',
        state == 'Completed' && 'text-[#0E4E30]',
        state == 'Upcoming' && 'text-[#113997]',
      )}
    >
      <Circle className='my-auto h-2 w-2 fill-current' />
      <p className='text-sm font-medium'>{state}</p>
    </div>
  );
};
