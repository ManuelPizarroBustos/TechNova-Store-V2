
function formatearPrecio(precio) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(precio);
}

function ProductoCard({ producto, onAgregar }) {
  return (
    <div className="col">
      <article className="card h-100 shadow-sm">
        <img
          src={producto.imagen}
          className="card-img-top"
          alt={producto.nombre}
          style={{ height: '200px', objectFit: 'contain', padding: '16px' }}
        />

        <div className="card-body d-flex flex-column">
          <span className="badge text-bg-secondary align-self-start mb-2">
            {producto.categoria}
          </span>

          {producto.oferta && (
            <span className="badge text-bg-danger align-self-start mb-2">
              Oferta
            </span>
          )}

          <h2 className="h5 card-title">{producto.nombre}</h2>

          <p className="card-text text-secondary">
            {producto.descripcion}
          </p>

          <p className="fw-bold fs-5 mt-auto">
            {formatearPrecio(producto.precio)}
          </p>

          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={() => onAgregar(producto)}
          >
            Agregar al carrito
          </button>
        </div>
      </article>
    </div>
  );
}

export default ProductoCard;
