import React from 'react';
import { GamepadIcon, CheckCircle, Clock, Filter, BarChart3 } from 'lucide-react';
import TarjetaEstadistica from './TarjetaEstadistica';
import TopJuegos from './TopJuegos';
import { calcularEstadisticas } from '../../utils/estadisticas';

const EstadisticasPersonales = ({ juegos }) => {
  const stats = calcularEstadisticas(juegos);

  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-6">Estadísticas Personales</h2>
      
      {/* Grid de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <TarjetaEstadistica
          titulo="Total de Juegos"
          valor={stats.total}
          icono={<GamepadIcon size={50} />}
          colorTexto="text-purple-300"
          colorIcono="text-purple-400"
        />

        <TarjetaEstadistica
          titulo="Completados"
          valor={stats.completados}
          icono={<CheckCircle size={50} />}
          colorTexto="text-green-300"
          colorIcono="text-green-400"
        />

        <TarjetaEstadistica
          titulo="En Progreso"
          valor={stats.jugando}
          icono={<Clock size={50} />}
          colorTexto="text-yellow-300"
          colorIcono="text-yellow-400"
        />

        <TarjetaEstadistica
          titulo="Pendientes"
          valor={stats.pendientes}
          icono={<Filter size={50} />}
          colorTexto="text-gray-300"
          colorIcono="text-gray-400"
        />

        <TarjetaEstadistica
          titulo="Total de Horas"
          valor={`${stats.totalHoras}h`}
          icono={<BarChart3 size={50} />}
          colorTexto="text-blue-300"
          colorIcono="text-blue-400"
        />

        <TarjetaEstadistica
          titulo="Promedio de Horas"
          valor={`${stats.promedioHoras}h`}
          icono={<Clock size={50} />}
          colorTexto="text-purple-300"
          colorIcono="text-purple-400"
        />
      </div>

      {/* Porcentaje de Completado */}
      {stats.total > 0 && (
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Progreso General</h3>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                  {stats.porcentajeCompletado}% Completado
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-purple-300">
                  {stats.completados} / {stats.total} juegos
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-white bg-opacity-20">
              <div 
                style={{ width: `${stats.porcentajeCompletado}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Top Juegos */}
      <TopJuegos juegos={juegos} />

      {/* Distribución por Plataforma */}
      {stats.total > 0 && (
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20 mt-8">
          <h3 className="text-2xl font-bold text-white mb-4">Distribución por Plataforma</h3>
          <div className="space-y-3">
            {Object.entries(
              juegos.reduce((acc, juego) => {
                acc[juego.plataforma] = (acc[juego.plataforma] || 0) + 1;
                return acc;
              }, {})
            )
              .sort((a, b) => b[1] - a[1])
              .map(([plataforma, cantidad]) => (
                <div key={plataforma} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white font-semibold">{plataforma}</span>
                      <span className="text-purple-300">{cantidad} juego{cantidad !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(cantidad / stats.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default EstadisticasPersonales;