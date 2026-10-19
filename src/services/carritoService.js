
const CLAVE_CARRITO = 'technova_carrito';

export function obtenerCarrito() {
  try {
    const datos = localStorage.getItem(CLAVE_CARRITO);
    return datos ? JSON.parse(datos) : [];
  } catch {
    return [];
  }
}

export function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

export function agregarProducto(carrito, producto) {
  const existente = carrito.find((item) => item.id === producto.id);

  const nuevoCarrito = existente
    ? carrito.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    : [...carrito, { ...producto, cantidad: 1 }];

  guardarCarrito(nuevoCarrito);
  return nuevoCarrito;
}

export function cambiarCantidad(carrito, productoId, cantidad) {
  const nuevoCarrito = carrito
    .map((item) =>
      item.id === productoId
        ? { ...item, cantidad: Math.max(1, Number(cantidad) || 1) }
        : item
    );

  guardarCarrito(nuevoCarrito);
  return nuevoCarrito;
}

export function eliminarProducto(carrito, productoId) {
  const nuevoCarrito = carrito.filter((item) => item.id !== productoId);
  guardarCarrito(nuevoCarrito);
  return nuevoCarrito;
}

export function vaciarCarrito() {
  guardarCarrito([]);
  return [];
}
