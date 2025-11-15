import React, { useState } from 'react';
import { Plus, MessageSquare, Search } from 'lucide-react';
import Button from '../UI/Button';
import TarjetaResena from './TarjetaResena';

const ListaResenas = ({ resenas, juegos, onAgregarResena, onEliminarResena, onEditarResena }) => {
  const [busqueda, setBusqueda] = useState('');
  const [filtroJuego, setFiltroJuego] = useState('Todos');

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta reseña?')) {
      await onEliminarResena(id);
    }
  };

  // Filtrar reseñas
  const resenasFiltradas = resenas.filter(resena => {
    const juego = juegos.find(j => j._id === resena.juego);
    const nombreJuego = juego ? juego.nombre.toLowerCase() : '';
    const autor = (resena.autor || 'anónimo').toLowerCase();
    const texto = resena.texto.toLowerCase();
    const busquedaLower = busqueda.toLowerCase();

    const cumpleBusqueda = !busqueda || 
      nombreJuego.includes(busquedaLower) ||
      autor.includes(busquedaLower) ||
      texto.includes(busquedaLower);

    const cumpleFiltro = filtroJuego === 'Todos' || resena.juego === filtroJuego;

    return cumpleBusqueda && cumpleFiltro;
  });

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Reseñas ({resenas.length})</h2>
        <Button onClick={onAgregarResena} icon={<Plus size={20} />}>
          Escribir Reseña
        </Button>
      </div>

      {/* Barra de herramientas de búsqueda */}
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Buscador */}
          <div className="relative flex-1 min-w-[250px] max-w-md">
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white opacity-50" 
              size={20} 
            />
            <input
              type="text"
              placeholder="Buscar por juego, autor o contenido..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-50 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          {/* Filtro por juego */}
          <select
            value={filtroJuego}
            onChange={(e) => setFiltroJuego(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white text-purple-900 font-semibold border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%235b21b6' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              paddingRight: '2.5rem'
            }}
          >
            <option value="Todos">Todos los juegos</option>
            {juegos.map(juego => (
              <option key={juego._id} value={juego._id}>
                {juego.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {resenasFiltradas.length === 0 ? (
        <div className="text-center py-20">
          <MessageSquare size={80} className="text-white opacity-20 mx-auto mb-4" />
          <p className="text-white text-xl mb-4">
            {busqueda || filtroJuego !== 'Todos' 
              ? 'No se encontraron reseñas con esos filtros' 
              : 'No hay reseñas aún'}
          </p>
          {!busqueda && filtroJuego === 'Todos' && (
            <>
              <p className="text-purple-300 mb-6">¡Sé el primero en compartir tu opinión sobre tus juegos!</p>
              <Button onClick={onAgregarResena} icon={<Plus size={20} />}>
                Escribir Primera Reseña
              </Button>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {resenasFiltradas.map((resena) => {
            const juego = juegos.find(j => j._id === resena.juego);
            return (
              <TarjetaResena
                key={resena._id}
                resena={resena}
                juego={juego}
                onEliminar={handleEliminar}
                onEditar={onEditarResena}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default ListaResenas;