
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { MemoryRouter } from 'react-router-dom';
import Registro from './Registro';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('Registro', () => {
  let contenedor;
  let raiz;

  beforeEach(() => {
    localStorage.clear();

    contenedor = document.createElement('div');
    document.body.appendChild(contenedor);
    raiz = createRoot(contenedor);
  });

  afterEach(() => {
    act(() => {
      raiz.unmount();
    });

    contenedor.remove();
    localStorage.clear();
  });

  function renderizarRegistro() {
    act(() => {
      raiz.render(
        <MemoryRouter>
          <Registro />
        </MemoryRouter>
      );
    });
  }

  function completarCampo(id, valor) {
    const campo = contenedor.querySelector(`#${id}`);

    if (!campo) {
      throw new Error(`No se encontró el campo #${id}`);
    }

    act(() => {
      const setter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        'value'
      ).set;

      setter.call(campo, valor);
      campo.dispatchEvent(
        new Event('input', { bubbles: true })
      );
    });
  }

  function enviarFormulario() {
    const formulario = contenedor.querySelector('form');

    if (!formulario) {
      throw new Error('No se encontró el formulario de registro');
    }

    act(() => {
      formulario.dispatchEvent(
        new Event('submit', {
          bubbles: true,
          cancelable: true
        })
      );
    });
  }

  function completarRegistro({
    nombre = 'Usuario de Prueba',
    correo = 'prueba@technova.cl',
    password = 'Clave123',
    confirmarPassword = password
  } = {}) {
    completarCampo('nombre', nombre);
    completarCampo('correo', correo);
    completarCampo('password', password);
    completarCampo('confirmarPassword', confirmarPassword);
  }

  it('muestra el formulario y sus campos principales', () => {
    renderizarRegistro();

    expect(contenedor.querySelector('form')).not.toBeNull();
    expect(contenedor.querySelector('#nombre')).not.toBeNull();
    expect(contenedor.querySelector('#correo')).not.toBeNull();
    expect(contenedor.querySelector('#password')).not.toBeNull();
    expect(
      contenedor.querySelector('#confirmarPassword')
    ).not.toBeNull();
  });

  it('muestra un enlace para iniciar sesión', () => {
    renderizarRegistro();

    const enlace = contenedor.querySelector('a[href="/login"]');

    expect(enlace).not.toBeNull();
  });

  it('muestra un error si las contraseñas no coinciden', () => {
    renderizarRegistro();

    completarRegistro({
      password: 'Clave123',
      confirmarPassword: 'OtraClave456'
    });

    enviarFormulario();

    expect(contenedor.textContent).toContain(
      'Las contraseñas no coinciden.'
    );

    expect(localStorage.getItem('technova_usuarios')).toBeNull();
  });

  it('registra al usuario y guarda sus datos normalizados', () => {
    renderizarRegistro();

    completarRegistro({
      nombre: '  Usuario de Prueba  ',
      correo: '  PRUEBA@TECHNOVA.CL  ',
      password: 'Clave123'
    });

    enviarFormulario();

    const usuarios = JSON.parse(
      localStorage.getItem('technova_usuarios')
    );

    expect(usuarios.length).toBe(1);
    expect(usuarios[0].nombre).toBe('Usuario de Prueba');
    expect(usuarios[0].correo).toBe('prueba@technova.cl');
    expect(usuarios[0].password).toBe('Clave123');

    expect(contenedor.textContent).toContain(
      'Cuenta creada correctamente.'
    );
  });

  it('muestra un error si el correo ya está registrado', () => {
    localStorage.setItem(
      'technova_usuarios',
      JSON.stringify([
        {
          id: 1,
          nombre: 'Usuario Existente',
          correo: 'prueba@technova.cl',
          password: 'Clave123'
        }
      ])
    );

    renderizarRegistro();

    completarRegistro();
    enviarFormulario();

    expect(contenedor.textContent).toContain(
      'Ya existe una cuenta con ese correo.'
    );

    const usuarios = JSON.parse(
      localStorage.getItem('technova_usuarios')
    );

    expect(usuarios.length).toBe(1);
  });

  it('no crea una cuenta cuando el formulario tiene campos vacíos', () => {
    renderizarRegistro();

    completarCampo('nombre', '');
    completarCampo('correo', '');
    completarCampo('password', '');
    completarCampo('confirmarPassword', '');

    enviarFormulario();

    expect(contenedor.textContent).toContain(
        'Todos los campos son obligatorios.'
    );

    expect(localStorage.getItem('technova_usuarios')).toBeNull();
    });
});
