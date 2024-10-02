'use client';

import { CheckBoxForm } from '@/components/common/checkboxForm/checkBoxForm';

export const UserExpirienceForm = () => {
  const categoriesOptions = {
    option1: {
      categoryName: 'Licenses Types',
      items: [
        { id: 'Select all', label: 'Select all' },
        { id: 'Transportation', label: 'Transportation' },
        { id: 'Cultivation', label: 'Cultivation' },
        {
          id: 'Product manufacturer',
          label: 'Product manufacturer',
        },
        { id: 'Testing', label: 'Testing' },
        { id: 'Retails', label: 'Retails' },
        { id: 'Delivery', label: 'Delivery' },
        { id: 'Operators', label: 'Operators' },
      ],
    },
    option2: {
      categoryName: 'Ancillary Business Type',
      items: [
        { id: 'Transportation', label: 'Transportation' },
        { id: 'PPE', label: 'PPE' },
        { id: 'Media', label: 'Media' },
        { id: 'Security', label: 'Security' },
        { id: 'Lawyers', label: 'Lawyers' },
        { id: 'Equipments', label: 'Equipments' },
        { id: 'Manufacturers', label: 'Manufacturers' },
        { id: 'Genetics', label: 'Genetics' },
        { id: 'Select all', label: 'Select all' },
        { id: 'Points of sales', label: 'Points of sales' },
        { id: 'HR', label: 'HR' },
        { id: 'Nutrients', label: 'Nutrients' },
        { id: 'Pest Control', label: 'Pest Control' },
        { id: 'Consulting', label: 'Consulting' },
        { id: 'HVAC', label: 'HVAC' },
        { id: 'Lighting', label: 'Lighting' },
        { id: 'Technology', label: 'Technology' },
        { id: 'Packaging', label: 'Packaging' },
      ],
    },
  };
  return (
    <>
      <div className='mx-auto mb-4 flex w-full flex-col items-center gap-2'>
        <div className='w-full py-4'>
          <div className='w-full text-start text-sm font-medium leading-7 text-[#99A0AE]'>
            {4}/{4}
          </div>
          <h2 className='text-start text-2xl font-semibold leading-8 tracking-tighter'>
            Tailor your experience
          </h2>
          <p className='mt-7 w-full text-start text-lg font-normal leading-7'>
            To ensure we tailor your experience to your preferences and needs,
            we&apos;d love to learn more about you.
          </p>
        </div>
        <div className='w-full border border-dotted'></div>
      </div>
      <CheckBoxForm data={categoriesOptions} />
    </>
  );
};
