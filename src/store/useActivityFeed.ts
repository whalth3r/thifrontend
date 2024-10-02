import { Item } from '@/types/TActivityFeed';
import { create } from 'zustand';

interface ActivityStore {
  activities: Item[]; // Lista de actividades
  addActivity: (activity: Item) => void; // Añadir una nueva actividad
  updateActivity: (id: number, updatedActivity: Partial<Item>) => void; // Actualizar actividad existente
  removeActivity: (id: number) => void; // Eliminar actividad por id
}

const useActivityStore = create<ActivityStore>((set) => ({
  activities: [], // Inicialmente la lista está vacía

  addActivity: (activity) =>
    set((state) => ({
      activities: [...state.activities, activity], // Añadir actividad a la lista
    })),

  updateActivity: (id, updatedActivity) =>
    set((state) => ({
      activities: state.activities.map((activity) =>
        activity.id === id ? { ...activity, ...updatedActivity } : activity,
      ), // Actualiza la actividad según el id
    })),

  removeActivity: (id) =>
    set((state) => ({
      activities: state.activities.filter((activity) => activity.id !== id), // Elimina la actividad
    })),
}));

export default useActivityStore;
