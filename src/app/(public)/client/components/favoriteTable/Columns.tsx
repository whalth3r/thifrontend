'use client';

// Agregar esto al inicio del archivo
import { useState } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import { CircleMinus, Eye } from 'lucide-react';

import { Button } from '@/components/ui/button';

export type Favorite = {
  id: number;
  title: string;
  details: [] | null;
  removeFromFavorites: boolean;
};

export const Columns: ColumnDef<Favorite>[] = [
  {
    accessorKey: 'title',
    enableGlobalFilter: true,
    header: 'Company/Contact',
    cell: ({ row }) => (
      <div className='flex flex-col items-center justify-between gap-3'>
        <span className='text-black'>{row.original.title}</span>
        <div className='flex gap-4'>
          <Deselection />
        </div>
      </div>
    ),
  },
];

const Deselection = () => {
  const [isSelectFavorite, setIsSelectFavorite] = useState(true);

  const handleFavorite = (value: boolean) => {
    setIsSelectFavorite(value);
  };

  return (
    <div>
      {isSelectFavorite ? (
        <div className='flex gap-2'>
          <Button
            variant='outline'
            size='sm'
            className='font-medium text-red-500'
            onClick={() => handleFavorite(false)}
          >
            Remove <CircleMinus size={16} className='ml-4' />
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='font-medium text-black'
          >
            View details <Eye size={16} className='ml-4' />
          </Button>
        </div>
      ) : (
        <div>
          <Button
            variant='outline'
            size='sm'
            className='font-medium text-black'
            onClick={() => handleFavorite(true)}
          >
            Undo
          </Button>
        </div>
      )}
    </div>
  );
};
