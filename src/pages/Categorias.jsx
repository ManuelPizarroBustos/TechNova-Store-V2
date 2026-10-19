
import { useState } from 'react';
import Catalogo from './Catalogo';

function Categorias({ productos, onAgregar }) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');

  const categorias = [
    'Todas',
    ...new Set(productos.map((producto) => producto.categoria))
  ];

  return (
    <section>
      <h2 className="mb-3">Explorar categorías</h2>

      <div className="d-flex flex-wrap gap-2 mb-4">
        {categorias.map((categoria) => (
          <button
            type="button"
            key={categoria}
            className={`btn ${
              categoriaSeleccionada === categoria
                ? 'btn-primary'
                : 'btn-outline-primary'
            }`}
            onClick={() => setCategoriaSeleccionada(categoria)}
          >
            {categoria}
          </button>
        ))}
      </div>

      <Catalogo
        key={categoriaSeleccionada}
        productos={productos}
        onAgregar={onAgregar}
        categoriaInicial={categoriaSeleccionada}
      />
    </section>
  );
}

export default Categorias;
