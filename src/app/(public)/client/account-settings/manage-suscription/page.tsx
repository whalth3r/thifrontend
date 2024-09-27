import { Wallet } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function SuscriptionPage() {
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
        <h3 className='text-lg font-medium'>Manage Subscription</h3>
      </div>
      <hr />
      <div className='flex flex-col gap-7 rounded-lg border p-4'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-lg font-medium'>Annual Subscription</p>
            <p className='text-[#555F6D]'>$189.99/month</p>
          </div>
          <div>
            <span className='rounded-md border border-[#555F6D] px-2 text-[#1D7C4D]'>
              {' '}
              Active
            </span>
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <Button className='w-6/6 flex gap-2 border border-[#555F6D] bg-white text-[#555F6D] hover:bg-white lg:w-2/6'>
            <Wallet size={16} /> Manage my suscription
          </Button>
          <p className='text-[#555F6D]'>Started on: July 30, 2024</p>
          <p className='text-[#555F6D]'>Valid until: July 30, 2025</p>
        </div>
        <div>
          <p className='text-blue-500'>Need help with my billing account</p>
        </div>
      </div>
    </div>
  );
}
