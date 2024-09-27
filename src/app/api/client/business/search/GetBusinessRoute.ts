import { NextResponse } from 'next/server';

import mockBusinesses from '@/lib/mocks/mockBusinesses.json';

export async function GET() {
  //TODO pending to implement call to THI api
  return NextResponse.json(mockBusinesses);
}
