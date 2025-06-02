

import React from 'react';
import logo from "../images/logoNavBar.png"

function Cadastrologin() {
  return (
    <div className="container">
      <div className="logo-text">
        <img src={logo} alt="Logo Freslatte" />
        <h2>Olá!</h2>
        <p>
          Preencha os dados <br />
          para fazer o cadastro
        </p>
      </div>
      <form className="form-group">
        <input type="email" placeholder="Digite seu email" required />
        <input type="password" placeholder="Digite sua senha" required />
        <input type="password" placeholder="Confirme sua senha" required />
        <button className="btn" type="submit">Avançar</button>
      </form>
    </div>
  );
}

export default Cadastrologin;