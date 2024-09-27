import { NextPage } from 'next';

import ContentLayout from '@/components/layout/ContentLayout';

import { ActivityCenterLayout } from '../components/ActivityCenterLayout';
import { NotificationDetailCard } from './components/NotificationDetailCard';
import { NotificationsList } from './components/NotificationsList';
import { SearchForm } from './components/SearchForm';
import { TabsNotifications } from './components/TabsNotifications';

interface Props {}

const ACNotificationsPage: NextPage<Props> = ({}) => {
  return (
    <ContentLayout title='Notifications'>
      <ActivityCenterLayout
        controllers={<TabsNotifications />}
        seachForm={<SearchForm />}
        listComponent={<NotificationsList />}
        activeElement={<NotificationDetailCard />}
      />
    </ContentLayout>
  );
};

export default ACNotificationsPage;
