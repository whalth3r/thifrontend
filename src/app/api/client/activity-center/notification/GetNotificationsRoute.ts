import { notifications } from '@/lib/mocks/notifications-mocks';

export async function GET(): Promise<Response> {
  return new Promise((resolve) => {
    // Simular un retraso de 2 segundos
    setTimeout(() => {
      resolve(Response.json(notifications));
    }, 2000); // Retraso de 2 segundos
  });
}
