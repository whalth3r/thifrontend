import { NextPage } from 'next';

import ContentLayout from '@/components/layout/ContentLayout';

interface Props {}

const BusinessCompaniesPage: NextPage<Props> = ({}) => {
  return (
    <ContentLayout title='Search Ancillaries Companies'>
      <div>Business Ancillaries Companies</div>
    </ContentLayout>
  );
};

export default BusinessCompaniesPage;
