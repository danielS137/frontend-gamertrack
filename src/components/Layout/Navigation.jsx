import React from 'react';

const Navigation = ({ vistaActual, onCambiarVista }) => {
  const opciones = [
    { id: 'biblioteca', label: 'Biblioteca' },
    { id: 'resenas', label: 'Reseñas' },
    { id: 'estadisticas', label: 'Estadísticas' },
  ];

  return (
    <nav className="flex gap-4">
      {opciones.map(opcion => (
        <button
          key={opcion.id}
          onClick={() => onCambiarVista(opcion.id)}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            vistaActual === opcion.id
              ? 'bg-purple-600 text-white'
              : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
          }`}
        >
          {opcion.label}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;