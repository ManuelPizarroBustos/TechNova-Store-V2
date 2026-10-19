
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import ProductoCard from './ProductoCard';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('Pruebas del componente ProductoCard', () => {
  let contenedor;
  let raiz;

  const producto = {
    id: 1,
    nombre: 'Mouse',
    categoria: 'Periféricos',
    precio: 12990,
    descripcion: 'Mouse inalámbrico',
    imagen: '/assets/img/mouse.jpg',
    oferta: false,
    stock: 12,
  };

  beforeEach(() => {
    contenedor = document.createElement('div');
    document.body.appendChild(contenedor);
    raiz = createRoot(contenedor);
  });

  afterEach(() => {
    act(() => {
      raiz.unmount();
    });
    contenedor.remove();
  });

  it('muestra el nombre del producto', () => {
    act(() => {
      raiz.render(
        <ProductoCard producto={producto} onAgregar={() => {}} />
      );
    });

    expect(contenedor.textContent).toContain('Mouse');
  });

  it('muestra la categoría del producto', () => {
    act(() => {
      raiz.render(
        <ProductoCard producto={producto} onAgregar={() => {}} />
      );
    });

    expect(contenedor.textContent).toContain('Periféricos');
  });

  it('muestra el precio del producto', () => {
    act(() => {
      raiz.render(
        <ProductoCard producto={producto} onAgregar={() => {}} />
      );
    });

    expect(contenedor.textContent).toContain('12.990');
  });

  it('muestra el botón para agregar al carrito', () => {
    act(() => {
      raiz.render(
        <ProductoCard producto={producto} onAgregar={() => {}} />
      );
    });

    const boton = contenedor.querySelector('button');

    expect(boton).not.toBeNull();
    expect(boton.textContent).toContain('Agregar al carrito');
  });

  it('llama a onAgregar con el producto seleccionado', () => {
    const onAgregar = jasmine.createSpy('onAgregar');

    act(() => {
      raiz.render(
        <ProductoCard producto={producto} onAgregar={onAgregar} />
      );
    });

    const boton = contenedor.querySelector('button');

    act(() => {
      boton.click();
    });

    expect(onAgregar).toHaveBeenCalledWith(producto);
  });
});
