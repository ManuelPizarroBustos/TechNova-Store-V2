
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { iniciarSesion } from '../services/usuarioService';

function Login({ onLogin }) {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function manejarEnvio(evento) {
    evento.preventDefault();
    setError('');

    const resultado = iniciarSesion(correo, password);

    if (!resultado.ok) {
      setError(resultado.mensaje);
      return;
    }

    onLogin(resultado.usuario);
    navigate('/');
  }

  return (
    <section className="row justify-content-center">
      <div className="col-12 col-md-7 col-lg-5">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h2 className="mb-3">Iniciar sesión</h2>
            <p className="text-secondary">
              Accede a tu cuenta de TechNova Store.
            </p>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={manejarEnvio}>
              <div className="mb-3">
                <label htmlFor="loginCorreo" className="form-label">
                  Correo electrónico
                </label>
                <input
                  id="loginCorreo"
                  type="email"
                  className="form-control"
                  value={correo}
                  onChange={(evento) => setCorreo(evento.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="loginPassword" className="form-label">
                  Contraseña
                </label>
                <input
                  id="loginPassword"
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(evento) => setPassword(evento.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Iniciar sesión
              </button>
            </form>

            <p className="mt-3 mb-0 text-center">
              ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
