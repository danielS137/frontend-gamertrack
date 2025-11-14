import React, { useState, useEffect } from 'react';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import Estrellas from '../UI/Estrellas';

const FormularioResena = ({ isOpen, onClose, juegos, onGuardar }) => {
  const [formData, setFormData] = useState({
    juego: '',
    puntuacion: 5,
    texto: '',
    autor: ''
  });

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        juego: '',
        puntuacion: 5,
        texto: '',
        autor: ''
      });
    }
  }, [isOpen]);

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
      title="Escribir Reseña"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white mb-2">Seleccionar Juego *</label>
          <select
            name="juego"
            required
            value={formData.juego}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Selecciona un juego</option>
            {juegos.map(juego => (
              <option key={juego._id} value={juego._id}>
                {juego.nombre}
              </option>
            ))}
          </select>
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
            Publicar Reseña
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default FormularioResena;