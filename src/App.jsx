
import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import Catalogo from './pages/Catalogo';
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';
import ResultadoCompra from './pages/ResultadoCompra';
import Registro from './pages/Registro';
import Login from './pages/Login';
import Ofertas from './pages/Ofertas';
import Categorias from './pages/Categorias';
import Admin from './pages/Admin';

import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto as eliminarProductoCatalogo
} from './services/productoService';

import {
  obtenerSesion,
  cerrarSesion
} from './services/usuarioService';

import {
  obtenerCarrito,
  agregarProducto,
  cambiarCantidad,
  eliminarProducto as eliminarProductoCarrito,
  vaciarCarrito
} from './services/carritoService';

function App() {
  const [usuario, setUsuario] = useState(() => obtenerSesion());
  const [carrito, setCarrito] = useState(() => obtenerCarrito());
  const [productos, setProductos] = useState(() => obtenerProductos());

  // Administración de productos: CRUD
  function manejarCrearProducto(datos) {
    setProductos((actuales) => crearProducto(actuales, datos));
  }

  function manejarActualizarProducto(id, datos) {
    setProductos((actuales) => actualizarProducto(actuales, id, datos));
  }

  function manejarEliminarProducto(id) {
    setProductos((actuales) =>
      eliminarProductoCatalogo(actuales, id)
    );
  }

  // Sesión de usuario
  function manejarLogin(nuevoUsuario) {
    setUsuario(nuevoUsuario);
  }

  function manejarLogout() {
    cerrarSesion();
    setUsuario(null);
  }

  // Persistencia del carrito
  useEffect(() => {
    localStorage.setItem('technova_carrito', JSON.stringify(carrito));
  }, [carrito]);

  function manejarAgregar(producto) {
    setCarrito((actual) => agregarProducto(actual, producto));
  }

  function manejarCambioCantidad(productoId, cantidad) {
    setCarrito((actual) =>
      cambiarCantidad(actual, productoId, cantidad)
    );
  }

  function manejarEliminar(productoId) {
    setCarrito((actual) =>
      eliminarProductoCarrito(actual, productoId)
    );
  }

  function manejarVaciar() {
    setCarrito(vaciarCarrito());
  }

  function manejarCompraFinalizada() {
    setCarrito(vaciarCarrito());
  }

  const totalUnidades = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  return (
    <BrowserRouter>
      <div className="min-vh-100 bg-body-tertiary d-flex flex-column">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand fw-bold" to="/">
              TechNova Store
            </Link>

            <div className="navbar-nav ms-auto flex-row flex-wrap align-items-center gap-3">
              <Link className="nav-link" to="/">
                Catálogo
              </Link>

              <Link className="nav-link" to="/categorias">
                Categorías
              </Link>

              <Link className="nav-link" to="/ofertas">
                Ofertas
              </Link>

              <Link className="nav-link" to="/carrito">
                Carrito ({totalUnidades})
              </Link>

              <Link className="nav-link" to="/admin">
                Administración
              </Link>

              {usuario ? (
                <>
                  <span className="navbar-text text-white">
                    Hola, {usuario.nombre}
                  </span>

                  <button
                    type="button"
                    className="btn btn-outline-light btn-sm"
                    onClick={manejarLogout}
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <Link className="nav-link" to="/login">
                    Iniciar sesión
                  </Link>

                  <Link className="nav-link" to="/registro">
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>

        <main className="container py-4 flex-grow-1">
          <Routes>
            <Route
              path="/"
              element={
                <Catalogo
                  productos={productos}
                  onAgregar={manejarAgregar}
                />
              }
            />

            <Route
              path="/categorias"
              element={
                <Categorias
                  productos={productos}
                  onAgregar={manejarAgregar}
                />
              }
            />

            <Route
              path="/ofertas"
              element={
                <Ofertas
                  productos={productos}
                  onAgregar={manejarAgregar}
                />
              }
            />

            <Route
              path="/admin"
              element={
                <Admin
                  productos={productos}
                  onCrear={manejarCrearProducto}
                  onActualizar={manejarActualizarProducto}
                  onEliminar={manejarEliminarProducto}
                />
              }
            />

            <Route
              path="/carrito"
              element={
                <Carrito
                  carrito={carrito}
                  onCambiarCantidad={manejarCambioCantidad}
                  onEliminar={manejarEliminar}
                  onVaciar={manejarVaciar}
                />
              }
            />

            <Route
              path="/checkout"
              element={
                <Checkout
                  carrito={carrito}
                  onCompraFinalizada={manejarCompraFinalizada}
                />
              }
            />

            <Route
              path="/compra-exitosa"
              element={<ResultadoCompra exito={true} />}
            />

            <Route
              path="/compra-fallida"
              element={<ResultadoCompra exito={false} />}
            />

            <Route
              path="/registro"
              element={<Registro />}
            />

            <Route
              path="/login"
              element={<Login onLogin={manejarLogin} />}
            />

            <Route
              path="*"
              element={
                <div className="alert alert-warning">
                  Página no encontrada.{' '}
                  <Link to="/">Volver al catálogo</Link>
                </div>
              }
            />
          </Routes>
        </main>

        <footer className="bg-dark text-white text-center py-3">
          <small>TechNova Store · Proyecto académico</small>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
