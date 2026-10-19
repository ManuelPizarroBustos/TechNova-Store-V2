
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { MemoryRouter } from 'react-router-dom';
import Carrito from './Carrito';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('Carrito', () => {
  let contenedor;
  let raiz;
  let onCambiarCantidad;
  let onEliminar;
  let onVaciar;

  const productosPrueba = [
    {
      id: 1,
      nombre: 'Mouse inalámbrico',
      categoria: 'Periféricos',
      precio: 12990,
      imagen: '/assets/img/mouse.jpg',
      cantidad: 2,
    },
    {
      id: 2,
      nombre: 'Audífonos inalámbricos',
      categoria: 'Audio',
      precio: 24990,
      imagen: '/assets/img/audifonos.jpg',
      cantidad: 1,
    },
  ];

  function renderizarCarrito(carrito = productosPrueba) {
    act(() => {
      raiz.render(
        <MemoryRouter>
          <Carrito
            carrito={carrito}
            onCambiarCantidad={onCambiarCantidad}
            onEliminar={onEliminar}
            onVaciar={onVaciar}
          />
        </MemoryRouter>
      );
    });
  }

  beforeEach(() => {
    contenedor = document.createElement('div');
    document.body.appendChild(contenedor);
    raiz = createRoot(contenedor);

    onCambiarCantidad = jasmine.createSpy('onCambiarCantidad');
    onEliminar = jasmine.createSpy('onEliminar');
    onVaciar = jasmine.createSpy('onVaciar');
  });

  afterEach(() => {
    act(() => {
      raiz.unmount();
    });
    contenedor.remove();
  });

  it('muestra el título del carrito', () => {
    renderizarCarrito();

    expect(contenedor.textContent).toContain('Mi carrito');
  });

  it('muestra los productos y sus cantidades', () => {
    renderizarCarrito();

    expect(contenedor.textContent).toContain('Mouse inalámbrico');
    expect(contenedor.textContent).toContain('Audífonos inalámbricos');
    expect(contenedor.textContent).toContain('3 unidad(es) en tu carrito');
  });

  it('calcula y muestra correctamente el total de la compra', () => {
    renderizarCarrito();

    // 2 x 12.990 + 1 x 24.990 = 50.970
    expect(contenedor.textContent).toContain('$50.970');
  });

  it('llama a onCambiarCantidad al modificar la cantidad', () => {
    renderizarCarrito();

    const campoCantidad = contenedor.querySelector('#cantidad-1');

    act(() => {
      const setter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        'value'
      ).set;

      setter.call(campoCantidad, '3');

      campoCantidad.dispatchEvent(
        new Event('input', { bubbles: true })
      );
    });

    expect(onCambiarCantidad).toHaveBeenCalledWith(1, '3');
  });

  it('llama a onEliminar con el identificador del producto', () => {
    renderizarCarrito();

    const botonEliminar = contenedor.querySelector(
      'button[aria-label="Eliminar Mouse inalámbrico"]'
    );

    act(() => {
      botonEliminar.dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      );
    });

    expect(onEliminar).toHaveBeenCalledWith(1);
  });

  it('muestra el mensaje cuando el carrito está vacío', () => {
    renderizarCarrito([]);

    expect(contenedor.textContent).toContain('Tu carrito está vacío');
    expect(contenedor.textContent).toContain(
      'Agrega productos desde nuestro catálogo.'
    );
    expect(contenedor.textContent).toContain('Volver al catálogo');
    expect(contenedor.textContent).not.toContain('Resumen de compra');
  });

  it('llama a onVaciar al pulsar Vaciar carrito', () => {
    renderizarCarrito();

    const botonVaciar = Array.from(
      contenedor.querySelectorAll('button')
    ).find((boton) => boton.textContent.includes('Vaciar carrito'));

    act(() => {
      botonVaciar.dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      );
    });

    expect(onVaciar).toHaveBeenCalledTimes(1);
  });
});
