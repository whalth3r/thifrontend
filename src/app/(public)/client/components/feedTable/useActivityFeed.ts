import { useEffect, useState } from 'react';

import { Feed } from '@/types/TActivityFeed';

// Asegúrate de que esta es la interfaz correcta

export function useActivityFeed(pageNumber: number, pageSize: number) {
  const [feedData, setFeedData] = useState<Feed | null>(null); // Estado para los datos
  const [isLoading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error

  useEffect(() => {
    const fetchFeedData = async () => {
      try {
        // Realiza la llamada a la API con los parámetros de paginación
        const response = await fetch(
          `/activityfeed?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        );
        const data = await response.json();

        // Verifica si la respuesta es exitosa
        if (response.ok) {
          setFeedData(data); // Almacena los datos en el estado
        } else {
          setError(data.message || 'Error fetching feed'); // Maneja el error
        }
      } catch (err) {
        setError('Error fetching feed'); // Maneja el error en caso de excepción
        console.error(err);
      } finally {
        setLoading(false); // Indica que la carga ha terminado
      }
    };

    fetchFeedData(); // Llama a la función para obtener los datos
  }, [pageNumber, pageSize]); // Dependencias del useEffect

  return { feedData, isLoading, error }; // Devuelve los estados
}
