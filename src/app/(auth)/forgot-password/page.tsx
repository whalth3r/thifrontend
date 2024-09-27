'use client';

import { ForgotPassword } from '@/app/(auth)/components/forgotpassword/ForgotPassword';
import { PasswordChanged } from '@/app/(auth)/components/forgotpassword/PasswordChanged';
import { ResetPassword } from '@/app/(auth)/components/forgotpassword/ResetPassword';
import { VerifyCode } from '@/app/(auth)/components/forgotpassword/VerifyCode';
import { Stepper } from '@/app/(auth)/components/stepper/Stepper';

const Page = () => {
  const stepsId = [
    { id: 'step1' },
    { id: 'step2' },
    { id: 'step3' },
    { id: 'step4' },
  ];
  return (
    <Stepper
      stepsId={stepsId}
      swithcSteps={{
        step1: () => <ForgotPassword />,
        step2: () => <VerifyCode />,
        step3: () => <ResetPassword />,
        step4: () => <PasswordChanged />,
      }}
    />
  );
};

export default Page;
