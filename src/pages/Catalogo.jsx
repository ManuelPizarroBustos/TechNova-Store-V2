
import { useMemo, useState } from 'react';
import ProductoCard from '../components/ProductoCard';

function Catalogo({ productos, onAgregar, categoriaInicial = 'Todas', soloOfertas = false }) {
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState(categoriaInicial);

  const categorias = [
    'Todas',
    ...new Set(productos.map((producto) => producto.categoria))
  ];

  const productosFiltrados = useMemo(() => {
  return productos.filter((producto) => {
    const coincideNombre = producto.nombre
    .toLowerCase()
    .includes(busqueda.toLowerCase());

    const coincideCategoria =
    categoria === 'Todas' || producto.categoria === categoria;

    const coincideOferta = !soloOfertas || producto.oferta;

    return coincideNombre && coincideCategoria && coincideOferta;
  });
  }, [productos, busqueda, categoria, soloOfertas]);

  return (
    <section>
      <div className="mb-4">
        <h2 className="mb-1">
        {soloOfertas ? 'Ofertas especiales' : 'Nuestro catálogo'}
        </h2>
        <p className="text-secondary">
          Encuentra los accesorios tecnológicos que necesitas.
        </p>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-7">
          <label htmlFor="busqueda" className="form-label">
            Buscar producto
          </label>
          <input
            id="busqueda"
            type="search"
            className="form-control"
            placeholder="Ej.: audífonos, mouse..."
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
          />
        </div>

        <div className="col-12 col-md-5">
          <label htmlFor="categoria" className="form-label">
            Filtrar por categoría
          </label>
          <select
            id="categoria"
            className="form-select"
            value={categoria}
            onChange={(evento) => setCategoria(evento.target.value)}
          >
            {categorias.map((nombreCategoria) => (
              <option key={nombreCategoria} value={nombreCategoria}>
                {nombreCategoria}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-secondary">
        {productosFiltrados.length} producto(s) encontrado(s)
      </p>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        {productosFiltrados.map((producto) => (
          <ProductoCard
            key={producto.id}
            producto={producto}
            onAgregar={onAgregar}
          />
        ))}
      </div>

      {productosFiltrados.length === 0 && (
        <div className="alert alert-warning mt-3">
          No se encontraron productos con esos filtros.
        </div>
      )}
    </section>
  );
}

export default Catalogo;
