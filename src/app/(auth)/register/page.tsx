'use client';

import { AuthForm } from '@/app/(auth)/components/AuthForm';
import { Congratulations } from '@/app/(auth)/components/registry/Congratulations';
import { UserDataForm } from '@/app/(auth)/components/registry/UserDataForm';
import { UserExpirienceForm } from '@/app/(auth)/components/registry/UserExpirienceForm';
import { VerifyCode } from '@/app/(auth)/components/registry/VerifyCode';
import { Stepper } from '@/app/(auth)/components/stepper/Stepper';

const Page = () => {
  const stepsId = [
    { id: 'step1' },
    { id: 'step2' },
    { id: 'step3' },
    { id: 'step4' },
    { id: 'step5' },
  ];
  const swithcSteps = {
    step1: () => <AuthForm currentForm='register' />,
    step2: () => <VerifyCode />,
    step3: () => <UserDataForm />,
    step4: () => <Congratulations />,
    step5: () => <UserExpirienceForm />,
  };
  return <Stepper stepsId={stepsId} swithcSteps={swithcSteps} />;
};

export default Page;
