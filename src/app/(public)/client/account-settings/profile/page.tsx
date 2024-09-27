import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className='absolute flex h-full w-full flex-col gap-4 bg-white p-4 lg:relative lg:z-0 lg:w-9/12'>
      <Link
        className='flex w-2/6 items-center justify-start gap-2 rounded-lg border border-gray-400 p-2 lg:hidden'
        href='/client/account-settings'
      >
        <ArrowLeft size={16} />
        Regresar
      </Link>
      Profile Content
    </div>
  );
}
