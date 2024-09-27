import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { format } from 'date-fns';

interface CardACRootProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const CardACRoot = ({ children, className, ...rest }: CardACRootProps) => {
  return (
    <div
      {...rest}
      className={`flex w-full flex-col gap-4 rounded-xl border border-input p-4 shadow ${className}`}
    >
      {children}
    </div>
  );
};

interface CardACHeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  date: string;
}

const CardACHeader = ({
  children,
  className,
  date,
  ...rest
}: CardACHeaderProps) => {
  return (
    <div className={`flex justify-between ${className}`} {...rest}>
      <div className='flex gap-2'>{children}</div>
      <p className='text-xs font-normal text-muted-foreground'>
        {format(date, 'MM/dd/yyyy, HH:mm aaaa')}
      </p>
    </div>
  );
};

const CardACDescription = ({ description }: { description: string }) => {
  return (
    <p className='line-clamp-3 text-sm font-medium text-muted-foreground'>
      {description}
    </p>
  );
};

export { CardACRoot, CardACHeader, CardACDescription };
