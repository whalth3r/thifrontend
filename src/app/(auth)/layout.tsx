import { RedirectButton } from '@/app/(auth)/components/RedirectButton';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='max-w-screen flex h-screen w-full flex-row justify-between overflow-hidden'>
      <section className='relative hidden min-h-full w-2/4 lg:block'>
        <Image
          className='-z-10 object-cover'
          src='/images/auth/auth_logo_xl.png'
          priority
          fill
          sizes='auto'
          alt='bg_section'
        />
        <div className='flex h-full flex-col items-start justify-center gap-8 px-8 py-8 2xl:px-36'>
          <figure className='relative aspect-square h-[48px] w-[351px]'>
            <Image
              src={'/images/auth/thi_main_logo.png'}
              priority
              fill
              style={{ objectFit: 'contain' }}
              sizes='auto'
              alt='logo'
            />
          </figure>
          <div className='flex flex-col justify-center gap-1'>
            <h1 className='font-hind w-full text-start text-lg font-medium leading-7 text-[#0073B2]'>
              The Entire Cannabis Industry In ONE Platform
            </h1>
            <h2 className='text-sm font-normal leading-5 text-[#929292]'>
              Discover. Partner. Grow.
            </h2>
          </div>
        </div>
      </section>
      <section className='relative flex w-full flex-col items-center justify-center px-2 py-16 min-[1157px]:w-2/4'>
        <RedirectButton />
        <div className='custom-scrollbar w-full max-w-lg overflow-y-auto overflow-x-hidden px-4 md:px-8 lg:max-w-[34rem]'>
          {children}
        </div>
      </section>
    </main>
  );
}
