
import { productosIniciales } from '../data/productos.js';

const CLAVE_PRODUCTOS = 'technova_productos';

export function obtenerProductos() {
  try {
    const guardados = localStorage.getItem(CLAVE_PRODUCTOS);

    if (guardados !== null) {
      const productos = JSON.parse(guardados);
      return Array.isArray(productos) ? productos : [...productosIniciales];
    }
  } catch {
    // Si los datos guardados no son válidos, usamos los iniciales.
  }

  return [...productosIniciales];
}

export function guardarProductos(productos) {
  localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(productos));
}

export function crearProducto(productos, datos) {
  const nuevoProducto = {
    ...datos,
    id: Date.now(),
    precio: Number(datos.precio),
    stock: Number(datos.stock),
    oferta: Boolean(datos.oferta)
  };

  const actualizados = [...productos, nuevoProducto];
  guardarProductos(actualizados);
  return actualizados;
}

export function actualizarProducto(productos, id, datos) {
  const actualizados = productos.map((producto) =>
    producto.id === id
      ? {
          ...producto,
          ...datos,
          precio: Number(datos.precio),
          stock: Number(datos.stock),
          oferta: Boolean(datos.oferta)
        }
      : producto
  );

  guardarProductos(actualizados);
  return actualizados;
}

export function eliminarProducto(productos, id) {
  const actualizados = productos.filter((producto) => producto.id !== id);
  guardarProductos(actualizados);
  return actualizados;
}
