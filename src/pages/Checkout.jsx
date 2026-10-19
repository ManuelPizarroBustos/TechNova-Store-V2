
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function formatearPrecio(precio) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(precio);
}

function Checkout({ carrito, onCompraFinalizada }) {
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    direccion: '',
    comuna: '',
    metodoPago: 'tarjeta'
  });

  const [error, setError] = useState('');

  const total = carrito.reduce(
    (suma, producto) => suma + producto.precio * producto.cantidad,
    0
  );

  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value
    }));
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    setError('');

    if (carrito.length === 0) {
      setError('Tu carrito está vacío. Agrega productos antes de comprar.');
      return;
    }

    onCompraFinalizada();

    navigate('/compra-exitosa', {
      state: {
        nombre: formulario.nombre,
        total,
        metodoPago: formulario.metodoPago
      }
    });
  }

  return (
    <section>
      <h2>Finalizar compra</h2>
      <p className="text-secondary">
        Completa tus datos para simular tu pedido.
      </p>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row g-4 mt-1">
        <div className="col-12 col-lg-7">
          <form className="card" onSubmit={manejarEnvio}>
            <div className="card-body">
              <h3 className="h5 mb-3">Datos del comprador</h3>

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
                  required
                  minLength={3}
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
                <label htmlFor="direccion" className="form-label">
                  Dirección
                </label>
                <input
                  id="direccion"
                  name="direccion"
                  className="form-control"
                  value={formulario.direccion}
                  onChange={manejarCambio}
                  required
                  autoComplete="street-address"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="comuna" className="form-label">
                  Comuna
                </label>
                <input
                  id="comuna"
                  name="comuna"
                  className="form-control"
                  value={formulario.comuna}
                  onChange={manejarCambio}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="metodoPago" className="form-label">
                  Método de pago simulado
                </label>
                <select
                  id="metodoPago"
                  name="metodoPago"
                  className="form-select"
                  value={formulario.metodoPago}
                  onChange={manejarCambio}
                  required
                >
                  <option value="tarjeta">Tarjeta (simulación)</option>
                  <option value="transferencia">Transferencia (simulación)</option>
                </select>
                <div className="form-text">
                  No se solicitarán datos bancarios ni se realizará un cobro real.
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Confirmar pedido de prueba
              </button>
            </div>
          </form>
        </div>

        <div className="col-12 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="h5">Resumen del pedido</h3>

              {carrito.map((producto) => (
                <div
                  key={producto.id}
                  className="d-flex justify-content-between gap-3 my-3"
                >
                  <span>
                    {producto.nombre} × {producto.cantidad}
                  </span>
                  <span className="text-nowrap">
                    {formatearPrecio(producto.precio * producto.cantidad)}
                  </span>
                </div>
              ))}

              <hr />

              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>{formatearPrecio(total)}</span>
              </div>

              <Link to="/carrito" className="btn btn-outline-secondary w-100 mt-3">
                Volver al carrito
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
