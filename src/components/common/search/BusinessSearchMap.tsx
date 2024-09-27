'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';

import { nextApi, nextEndpoints } from '@/services/api.service';
import { Business } from '@/types/Business';
import { Marker } from '@vis.gl/react-google-maps';
import { ExpandIcon, ShrinkIcon, XIcon } from 'lucide-react';

import { GMap } from '@/components/common/GMap';
import { Input } from '@/components/ui/input';

import { useMediaQuery } from '@/hooks/useMediaQuery';

import { cn } from '@/lib/utils';

export function BusinessSearchMap() {
  const [searchValue, setSearchValue] = useState('');
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isMapFullScreen, setIsMapFullScreen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const onMapSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    nextApi
      .get<Business[]>({ url: nextEndpoints.getBusiness })
      .then(({ data }) => setBusinesses(data))
      .catch((error) => console.error(error));
  }, []);

  const onSearchClear = () => {
    setSearchValue('');
  };

  return (
    <div
      className={cn('relative h-[390px] w-full overflow-hidden rounded-xl', {
        //eslint-disable-next-line
        'absolute left-0 top-0 z-20 h-full': isMapFullScreen && !isDesktop,
      })}
    >
      <div
        className={cn(
          'absolute left-0 right-0 top-10 z-10 mx-auto w-8/12 origin-right md:w-6/12 lg:w-5/12',
          {
            //eslint-disable-next-line
            'bottom-24 top-auto': isMapFullScreen && !isDesktop,
          },
        )}
      >
        <Input
          value={searchValue}
          onChange={onMapSearch}
          placeholder='Enter Address'
          className='w-full'
        />
        <button className='absolute right-4 top-1/4' onClick={onSearchClear}>
          <XIcon className='w-4' />
        </button>
      </div>
      <button
        onClick={() => setIsMapFullScreen((current) => !current)}
        className='absolute bottom-10 right-10 z-10 flex h-12 w-12 items-center justify-center rounded-md bg-white p-2 md:hidden'
      >
        {isMapFullScreen ? <ShrinkIcon /> : <ExpandIcon />}
      </button>
      <GMap zoomControl={isDesktop}>
        {businesses.map(({ id, coordinates, companyName }) => (
          <Marker
            key={id}
            position={{ lat: coordinates.lat, lng: coordinates.lng }}
            clickable={true}
            title={companyName}
          />
        ))}
      </GMap>
    </div>
  );
}
