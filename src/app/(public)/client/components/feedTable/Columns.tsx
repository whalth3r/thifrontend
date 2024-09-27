'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Check, CircleDashed, RefreshCcw, UserPlus, X } from 'lucide-react';

export type Company = {
  id: string;
  status: 'approved' | 'renewed' | 'pending' | 'revoked' | 'newCompany';
  activity: string;
  companyName: string;
  state: string;
  date: Date;
};
const statusIcons: Record<Company['status'], JSX.Element> = {
  approved: <Check className='text-green-500' />,
  renewed: <RefreshCcw className='text-blue-500' />,
  pending: <CircleDashed className='text-yellow-500' />,
  revoked: <X className='text-red-500' />,
  newCompany: <UserPlus className='text-purple-500' />,
};
export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: 'activity',
    header: 'Activity',
    cell: ({ row }) => (
      <div className='flex items-center gap-4'>
        <span className='flex items-center space-x-2 rounded-full bg-gray-100 p-1'>
          {statusIcons[row.original.status]}
        </span>
        <p>{row.original.activity}</p>
      </div>
    ),
  },
  {
    accessorKey: 'companyName',
    header: 'Company Name',
  },
  {
    accessorKey: 'state',
    header: 'State',
  },
  {
    accessorKey: 'date',
    header: 'Date',
  },
];
