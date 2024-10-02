/* eslint-disable @typescript-eslint/naming-convention */
import { thiApi } from '@/services/api.service';
import { ApiResponse } from '@/types/ApiResponse';

export async function PUT(req: Request) {
  try {
    const { id, comment } = await req.json();
    const { data } = await thiApi.put<ApiResponse<null>>({
      url: '/NotesAndReminders/comment',
      body: {
        Id: id,
        Comment: comment,
      },
    });

    if (data.status) {
      return Response.json({ data });
    } else {
      return Response.json({ message: data.message }, { status: 400 });
    }
  } catch (error) {
    console.error('Error updatig reminders:', error);
    // En caso de error, retornamos un error genérico
    return Response.json(
      { message: 'Error updatig reminders' },
      { status: 500 },
    );
  }
}
