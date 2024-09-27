'use client';

import { PropsWithChildren } from 'react';

import {
  APIProvider,
  ControlPosition,
  Map,
  MapProps,
} from '@vis.gl/react-google-maps';

type GMapProps = PropsWithChildren<MapProps>;
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

export function GMap(props: GMapProps) {
  return (
    <APIProvider apiKey={apiKey}>
      <Map
        style={{ width: '100%', height: '100%' }}
        defaultCenter={{ lng: -118.2441536312924, lat: 34.05494010971823 }}
        defaultZoom={11}
        gestureHandling='cooperative'
        disableDefaultUI={true}
        zoomControl={true}
        zoomControlOptions={{
          position: ControlPosition.BLOCK_START_INLINE_START,
        }}
        styles={[
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'transit',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'road',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }],
          },
        ]}
        {...props}
      >
        {props.children}
      </Map>
    </APIProvider>
  );
}
