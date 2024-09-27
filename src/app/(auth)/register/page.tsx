'use client';

import { AuthForm } from '@/app/(auth)/components/AuthForm';
import { PasswordChanged } from '@/app/(auth)/components/forgotpassword/PasswordChanged';
import { ResetPassword } from '@/app/(auth)/components/forgotpassword/ResetPassword';
import { VerifyCode } from '@/app/(auth)/components/registry/VerifyCode';
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
        step1: () => <AuthForm currentForm='register' />,
        step2: () => <VerifyCode />,
        step3: () => <ResetPassword />,
        step4: () => <PasswordChanged />,
      }}
    />
  );
};

export default Page;
