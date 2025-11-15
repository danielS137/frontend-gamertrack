import React, { useState, useEffect } from 'react';
import Modal from '../UI/Modal';
import Button from '../UI/Button';

const FormularioJuego = ({ isOpen, onClose, juego, onGuardar }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    plataforma: '',
    portadaURL: '',
    estado: 'Pendiente',
    horasJugadas: 0
  });

  useEffect(() => {
    if (juego) {
      setFormData(juego);
    } else {
      setFormData({
        nombre: '',
        plataforma: '',
        portadaURL: '',
        estado: 'Pendiente',
        horasJugadas: 0
      });
    }
  }, [juego, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onGuardar(formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'horasJugadas' ? Number(value) : value
    }));
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={juego ? 'Editar Juego' : 'Agregar Juego'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white mb-2">Nombre del Juego *</label>
          <input
            type="text"
            name="nombre"
            required
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej: The Legend of Zelda"
            className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-50 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-white mb-2">Plataforma *</label>
          <input
            type="text"
            name="plataforma"
            required
            value={formData.plataforma}
            onChange={handleChange}
            placeholder="Ej: Nintendo Switch, PlayStation 5, PC"
            className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-50 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-white mb-2">URL de la Portada</label>
          <input
            type="url"
            name="portadaURL"
            value={formData.portadaURL}
            onChange={handleChange}
            placeholder="https://ejemplo.com/portada.jpg"
            className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-50 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <p className="text-xs text-purple-300 mt-1">Opcional: Agrega una URL de imagen para la portada</p>
        </div>

        <div>
          <label className="block text-white mb-2">Estado</label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white text-purple-900 font-semibold border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%235b21b6' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.75rem center',
              paddingRight: '2.5rem'
            }}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="Jugando">Jugando</option>
            <option value="Completado">Completado</option>
          </select>
        </div>

        <div>
          <label className="block text-white mb-2">Horas Jugadas</label>
          <input
            type="number"
            name="horasJugadas"
            min="0"
            value={formData.horasJugadas}
            onChange={handleChange}
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
            {juego ? 'Actualizar' : 'Agregar'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default FormularioJuego;