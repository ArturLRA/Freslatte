import React, { useState } from 'react';
import './styles/Login.css';

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="container">
      <div className="logo-text">
        <img src="https://i.imgur.com/lPq3v0U.png" alt="Logo Freslatte" />
        <h2>Olá!</h2>
        <p>
          Preencha os dados <br />
          para fazer o login
        </p>
      </div>

      <form className="form-group">
        <input type="email" placeholder="Digite seu email" required />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Digite sua senha"
          required
        />

        <div className="form-options">
          <label className="checkbox-container">
            <input
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
            />
            <span>Mostrar senha</span>
          </label>
          <a href="#" className="forgot-link">
            Esqueceu a senha?
          </a>
        </div>

        <div className="buttons">
          <button type="button" className="btn secondary">Cadastrar</button>
          <button type="submit" className="btn primary">Avançar</button>
        </div>
      </form>
    </div>
  );
}

export default Login;