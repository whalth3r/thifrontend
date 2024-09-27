'use client';

import React, { useEffect, useState } from 'react';

import { nextApi, nextEndpoints } from '@/services/api.service';
import { Business, QueryObject } from '@/types/Business';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronsUpDown, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { DataTableFacetedFilter } from '@/components/ui/DataTableFacetedFilter';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { cn } from '@/lib/utils';

import { StatusBadge } from '../StatusBadge';

type ActionHandler = (id: string | number) => void;

export function BusinessSearchTable() {
  const router = useRouter();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [zipCodeError, setZipCodeError] = useState('');
  //TODO default zip code needs to be fetch from BE
  const [query, setQuery] = useState<QueryObject>({ zipCode: '123456' });

  useEffect(() => {
    nextApi
      .get<Business[]>({ url: nextEndpoints.getBusiness })
      .then(({ data }) => setBusinesses(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const filteredQueryObj = Object.fromEntries(
      Object.entries(query).filter((v) => Boolean(v[1])),
    );
    const queryParams = new URLSearchParams(
      filteredQueryObj as { [key: string]: string },
    ).toString();
    router.push('search?' + queryParams);
  }, [query, router]);

  const setQueryObject = (key: keyof QueryObject, value: string) => {
    setQuery((current: QueryObject) => {
      // Keep keys order to build queryparams in the same order
      return {
        companyName: key === 'companyName' ? value : current.companyName,
        zipCode: key === 'zipCode' ? value : current.zipCode,
        industry: key === 'industry' ? value : current.industry,
        licenseStatus: key === 'licenseStatus' ? value : current.licenseStatus,
        licenseType: key === 'licenseType' ? value : current.licenseType,
        state: key === 'state' ? value : current.state,
      };
    });
  };

  const onZipCodeChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (zipCodeError) setZipCodeError('');
    const numericValue = target.value.replace(/\D/g, '');
    if (numericValue.trim().length > 5) return;
    setQueryObject('zipCode', numericValue);
  };

  const onZipCodeBlur = () => {
    if (query.zipCode.trim().length === 0) {
      setZipCodeError('Zip Code cannot be empty');
      return;
    }
    const zipCodeReg = /\d{5}/;
    if (!zipCodeReg.test(query.zipCode)) {
      setZipCodeError('Invalid Zip Code');
      return;
    }
  };

  const onCompanyNameChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setQueryObject('companyName', target.value);
  };

  const onSelect: ActionHandler = (id) => router.push(`search/${id}`);
  const onAddNote: ActionHandler = (id) =>
    router.push(`search/${id}?tab=notes`);

  const columns: ColumnDef<Business>[] = [
    {
      accessorKey: 'industry',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Industry
            <ChevronsUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue('industry')}</div>,
    },
    {
      accessorKey: 'licenseType',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            License Type
            <ChevronsUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue('licenseType')}</div>,
    },
    {
      accessorKey: 'licenseStatus',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            License Status
            <ChevronsUpDown className='m2-1 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => <StatusBadge status={row.getValue('licenseStatus')} />,
    },
    {
      accessorKey: 'companyName',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Company name
            <ChevronsUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue('companyName')}</div>,
    },
    {
      accessorKey: 'state',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            State
            <ChevronsUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue('state')}</div>,
    },
    {
      id: 'viewDetails',
      enableHiding: false,
      cell: ({ row }) => (
        <Button
          variant='outline'
          className='border-none bg-transparent font-medium text-[#0072B4]'
          onClick={() => onSelect(row.original.id)}
        >
          View details
        </Button>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => onAddNote(row.original.id)}>
                Add notes
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    columns,
    data: businesses,
    getCoreRowModel: getCoreRowModel(),
  });

  const tableHeader = (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );

  const tableBody = (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className='h-24 text-center'>
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );

  const filterFields = [
    {
      label: 'Industry',
      value: 'industry',
      hasSearch: true,
      options: ['Cannabis', 'Medical', 'Research'].map((v) => {
        return {
          label: v,
          value: v,
          withCount: false,
        };
      }),
    },
    {
      label: 'License Type',
      value: 'licenseType',
      hasSearch: false,
      options: ['Cultivator', 'Retailer', 'Product Manufacturer'].map((v) => {
        return {
          label: v,
          value: v,
          withCount: false,
        };
      }),
    },
    {
      label: 'License Status',
      value: 'licenseStatus',
      hasSearch: false,
      options: ['Active', 'Pending', 'Inactive'].map((v) => {
        return {
          label: v,
          value: v,
          withCount: false,
        };
      }),
    },
    {
      label: 'State',
      value: 'state',
      hasSearch: true,
      options: [
        'California',
        'Texas',
        'Washington',
        'Nevada',
        'Virginia',
        'Alaska',
        'Oregon',
      ].map((v) => {
        return {
          label: v,
          value: v,
          withCount: true,
        };
      }),
    },
  ];

  return (
    <>
      <div className='mb-5 mt-3 flex flex-wrap items-center justify-start'>
        <Input
          value={query.companyName}
          onChange={onCompanyNameChange}
          className='mr-2 mt-1 max-w-96 p-1'
          placeholder='Search by Company name'
        />
        <div className='relative mt-1'>
          <div
            className={cn(
              'mr-2 flex min-w-24 items-center justify-center rounded border border-dashed bg-white p-2',
              {
                //eslint-disable-next-line
                'border-error-base': Boolean(zipCodeError),
              },
            )}
          >
            <label
              htmlFor='zipCode'
              className='mr-1 cursor-pointer text-sm font-medium'
            >
              Zip Code
            </label>
            <span className='mr-1 text-gray-300'>|</span>
            <input
              id='zipCode'
              value={query.zipCode}
              onBlur={onZipCodeBlur}
              onChange={onZipCodeChange}
              className='w-16 rounded bg-gray-100 px-1'
            />
          </div>
          {zipCodeError ? (
            <small className='absolute text-center text-red-500'>
              {zipCodeError}
            </small>
          ) : null}
        </div>
        {filterFields.map(({ label, value, options, hasSearch }) => {
          table.getColumn(value);
          return (
            <div key={value} className='mr-2 mt-1'>
              <DataTableFacetedFilter
                title={label}
                options={options}
                hasSearch={hasSearch}
                column={table.getColumn(value)}
                onChange={setQueryObject}
              />
            </div>
          );
        })}
        <Button variant='outline' className='mt-1 border-dashed p-5'>
          Saved Searches
        </Button>
      </div>
      <div className='block overflow-x-scroll rounded-lg border'>
        <Table>
          {tableHeader}
          {tableBody}
        </Table>
      </div>
    </>
  );
}
