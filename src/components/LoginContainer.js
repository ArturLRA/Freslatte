import React from 'react';
import logo from './logo-freslatte.png';

export default function LoginForm() {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left">
          <img src={logo} alt="Logo Freslatte" className="logo" />
          <h2>Olá!</h2>
          <p><strong>Preencha os dados<br />para fazer o login</strong></p>
        </div>
        <div className="login-right">
          <input
            type="email"
            placeholder="Digite seu email"
            className="email-input"
          />
          <button className="login-button">Avançar</button>
        </div>
      </div>
    </div>
  );
}