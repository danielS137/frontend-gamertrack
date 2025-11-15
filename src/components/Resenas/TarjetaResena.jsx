import React from 'react';
import { Trash2, Edit2 } from 'lucide-react';
import Estrellas from '../UI/Estrellas';

const TarjetaResena = ({ resena, juego, onEliminar, onEditar }) => {
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20 hover:border-opacity-30 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">
            {juego ? juego.nombre : 'Juego no encontrado'}
          </h3>
          <div className="flex items-center gap-4 flex-wrap">
            <Estrellas puntuacion={resena.puntuacion} />
            <span className="text-purple-300 text-sm">
              Por: {resena.autor || 'Anónimo'}
            </span>
            {resena.createdAt && (
              <span className="text-purple-300 text-sm">
                {new Date(resena.createdAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            )}
          </div>
        </div>
        
        {/* Botones de acción */}
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => onEditar(resena)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-all"
            aria-label="Editar reseña"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onEliminar(resena._id)}
            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-all"
            aria-label="Eliminar reseña"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <p className="text-white leading-relaxed whitespace-pre-wrap">{resena.texto}</p>
    </div>
  );
};

export default TarjetaResena;