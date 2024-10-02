import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { CheckBoxForm } from '@/components/common/checkboxForm/checkBoxForm';
import { Button } from '@/components/ui/button';

export default function PreferencesPage() {
  const initialData = {
    // licensesTypes: {
    //   transportation: { checked: false, label: 'Transportation' },
    //   cultivation: { checked: false, label: 'Cultivation' },
    //   testing: { checked: false, label: 'Testing' },
    //   productManufacturer: { checked: false, label: 'Product Manufacturer' },
    //   retails: { checked: false, label: 'Retails' },
    //   delivery: { checked: false, label: 'Delivery' },
    //   testing2: { checked: false, label: 'Testing' },
    //   operators: { checked: false, label: 'Operators' },
    // },
    // ancillaryBusinessType: {
    //   pointsOfSales: { checked: false, label: 'Points of Sales' },
    //   hR: { checked: false, label: 'HR' },
    //   nutrients: { checked: false, label: 'Nutrients' },
    //   pestControl: { checked: false, label: 'Pest Control' },
    //   consulting: { checked: false, label: 'Consulting' },
    //   hVAC: { checked: false, label: 'HVAC' },
    //   lightning: { checked: false, label: 'Lightning' },
    //   technology: { checked: false, label: 'Technology' },
    //   packaging: { checked: false, label: 'Packaging' },
    //   transportation: { checked: false, label: 'Transportation' },
    //   pPE: { checked: false, label: 'PPE' },
    //   media: { checked: false, label: 'Media' },
    //   security: { checked: false, label: 'Security' },
    //   lawyers: { checked: false, label: 'Lawyers' },
    //   equipments: { checked: false, label: 'Equipments' },
    //   manufacturers: { checked: false, label: 'Manufacturers' },
    //   genetics: { checked: false, label: 'Genetics' },
    // },
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
    <div className='absolute flex h-full w-full flex-col gap-4 bg-white p-4 lg:relative lg:z-0 lg:w-9/12'>
      <Link
        className='flex w-2/6 items-center justify-start gap-2 rounded-lg border border-gray-400 p-2 lg:hidden'
        href='/client/account-settings'
      >
        <ArrowLeft size={16} />
        Regresar
      </Link>
      <div>
        <h3 className='text-lg font-medium'>Preferences</h3>
      </div>
      <hr />
      <div>
        <CheckBoxForm data={initialData} />
      </div>
      <div className='flex justify-end gap-2'>
        <Button className='border bg-white text-black'>cancel</Button>
        <Button className='bg-[#0172B2]'>Update Preferences</Button>
      </div>
    </div>
  );
}
