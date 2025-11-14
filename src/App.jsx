import React, { useState } from 'react';
import Header from './components/Layout/Header';
import BibliotecaJuegos from './components/Biblioteca/BibliotecaJuegos';
import ListaResenas from './components/Resenas/ListaResenas';
import EstadisticasPersonales from './components/Estadisticas/EstadisticasPersonales';
import FormularioJuego from './components/Formularios/FormularioJuego';
import FormularioResena from './components/Formularios/FormularioResena';
import { useJuegos } from './hooks/useJuegos';
import { useResenas } from './hooks/useResenas';

function App() {
  const [vista, setVista] = useState('biblioteca');
  const [modalJuego, setModalJuego] = useState(false);
  const [modalResena, setModalResena] = useState(false);
  const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);

  // Custom Hooks
  const { 
    juegos, 
    loading: loadingJuegos, 
    agregarJuego, 
    actualizarJuego, 
    eliminarJuego 
  } = useJuegos();

  const { 
    resenas, 
    loading: loadingResenas, 
    agregarResena, 
    eliminarResena 
  } = useResenas();

  // Handlers para Juegos
  const handleAbrirModalNuevo = () => {
    setJuegoSeleccionado(null);
    setModalJuego(true);
  };

  const handleAbrirModalEditar = (juego) => {
    setJuegoSeleccionado(juego);
    setModalJuego(true);
  };

  const handleGuardarJuego = async (juego) => {
    if (juegoSeleccionado) {
      await actualizarJuego(juegoSeleccionado._id, juego);
    } else {
      await agregarJuego(juego);
    }
  };

  // Handlers para Reseñas
  const handleAbrirModalResena = () => {
    setModalResena(true);
  };

  const handleGuardarResena = async (resena) => {
    await agregarResena(resena);
  };

  // Loading state
  if (loadingJuegos || loadingResenas) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-2xl">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header vistaActual={vista} onCambiarVista={setVista} />

      <main className="container mx-auto px-4 py-8">
        {vista === 'biblioteca' && (
          <BibliotecaJuegos
            juegos={juegos}
            resenas={resenas}
            onAgregarJuego={handleAbrirModalNuevo}
            onEditarJuego={handleAbrirModalEditar}
            onEliminarJuego={eliminarJuego}
          />
        )}

        {vista === 'resenas' && (
          <ListaResenas
            resenas={resenas}
            juegos={juegos}
            onAgregarResena={handleAbrirModalResena}
            onEliminarResena={eliminarResena}
          />
        )}

        {vista === 'estadisticas' && (
          <EstadisticasPersonales juegos={juegos} />
        )}
      </main>

      {/* Modales */}
      <FormularioJuego
        isOpen={modalJuego}
        onClose={() => setModalJuego(false)}
        juego={juegoSeleccionado}
        onGuardar={handleGuardarJuego}
      />

      <FormularioResena
        isOpen={modalResena}
        onClose={() => setModalResena(false)}
        juegos={juegos}
        onGuardar={handleGuardarResena}
      />
    </div>
  );
}

export default App;