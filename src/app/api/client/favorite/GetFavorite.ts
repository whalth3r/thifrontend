import { thiApi } from '@/services/api.service';
import { Feed } from '@/types/TActivityFeed';
import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get('pageNumber') || '1';

  try {
    const { data } = await thiApi.get<Feed>({
      url: `FavoriteCompanies/get-fav-company?userId=${id}`,
    });

    if (data.status) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ message: 'bad connection' }, { status: 400 });
    }
  } catch (error) {
    console.error('error fetching feed:', error);
    return NextResponse.json(
      { message: 'error fetching feed' },
      { status: 500 },
    );
  }
}
