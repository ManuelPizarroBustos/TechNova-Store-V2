
import {
  obtenerCarrito,
  agregarProducto,
  cambiarCantidad,
  eliminarProducto,
  vaciarCarrito,
} from './carritoService';

describe('Pruebas del servicio del carrito', () => {
  const producto = {
    id: 1,
    nombre: 'Mouse',
    precio: 12990,
    stock: 12,
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('agrega un producto nuevo al carrito', () => {
    const resultado = agregarProducto([], producto);

    expect(resultado.length).toBe(1);
    expect(resultado[0].nombre).toBe('Mouse');
    expect(resultado[0].cantidad).toBe(1);
  });

  it('incrementa la cantidad si el producto ya existe', () => {
    const carritoInicial = [{ ...producto, cantidad: 1 }];

    const resultado = agregarProducto(carritoInicial, producto);

    expect(resultado.length).toBe(1);
    expect(resultado[0].cantidad).toBe(2);
  });

  it('cambia la cantidad de un producto', () => {
    const carritoInicial = [{ ...producto, cantidad: 1 }];

    const resultado = cambiarCantidad(carritoInicial, 1, 3);

    expect(resultado[0].cantidad).toBe(3);
  });

  it('elimina un producto del carrito', () => {
    const carritoInicial = [{ ...producto, cantidad: 1 }];

    const resultado = eliminarProducto(carritoInicial, 1);

    expect(resultado.length).toBe(0);
  });

  it('vacía el carrito y devuelve una lista vacía', () => {
    const resultado = vaciarCarrito();

    expect(resultado).toEqual([]);
    expect(JSON.parse(localStorage.getItem('technova_carrito'))).toEqual([]);
  });
  
  it('no permite una cantidad inferior a uno', () => {
    const carritoInicial = [{ ...producto, cantidad: 2 }];

    const resultado = cambiarCantidad(carritoInicial, 1, 0);

    expect(resultado[0].cantidad).toBe(1);
  });

  it('usa una cantidad válida si se recibe un valor no numérico', () => {
    const carritoInicial = [{ ...producto, cantidad: 2 }];

    const resultado = cambiarCantidad(carritoInicial, 1, 'abc');

    expect(resultado[0].cantidad).toBe(1);
  });

  it('conserva los demás productos al eliminar uno', () => {
    const segundoProducto = {
      id: 2,
      nombre: 'Teclado',
      precio: 19990,
      cantidad: 1,
    };

    const carritoInicial = [
      { ...producto, cantidad: 1 },
      segundoProducto,
    ];

    const resultado = eliminarProducto(carritoInicial, 1);

    expect(resultado.length).toBe(1);
    expect(resultado[0].nombre).toBe('Teclado');
  });

  it('guarda el producto agregado en localStorage', () => {
    agregarProducto([], producto);

    const guardado = JSON.parse(
      localStorage.getItem('technova_carrito')
    );

    expect(guardado.length).toBe(1);
    expect(guardado[0].id).toBe(1);
    expect(guardado[0].cantidad).toBe(1);
  });

  it('guarda la nueva cantidad en localStorage', () => {
    const carritoInicial = [{ ...producto, cantidad: 1 }];

    cambiarCantidad(carritoInicial, 1, 4);

    const guardado = JSON.parse(
      localStorage.getItem('technova_carrito')
    );

    expect(guardado[0].cantidad).toBe(4);
  });

});
describe('obtenerCarrito', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('devuelve un arreglo vacío si no hay datos guardados', () => {
    expect(obtenerCarrito()).toEqual([]);
  });

  it('devuelve los productos guardados en localStorage', () => {
    const carritoGuardado = [
      { id: 1, nombre: 'Mouse', precio: 12990, cantidad: 2 },
    ];

    localStorage.setItem(
      'technova_carrito',
      JSON.stringify(carritoGuardado)
    );

    expect(obtenerCarrito()).toEqual(carritoGuardado);
  });

  it('devuelve un arreglo vacío si los datos guardados son inválidos', () => {
    localStorage.setItem('technova_carrito', '{datos-invalidos');

    expect(obtenerCarrito()).toEqual([]);
  });
});
