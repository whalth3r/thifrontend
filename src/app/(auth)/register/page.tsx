'use client';

import { AuthForm } from '@/app/(auth)/components/AuthForm';
import { UserDataForm } from '@/app/(auth)/components/registry/UserDataForm';
import { VerifyCode } from '@/app/(auth)/components/registry/VerifyCode';
import { Stepper } from '@/app/(auth)/components/stepper/Stepper';

import { PhoneInputShadcnUiPhoneInput } from '@/components/common/shadcn_extentions/inputs/phone-input/index';

const Page = () => {
  const stepsId = [
    { id: 'step1' },
    { id: 'step2' },
    { id: 'step3' },
    { id: 'step4' },
  ];
  const swithcSteps = {
    step1: () => <AuthForm currentForm='register' />,
    step2: () => <VerifyCode />,
    step3: () => <UserDataForm />,
    step4: () => <PhoneInputShadcnUiPhoneInput />,
  };
  return <Stepper stepsId={stepsId} swithcSteps={swithcSteps} />;
};

export default Page;
