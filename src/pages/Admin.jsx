
import { useState } from 'react';

const formularioInicial = {
  nombre: '',
  categoria: 'Accesorios',
  precio: '',
  descripcion: '',
  imagen: '',
  oferta: false,
  stock: ''
};

function Admin({
  productos,
  onCrear,
  onActualizar,
  onEliminar
}) {
  const [formulario, setFormulario] = useState(formularioInicial);
  const [idEditando, setIdEditando] = useState(null);
  const [mensaje, setMensaje] = useState('');

  function manejarCambio(evento) {
    const { name, value, type, checked } = evento.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  function manejarEnvio(evento) {
    evento.preventDefault();

    const datos = {
      ...formulario,
      nombre: formulario.nombre.trim(),
      descripcion: formulario.descripcion.trim(),
      imagen: formulario.imagen.trim() || '/assets/img/audifonos.jpg',
      precio: Number(formulario.precio),
      stock: Number(formulario.stock)
    };

    if (datos.precio <= 0 || datos.stock < 0) {
      setMensaje('El precio debe ser mayor que cero y el stock no puede ser negativo.');
      return;
    }

    if (idEditando !== null) {
      onActualizar(idEditando, datos);
      setMensaje('Producto actualizado correctamente.');
    } else {
      onCrear(datos);
      setMensaje('Producto creado correctamente.');
    }

    setFormulario(formularioInicial);
    setIdEditando(null);
  }

  function comenzarEdicion(producto) {
    setIdEditando(producto.id);
    setFormulario({
      nombre: producto.nombre,
      categoria: producto.categoria,
      precio: String(producto.precio),
      descripcion: producto.descripcion,
      imagen: producto.imagen,
      oferta: producto.oferta,
      stock: String(producto.stock)
    });
    setMensaje('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelarEdicion() {
    setIdEditando(null);
    setFormulario(formularioInicial);
    setMensaje('');
  }

  function manejarEliminar(producto) {
    const confirmar = window.confirm(
      `¿Seguro que deseas eliminar "${producto.nombre}"?`
    );

    if (confirmar) {
      onEliminar(producto.id);

      if (idEditando === producto.id) {
        cancelarEdicion();
      }

      setMensaje('Producto eliminado.');
    }
  }

  return (
    <section>
      <h2 className="mb-1">Panel de administración</h2>
      <p className="text-secondary">
        Gestiona el catálogo de TechNova Store.
      </p>

      {mensaje && (
        <div className="alert alert-info" role="status">
          {mensaje}
        </div>
      )}

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h3 className="h5">
            {idEditando !== null ? 'Editar producto' : 'Crear producto'}
          </h3>

          <form onSubmit={manejarEnvio}>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  className="form-control"
                  value={formulario.nombre}
                  onChange={manejarCambio}
                  required
                  minLength={2}
                />
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="categoria" className="form-label">
                  Categoría
                </label>
                <input
                  id="categoria"
                  name="categoria"
                  className="form-control"
                  value={formulario.categoria}
                  onChange={manejarCambio}
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="precio" className="form-label">
                  Precio en CLP
                </label>
                <input
                  id="precio"
                  name="precio"
                  type="number"
                  min="1"
                  className="form-control"
                  value={formulario.precio}
                  onChange={manejarCambio}
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="stock" className="form-label">
                  Stock
                </label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  className="form-control"
                  value={formulario.stock}
                  onChange={manejarCambio}
                  required
                />
              </div>

              <div className="col-12">
                <label htmlFor="descripcion" className="form-label">
                  Descripción
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  className="form-control"
                  rows="2"
                  value={formulario.descripcion}
                  onChange={manejarCambio}
                  required
                />
              </div>

              <div className="col-12">
                <label htmlFor="imagen" className="form-label">
                  Ruta de la imagen
                </label>
                <input
                  id="imagen"
                  name="imagen"
                  className="form-control"
                  value={formulario.imagen}
                  onChange={manejarCambio}
                  placeholder="/assets/img/mouse.jpg"
                />
              </div>

              <div className="col-12">
                <div className="form-check">
                  <input
                    id="oferta"
                    name="oferta"
                    type="checkbox"
                    className="form-check-input"
                    checked={formulario.oferta}
                    onChange={manejarCambio}
                  />
                  <label htmlFor="oferta" className="form-check-label">
                    Mostrar como oferta
                  </label>
                </div>
              </div>

              <div className="col-12 d-flex flex-wrap gap-2">
                <button type="submit" className="btn btn-primary">
                  {idEditando !== null ? 'Guardar cambios' : 'Crear producto'}
                </button>

                {idEditando !== null && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={cancelarEdicion}
                  >
                    Cancelar edición
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      <h3 className="h5 mb-3">Productos registrados ({productos.length})</h3>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle bg-white">
          <thead className="table-dark">
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Oferta</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td>
                  {new Intl.NumberFormat('es-CL', {
                    style: 'currency',
                    currency: 'CLP',
                    maximumFractionDigits: 0
                  }).format(producto.precio)}
                </td>
                <td>{producto.stock}</td>
                <td>{producto.oferta ? 'Sí' : 'No'}</td>
                <td>
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => comenzarEdicion(producto)}
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => manejarEliminar(producto)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {productos.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No hay productos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Admin;
