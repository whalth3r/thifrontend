import { cn } from '@/lib/utils';

interface Props {
  controllers: React.ReactNode;
  seachForm: React.ReactNode;
  listComponent: React.ReactNode;
  activeElement: React.ReactNode;
  activeElementClass?: string;
}

export const ActivityCenterLayout = ({
  controllers,
  seachForm,
  activeElement,
  listComponent,
  activeElementClass,
}: Props) => {
  return (
    <div className='grid grid-cols-5 p-4'>
      <div className='col-span-full lg:col-span-2 lg:border-r lg:pr-6'>
        <div className='flex justify-end'>{controllers}</div>
        <div className='mt-4 flex'>{seachForm}</div>
        {listComponent}
      </div>
      <div
        className={cn('col-span-3 hidden pl-4 lg:block', activeElementClass)}
      >
        {activeElement}
      </div>
    </div>
  );
};
