'use client';

import { useCallback, useEffect, useState } from 'react';

import { nextApi } from '@/services/api.service';
import { Feed, Item } from '@/types/TActivityFeed';
import { useRouter, useSearchParams } from 'next/navigation';

import { Spinner } from '@/components/ui/spinner';

import { columns } from './Columns';
import { DataTable } from './DataTable';

export default function CompanyTable() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);

  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('pageSize')) || 5;

  const loadFeedFromApi = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await nextApi.get<Feed>({
        url: `/client?pageNumber=${page}&pageSize=${pageSize}`,
      });
      setItems(data.data.items);
      setTotalPages(Math.ceil(data.data.totalItems / pageSize));
      setTotalItems(data.data.totalItems);
    } catch (error) {
      console.error('Error fetching activity feed:', error);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => {
    loadFeedFromApi();
  }, [loadFeedFromApi]);

  const handlePageChange = (newPage: number) => {
    router.push(`?page=${newPage}&pageSize=${pageSize}`);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    router.push(`?page=1&pageSize=${newPageSize}`);
  };

  return (
    <div className='container mx-auto'>
      {isLoading ? (
        <div className='text-center'>
          <Spinner className='text-[#0072B4]'></Spinner>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={items}
          currentPage={page}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
}
