import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import Filtro from '../images/filtro.png';
import Coracao from '../images/favoritar.png';
import Carrimho from '../images/carrinho.png';

import CartModal from '../components/CartModal';
/*{import FavoritosModal from '../components/FavoritosModal';}*/

function NavBarShop({
  busca, setBusca,
  categoria, setCategoria,
  precoMin, setPrecoMin,
  precoMax, setPrecoMax,
  setProdutosFiltrados,
  produtos
}) {
  const [showModalFiltro, setShowModalFiltro] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showFavoritosModal, setShowFavoritosModal] = useState(false);

  const [favoritos, setFavoritos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  const handleCloseFiltro = () => setShowModalFiltro(false);
  const handleShowFiltro = () => setShowModalFiltro(true);

  const handleShowCart = () => setShowCartModal(true);
  const handleCloseCart = () => setShowCartModal(false);

  const handleShowFavoritos = () => setShowFavoritosModal(true);
  const handleCloseFavoritos = () => setShowFavoritosModal(false);

  useEffect(() => {
    const email = localStorage.getItem('usuarioEmail');
    if (email) {
      const favs = JSON.parse(localStorage.getItem(`favoritos_${email}`)) || [];
      setFavoritos(favs);
    }

    const cart = JSON.parse(localStorage.getItem('carrinho')) || [];
    setCarrinho(cart);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const email = localStorage.getItem('usuarioEmail');
      if (email) {
        const favs = JSON.parse(localStorage.getItem(`favoritos_${email}`)) || [];
        setFavoritos(favs);
      }

      const cart = JSON.parse(localStorage.getItem('carrinho')) || [];
      setCarrinho(cart);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const totalItensCarrinho = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

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
                  aria-label="Search"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </Form>

              <Nav.Link onClick={handleShowFiltro}>
                filtro <img src={Filtro} className='ImgFltro' alt="Filtro" />
              </Nav.Link>

              {/* <Nav.Link href="#" onClick={handleShowFavoritos} style={{ position: 'relative' }}>
                <img src={Coracao} className='ImgCoracao' alt="Favoritos" />
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
                  }}>{favoritos.length}</span> */}
                {/* )}<|cursor|> */}
              {/* </Nav.Link> */}

              <Nav.Link href="#" onClick={handleShowCart} style={{ position: 'relative' }}>
                <img src={Carrimho} className='ImgCarrinho' alt="Carrinho" />
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
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Preço máximo</Form.Label>
            <Form.Control
              type="number"
              value={precoMax}
              onChange={e => setPrecoMax(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setCategoria('');
              setPrecoMin('');
              setPrecoMax('');
              handleCloseFiltro();
            }}
          >
            Limpar
          </Button>
          <Button variant="primary" onClick={handleCloseFiltro}>
            Aplicar
          </Button>
        </Modal.Footer>
      </Modal>

      <CartModal show={showCartModal} onHide={handleCloseCart} />
      {/* <FavoritosModal show={showFavoritosModal} onHide={handleCloseFavoritos} /> */}
    </>
  );
}

export default NavBarShop;
