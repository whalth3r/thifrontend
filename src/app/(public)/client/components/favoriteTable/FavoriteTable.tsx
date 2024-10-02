import { FavoriteInterface } from '@/types/TFavorite';

import { favorites } from '@/lib/mocks/favorite';

import { Columns } from './Columns';
import { DataTable } from './DataTable';

async function getData(): Promise<FavoriteInterface[]> {
  // Fetch data from your API here.
  return favorites;
}

export default async function FavoriteTable() {
  const data = await getData();

  return (
    <div className='container mx-auto py-10'>
      <DataTable columns={Columns} data={data} />
    </div>
  );
}
