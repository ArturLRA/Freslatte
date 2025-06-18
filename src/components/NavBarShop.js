import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import Filtro from '../images/filtro.png';
import Coracao from '../images/favoritar.png';
import Carrinho from '../images/carrinho.png';

import CartModal from '../components/CartModal';

function NavBarShop({
  busca, setBusca,
  categoria, setCategoria,
  precoMin, setPrecoMin,
  precoMax, setPrecoMax,
  setProdutosFiltrados,
  produtos,
  mostrarFavoritos,
  setMostrarFavoritos
}) {
  const [showModalFiltro, setShowModalFiltro] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  const [favoritos, setFavoritos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [filtrarFavoritos, setFiltrarFavoritos] = useState(false);

  const handleCloseFiltro = () => setShowModalFiltro(false);
  const handleShowFiltro = () => setShowModalFiltro(true);
  const handleShowCart = () => setShowCartModal(true);
  const handleCloseCart = () => setShowCartModal(false);

  useEffect(() => {
    const atualizarEstado = () => {
      const email = localStorage.getItem('usuarioEmail');
      if (email) {
        const favs = JSON.parse(localStorage.getItem(`favoritos_${email}`)) || [];
        setFavoritos(favs);
      }

      const cart = JSON.parse(localStorage.getItem('carrinho')) || [];
      setCarrinho(cart);
    };

    window.addEventListener('storage', atualizarEstado);
    atualizarEstado();

    return () => window.removeEventListener('storage', atualizarEstado);
  }, []);

  useEffect(() => {
    aplicarFiltros(); // atualiza a cada mudança nos filtros ou favoritos
  }, [busca, categoria, precoMin, precoMax, filtrarFavoritos, favoritos]);

  const aplicarFiltros = () => {
    const produtosFiltrados = produtos.filter(produto => {
      const condicoesBase =
        (!categoria || produto.categoria === categoria) &&
        (!precoMin || produto.preco >= Number(precoMin)) &&
        (!precoMax || produto.preco <= Number(precoMax)) &&
        (!busca || produto.nome.toLowerCase().includes(busca.toLowerCase()));

      const condicaoFavorito = !filtrarFavoritos || favoritos.includes(produto.id);
      return condicoesBase && condicaoFavorito;
    });

    setProdutosFiltrados(produtosFiltrados);
  };

  const totalItensCarrinho = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

  const limparFiltros = () => {
    setCategoria('');
    setPrecoMin('');
    setPrecoMax('');
    setBusca('');
    setFiltrarFavoritos(false);
    setProdutosFiltrados(produtos);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Buscar"
                  className="me-2"
                  aria-label="Buscar produtos"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </Form>

              <Nav.Link as="span" onClick={handleShowFiltro}>
                <span style={{ marginRight: '5px' }}>Filtro</span>
                <img src={Filtro} className='ImgFltro' alt="Ícone de filtro" />
              </Nav.Link>
              
              <Nav.Link
                as="span"
                onClick={() => setMostrarFavoritos(prev => !prev)}  // Alterna o filtro
                style={{
    position: 'relative',
    filter: mostrarFavoritos ? 'grayscale(0%)' : 'grayscale(100%)', // Visualmente indica o filtro
    cursor: 'pointer'
  }}
  aria-label="Favoritos"
>
  <img src={Coracao} className='ImgCoracao' alt="Ícone de favoritos" />
  {favoritos.length > 0 && (
    <span style={{
      position: 'absolute',
      top: '0',
      right: '0',
      backgroundColor: '#3C594E',
      color: 'white',
      borderRadius: '50%',
      padding: '2px 6px',
      fontSize: '12px'
    }}>{favoritos.length}</span>
  )}
</Nav.Link>

              <Nav.Link
                as="span"
                onClick={handleShowCart}
                style={{ position: 'relative' }}
                aria-label="Carrinho"
              >
                <img src={Carrinho} className='ImgCarrinho' alt="Ícone do carrinho" />
                {totalItensCarrinho > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    backgroundColor: '#3C594E',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '2px 6px',
                    fontSize: '12px'
                  }}>{totalItensCarrinho}</span>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal de Filtros */}
      <Modal show={showModalFiltro} onHide={handleCloseFiltro}>
        <Modal.Header closeButton>
          <Modal.Title>Filtrar Produtos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Categoria</Form.Label>
            <Form.Select value={categoria} onChange={e => setCategoria(e.target.value)}>
              <option value="">Todas</option>
              <option value="Roupas">Roupas</option>
              <option value="Eletrônicos">Eletrônicos</option>
              <option value="Alimentos">Alimentos</option>
              <option value="Outros">Outros</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Preço mínimo</Form.Label>
            <Form.Control
              type="number"
              value={precoMin}
              onChange={e => setPrecoMin(e.target.value)}
              min="0"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Preço máximo</Form.Label>
            <Form.Control
              type="number"
              value={precoMax}
              onChange={e => setPrecoMax(e.target.value)}
              min="0"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={limparFiltros}>Limpar</Button>
          <Button variant="primary" onClick={handleCloseFiltro}>Fechar</Button>
        </Modal.Footer>
      </Modal>

      <CartModal show={showCartModal} onHide={handleCloseCart} />
    </>
  );
}

export default NavBarShop;
