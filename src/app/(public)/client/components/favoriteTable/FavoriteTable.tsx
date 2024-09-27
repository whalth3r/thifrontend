import { Columns, Favorite } from './Columns';
import { DataTable } from './DataTable';

async function getData(): Promise<Favorite[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      title: 'HighCompany',
      details: null,
      removeFromFavorites: false,
    },
    {
      id: 2,
      title: 'HighBussines',
      details: null,
      removeFromFavorites: false,
    },
    {
      id: 3,
      title: 'HighElement',
      details: null,
      removeFromFavorites: false,
    },
    {
      id: 4,
      title: 'HighLocal',
      details: null,
      removeFromFavorites: false,
    },
    {
      id: 5,
      title: 'HighCorp',
      details: null,
      removeFromFavorites: false,
    },
    {
      id: 6,
      title: 'HighEnterprise',
      details: null,
      removeFromFavorites: false,
    },
    {
      id: 7,
      title: 'HighEnterprise',
      details: null,
      removeFromFavorites: false,
    },
    {
      id: 8,
      title: 'HighEnterprise',
      details: null,
      removeFromFavorites: false,
    },
    {
      id: 9,
      title: 'HighEnterprise',
      details: null,
      removeFromFavorites: false,
    },
    {
      id: 10,
      title: 'HighEnterprise',
      details: null,
      removeFromFavorites: false,
    },

    // ...
  ];
}

export default async function FavoriteTable() {
  const data = await getData();

  return (
    <div className='container mx-auto py-10'>
      <DataTable columns={Columns} data={data} />
    </div>
  );
}
