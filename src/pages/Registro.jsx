
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registrarUsuario } from '../services/usuarioService';

function Registro() {
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    password: '',
    confirmarPassword: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('danger');

  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value
    }));
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    setMensaje('');

    if (
      !formulario.nombre.trim() ||
      !formulario.correo.trim() ||
      !formulario.password ||
      !formulario.confirmarPassword
    ) {
      setMensaje('Todos los campos son obligatorios.');
      setTipoMensaje('danger');
      return;
    }

    if (formulario.password !== formulario.confirmarPassword) {
      setMensaje('Las contraseñas no coinciden.');
      setTipoMensaje('danger');
      return;
    }

    const resultado = registrarUsuario({
      nombre: formulario.nombre,
      correo: formulario.correo,
      password: formulario.password
    });

    if (!resultado.ok) {
      setMensaje(resultado.mensaje);
      setTipoMensaje('danger');
      return;
    }

    setTipoMensaje('success');
    setMensaje(resultado.mensaje);

    setTimeout(() => navigate('/login'), 1000);
  }

  return (
    <section className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h2 className="mb-3">Crear cuenta</h2>
            <p className="text-secondary">
              Regístrate para continuar en TechNova Store.
            </p>

            {mensaje && (
              <div className={`alert alert-${tipoMensaje}`} role="alert">
                {mensaje}
              </div>
            )}

            <form onSubmit={manejarEnvio}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre completo
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  className="form-control"
                  value={formulario.nombre}
                  onChange={manejarCambio}
                  minLength={3}
                  required
                  autoComplete="name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="correo" className="form-label">
                  Correo electrónico
                </label>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  className="form-control"
                  value={formulario.correo}
                  onChange={manejarCambio}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                  value={formulario.password}
                  onChange={manejarCambio}
                  minLength={8}
                  required
                  autoComplete="new-password"
                />
                <div className="form-text">
                  Debe tener al menos 8 caracteres.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="confirmarPassword" className="form-label">
                  Confirmar contraseña
                </label>
                <input
                  id="confirmarPassword"
                  name="confirmarPassword"
                  type="password"
                  className="form-control"
                  value={formulario.confirmarPassword}
                  onChange={manejarCambio}
                  minLength={8}
                  required
                  autoComplete="new-password"
                />
              </div>

              <button className="btn btn-primary w-100" type="submit">
                Crear cuenta
              </button>
            </form>

            <p className="mt-3 mb-0 text-center">
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Registro;
