import React from 'react';
import { Edit2, Trash2, GamepadIcon, Clock, CheckCircle } from 'lucide-react';
import Estrellas from '../UI/Estrellas';

const TarjetaJuego = ({ juego, promedioPuntuacion, cantidadResenas, onEditar, onEliminar }) => {
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl overflow-hidden border border-white border-opacity-20 hover:border-opacity-40 transition-all transform hover:scale-105">
      {/* Portada */}
      <div className="aspect-[3/4] bg-gradient-to-br from-purple-600 to-blue-600 relative overflow-hidden">
        {juego.portadaURL ? (
          <img 
            src={juego.portadaURL} 
            alt={juego.nombre} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.querySelector('.fallback-icon').style.display = 'flex';
            }}
          />
        ) : null}
        
        <div className="fallback-icon w-full h-full flex items-center justify-center" style={{ display: juego.portadaURL ? 'none' : 'flex' }}>
          <GamepadIcon size={80} className="text-white opacity-30" />
        </div>

        {/* Botones de acción */}
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={() => onEditar(juego)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-all"
            aria-label="Editar juego"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onEliminar(juego._id)}
            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-all"
            aria-label="Eliminar juego"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {/* Badge de completado */}
        {juego.estado === 'Completado' && (
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-semibold">
            <CheckCircle size={16} />
            Completado
          </div>
        )}
      </div>

      {/* Información */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2 truncate" title={juego.nombre}>
          {juego.nombre}
        </h3>
        <p className="text-purple-300 text-sm mb-3">{juego.plataforma}</p>
        
        {/* Puntuación */}
        <div className="flex items-center gap-2 mb-2">
          <Estrellas puntuacion={Math.round(promedioPuntuacion)} />
          {cantidadResenas > 0 && (
            <span className="text-white text-sm">({cantidadResenas})</span>
          )}
        </div>

        {/* Horas jugadas */}
        <div className="flex items-center gap-2 text-white text-sm mb-2">
          <Clock size={16} />
          <span>{juego.horasJugadas || 0}h jugadas</span>
        </div>

        {/* Estado */}
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            juego.estado === 'Completado' ? 'bg-green-500' :
            juego.estado === 'Jugando' ? 'bg-yellow-500' :
            'bg-gray-500'
          } text-white`}>
            {juego.estado}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TarjetaJuego;