'use client';

import { ActivityFeed } from '@/types/TActivityFeed';
import { ColumnDef } from '@tanstack/react-table';
import { Check, CircleDashed, RefreshCcw, UserPlus, X } from 'lucide-react';

const statusIcons: Record<ActivityFeed['status'], JSX.Element> = {
  approved: <Check className='text-green-500' />,
  renewed: <RefreshCcw className='text-blue-500' />,
  pending: <CircleDashed className='text-yellow-500' />,
  revoked: <X className='text-red-500' />,
  newCompany: <UserPlus className='text-purple-500' />,
};
export const columns: ColumnDef<ActivityFeed>[] = [
  {
    accessorKey: 'activity',
    header: 'Activity',
    cell: ({ row }) => (
      <div className='px-4'>
        <div className='flex flex-col gap-3 border-b-2 border-dotted px-3 py-5 lg:flex-row lg:justify-between lg:gap-0'>
          <div className='flex flex-row items-center gap-2'>
            <a className='h-50 space-x-2 rounded-full bg-gray-100 p-1'>
              {statusIcons[row.original.status]}
            </a>
            <div>
              <p className='text-xs font-bold lg:text-sm'>
                {row.original.activity}
              </p>
              <p className='text-xs font-thin lg:text-sm'>consultor</p>
            </div>
          </div>
          <div className='flex w-full justify-between lg:w-6/12'>
            <div className='flex w-1/3 flex-col lg:w-1/6'>
              <p className='text-xs font-thin lg:text-sm'>Company name</p>
              <p className='text-xs text-blue-400 lg:text-sm'>
                {row.original.companyName}
              </p>
            </div>
            <div className='flex w-1/3 flex-col items-end lg:w-1/6 lg:items-start'>
              <p className='text-xs font-thin lg:text-sm'>State</p>
              <p className='text-xs lg:text-sm'>{row.original.state}</p>
            </div>
            <div className='flex w-1/3 flex-col items-end lg:w-1/6 lg:items-start'>
              <p className='text-xs font-thin lg:text-sm'>Date</p>
              <p className='text-xs lg:text-sm'>{row.original.date}</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];
