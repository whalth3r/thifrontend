// Tipo genérico para la respuesta del API
export interface ApiResponse<T> {
  status: boolean; // Puede ser 'true', 'false', etc.
  message: string; // Un mensaje explicativo sobre la respuesta
  data: T; // Tipo genérico para 'data', que se ajustará según el endpoint
}
