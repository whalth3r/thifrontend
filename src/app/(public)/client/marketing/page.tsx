import { NextPage } from 'next';

import ContentLayout from '@/components/layout/ContentLayout';

interface Props {}

const MarketingPage: NextPage<Props> = ({}) => {
  return (
    <ContentLayout title='Marketing'>
      <div>Marketing</div>
    </ContentLayout>
  );
};

export default MarketingPage;
