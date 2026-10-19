
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import Catalogo from './Catalogo';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('Catalogo', () => {
  let contenedor;
  let raiz;
  let onAgregar;

  const productosPrueba = [
    {
      id: 1,
      nombre: 'Mouse inalámbrico',
      categoria: 'Periféricos',
      precio: 12990,
      descripcion: 'Mouse para computador',
      imagen: '/assets/img/mouse.jpg',
      oferta: false,
      stock: 10,
    },
    {
      id: 2,
      nombre: 'Audífonos inalámbricos',
      categoria: 'Audio',
      precio: 24990,
      descripcion: 'Audífonos Bluetooth',
      imagen: '/assets/img/audifonos.jpg',
      oferta: true,
      stock: 15,
    },
    {
      id: 3,
      nombre: 'Teclado mecánico',
      categoria: 'Periféricos',
      precio: 19990,
      descripcion: 'Teclado para computador',
      imagen: '/assets/img/teclado.jpg',
      oferta: true,
      stock: 8,
    },
  ];

  function renderizarCatalogo(props = {}) {
    act(() => {
      raiz.render(
        <Catalogo
          productos={productosPrueba}
          onAgregar={onAgregar}
          {...props}
        />
      );
    });
  }

  beforeEach(() => {
    contenedor = document.createElement('div');
    document.body.appendChild(contenedor);
    raiz = createRoot(contenedor);
    onAgregar = jasmine.createSpy('onAgregar');
  });

  afterEach(() => {
    act(() => {
      raiz.unmount();
    });
    contenedor.remove();
  });

  it('muestra el título del catálogo', () => {
    renderizarCatalogo();

    expect(contenedor.textContent).toContain('Nuestro catálogo');
  });

  it('muestra los productos recibidos por props', () => {
    renderizarCatalogo();

    expect(contenedor.textContent).toContain('Mouse inalámbrico');
    expect(contenedor.textContent).toContain('Audífonos inalámbricos');
    expect(contenedor.textContent).toContain('Teclado mecánico');
    expect(contenedor.textContent).toContain('3 producto(s) encontrado(s)');
  });

  
    it('filtra productos por nombre', () => {
    renderizarCatalogo();

    const campoBusqueda = contenedor.querySelector('#busqueda');

    act(() => {
        const setter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        'value'
        ).set;

        setter.call(campoBusqueda, 'mouse');

        campoBusqueda.dispatchEvent(
        new Event('input', { bubbles: true })
        );
    });

    expect(contenedor.textContent).toContain('Mouse inalámbrico');
    expect(contenedor.textContent).not.toContain('Audífonos inalámbricos');
    expect(contenedor.textContent).toContain('1 producto(s) encontrado(s)');
    });


  it('filtra productos por categoría', () => {
    renderizarCatalogo();

    const selectorCategoria = contenedor.querySelector('#categoria');

    act(() => {
      selectorCategoria.value = 'Audio';
      selectorCategoria.dispatchEvent(
        new Event('change', { bubbles: true })
      );
    });

    expect(contenedor.textContent).toContain('Audífonos inalámbricos');
    expect(contenedor.textContent).not.toContain('Mouse inalámbrico');
    expect(contenedor.textContent).toContain('1 producto(s) encontrado(s)');
  });

  it('muestra solamente productos en oferta cuando soloOfertas es true', () => {
    renderizarCatalogo({ soloOfertas: true });

    expect(contenedor.textContent).toContain('Ofertas especiales');
    expect(contenedor.textContent).toContain('Audífonos inalámbricos');
    expect(contenedor.textContent).toContain('Teclado mecánico');
    expect(contenedor.textContent).not.toContain('Mouse inalámbrico');
    expect(contenedor.textContent).toContain('2 producto(s) encontrado(s)');
  });

  
    it('muestra un mensaje cuando no hay productos coincidentes', () => {
    renderizarCatalogo();

    const campoBusqueda = contenedor.querySelector('#busqueda');

    act(() => {
        const setter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        'value'
        ).set;

        setter.call(campoBusqueda, 'producto inexistente');

        campoBusqueda.dispatchEvent(
        new Event('input', { bubbles: true })
        );
    });

    expect(contenedor.textContent).toContain(
        'No se encontraron productos con esos filtros.'
    );
    expect(contenedor.textContent).toContain('0 producto(s) encontrado(s)');
    });

});
