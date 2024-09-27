interface Props {
  controllers: React.ReactNode;
  seachForm: React.ReactNode;
  listComponent: React.ReactNode;
  activeElement: React.ReactNode;
}

export const ActivityCenterLayout = ({
  controllers,
  seachForm,
  activeElement,
  listComponent,
}: Props) => {
  return (
    <div className='grid grid-cols-5 p-4'>
      <div className='col-span-full lg:col-span-2 lg:border-r lg:pr-6'>
        <div className='flex justify-end'>{controllers}</div>
        <div className='mt-4 flex'>{seachForm}</div>
        {listComponent}
      </div>
      <div className='col-span-3 hidden pl-4 lg:block'>{activeElement}</div>
    </div>
  );
};
