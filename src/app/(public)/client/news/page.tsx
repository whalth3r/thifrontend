import { NextPage } from 'next';

import ContentLayout from '@/components/layout/ContentLayout';

interface Props {}

const NewsPage: NextPage<Props> = ({}) => {
  return (
    <ContentLayout title='News'>
      <div>News</div>
    </ContentLayout>
  );
};

export default NewsPage;
