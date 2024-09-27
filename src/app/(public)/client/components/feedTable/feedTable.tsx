import { Company, columns } from './Columns';
import { DataTable } from './DataTable';

async function getData(): Promise<Company[]> {
  return [
    {
      id: '1',
      status: 'approved',
      activity: 'Consulting',
      companyName: 'Tech Solutions',
      state: 'California',
      date: new Date('2023-05-01'),
    },
    {
      id: '2',
      status: 'pending',
      activity: 'Construction',
      companyName: 'BuildIt Inc.',
      state: 'Texas',
      date: new Date('2023-06-15'),
    },
    {
      id: '3',
      status: 'revoked',
      activity: 'Software Development',
      companyName: 'CodeCrafters',
      state: 'New York',
      date: new Date('2023-07-22'),
    },
    {
      id: '4',
      status: 'renewed',
      activity: 'Marketing',
      companyName: 'AdVantage',
      state: 'Florida',
      date: new Date('2023-08-30'),
    },
    {
      id: '5',
      status: 'newCompany',
      activity: 'Financial Services',
      companyName: 'Money Matters',
      state: 'Illinois',
      date: new Date('2023-09-12'),
    },
    {
      id: '6',
      status: 'approved',
      activity: 'Healthcare',
      companyName: 'MediCare',
      state: 'Ohio',
      date: new Date('2023-03-10'),
    },
    {
      id: '7',
      status: 'pending',
      activity: 'Retail',
      companyName: 'ShopRight',
      state: 'Nevada',
      date: new Date('2023-04-22'),
    },
    {
      id: '8',
      status: 'revoked',
      activity: 'Education',
      companyName: 'LearnWell',
      state: 'Arizona',
      date: new Date('2023-02-11'),
    },
    {
      id: '9',
      status: 'renewed',
      activity: 'Logistics',
      companyName: 'FastShip',
      state: 'Washington',
      date: new Date('2023-01-19'),
    },
    {
      id: '10',
      status: 'newCompany',
      activity: 'Energy',
      companyName: 'Green Power',
      state: 'Colorado',
      date: new Date('2023-12-01'),
    },
  ];
}

export default async function CompanyTable() {
  const data = await getData();

  return (
    <div className='container mx-auto py-10'>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
