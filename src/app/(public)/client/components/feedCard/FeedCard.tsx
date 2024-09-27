import { Check, CircleDashed, RefreshCcw, UserPlus, X } from 'lucide-react';

export const FeedCard = () => {
  const data: Company[] = [
    {
      id: '1',
      status: 'approved',
      activity: 'Consulting',
      companyName: 'Tech Solutions',
      state: 'California',
      date: new Date('2023-05-01'),
      title: 'Approved Consulting Project in California',
    },
    {
      id: '2',
      status: 'pending',
      activity: 'Construction',
      companyName: 'BuildIt Inc.',
      state: 'Texas',
      date: new Date('2023-06-15'),
      title: 'Pending Construction Contract in Texas',
    },
    {
      id: '3',
      status: 'revoked',
      activity: 'Software Development',
      companyName: 'CodeCrafters',
      state: 'New York',
      date: new Date('2023-07-22'),
      title: 'Revoked Software Development License in New York',
    },
    {
      id: '4',
      status: 'renewed',
      activity: 'Marketing',
      companyName: 'AdVantage',
      state: 'Florida',
      date: new Date('2023-08-30'),
      title: 'Renewed Marketing License in Florida',
    },
    {
      id: '5',
      status: 'newCompany',
      activity: 'Financial Services',
      companyName: 'Money Matters',
      state: 'Illinois',
      date: new Date('2023-09-12'),
      title: 'New Financial Services Company in Illinois',
    },
    {
      id: '6',
      status: 'approved',
      activity: 'Healthcare',
      companyName: 'MediCare',
      state: 'Ohio',
      date: new Date('2023-03-10'),
      title: 'Approved Healthcare Service in Ohio',
    },
    {
      id: '7',
      status: 'pending',
      activity: 'Retail',
      companyName: 'ShopRight',
      state: 'Nevada',
      date: new Date('2023-04-22'),
      title: 'Pending Retail Operation in Nevada',
    },
    {
      id: '8',
      status: 'revoked',
      activity: 'Education',
      companyName: 'LearnWell',
      state: 'Arizona',
      date: new Date('2023-02-11'),
      title: 'Revoked Education Service License in Arizona',
    },
    {
      id: '9',
      status: 'renewed',
      activity: 'Logistics',
      companyName: 'FastShip',
      state: 'Washington',
      date: new Date('2023-01-19'),
      title: 'Renewed Logistics License in Washington',
    },
    {
      id: '10',
      status: 'newCompany',
      activity: 'Energy',
      companyName: 'Green Power',
      state: 'Colorado',
      date: new Date('2023-12-01'),
      title: 'New Energy Company in Colorado',
    },
  ];

  type Company = {
    id: string;
    status: 'approved' | 'renewed' | 'pending' | 'revoked' | 'newCompany';
    activity: string;
    companyName: string;
    state: string;
    date: Date;
    title: string;
  };

  const statusIcons: Record<Company['status'], JSX.Element> = {
    approved: <Check className='h-5 w-5 text-green-500 lg:h-auto lg:w-auto' />,
    renewed: (
      <RefreshCcw className='h-5 w-5 text-blue-500 lg:h-auto lg:w-auto' />
    ),
    pending: (
      <CircleDashed className='h-5 w-5 text-yellow-500 lg:h-auto lg:w-auto' />
    ),
    revoked: <X className='h-5 w-5 text-red-500' />,
    newCompany: (
      <UserPlus className='h-5 w-5 text-purple-500 lg:h-auto lg:w-auto' />
    ),
  };

  return (
    <div className='px-4'>
      {data.map((card, index) => (
        <div
          className='flex flex-col gap-3 border-b-2 border-dotted px-3 py-5 lg:flex-row lg:justify-between lg:gap-0'
          key={index}
        >
          <div className='flex flex-row items-center gap-2'>
            <a className='h-50 space-x-2 rounded-full bg-gray-100 p-1'>
              {statusIcons[card.status]}
            </a>
            <div>
              <p className='text-xs font-bold lg:text-base'>{card.title}</p>
              <p className='text-xs font-thin lg:text-sm'>consultor</p>
            </div>
          </div>
          <div className='flex w-full justify-between lg:w-6/12'>
            <div className='flex w-1/3 flex-col lg:w-1/6'>
              <p className='text-xs font-thin lg:text-base'>Company name</p>
              <p className='text-xs text-blue-400 lg:text-sm'>
                {card.companyName}
              </p>
            </div>
            <div className='flex w-1/3 flex-col items-end lg:w-1/6 lg:items-start'>
              <p className='text-xs font-thin lg:text-base'>State</p>
              <p className='text-xs lg:text-sm'>{card.state}</p>
            </div>
            <div className='flex w-1/3 flex-col items-end lg:w-1/6 lg:items-start'>
              <p className='text-xs font-thin lg:text-base'>Date</p>
              <p className='text-xs lg:text-sm'>
                {card.date.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
