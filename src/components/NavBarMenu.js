import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logo from '../images/logoNavBar.png';
import usuario from '../images/usuario.webp';
import '../App.css';

function NavBarMenu() {
  return (
   <Navbar bg="light" expand="lg" className="navBarCustom">
  <Container>
    <Navbar.Brand as={Link} to="/">
      <img src={logo} alt="Logo Fresslatte" className="logo-img" />
    </Navbar.Brand>

    <Navbar.Toggle aria-controls="navbar-menu" />
    <Navbar.Collapse id="navbar-menu" className="justify-content-between">

      <div className="menu-text-links">
        <Link to="/" className="text-link">HOME</Link>
        <span className="separator">|</span>
        <Link to="/Shop" className="text-link">LOJA</Link>
      </div>

      <div className="usuario-link">
        <Link to="/LoginPage">
          <img src={usuario} alt="Botão login" className="usuario-img" />
        </Link>
      </div>

    </Navbar.Collapse>
  </Container>
</Navbar>

  );
}

export default NavBarMenu;
