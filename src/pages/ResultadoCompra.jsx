
import { Link, useLocation } from 'react-router-dom';

function formatearPrecio(precio) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(precio);
}

function ResultadoCompra({ exito }) {
  const location = useLocation();
  const pedido = location.state;

  if (exito && !pedido) {
    return (
      <section className="alert alert-warning">
        <h2 className="h4">No hay información del pedido</h2>
        <p>Realiza una compra de prueba para ver el resultado.</p>
        <Link to="/" className="btn btn-primary">
          Volver al catálogo
        </Link>
      </section>
    );
  }

  return (
    <section className={`card shadow-sm border-0 ${exito ? 'border-success' : 'border-danger'}`}>
      <div className="card-body text-center p-5">
        <div className={`display-4 ${exito ? 'text-success' : 'text-danger'}`}>
          {exito ? '✓' : '✕'}
        </div>

        <h2 className="mt-3">
          {exito ? '¡Compra realizada!' : 'No se pudo completar la compra'}
        </h2>

        <p className="text-secondary">
          {exito
            ? `Gracias${pedido?.nombre ? `, ${pedido.nombre}` : ''}. Tu pedido de prueba se registró correctamente.`
            : 'La compra de prueba no se completó. Puedes volver a intentarlo.'}
        </p>

        {exito && pedido && (
          <p className="fs-5 fw-bold">
            Total del pedido: {formatearPrecio(pedido.total)}
          </p>
        )}

        <Link to="/" className="btn btn-primary mt-3">
          Volver a la tienda
        </Link>
      </div>
    </section>
  );
}

export default ResultadoCompra;
