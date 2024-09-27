import { NextPage } from 'next';

import ContentLayout from '@/components/layout/ContentLayout';

import { ActivityCenterLayout } from '../components/ActivityCenterLayout';
import { ReminderDetailCard } from './components/ReminderDetailCard';
import { ReminderSearch } from './components/ReminderSearch';
import { RemindersList } from './components/RemindersList';
import { TabsReminders } from './components/TabsReminders';

interface Props {}

const ACRemindersPage: NextPage<Props> = ({}) => {
  return (
    <ContentLayout title='Reminders'>
      <ActivityCenterLayout
        controllers={<TabsReminders />}
        seachForm={<ReminderSearch />}
        listComponent={<RemindersList />}
        activeElement={<ReminderDetailCard />}
      />
    </ContentLayout>
  );
};

export default ACRemindersPage;
