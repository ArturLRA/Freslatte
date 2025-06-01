import React, {useEffect, useState} from 'react';
import '../App.css'

function ProductCard() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/produtos')
        .then(res => res.json())
        .then(data => setProdutos(data))
        .catch(err => console.error('Erro ao buscar produtos: ', err));
    }, []);

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