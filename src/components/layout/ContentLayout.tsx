import { Navbar } from './navbar/Navbar';

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} />
      <div className='w-full px-4 pb-8 pt-8 sm:px-8'>{children}</div>
    </div>
  );
}
