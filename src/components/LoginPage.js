import React, { useState } from 'react';
import '../App.css';
import logo from '../images/logoNavBar.png';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate(); // <- Adiciona o hook para navegação

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('usuarioEmail', email);
        alert('Login realizado com sucesso!');
        navigate('/');
      } else {
        alert(data.erro || 'Email ou senha incorretos');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro na requisição');
    }
  };

 return (
    <div className="loginContainer">
      <div className="loginLeft">
        <h2>Olá! Bem-vindo<br />Preencha os<br />dados para fazer<br />o login</h2>
        <p>Não possui conta?</p>
        <Link to='/cadastro' style={{ textDecoration: 'none' }}>
          <button className="btnCadastrar" type="button">Cadastrar</button>
        </Link>
      </div>

      <div className="loginRight">
        <img src={logo} alt="Logo" className="loginLogo" />
        <form className="loginForm" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Digite seu email"
            className="loginInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type={mostrarSenha ? 'text' : 'password'}
            placeholder="Digite sua senha"
            className="loginInput"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
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
            <button className="btnAvancar" type="submit">
              Avançar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}