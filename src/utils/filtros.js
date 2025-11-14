// Filtrar juegos por estado
export const filtrarPorEstado = (juegos, estado) => {
  if (estado === 'Todos') return juegos;
  return juegos.filter(juego => juego.estado === estado);
};

// Filtrar juegos por búsqueda
export const filtrarPorBusqueda = (juegos, busqueda) => {
  if (!busqueda) return juegos;
  
  const busquedaLower = busqueda.toLowerCase();
  return juegos.filter(juego =>
    juego.nombre.toLowerCase().includes(busquedaLower) ||
    juego.plataforma.toLowerCase().includes(busquedaLower)
  );
};

// Ordenar juegos
export const ordenarJuegos = (juegos, criterio) => {
  const juegosCopia = [...juegos];
  
  switch (criterio) {
    case 'nombre':
      return juegosCopia.sort((a, b) => 
        a.nombre.localeCompare(b.nombre)
      );
    
    case 'nombre-desc':
      return juegosCopia.sort((a, b) => 
        b.nombre.localeCompare(a.nombre)
      );
    
    case 'horas':
      return juegosCopia.sort((a, b) => 
        (b.horasJugadas || 0) - (a.horasJugadas || 0)
      );
    
    case 'horas-asc':
      return juegosCopia.sort((a, b) => 
        (a.horasJugadas || 0) - (b.horasJugadas || 0)
      );
    
    case 'fecha':
      return juegosCopia.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
    
    default:
      return juegosCopia;
  }
};

// Aplicar todos los filtros
export const aplicarFiltros = (juegos, { estado, busqueda, ordenamiento }) => {
  let resultado = juegos;
  
  // Filtrar por estado
  resultado = filtrarPorEstado(resultado, estado);
  
  // Filtrar por búsqueda
  resultado = filtrarPorBusqueda(resultado, busqueda);
  
  // Ordenar
  resultado = ordenarJuegos(resultado, ordenamiento);
  
  return resultado;
};