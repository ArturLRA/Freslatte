import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function CartModal({ show, onHide }) {
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('carrinho')) || [];
    setCarrinho(cart);
  }, [show]);

  // Calcula valor total do carrinho
  const totalGeral = carrinho.reduce((acc, item) => acc + item.produto.preco * item.quantidade, 0);

  // Função para remover um item do carrinho
  const removerItem = (id) => {
    const novoCarrinho = carrinho.filter(item => item.produto.id !== id);
    setCarrinho(novoCarrinho);
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
  };

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>Carrinho</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {carrinho.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <div>
            {carrinho.map(({ produto, quantidade }) => (
              <div key={produto.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
                <strong>{produto.nome}</strong><br />
                Quantidade: {quantidade} <br />
                Preço unitário: R$ {(Number(produto.preco) || 0).toFixed(2)} <br />
                Subtotal: R$ {(produto.preco * quantidade).toFixed(2)} <br />
                <Button variant="danger" size="sm" onClick={() => removerItem(produto.id)}>Remover</Button>
              </div>
            ))}
            <hr />
            <h5>Total: R$ {totalGeral.toFixed(2)}</h5>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Fechar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CartModal;