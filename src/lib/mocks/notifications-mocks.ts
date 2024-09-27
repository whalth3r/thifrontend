import { Notification } from '@/types/TActivityCenter';

export const notifications: Notification[] = [
  {
    title: 'Nuevo comentario en tu post',
    description:
      'Alguien ha comentado en tu publicación. Alguien ha comentado en tu publicación. Alguien ha comentado en tu publicación. Alguien ha comentado en tu publicación. Alguien ha comentado en tu publicación.',
    state: 'Unreaded',
    date: '2024-09-17T10:30:00Z',
  },
  {
    title: 'Actualización del sistema',
    description: 'El sistema se actualizará esta noche.',
    state: 'Readed',
    date: '2024-09-15T08:00:00Z',
  },
  {
    title: 'Evento cercano',
    description: 'Recuerda que tienes un evento mañana.',
    state: 'Unreaded',
    date: '2024-09-16T09:00:00Z',
  },
  {
    title: 'Nueva conexión',
    description: 'Un nuevo usuario ha comenzado a seguirte.',
    state: 'Readed',
    date: '2024-09-14T12:15:00Z',
  },
  {
    title: 'Mensaje privado',
    description: 'Has recibido un nuevo mensaje privado.',
    state: 'Unreaded',
    date: '2024-09-17T11:00:00Z',
  },
];
