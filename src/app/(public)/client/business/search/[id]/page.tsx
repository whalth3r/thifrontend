import { FilePlus, FlagIcon } from 'lucide-react';

import { GMap } from '@/components/common/GMap';
import { StatusBadge } from '@/components/common/StatusBadge';
import { BusinessDetailsTabs } from '@/components/common/search/BusinessDetailsTabs';
import ContentLayout from '@/components/layout/ContentLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface SelectedCompayProps {
  params: { id: string };
}

export default function SelectedCompay({ params }: SelectedCompayProps) {
  const infoCard = (
    <div className='w-full md:w-6/12'>
      <Card className='mb-3 p-4 md:mb-0 md:mr-3'>
        <div className='mb-6 flex justify-between'>
          <div>
            <span className='block font-semibold leading-6'>
              Green Leaf Growers, LLC. {params.id}
            </span>
            <span className='block text-sm font-medium text-secondary-foreground'>
              Cultivator
            </span>
          </div>
          <StatusBadge status='Active' />
        </div>

        <div>
          <div>
            <div className='mb-4'>
              <span className='block text-xs font-normal leading-3'>
                Address:
              </span>
              <span className='block font-medium leading-7'>
                King st, Santa Cruz, CA 95060, United States
              </span>
            </div>
            <div className='mb-4'>
              <span className='block text-xs font-normal leading-3'>
                Phone number:
              </span>
              <span className='block font-medium leading-7'>
                {'(804) 951-239-0523'}
              </span>
            </div>
          </div>
        </div>

        <div className='mt-6 flex items-center justify-between px-2'>
          <button className='flex items-center justify-center text-info-base'>
            <FlagIcon className='mr-2 h-4 w-5' /> Report
          </button>
          <Button
            variant='outline'
            className='flex items-center justify-center'
          >
            <FilePlus className='mr-2 h-4 w-5' />
            Add Note
          </Button>
        </div>
      </Card>
    </div>
  );

  const map = (
    <div className='h-64 w-full md:w-6/12'>
      <div className='mt-3 h-full w-full overflow-hidden rounded-xl border md:ml-3 md:mt-0'>
        <GMap />
      </div>
    </div>
  );

  return (
    <ContentLayout title={'Search Companies'}>
      <div className='md:flex'>
        {infoCard}
        {map}
      </div>
      <BusinessDetailsTabs />
    </ContentLayout>
  );
}
