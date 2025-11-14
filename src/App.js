import React, { useState, useEffect } from 'react';
import './App.css';

// URL base de tu API - ajústala según tu configuración
const API_URL = 'http://localhost:3000/api';

function App() {
  const [juegos, setJuegos] = useState([]);
  const [resenas, setResenas] = useState([]);
  const [vistaActual, setVistaActual] = useState('biblioteca');
  const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [mostrarFormJuego, setMostrarFormJuego] = useState(false);
  const [mostrarFormResena, setMostrarFormResena] = useState(false);

  // Formulario de juego
  const [formJuego, setFormJuego] = useState({
    nombre: '',
    plataforma: '',
    portadaURL: '',
    estado: 'Pendiente',
    horasJugadas: 0
  });

  // Formulario de reseña
  const [formResena, setFormResena] = useState({
    juego: '',
    puntuacion: 5,
    texto: '',
    autor: 'Usuario'
  });

  // Cargar juegos al iniciar
  useEffect(() => {
    cargarJuegos();
    cargarResenas();
  }, []);

  // Funciones para juegos
  const cargarJuegos = async () => {
    try {
      const response = await fetch(`${API_URL}/juegos`);
      const data = await response.json();
      setJuegos(data);
    } catch (error) {
      console.error('Error al cargar juegos:', error);
    }
  };

  const agregarJuego = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/juegos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formJuego)
      });
      
      if (response.ok) {
        await cargarJuegos();
        setMostrarFormJuego(false);
        resetFormJuego();
      }
    } catch (error) {
      console.error('Error al agregar juego:', error);
    }
  };

  const actualizarJuego = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/juegos/${juegoSeleccionado._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formJuego)
      });
      
      if (response.ok) {
        await cargarJuegos();
        setModoEdicion(false);
        setMostrarFormJuego(false);
        resetFormJuego();
      }
    } catch (error) {
      console.error('Error al actualizar juego:', error);
    }
  };

  const eliminarJuego = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este juego?')) {
      try {
        await fetch(`${API_URL}/juegos/${id}`, { method: 'DELETE' });
        await cargarJuegos();
      } catch (error) {
        console.error('Error al eliminar juego:', error);
      }
    }
  };

  // Funciones para reseñas
  const cargarResenas = async () => {
    try {
      const response = await fetch(`${API_URL}/resenas`);
      const data = await response.json();
      setResenas(data);
    } catch (error) {
      console.error('Error al cargar reseñas:', error);
    }
  };

  const agregarResena = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/resenas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formResena)
      });
      
      if (response.ok) {
        await cargarResenas();
        setMostrarFormResena(false);
        resetFormResena();
      }
    } catch (error) {
      console.error('Error al agregar reseña:', error);
    }
  };

  const eliminarResena = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta reseña?')) {
      try {
        await fetch(`${API_URL}/resenas/${id}`, { method: 'DELETE' });
        await cargarResenas();
      } catch (error) {
        console.error('Error al eliminar reseña:', error);
      }
    }
  };

  // Funciones auxiliares
  const resetFormJuego = () => {
    setFormJuego({
      nombre: '',
      plataforma: '',
      portadaURL: '',
      estado: 'Pendiente',
      horasJugadas: 0
    });
    setJuegoSeleccionado(null);
  };

  const resetFormResena = () => {
    setFormResena({
      juego: '',
      puntuacion: 5,
      texto: '',
      autor: 'Usuario'
    });
  };

  const editarJuego = (juego) => {
    setJuegoSeleccionado(juego);
    setFormJuego({
      nombre: juego.nombre,
      plataforma: juego.plataforma,
      portadaURL: juego.portadaURL || '',
      estado: juego.estado,
      horasJugadas: juego.horasJugadas
    });
    setModoEdicion(true);
    setMostrarFormJuego(true);
  };

  const abrirFormularioNuevoJuego = () => {
    resetFormJuego();
    setModoEdicion(false);
    setMostrarFormJuego(true);
  };

  // Calcular estadísticas
  const calcularEstadisticas = () => {
    const total = juegos.length;
    const completados = juegos.filter(j => j.estado === 'Completado').length;
    const jugando = juegos.filter(j => j.estado === 'Jugando').length;
    const pendientes = juegos.filter(j => j.estado === 'Pendiente').length;
    const horasTotales = juegos.reduce((sum, j) => sum + (j.horasJugadas || 0), 0);

    return { total, completados, jugando, pendientes, horasTotales };
  };

  const stats = calcularEstadisticas();

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <h1>🎮 GameTracker</h1>
        <p>Tu biblioteca personal de videojuegos</p>
      </header>

      {/* Navegación */}
      <nav className="nav">
        <button 
          className={vistaActual === 'biblioteca' ? 'active' : ''}
          onClick={() => setVistaActual('biblioteca')}
        >
          📚 Biblioteca
        </button>
        <button 
          className={vistaActual === 'resenas' ? 'active' : ''}
          onClick={() => setVistaActual('resenas')}
        >
          ⭐ Reseñas
        </button>
        <button 
          className={vistaActual === 'estadisticas' ? 'active' : ''}
          onClick={() => setVistaActual('estadisticas')}
        >
          📊 Estadísticas
        </button>
      </nav>

      {/* Contenido Principal */}
      <main className="main-content">
        {/* Vista Biblioteca */}
        {vistaActual === 'biblioteca' && (
          <div className="biblioteca">
            <div className="biblioteca-header">
              <h2>Mi Biblioteca ({juegos.length} juegos)</h2>
              <button className="btn-agregar" onClick={abrirFormularioNuevoJuego}>
                + Agregar Juego
              </button>
            </div>

            {/* Formulario Juego */}
            {mostrarFormJuego && (
              <div className="modal">
                <div className="modal-content">
                  <h3>{modoEdicion ? 'Editar Juego' : 'Agregar Nuevo Juego'}</h3>
                  <form onSubmit={modoEdicion ? actualizarJuego : agregarJuego}>
                    <input
                      type="text"
                      placeholder="Nombre del juego"
                      value={formJuego.nombre}
                      onChange={(e) => setFormJuego({...formJuego, nombre: e.target.value})}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Plataforma (PS5, PC, Xbox, etc.)"
                      value={formJuego.plataforma}
                      onChange={(e) => setFormJuego({...formJuego, plataforma: e.target.value})}
                      required
                    />
                    <input
                      type="url"
                      placeholder="URL de la portada"
                      value={formJuego.portadaURL}
                      onChange={(e) => setFormJuego({...formJuego, portadaURL: e.target.value})}
                    />
                    <select
                      value={formJuego.estado}
                      onChange={(e) => setFormJuego({...formJuego, estado: e.target.value})}
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="Jugando">Jugando</option>
                      <option value="Completado">Completado</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Horas jugadas"
                      value={formJuego.horasJugadas}
                      onChange={(e) => setFormJuego({...formJuego, horasJugadas: Number(e.target.value)})}
                      min="0"
                    />
                    <div className="modal-buttons">
                      <button type="submit" className="btn-guardar">
                        {modoEdicion ? 'Actualizar' : 'Guardar'}
                      </button>
                      <button 
                        type="button" 
                        className="btn-cancelar"
                        onClick={() => {
                          setMostrarFormJuego(false);
                          resetFormJuego();
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Grid de juegos */}
            <div className="juegos-grid">
              {juegos.map(juego => (
                <div key={juego._id} className="tarjeta-juego">
                  {juego.portadaURL && (
                    <img src={juego.portadaURL} alt={juego.nombre} />
                  )}
                  <div className="juego-info">
                    <h3>{juego.nombre}</h3>
                    <p className="plataforma">{juego.plataforma}</p>
                    <span className={`estado estado-${juego.estado.toLowerCase()}`}>
                      {juego.estado}
                    </span>
                    <p className="horas">⏱️ {juego.horasJugadas}h jugadas</p>
                    <div className="juego-acciones">
                      <button onClick={() => editarJuego(juego)}>✏️ Editar</button>
                      <button onClick={() => eliminarJuego(juego._id)}>🗑️ Eliminar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vista Reseñas */}
        {vistaActual === 'resenas' && (
          <div className="resenas">
            <div className="resenas-header">
              <h2>Reseñas ({resenas.length})</h2>
              <button className="btn-agregar" onClick={() => setMostrarFormResena(true)}>
                + Nueva Reseña
              </button>
            </div>

            {/* Formulario Reseña */}
            {mostrarFormResena && (
              <div className="modal">
                <div className="modal-content">
                  <h3>Escribir Nueva Reseña</h3>
                  <form onSubmit={agregarResena}>
                    <select
                      value={formResena.juego}
                      onChange={(e) => setFormResena({...formResena, juego: e.target.value})}
                      required
                    >
                      <option value="">Selecciona un juego</option>
                      {juegos.map(juego => (
                        <option key={juego._id} value={juego._id}>
                          {juego.nombre}
                        </option>
                      ))}
                    </select>
                    <div className="puntuacion">
                      <label>Puntuación: {formResena.puntuacion} ⭐</label>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={formResena.puntuacion}
                        onChange={(e) => setFormResena({...formResena, puntuacion: Number(e.target.value)})}
                      />
                    </div>
                    <textarea
                      placeholder="Escribe tu reseña..."
                      value={formResena.texto}
                      onChange={(e) => setFormResena({...formResena, texto: e.target.value})}
                      rows="6"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Tu nombre (opcional)"
                      value={formResena.autor}
                      onChange={(e) => setFormResena({...formResena, autor: e.target.value})}
                    />
                    <div className="modal-buttons">
                      <button type="submit" className="btn-guardar">Publicar Reseña</button>
                      <button 
                        type="button" 
                        className="btn-cancelar"
                        onClick={() => {
                          setMostrarFormResena(false);
                          resetFormResena();
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Lista de reseñas */}
            <div className="resenas-lista">
              {resenas.map(resena => {
                const juego = juegos.find(j => j._id === resena.juego);
                return (
                  <div key={resena._id} className="tarjeta-resena">
                    <div className="resena-header">
                      <h3>{juego?.nombre || 'Juego desconocido'}</h3>
                      <div className="estrellas">
                        {'⭐'.repeat(resena.puntuacion)}
                      </div>
                    </div>
                    <p className="resena-texto">{resena.texto}</p>
                    <div className="resena-footer">
                      <span className="autor">Por: {resena.autor}</span>
                      <button 
                        className="btn-eliminar-resena"
                        onClick={() => eliminarResena(resena._id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Vista Estadísticas */}
        {vistaActual === 'estadisticas' && (
          <div className="estadisticas">
            <h2>Estadísticas Personales</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total de Juegos</h3>
                <p className="stat-numero">{stats.total}</p>
              </div>
              <div className="stat-card">
                <h3>Completados</h3>
                <p className="stat-numero">{stats.completados}</p>
              </div>
              <div className="stat-card">
                <h3>Jugando</h3>
                <p className="stat-numero">{stats.jugando}</p>
              </div>
              <div className="stat-card">
                <h3>Pendientes</h3>
                <p className="stat-numero">{stats.pendientes}</p>
              </div>
              <div className="stat-card wide">
                <h3>Horas Totales Jugadas</h3>
                <p className="stat-numero">{stats.horasTotales}h</p>
              </div>
            </div>

            <div className="progreso">
              <h3>Progreso de Completitud</h3>
              <div className="barra-progreso">
                <div 
                  className="barra-fill"
                  style={{width: `${stats.total > 0 ? (stats.completados / stats.total * 100) : 0}%`}}
                ></div>
              </div>
              <p>{stats.total > 0 ? Math.round(stats.completados / stats.total * 100) : 0}% completado</p>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>GameTracker © 2025 - Tu biblioteca personal de videojuegos</p>
      </footer>
    </div>
  );
}

export default App;