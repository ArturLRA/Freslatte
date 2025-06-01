import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../images/logoNavBar.png';
import {Link} from 'react-router-dom';
import usuario from '../images/usuario.png';


function NavBarMenu() {
  return (
<Navbar bg="light" data-bs-theme="light">
        <Container>

          <Navbar.Brand className='logo'>
          <Link to="/" className='logo'>
            <img src={logo} alt='Logo Fresslatte'/>
          </Link>
          </Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link className='menu'><Link to='/'>Home</Link></Nav.Link>
            <Nav.Link className='menu'><Link to='/Shop'>Loja</Link></Nav.Link>
          </Nav>

          <Navbar.Brand className='logo'>
            <Link to='/CadastroLogin'>
              <img src={usuario} alt='botão login/cadastro'/>
            </Link>
          </Navbar.Brand>

        </Container>
      </Navbar>
  );
};

function login() {

}

export default NavBarMenu
