import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function FavoritosModal({ show, onHide }) {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    if (!show) return;

    // Pega o email do usuário logado
    const email = localStorage.getItem('usuarioEmail');
    if (!email) {
      setProdutos([]);
      return;
    }

    // Busca os IDs dos favoritos do usuário
    const favoritosIds = JSON.parse(localStorage.getItem(`favoritos_${email}`)) || [];
    // Busca todos os produtos do localStorage
    const todosProdutos = JSON.parse(localStorage.getItem('allProdutos')) || [];

    // Filtra os produtos que estão nos favoritos
    const produtosFavoritos = todosProdutos.filter(prod => favoritosIds.includes(prod.id));

    setProdutos(produtosFavoritos);
  }, [show]);

  // Função para remover produto dos favoritos
  const removerFavorito = (id) => {
    const email = localStorage.getItem('usuarioEmail');
    if (!email) return;

    const favoritosIds = JSON.parse(localStorage.getItem(`favoritos_${email}`)) || [];
    const novosFavoritos = favoritosIds.filter(favId => favId !== id);
    localStorage.setItem(`favoritos_${email}`, JSON.stringify(novosFavoritos));

    // Atualiza lista de produtos no estado
    setProdutos(produtos.filter(prod => prod.id !== id));
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Seus Favoritos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {produtos.length === 0 ? (
          <p>Nenhum produto favoritado.</p>
        ) : (
          produtos.map(prod => (
            <Card key={prod.id} className="mb-3">
              <Card.Body className="d-flex align-items-center">
                <img
                  src={prod.imagem}
                  alt={prod.nome}
                  style={{ width: '120px', height: '120px', objectFit: 'cover', marginRight: '1rem', borderRadius: '8px' }}
                />
                <div className="flex-grow-1">
                  <Card.Title>{prod.nome}</Card.Title>
                  <Card.Text>R$ {prod.preco.toFixed(2)}</Card.Text>
                </div>
                <Button variant="danger" onClick={() => removerFavorito(prod.id)}>
                  Remover
                </Button>
              </Card.Body>
            </Card>
          ))
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FavoritosModal;
