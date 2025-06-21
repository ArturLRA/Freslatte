import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function CartModal({ show, onHide }) {
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
  const email = localStorage.getItem('usuarioEmail');
  if (!email) return;

  fetch(`http://localhost:3001/carrinho/${email}`)
    .then(res => res.json())
    .then(data => setCarrinho(data))
    .catch(err => console.error('Erro ao buscar carrinho:', err));
  }, [show]);

  // Calcula valor total do carrinho
  const totalGeral = carrinho.reduce((acc, item) => acc + (item.preco || 0) * item.quantidade, 0);

  // Função para remover um item do carrinho
  const removerItem = async (id) => {
  const email = localStorage.getItem('usuarioEmail');
  if (!email) return;

  try {
    await fetch('http://localhost:3001/carrinho', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: email, produtoId: id })
    });

    setCarrinho(prev => prev.filter(item => item.id !== id));
  } catch (error) {
    console.error('Erro ao remover item:', error);
  }
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
            {carrinho.map(item => (
              <div key={item.id}>
                  <strong>{item.nome}</strong><br />
                Quantidade: {item.quantidade}<br />
                Preço unitário: R$ {(Number(item.preco) || 0).toFixed(2)}<br />
                Subtotal: R$ {(Number(item.preco) * item.quantidade).toFixed(2)}<br />
                <Button variant="danger" size="sm" onClick={() => removerItem(item.id)}>Remover</Button>
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