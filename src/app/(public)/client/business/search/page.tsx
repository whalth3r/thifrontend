import {
  BusinessSearchMap,
  BusinessSearchTable,
} from '@/components/common/search';
import ContentLayout from '@/components/layout/ContentLayout';

interface BusinessSearchPageProps {}

export default function BusinessSearchPage({}: BusinessSearchPageProps) {
  return (
    <ContentLayout title={'Search Companies'}>
      <div className='mb-2'>
        <h1 className='mb-2 text-2xl font-bold'>
          Search results nearby your location
        </h1>
        <h2 className='text-lg'>Kings st, Santa Cruz, CA 95060, EE. UU.</h2>
      </div>
      <BusinessSearchMap />
      <BusinessSearchTable />
    </ContentLayout>
  );
}
