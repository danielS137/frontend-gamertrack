import { useState, useEffect } from 'react';
import * as juegoService from '../services/juegoService';

export const useJuegos = () => {
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarJuegos = async () => {
    try {
      setLoading(true);
      const data = await juegoService.obtenerJuegos();
      setJuegos(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar juegos:', err);
    } finally {
      setLoading(false);
    }
  };

  const agregarJuego = async (juego) => {
    try {
      await juegoService.crearJuego(juego);
      await cargarJuegos();
      return { success: true };
    } catch (err) {
      console.error('Error al agregar juego:', err);
      return { success: false, error: err.message };
    }
  };

  const actualizarJuego = async (id, juego) => {
    try {
      await juegoService.actualizarJuego(id, juego);
      await cargarJuegos();
      return { success: true };
    } catch (err) {
      console.error('Error al actualizar juego:', err);
      return { success: false, error: err.message };
    }
  };

  const eliminarJuego = async (id) => {
    try {
      await juegoService.eliminarJuego(id);
      await cargarJuegos();
      return { success: true };
    } catch (err) {
      console.error('Error al eliminar juego:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    cargarJuegos();
  }, []);

  return {
    juegos,
    loading,
    error,
    cargarJuegos,
    agregarJuego,
    actualizarJuego,
    eliminarJuego,
  };
};