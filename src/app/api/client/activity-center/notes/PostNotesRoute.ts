import { thiApi } from '@/services/api.service';
import { ApiResponse } from '@/types/ApiResponse';
import { SingleNote } from '@/types/TActivityCenter';

/* eslint-disable @typescript-eslint/naming-convention */
export async function POST(req: Request) {
  try {
    const { note, referenceId, referenceType } = await req.json();
    const newNote = {
      Content: note,
      Type: 'N',
      ReferenceId: referenceId,
      ReferenceType: referenceType,
      UserId: 11,
    };

    const { data } = await thiApi.post<ApiResponse<SingleNote>>({
      url: '/NotesAndReminders/create',
      body: newNote,
    });

    if (data.status) {
      return Response.json(data.data);
    } else {
      return Response.json({ message: data.message }, { status: 400 });
    }
  } catch (error) {
    console.error('Error creating notes:', error);
    // En caso de error, retornamos un error genérico
    return Response.json({ message: 'Error creating notes' }, { status: 500 });
  }
}
