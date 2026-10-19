
import Catalogo from './Catalogo';

function Ofertas({ productos, onAgregar }) {
  return (
    <Catalogo
      productos={productos}
      onAgregar={onAgregar}
      soloOfertas={true}
    />
  );
}

export default Ofertas;
