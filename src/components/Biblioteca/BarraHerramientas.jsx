import React from 'react';
import { Search, Plus } from 'lucide-react';
import Button from '../UI/Button';

const BarraHerramientas = ({ 
  busqueda, 
  onBusquedaChange, 
  filtroEstado, 
  onFiltroChange,
  ordenamiento,
  onOrdenamientoChange,
  onAgregarJuego 
}) => {
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 mb-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4 items-center flex-1 flex-wrap">
          {/* Buscador */}
          <div className="relative flex-1 min-w-[250px] max-w-md">
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white opacity-50" 
              size={20} 
            />
            <input
              type="text"
              placeholder="Buscar juegos..."
              value={busqueda}
              onChange={(e) => onBusquedaChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-50 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          {/* Filtro de Estado */}
          <select
            value={filtroEstado}
            onChange={(e) => onFiltroChange(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="Todos">Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Jugando">Jugando</option>
            <option value="Completado">Completado</option>
          </select>

          {/* Ordenamiento */}
          <select
            value={ordenamiento}
            onChange={(e) => onOrdenamientoChange(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="nombre">Nombre A-Z</option>
            <option value="nombre-desc">Nombre Z-A</option>
            <option value="horas">Más Horas</option>
            <option value="horas-asc">Menos Horas</option>
            <option value="fecha">Más Reciente</option>
          </select>
        </div>

        {/* Botón Agregar */}
        <Button onClick={onAgregarJuego} icon={<Plus size={20} />}>
          Agregar Juego
        </Button>
      </div>
    </div>
  );
};

export default BarraHerramientas;