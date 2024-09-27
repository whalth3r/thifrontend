'use client';

import { ReactElement, useEffect, useState } from 'react';

import { InfoIcon, MailIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { companyInfo } from '@/lib/mocks/companyInfo';
import { cn } from '@/lib/utils';

type InfoRow = {
  label: string;
  className?: string;
  value: string | ReactElement;
};

export function BusinessDetailsTabs() {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [selectedTab, setSelectedTab] = useState(
    searchParams.get('tab') || 'companyInformation',
  );

  useEffect(() => {
    push('?tab=' + selectedTab);
  }, [selectedTab, push]);

  const infoElement = ({ label, value, className }: InfoRow) => (
    <div className='mb-2 flex flex-col'>
      <span className='text-xs font-medium leading-5 text-content-secondary'>
        {label}
      </span>
      <span
        className={cn('font-medium leading-7 text-content-primary', className)}
      >
        {value}
      </span>
    </div>
  );

  const infoColA: InfoRow[] = [
    {
      label: 'Updated:',
      value: (
        <span className='flex items-center'>
          {companyInfo.updated}
          <InfoIcon className='ml-1 fill-info-base stroke-white' />
        </span>
      ),
    },
    {
      label: 'State license:',
      value: companyInfo.stateLicense,
    },
    {
      label: 'Activity:',
      value: companyInfo.activity,
    },
    {
      label: 'Market:',
      value: companyInfo.market,
    },
    {
      label: 'License Status::',
      value: companyInfo.licenseStatus,
    },
    {
      label: 'Original issue date:',
      value: companyInfo.originalIssueDate,
    },
    {
      label: 'Issue date:',
      value: companyInfo.issueDate,
    },
    {
      label: 'Expiration date:',
      value: companyInfo.expirationDate,
    },
    {
      label: 'Issued by:',
      value: companyInfo.issuedBy,
      className: 'text-[#347C29]',
    },
  ];

  const infoColB: InfoRow[] = [
    {
      label: 'Email:',
      value: (
        <span>
          <a
            href={`mailto:${companyInfo.email}`}
            type='email'
            className='flex items-center'
          >
            <MailIcon className='mr-2 stroke-info-base' /> Send Email
          </a>
        </span>
      ),
      className: 'text-info-base',
    },
    { label: 'Address:', value: companyInfo.address },
    { label: 'Mailing address:', value: companyInfo.mailingAddress },
    { label: 'Phone:', value: companyInfo.phone },
    { label: 'Website:', value: companyInfo.website },
    { label: 'Owner:', value: companyInfo.owner },
    { label: 'Employees:', value: `${companyInfo.employees}` },
    {
      label: 'License:',
      value: companyInfo.licenseType,
      className: 'text-[#347C29]',
    },
  ];

  const companyInformationContent = (
    <div className='flex flex-col items-center md:flex-row'>
      <div className='mb-6 w-full md:mb-0 md:w-6/12'>
        {infoColA.map(infoElement)}
      </div>
      <div className='w-full md:w-6/12'>{infoColB.map(infoElement)}</div>
    </div>
  );

  return (
    <Tabs
      defaultValue='companyInformation'
      className='mt-6 flex w-full flex-col justify-center'
      value={selectedTab}
    >
      <TabsList className='mx-auto mb-4 rounded-xl p-8'>
        <TabsTrigger
          className='mx-4 rounded-xl bg-transparent p-4'
          value='companyInformation'
          onClick={() => setSelectedTab('companyInformation')}
        >
          Company information
        </TabsTrigger>
        <TabsTrigger
          className='mx-4 rounded-xl bg-transparent p-4'
          value='contacts'
          onClick={() => setSelectedTab('contacts')}
        >
          Contacts
        </TabsTrigger>
        <TabsTrigger
          className='mx-4 rounded-xl bg-transparent p-4'
          value='notes'
          onClick={() => setSelectedTab('notes')}
        >
          Notes
        </TabsTrigger>
        <TabsTrigger
          className='mx-4 rounded-xl bg-transparent p-4'
          value='affiliatedLicenses'
          onClick={() => setSelectedTab('affiliatedLicenses')}
        >
          Affiliated licenses
        </TabsTrigger>
      </TabsList>
      <Card className='min-h-96 w-full p-4'>
        <TabsContent value='companyInformation'>
          {companyInformationContent}
        </TabsContent>
        <TabsContent value='contacts'>Contacts</TabsContent>
        <TabsContent value='notes'>Notes</TabsContent>
        <TabsContent value='affiliatedLicenses'>
          Affiliated licenses
        </TabsContent>
      </Card>
    </Tabs>
  );
}
