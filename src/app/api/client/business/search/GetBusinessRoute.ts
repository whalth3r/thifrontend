import mockBusinesses from '@/data/mockBusinesses.json';
import { NextResponse } from 'next/server';

export async function GET() {
  //TODO pending to implement call to THI api
  return NextResponse.json(mockBusinesses);
}
