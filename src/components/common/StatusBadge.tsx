import { LicenseStatus } from '@/types/Business';

import { cn } from '@/lib/utils';

export const StatusBadge = ({ status }: { status: LicenseStatus }) => {
  return (
    <div
      className={cn('h-8 w-fit rounded-lg border px-3 py-1 font-semibold', {
        //eslint-disable-next-line
        'text-[#1D7C4D]': status === 'Active',
        //eslint-disable-next-line
        'text-[#FB5A46]': status === 'Pending',
        //eslint-disable-next-line
        'text-[#555F6D]': status === 'Inactive',
      })}
    >
      {status}
    </div>
  );
};
