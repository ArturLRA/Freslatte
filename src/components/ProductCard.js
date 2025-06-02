import React from 'react';
import '../App.css'

function ProductCard({ produtos }) {
  return (
    <div className="productContainer">
      {produtos.map(prod => (
        <div className="productCard" key={prod.id}>
          <img src={prod.imagem} alt={prod.nome} />
          <h2>{prod.nome}</h2>
          <p>{prod.descricao}</p>
          <p className="productPrice">R$ {parseFloat(prod.preco).toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}


export default ProductCard;