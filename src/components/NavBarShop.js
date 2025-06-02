import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import Filtro from '../images/filtro.png';
import Coracao from '../images/favoritar.png';
import Carrimho from '../images/carrinho.png';

function NavBarShop({
  busca, setBusca,
  categoria, setCategoria,
  precoMin, setPrecoMin,
  precoMax, setPrecoMax
}) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

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

              <Nav.Link onClick={handleShow}>
                filtro <img src={Filtro} className='ImgFltro' />
              </Nav.Link>
              <Nav.Link href="#"><img src={Coracao} className='ImgCoracao' /></Nav.Link>
              <Nav.Link href="#"><img src={Carrimho} className='ImgCarrinho' /></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal de Filtros */}
      <Modal show={showModal} onHide={handleClose}>
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
          <Button variant="secondary" onClick={() => {
            
            setCategoria('');
            setPrecoMin('');
            setPrecoMax('');
            handleClose();
          }}>
            Limpar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Aplicar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NavBarShop;