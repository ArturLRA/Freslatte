import React, { useState } from 'react';
import '../App.css'
import logo from '../images/logoNavBar.png';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <div className="loginContainer">
      <div className="loginLeft">
        <h2>Olá! Bem-vindo<br />Preencha os<br />dados para fazer<br />o cadastro</h2>
        <p>Não possui conta?</p>
        <Link to='/cadastro' style={{ textDecoration: 'none' }}>
          <button className="btnCadastrar" type="button">
            Cadastrar
          </button>
        </Link>
      </div>

      <div className="loginRight">
        <img src={logo} alt="Logo" className="loginLogo" />
        <form className="loginForm">
          <input type="email" placeholder="Digite seu email" className="loginInput" />
          <input
            type={mostrarSenha ? 'text' : 'password'}
            placeholder="Digite sua senha"
            className="input"
          />
          <div className="loginOptions">
            <label>
              <input
                type="checkbox"
                onChange={() => setMostrarSenha(!mostrarSenha)}
              /> Mostrar senha
            </label>
            <span className="loginBtnEsqueceu">Esqueceu a senha?</span>
          </div>
          <div className="LoginbtnWrapper">
            <button className="btnAvancar">Avançar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
