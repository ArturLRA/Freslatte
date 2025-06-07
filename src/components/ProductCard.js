import React, { useState } from 'react';
import ProductModal from './ProductModal';
import '../App.css';
import React, { useState } from 'react';
import ProductModal from './ProductModal';
import '../App.css';

function ProductCard({ produtos }) {
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (produto) => {
    setProdutoSelecionado(produto);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setProdutoSelecionado(null);
    setShowModal(false);
  };

  return (  
    <>
      <div className="productContainer">
        {produtos.map(prod => (
          <div
            className="productCard"
            key={prod.id}
            onClick={() => handleOpenModal(prod)}
            style={{ cursor: 'pointer' }}
          >
            <img src={prod.imagem} alt={prod.nome} />
            <h2>{prod.nome}</h2>
            <p>{prod.descricao}</p>
            <p className="productPrice">R$ {parseFloat(prod.preco).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <ProductModal
        show={showModal}
        onHide={handleCloseModal}
        produto={produtoSelecionado}
      />
    </>
  );
}

export default ProductCard;

