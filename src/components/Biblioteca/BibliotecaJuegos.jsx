import React, { useState } from 'react';
import { GamepadIcon } from 'lucide-react';
import BarraHerramientas from './BarraHerramientas';
import TarjetaJuego from './TarjetaJuego';
import { aplicarFiltros } from '../../utils/filtros';
import { calcularPromedioPuntuacion } from '../../utils/estadisticas';

const BibliotecaJuegos = ({ juegos, resenas, onAgregarJuego, onEditarJuego, onEliminarJuego }) => {
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [ordenamiento, setOrdenamiento] = useState('nombre');

  const juegosFiltrados = aplicarFiltros(juegos, {
    estado: filtroEstado,
    busqueda,
    ordenamiento
  });

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este juego? Se eliminarán también todas sus reseñas.')) {
      await onEliminarJuego(id);
    }
  };

  return (
    <>
      <BarraHerramientas
        busqueda={busqueda}
        onBusquedaChange={setBusqueda}
        filtroEstado={filtroEstado}
        onFiltroChange={setFiltroEstado}
        ordenamiento={ordenamiento}
        onOrdenamientoChange={setOrdenamiento}
        onAgregarJuego={onAgregarJuego}
      />

      {juegosFiltrados.length === 0 ? (
        <div className="text-center py-20">
          <GamepadIcon size={80} className="text-white opacity-20 mx-auto mb-4" />
          <p className="text-white text-xl">
            {busqueda || filtroEstado !== 'Todos' 
              ? 'No se encontraron juegos con esos filtros' 
              : 'No hay juegos en tu biblioteca. ¡Agrega tu primer juego!'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {juegosFiltrados.map((juego) => {
            const resenasJuego = resenas.filter(r => r.juego === juego._id);
            const promedioPuntuacion = resenasJuego.length > 0
              ? resenasJuego.reduce((sum, r) => sum + r.puntuacion, 0) / resenasJuego.length
              : 0;

            return (
              <TarjetaJuego
                key={juego._id}
                juego={juego}
                promedioPuntuacion={promedioPuntuacion}
                cantidadResenas={resenasJuego.length}
                onEditar={onEditarJuego}
                onEliminar={handleEliminar}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default BibliotecaJuegos;