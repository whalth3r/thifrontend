import { thiApi } from '@/services/api.service';
import { ApiResponse } from '@/types/ApiResponse';
import { NotesCompanyMember } from '@/types/TActivityCenter';
import { NextResponse } from 'next/server';

type NotesResponse = ApiResponse<NotesCompanyMember[]>;

export async function GET(): Promise<NextResponse> {
  try {
    const { data } = await thiApi.get<NotesResponse>({
      url: '/NotesAndReminders/get',
      params: {
        userId: 11,
        type: 'N',
      },
    });

    if (data.status) {
      return NextResponse.json(data.data);
    } else {
      return NextResponse.json({ message: data.message }, { status: 400 });
    }
  } catch (error) {
    console.error('Error fetching notes:', error);
    // En caso de error, retornamos un error genérico
    return NextResponse.json(
      { message: 'Error fetching notes' },
      { status: 500 },
    );
  }
}
