import { thiApi } from '@/services/api.service';
import { ApiResponse } from '@/types/ApiResponse';
import { SingleNote } from '@/types/TActivityCenter';

/* eslint-disable @typescript-eslint/naming-convention */
export async function POST(req: Request) {
  try {
    const { title, content, referenceId, referenceType, dueDate } =
      await req.json();
    const newReminder = {
      Title: title,
      Content: content,
      Type: 'R',
      ReferenceId: referenceId,
      ReferenceType: referenceType,
      DueDate: dueDate,
      ReminderStatus: 1,
      UserId: 11,
    };

    const { data } = await thiApi.post<ApiResponse<SingleNote>>({
      url: '/NotesAndReminders/create',
      body: newReminder,
    });

    if (data.status) {
      return Response.json(data.data);
    } else {
      return Response.json({ message: data.message }, { status: 400 });
    }
  } catch (error) {
    console.error('Error creating reminders:', error);
    // En caso de error, retornamos un error genérico
    return Response.json(
      { message: 'Error creating reminders' },
      { status: 500 },
    );
  }
}
