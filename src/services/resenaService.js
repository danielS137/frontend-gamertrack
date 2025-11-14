import fetchAPI from './api';

// Obtener todas las reseñas
export const obtenerResenas = async (juegoId = null) => {
  const query = juegoId ? `?juegoId=${juegoId}` : '';
  return await fetchAPI(`/resenas${query}`);
};

// Obtener una reseña por ID
export const obtenerResenaPorId = async (id) => {
  return await fetchAPI(`/resenas/${id}`);
};

// Crear una nueva reseña
export const crearResena = async (resena) => {
  return await fetchAPI('/resenas', {
    method: 'POST',
    body: JSON.stringify(resena),
  });
};

// Actualizar una reseña existente
export const actualizarResena = async (id, resena) => {
  return await fetchAPI(`/resenas/${id}`, {
    method: 'PUT',
    body: JSON.stringify(resena),
  });
};

// Eliminar una reseña
export const eliminarResena = async (id) => {
  return await fetchAPI(`/resenas/${id}`, {
    method: 'DELETE',
  });
};