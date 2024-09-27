'use client';

import { PasswordChanged } from '@/app/(auth)/components/forgotpassword/PasswordChanged';
import { ResetPassword } from '@/app/(auth)/components/forgotpassword/ResetPassword';
import { Stepper } from '@/app/(auth)/components/stepper/Stepper';

const Page = () => {
  const stepsId = [{ id: 'step1' }, { id: 'step2' }];
  const switchSteps = {
    step1: () => <ResetPassword />,
    step2: () => <PasswordChanged />,
  };
  return <Stepper stepsId={stepsId} swithcSteps={switchSteps} />;
};

export default Page;
