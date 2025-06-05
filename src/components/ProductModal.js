import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../App.css';

function ProductModal({ show, onHide, produto }) {

    const email = localStorage.getItem('usuarioEmail');

const handleFavoritar = async () => {
  try {
    const response = await fetch('http://localhost:3001/favoritar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, produtoId: produto.id })
    });

    const data = await response.json();
    if (data.sucesso) {
      alert('Favoritos atualizados');
    }
  } catch (err) {
    console.error(err);
  }
};

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
    <p className="preco">R$ {produto.preco}</p>
    <p className="descricao">{produto.descricao}</p>
    <div className="botoes">
      <button className="btnAdd">Adicionar ao carrinho</button>
      <button className="btnFav" onClick={handleFavoritar}>Salvar como favoritos</button>
    </div>
  </div>
</div>
      </Modal.Body>
    </Modal>
  );
}

export default ProductModal;