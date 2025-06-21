import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../App.css';

function ProductModal({ show, onHide, produto }) {
  const [favoritos, setFavoritos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const email = localStorage.getItem('usuarioEmail');

  useEffect(() => {
    if (!produto) return;

    const carregarFavoritos = async () => {
      try {
        const res = await fetch(`http://localhost:3001/favoritos/${email}`);
        const data = await res.json();
        const ids = data.map(p => p.id);
        setFavoritos(ids);
      } catch (err) {
        console.error('Erro ao carregar favoritos:', err);
      }
    };

    const carregarCarrinho = async () => {
      try {
        const res = await fetch(`http://localhost:3001/carrinho/${email}`);
        const data = await res.json();
        setCarrinho(data);
      } catch (err) {
        console.error('Erro ao carregar carrinho:', err);
      }
    };

    carregarFavoritos();
    carregarCarrinho();
  }, [show, produto, email]);

  const handleAdicionarCarrinho = async () => {
    if (!email || !produto) return;

    try {
      await fetch('http://localhost:3001/carrinho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: email, produtoId: produto.id, quantidade: 1 })
      });

      const atualizado = await fetch(`http://localhost:3001/carrinho/${email}`);
      const novoCarrinho = await atualizado.json();
      setCarrinho(novoCarrinho);

      alert('Produto adicionado ao carrinho!');
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
    }
  };

  const handleFavoritar = async () => {
    if (!email || !produto) return;

    try {
      if (favoritos.includes(produto.id)) {
        await fetch('http://localhost:3001/favoritos', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: email, produtoId: produto.id })
        });
        setFavoritos(prev => prev.filter(id => id !== produto.id));
        alert('Produto removido dos favoritos!');
      } else {
        await fetch('http://localhost:3001/favoritos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: email, produtoId: produto.id })
        });
        setFavoritos(prev => [...prev, produto.id]);
        alert('Produto adicionado aos favoritos!');
      }
    } catch (err) {
      console.error('Erro ao atualizar favoritos:', err);
    }
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
                {isFavorito ? 'Remover dos favoritos' : 'Salvar como favorito'}
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ProductModal;
