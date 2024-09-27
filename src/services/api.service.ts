import { Http } from '@/lib/Http';

export const thiApi = new Http(process.env.NEXT_PUBLIC_THI_API as string);
export const nextApi = new Http('/api');

export const nextEndpoints = Object.freeze({
  getBusiness: '/client/business/search',
});
