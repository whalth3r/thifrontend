import { NextPage } from 'next';

import ContentLayout from '@/components/layout/ContentLayout';

import { ActivityCenterLayout } from '../components/ActivityCenterLayout';
import { SearchForm } from '../notification/components/SearchForm';
import { ReminderDetailCard } from './components/ReminderDetailCard';
import { RemindersList } from './components/RemindersList';
import { TabsReminders } from './components/TabsReminders';

interface Props {}

const ACRemindersPage: NextPage<Props> = ({}) => {
  return (
    <ContentLayout title='Reminders'>
      <ActivityCenterLayout
        controllers={<TabsReminders />}
        seachForm={<SearchForm />}
        listComponent={<RemindersList />}
        activeElement={<ReminderDetailCard />}
      />
    </ContentLayout>
  );
};

export default ACRemindersPage;
