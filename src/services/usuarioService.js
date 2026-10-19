
const CLAVE_USUARIOS = 'technova_usuarios';
const CLAVE_SESION = 'technova_sesion';

function leerUsuarios() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_USUARIOS)) || [];
  } catch {
    return [];
  }
}

export function registrarUsuario({ nombre, correo, password }) {
  const usuarios = leerUsuarios();
  const correoNormalizado = correo.trim().toLowerCase();

  const existe = usuarios.some(
    (usuario) => usuario.correo === correoNormalizado
  );

  if (existe) {
    return {
      ok: false,
      mensaje: 'Ya existe una cuenta con ese correo.'
    };
  }

  const nuevoUsuario = {
    id: Date.now(),
    nombre: nombre.trim(),
    correo: correoNormalizado,
    password
  };

  localStorage.setItem(
    CLAVE_USUARIOS,
    JSON.stringify([...usuarios, nuevoUsuario])
  );

  return {
    ok: true,
    mensaje: 'Cuenta creada correctamente.'
  };
}

export function iniciarSesion(correo, password) {
  const usuarios = leerUsuarios();
  const correoNormalizado = correo.trim().toLowerCase();

  const usuario = usuarios.find(
    (item) =>
      item.correo === correoNormalizado &&
      item.password === password
  );

  if (!usuario) {
    return {
      ok: false,
      mensaje: 'Correo o contraseña incorrectos.'
    };
  }

  const sesion = {
    id: usuario.id,
    nombre: usuario.nombre,
    correo: usuario.correo
  };

  localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));

  return {
    ok: true,
    usuario: sesion
  };
}

export function obtenerSesion() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_SESION)) || null;
  } catch {
    return null;
  }
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
}
