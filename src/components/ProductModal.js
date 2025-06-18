import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../App.css';

function ProductModal({ show, onHide, produto }) {
  const [favoritos, setFavoritos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  // Carrega favoritos e carrinho do localStorage quando o modal abrir
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favoritos')) || [];
    const cart = JSON.parse(localStorage.getItem('carrinho')) || [];
    setFavoritos(favs);
    setCarrinho(cart);
  }, [show]);

  const handleFavoritar = () => {
    if (!produto) return;

    let novosFavoritos = [...favoritos];
    const index = novosFavoritos.indexOf(produto.id);

    if (index === -1) {
      novosFavoritos.push(produto.id);
      alert('Produto adicionado aos favoritos!');
    } else {
      novosFavoritos.splice(index, 1);
      alert('Produto removido dos favoritos!');
    }

    setFavoritos(novosFavoritos);
    localStorage.setItem('favoritos', JSON.stringify(novosFavoritos));
  };

  const handleAdicionarCarrinho = () => {
    if (!produto) return;

    const index = carrinho.findIndex(item => item.produto.id === produto.id);
    let novoCarrinho = [...carrinho];

    if (index === -1) {
      novoCarrinho.push({ produto, quantidade: 1 });
    } else {
      novoCarrinho[index].quantidade += 1;
    }

    setCarrinho(novoCarrinho);
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
    alert('Produto adicionado ao carrinho!');
  };

  const isFavorito = produto && favoritos.includes(produto.id);

  if (!produto) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Body className="modalProduto">
        <div className="modalContent">
          <div className="modalImage">
            <img src={produto.imagem} alt={produto.nome} />
          </div>
          <div className="modalDetails">
            <h2>{produto.nome}</h2>
            <p className="preco">R$ {parseFloat(produto.preco).toFixed(2)}</p>
            <p className="descricao">{produto.descricao}</p>
            <div className="botoes">
              <button className="btnAdd" onClick={handleAdicionarCarrinho}>
                Adicionar ao carrinho
              </button>
              <button className="btnFav" onClick={handleFavoritar}>
                {isFavorito ? 'Remover dos favoritos ♡' : 'Salvar como favorito ♡'}
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ProductModal;