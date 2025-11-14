// Configuración base de la API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Función helper para hacer peticiones
const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error en la petición:', error);
    throw error;
  }
};

export default fetchAPI;