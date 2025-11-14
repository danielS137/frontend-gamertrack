import React from 'react';
import { Trophy } from 'lucide-react';

const TopJuegos = ({ juegos }) => {
  const topJuegos = [...juegos]
    .sort((a, b) => (b.horasJugadas || 0) - (a.horasJugadas || 0))
    .slice(0, 5);

  const getMedalColor = (index) => {
    switch(index) {
      case 0: return 'text-yellow-400';
      case 1: return 'text-gray-300';
      case 2: return 'text-orange-400';
      default: return 'text-purple-400';
    }
  };

  if (topJuegos.length === 0) {
    return (
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20">
        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Trophy size={28} />
          Top 5 Juegos Más Jugados
        </h3>
        <p className="text-purple-300 text-center py-8">
          Aún no tienes juegos registrados
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20">
      <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <Trophy size={28} className="text-yellow-400" />
        Top 5 Juegos Más Jugados
      </h3>
      <div className="space-y-3">
        {topJuegos.map((juego, index) => (
          <div 
            key={juego._id} 
            className="flex items-center gap-4 bg-white bg-opacity-5 rounded-lg p-4 hover:bg-opacity-10 transition-all"
          >
            <div className={`text-3xl font-bold ${getMedalColor(index)} min-w-[40px]`}>
              #{index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold truncate">{juego.nombre}</p>
              <p className="text-purple-300 text-sm truncate">{juego.plataforma}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{juego.horasJugadas || 0}h</p>
              <p className="text-purple-300 text-xs">{juego.estado}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopJuegos;