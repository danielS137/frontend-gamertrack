import React from 'react';
import { Plus, MessageSquare } from 'lucide-react';
import Button from '../UI/Button';
import TarjetaResena from './TarjetaResena';

const ListaResenas = ({ resenas, juegos, onAgregarResena, onEliminarResena }) => {
  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta reseña?')) {
      await onEliminarResena(id);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Reseñas</h2>
        <Button onClick={onAgregarResena} icon={<Plus size={20} />}>
          Escribir Reseña
        </Button>
      </div>

      {resenas.length === 0 ? (
        <div className="text-center py-20">
          <MessageSquare size={80} className="text-white opacity-20 mx-auto mb-4" />
          <p className="text-white text-xl mb-4">No hay reseñas aún</p>
          <p className="text-purple-300 mb-6">¡Sé el primero en compartir tu opinión sobre tus juegos!</p>
          <Button onClick={onAgregarResena} icon={<Plus size={20} />}>
            Escribir Primera Reseña
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {resenas.map((resena) => {
            const juego = juegos.find(j => j._id === resena.juego);
            return (
              <TarjetaResena
                key={resena._id}
                resena={resena}
                juego={juego}
                onEliminar={handleEliminar}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default ListaResenas;