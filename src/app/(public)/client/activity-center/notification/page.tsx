import { NextPage } from 'next';

import ContentLayout from '@/components/layout/ContentLayout';

import { ActivityCenterLayout } from '../components/ActivityCenterLayout';
import { NotificationDetailCard } from './components/NotificationDetailCard';
import { NotificationSearch } from './components/NotificationSearch';
import { NotificationsList } from './components/NotificationsList';
import { TabsNotifications } from './components/TabsNotifications';

interface Props {}

const ACNotificationsPage: NextPage<Props> = ({}) => {
  return (
    <ContentLayout title='Notifications'>
      <ActivityCenterLayout
        controllers={<TabsNotifications />}
        seachForm={<NotificationSearch />}
        listComponent={<NotificationsList />}
        activeElement={<NotificationDetailCard />}
      />
    </ContentLayout>
  );
};

export default ACNotificationsPage;
