import ContentLayout from '@/components/layout/ContentLayout';

import SidebarProfile from './components/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ContentLayout title='Account'>
      <div className='flex h-screen w-full flex-col rounded-md bg-white'>
        <div className='hidden p-5 lg:flex lg:flex-col'>
          <h1 className='text-2xl font-bold'>Account</h1>
          <h6 className='text-base font-normal text-[#71717a]'>
            Manage your account settings, suscription and preferences.
          </h6>
        </div>
        <hr />
        <div className='relative flex w-full flex-col lg:flex lg:flex-row'>
          <div className='w-full lg:w-3/12'>
            <SidebarProfile />
          </div>
          {children}
        </div>
      </div>
    </ContentLayout>
  );
}
