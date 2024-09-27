'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';

import { Business } from '@/types/Business';
import { nextApi, nextEndpoints } from '@/utils/apiService';
import { Marker } from '@vis.gl/react-google-maps';
import { XIcon } from 'lucide-react';

import { GMap } from '@/components/common/GMap';
import { Input } from '@/components/ui/input';

export function BusinessSearchMap() {
  const [searchValue, setSearchValue] = useState('');
  const [businesses, setBusinesses] = useState<Business[]>([]);
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
    <div className='relative h-[390px] w-full overflow-hidden rounded-xl'>
      <div className='absolute left-1/4 right-1/4 top-6 z-10 w-5/12'>
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
      <GMap>
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
