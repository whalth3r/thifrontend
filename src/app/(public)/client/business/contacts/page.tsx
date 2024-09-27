import { NextPage } from 'next';

import ContentLayout from '@/components/layout/ContentLayout';

interface Props {}

const BusinessContactsPage: NextPage<Props> = ({}) => {
  return (
    <ContentLayout title='Search Contacts'>
      <div>Business Contacts</div>
    </ContentLayout>
  );
};

export default BusinessContactsPage;
