'use client';

import { defineStepper } from '@stepperize/react';

import { Button } from '@/components/ui/button';

interface StepperProps {
  stepsId: { id: string }[];
  swithcSteps: { [key: string]: () => JSX.Element };
}

export const Stepper: React.FC<StepperProps> = ({ stepsId, swithcSteps }) => {
  const { useStepper } = defineStepper(...stepsId);
  const stepper = useStepper();

  return (
    <div className='w-full'>
      {stepper.switch(swithcSteps)}

      {!stepper.isLast ? (
        <div className='mt-4 flex items-center gap-2'>
          <Button onClick={stepper.prev} disabled={stepper.isFirst}>
            Previous
          </Button>

          <Button onClick={stepper.next}>
            {stepper.when(
              'step4',
              () => 'Finish',
              () => 'Next',
            )}
          </Button>
        </div>
      ) : (
        <div className='flex items-center gap-2'>
          <Button onClick={stepper.reset}>Reset</Button>
        </div>
      )}
    </div>
  );
};
