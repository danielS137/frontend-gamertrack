import React, { useState, useEffect } from 'react';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import Estrellas from '../UI/Estrellas';

const FormularioResena = ({ isOpen, onClose, juegos, onGuardar, resena = null }) => {
  const [formData, setFormData] = useState({
    juego: '',
    puntuacion: 5,
    texto: '',
    autor: ''
  });

  useEffect(() => {
    if (resena) {
      // Modo edición - cargar datos de la reseña
      setFormData({
        juego: resena.juego,
        puntuacion: resena.puntuacion,
        texto: resena.texto,
        autor: resena.autor || ''
      });
    } else if (!isOpen) {
      // Resetear formulario al cerrar
      setFormData({
        juego: '',
        puntuacion: 5,
        texto: '',
        autor: ''
      });
    }
  }, [isOpen, resena]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onGuardar(formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={resena ? 'Editar Reseña' : 'Escribir Reseña'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white mb-2">Seleccionar Juego *</label>
          <select
            name="juego"
            required
            value={formData.juego}
            onChange={handleChange}
            disabled={resena}
            className={`w-full px-4 py-2 rounded-lg border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              resena 
                ? 'bg-white bg-opacity-10 text-white opacity-50 cursor-not-allowed' 
                : 'bg-white text-purple-900 font-semibold cursor-pointer'
            }`}
            style={!resena ? {
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%235b21b6' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.75rem center',
              paddingRight: '2.5rem'
            } : {}}
          >
            <option value="">Selecciona un juego</option>
            {juegos.map(juego => (
              <option key={juego._id} value={juego._id}>
                {juego.nombre}
              </option>
            ))}
          </select>
          {resena && (
            <p className="text-xs text-purple-300 mt-1">
              No puedes cambiar el juego al editar una reseña
            </p>
          )}
        </div>

        <div>
          <label className="block text-white mb-2">Puntuación *</label>
          <Estrellas 
            puntuacion={formData.puntuacion} 
            onChange={(puntuacion) => setFormData(prev => ({ ...prev, puntuacion }))}
            size={24}
          />
        </div>

        <div>
          <label className="block text-white mb-2">Tu Reseña *</label>
          <textarea
            name="texto"
            required
            value={formData.texto}
            onChange={handleChange}
            rows="5"
            placeholder="Escribe tu opinión sobre el juego..."
            className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-50 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-white mb-2">Tu Nombre (opcional)</label>
          <input
            type="text"
            name="autor"
            value={formData.autor}
            onChange={handleChange}
            placeholder="Anónimo"
            className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-50 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <Button 
            type="button" 
            onClick={onClose} 
            variant="secondary"
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            variant="primary"
            className="flex-1"
          >
            {resena ? 'Actualizar Reseña' : 'Publicar Reseña'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default FormularioResena;