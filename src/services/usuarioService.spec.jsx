
import {
  registrarUsuario,
  iniciarSesion,
  obtenerSesion,
  cerrarSesion
} from './usuarioService';

describe('usuarioService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('registra un usuario correctamente', () => {
    const resultado = registrarUsuario({
      nombre: 'Manuel Pizarro',
      correo: 'manuel@technova.cl',
      password: 'Clave123'
    });

    const usuarios = JSON.parse(
      localStorage.getItem('technova_usuarios')
    );

    expect(resultado.ok).toBeTrue();
    expect(resultado.mensaje).toBe('Cuenta creada correctamente.');
    expect(usuarios.length).toBe(1);
    expect(usuarios[0].correo).toBe('manuel@technova.cl');
  });

  it('normaliza el nombre y el correo al registrar', () => {
    registrarUsuario({
      nombre: '  Manuel Pizarro  ',
      correo: '  MANUEL@TECHNOVA.CL  ',
      password: 'Clave123'
    });

    const usuarios = JSON.parse(
      localStorage.getItem('technova_usuarios')
    );

    expect(usuarios[0].nombre).toBe('Manuel Pizarro');
    expect(usuarios[0].correo).toBe('manuel@technova.cl');
  });

  it('rechaza un correo que ya está registrado', () => {
    registrarUsuario({
      nombre: 'Usuario Uno',
      correo: 'usuario@technova.cl',
      password: 'Clave123'
    });

    const resultado = registrarUsuario({
      nombre: 'Usuario Dos',
      correo: ' USUARIO@TECHNOVA.CL ',
      password: 'Clave456'
    });

    const usuarios = JSON.parse(
      localStorage.getItem('technova_usuarios')
    );

    expect(resultado.ok).toBeFalse();
    expect(resultado.mensaje).toBe(
      'Ya existe una cuenta con ese correo.'
    );
    expect(usuarios.length).toBe(1);
  });

  it('inicia sesión con credenciales correctas', () => {
    registrarUsuario({
      nombre: 'Manuel Pizarro',
      correo: 'manuel@technova.cl',
      password: 'Clave123'
    });

    const resultado = iniciarSesion(
      'manuel@technova.cl',
      'Clave123'
    );

    expect(resultado.ok).toBeTrue();
    expect(resultado.usuario.nombre).toBe('Manuel Pizarro');
    expect(resultado.usuario.correo).toBe('manuel@technova.cl');

    const sesionGuardada = JSON.parse(
      localStorage.getItem('technova_sesion')
    );

    expect(sesionGuardada.correo).toBe('manuel@technova.cl');
  });

  it('rechaza credenciales incorrectas', () => {
    registrarUsuario({
      nombre: 'Manuel Pizarro',
      correo: 'manuel@technova.cl',
      password: 'Clave123'
    });

    const resultado = iniciarSesion(
      'manuel@technova.cl',
      'ClaveIncorrecta'
    );

    expect(resultado.ok).toBeFalse();
    expect(resultado.mensaje).toBe(
      'Correo o contraseña incorrectos.'
    );
    expect(localStorage.getItem('technova_sesion')).toBeNull();
  });

  it('devuelve null cuando no existe una sesión', () => {
    expect(obtenerSesion()).toBeNull();
  });

  it('devuelve null si los datos de sesión están corruptos', () => {
    localStorage.setItem('technova_sesion', '{dato inválido');

    expect(obtenerSesion()).toBeNull();
  });

  it('cierra la sesión eliminando los datos guardados', () => {
    localStorage.setItem(
      'technova_sesion',
      JSON.stringify({
        id: 1,
        nombre: 'Manuel Pizarro',
        correo: 'manuel@technova.cl'
      })
    );

    cerrarSesion();

    expect(localStorage.getItem('technova_sesion')).toBeNull();
    expect(obtenerSesion()).toBeNull();
  });
  
    it('devuelve una lista vacía si los usuarios guardados están corruptos', () => {
    localStorage.setItem('technova_usuarios', '{dato inválido');

    const resultado = registrarUsuario({
        nombre: 'Usuario de Prueba',
        correo: 'prueba@technova.cl',
        password: 'Clave123'
    });

    expect(resultado.ok).toBeTrue();

    const usuarios = JSON.parse(
        localStorage.getItem('technova_usuarios')
    );

    expect(usuarios.length).toBe(1);
    expect(usuarios[0].correo).toBe('prueba@technova.cl');
    });

});
