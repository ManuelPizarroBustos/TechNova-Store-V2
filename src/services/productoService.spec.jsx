
import {
  obtenerProductos,
  guardarProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from './productoService';

import { productosIniciales } from '../data/productos';

describe('productoService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  const productoEjemplo = {
    id: 1,
    nombre: 'Mouse Gamer',
    descripcion: 'Mouse de prueba',
    categoria: 'Accesorios',
    precio: 12990,
    stock: 10,
    oferta: false,
    imagen: '/assets/img/mouse.jpg'
  };

  it('devuelve los productos iniciales cuando no hay datos guardados', () => {
    const resultado = obtenerProductos();

    expect(resultado).toEqual(productosIniciales);
    expect(resultado).not.toBe(productosIniciales);
  });

  it('devuelve los productos guardados en localStorage', () => {
    const productos = [productoEjemplo];

    guardarProductos(productos);

    expect(obtenerProductos()).toEqual(productos);
  });

  it('devuelve los productos iniciales si el JSON guardado está corrupto', () => {
    localStorage.setItem('technova_productos', '{dato inválido');

    expect(obtenerProductos()).toEqual(productosIniciales);
  });

  it('devuelve los productos iniciales si el valor guardado no es un arreglo', () => {
    localStorage.setItem(
      'technova_productos',
      JSON.stringify({ producto: productoEjemplo })
    );

    expect(obtenerProductos()).toEqual(productosIniciales);
  });

  it('guarda los productos en localStorage', () => {
    const productos = [productoEjemplo];

    guardarProductos(productos);

    expect(
      JSON.parse(localStorage.getItem('technova_productos'))
    ).toEqual(productos);
  });

  it('crea un producto y convierte sus campos numéricos y booleanos', () => {
    const resultado = crearProducto([], {
      nombre: 'Teclado Gamer',
      descripcion: 'Teclado de prueba',
      categoria: 'Accesorios',
      precio: '19990',
      stock: '5',
      oferta: true,
      imagen: '/assets/img/teclado.jpg'
    });

    expect(resultado.length).toBe(1);
    expect(resultado[0].nombre).toBe('Teclado Gamer');
    expect(resultado[0].precio).toBe(19990);
    expect(resultado[0].stock).toBe(5);
    expect(resultado[0].oferta).toBeTrue();
    expect(resultado[0].id).toBeDefined();

    expect(
      JSON.parse(localStorage.getItem('technova_productos'))
    ).toEqual(resultado);
  });

  it('actualiza un producto existente', () => {
    const resultado = actualizarProducto(
      [productoEjemplo],
      1,
      {
        nombre: 'Mouse Inalámbrico',
        precio: '15990',
        stock: '8',
        oferta: true
      }
    );

    expect(resultado.length).toBe(1);
    expect(resultado[0].nombre).toBe('Mouse Inalámbrico');
    expect(resultado[0].precio).toBe(15990);
    expect(resultado[0].stock).toBe(8);
    expect(resultado[0].oferta).toBeTrue();

    expect(
      JSON.parse(localStorage.getItem('technova_productos'))
    ).toEqual(resultado);
  });

  it('conserva los productos que no se actualizan', () => {
    const segundoProducto = {
      ...productoEjemplo,
      id: 2,
      nombre: 'Audífonos'
    };

    const resultado = actualizarProducto(
      [productoEjemplo, segundoProducto],
      1,
      {
        nombre: 'Mouse Actualizado',
        precio: '14990',
        stock: '6',
        oferta: false
      }
    );

    expect(resultado.length).toBe(2);
    expect(resultado[0].nombre).toBe('Mouse Actualizado');
    expect(resultado[1]).toEqual(segundoProducto);
  });

  it('elimina el producto indicado y conserva los demás', () => {
    const segundoProducto = {
      ...productoEjemplo,
      id: 2,
      nombre: 'Audífonos'
    };

    const resultado = eliminarProducto(
      [productoEjemplo, segundoProducto],
      1
    );

    expect(resultado.length).toBe(1);
    expect(resultado[0]).toEqual(segundoProducto);

    expect(
      JSON.parse(localStorage.getItem('technova_productos'))
    ).toEqual(resultado);
  });

  it('devuelve una lista vacía al eliminar el último producto', () => {
    const resultado = eliminarProducto([productoEjemplo], 1);

    expect(resultado).toEqual([]);
    expect(
      JSON.parse(localStorage.getItem('technova_productos'))
    ).toEqual([]);
  });
});
