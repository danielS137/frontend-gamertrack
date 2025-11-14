// Calcular estadísticas generales de los juegos
export const calcularEstadisticas = (juegos) => {
  const total = juegos.length;
  const completados = juegos.filter(j => j.estado === 'Completado').length;
  const jugando = juegos.filter(j => j.estado === 'Jugando').length;
  const pendientes = juegos.filter(j => j.estado === 'Pendiente').length;
  const totalHoras = juegos.reduce((sum, j) => sum + (j.horasJugadas || 0), 0);
  const promedioHoras = total > 0 ? (totalHoras / total).toFixed(1) : 0;
  
  return {
    total,
    completados,
    jugando,
    pendientes,
    totalHoras,
    promedioHoras,
    porcentajeCompletado: total > 0 ? Math.round((completados / total) * 100) : 0,
  };
};

// Obtener los juegos más jugados
export const obtenerTopJuegos = (juegos, cantidad = 5) => {
  return [...juegos]
    .sort((a, b) => (b.horasJugadas || 0) - (a.horasJugadas || 0))
    .slice(0, cantidad);
};

// Calcular promedio de puntuación de un juego
export const calcularPromedioPuntuacion = (resenas, juegoId) => {
  const resenasJuego = resenas.filter(r => r.juego === juegoId);
  
  if (resenasJuego.length === 0) return 0;
  
  const suma = resenasJuego.reduce((sum, r) => sum + r.puntuacion, 0);
  return (suma / resenasJuego.length).toFixed(1);
};

// Obtener distribución por estado
export const obtenerDistribucionEstados = (juegos) => {
  const estados = {
    Pendiente: 0,
    Jugando: 0,
    Completado: 0,
  };

  juegos.forEach(juego => {
    if (estados.hasOwnProperty(juego.estado)) {
      estados[juego.estado]++;
    }
  });

  return estados;
};