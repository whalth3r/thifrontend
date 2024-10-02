import { thiApi } from '@/services/api.service';
import { ApiResponse } from '@/types/ApiResponse';
import { Reminders } from '@/types/TActivityCenter';

import { reminders } from '@/lib/mocks/reminders-mocks';

type RemindersResponse = ApiResponse<Reminders[]>;

export async function GET(): Promise<Response> {
  try {
    const { data } = await thiApi.get<RemindersResponse>({
      url: '/NotesAndReminders/get',
      params: {
        userId: 11,
        type: 'R',
      },
    });

    if (data.status) {
      // return Response.json(data.data);
      return Response.json(reminders);
    } else {
      return Response.json({ message: data.message }, { status: 400 });
    }
  } catch (error) {
    console.error('Error fetching reminders:', error);
    // En caso de error, retornamos un error genérico
    return Response.json(
      { message: 'Error fetching reminders' },
      { status: 500 },
    );
  }
}
