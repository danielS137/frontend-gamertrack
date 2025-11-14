import fetchAPI from './api';

// Obtener todos los juegos
export const obtenerJuegos = async () => {
  return await fetchAPI('/juegos');
};

// Obtener un juego por ID
export const obtenerJuegoPorId = async (id) => {
  return await fetchAPI(`/juegos/${id}`);
};

// Crear un nuevo juego
export const crearJuego = async (juego) => {
  return await fetchAPI('/juegos', {
    method: 'POST',
    body: JSON.stringify(juego),
  });
};

// Actualizar un juego existente
export const actualizarJuego = async (id, juego) => {
  return await fetchAPI(`/juegos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(juego),
  });
};

// Eliminar un juego
export const eliminarJuego = async (id) => {
  return await fetchAPI(`/juegos/${id}`, {
    method: 'DELETE',
  });
};