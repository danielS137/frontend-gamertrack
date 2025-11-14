import React from 'react';

const TarjetaEstadistica = ({ titulo, valor, icono, colorTexto = 'text-purple-300', colorIcono = 'text-purple-400' }) => {
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20 hover:border-opacity-30 transition-all">
      <div className="flex items-center justify-between">
        <div>
          <p className={`${colorTexto} mb-2 text-sm font-medium`}>{titulo}</p>
          <p className="text-4xl font-bold text-white">{valor}</p>
        </div>
        <div className={colorIcono}>
          {icono}
        </div>
      </div>
    </div>
  );
};

export default TarjetaEstadistica;