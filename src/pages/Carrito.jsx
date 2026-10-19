
import { Link } from 'react-router-dom';

function formatearPrecio(precio) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(precio);
}

function Carrito({
  carrito,
  onCambiarCantidad,
  onEliminar,
  onVaciar
}) {
  const totalUnidades = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  const totalCompra = carrito.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0
  );

  return (
    <section>
      <h2 className="mb-2">Mi carrito</h2>
      <p className="text-secondary">
        Revisa tus productos antes de continuar con la compra.
      </p>

      {carrito.length === 0 ? (
        <div className="alert alert-info mt-4">
          <h3 className="h5">Tu carrito está vacío</h3>
          <p>Agrega productos desde nuestro catálogo.</p>
          <Link to="/" className="btn btn-primary">
            Volver al catálogo
          </Link>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center my-4">
            <span>{totalUnidades} unidad(es) en tu carrito</span>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={onVaciar}
            >
              Vaciar carrito
            </button>
          </div>

          <div className="row g-4">
            <div className="col-12 col-lg-8">
              <div className="d-flex flex-column gap-3">
                {carrito.map((producto) => (
                  <article className="card" key={producto.id}>
                    <div className="card-body">
                      <div className="row align-items-center g-3">
                        <div className="col-4 col-md-3">
                          <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="img-fluid rounded"
                            style={{
                              width: '100%',
                              height: '110px',
                              objectFit: 'contain'
                            }}
                          />
                        </div>

                        <div className="col-8 col-md-5">
                          <h3 className="h6">{producto.nombre}</h3>
                          <p className="text-secondary small mb-1">
                            {producto.categoria}
                          </p>
                          <p className="fw-semibold mb-0">
                            {formatearPrecio(producto.precio)}
                          </p>
                        </div>

                        <div className="col-7 col-md-2">
                          <label
                            htmlFor={`cantidad-${producto.id}`}
                            className="form-label small"
                          >
                            Cantidad
                          </label>
                          <input
                            id={`cantidad-${producto.id}`}
                            type="number"
                            min="1"
                            className="form-control"
                            value={producto.cantidad}
                            onChange={(evento) =>
                              onCambiarCantidad(
                                producto.id,
                                evento.target.value
                              )
                            }
                          />
                        </div>

                        <div className="col-5 col-md-2 text-end">
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => onEliminar(producto.id)}
                            aria-label={`Eliminar ${producto.nombre}`}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h3 className="h5">Resumen de compra</h3>

                  <div className="d-flex justify-content-between my-3">
                    <span>Productos</span>
                    <span>{totalUnidades}</span>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                    <span>Total</span>
                    <span>{formatearPrecio(totalCompra)}</span>
                  </div>

                  
                  <Link to="/checkout" className="btn btn-primary w-100">
                    Continuar compra
                  </Link>


                  <Link
                    to="/"
                    className="btn btn-outline-secondary w-100 mt-2"
                  >
                    Seguir comprando
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default Carrito;
