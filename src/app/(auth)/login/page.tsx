import { AuthForm } from '@/app/(auth)/components/AuthForm';
import { NextPage } from 'next';

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return <AuthForm currentForm='login' />;
};

export default Page;
