import { ActivityFeed } from '@/types/TActivityFeed';

import { activityFeeds } from '@/lib/mocks/activity-feed';

import { columns } from './Columns';
import { DataTable } from './DataTable';

async function getData(): Promise<ActivityFeed[]> {
  return activityFeeds;
}

export default async function CompanyTable() {
  const data = await getData();

  return (
    <div className='container mx-auto'>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
