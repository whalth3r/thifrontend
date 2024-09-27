import { NextPage } from 'next';

import ContentLayout from '@/components/layout/ContentLayout';

interface Props {}

const EventsPage: NextPage<Props> = ({}) => {
  return (
    <ContentLayout title='Events'>
      <div>Events</div>
    </ContentLayout>
  );
};

export default EventsPage;
