import { useState, useEffect } from 'react';
import * as resenaService from '../services/resenaService';

export const useResenas = () => {
  const [resenas, setResenas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarResenas = async (juegoId = null) => {
    try {
      setLoading(true);
      const data = await resenaService.obtenerResenas(juegoId);
      setResenas(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar reseñas:', err);
    } finally {
      setLoading(false);
    }
  };

  const agregarResena = async (resena) => {
    try {
      await resenaService.crearResena(resena);
      await cargarResenas();
      return { success: true };
    } catch (err) {
      console.error('Error al agregar reseña:', err);
      return { success: false, error: err.message };
    }
  };

  const actualizarResena = async (id, resena) => {
    try {
      await resenaService.actualizarResena(id, resena);
      await cargarResenas();
      return { success: true };
    } catch (err) {
      console.error('Error al actualizar reseña:', err);
      return { success: false, error: err.message };
    }
  };

  const eliminarResena = async (id) => {
    try {
      await resenaService.eliminarResena(id);
      await cargarResenas();
      return { success: true };
    } catch (err) {
      console.error('Error al eliminar reseña:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    cargarResenas();
  }, []);

  return {
    resenas,
    loading,
    error,
    cargarResenas,
    agregarResena,
    actualizarResena,
    eliminarResena,
  };
};