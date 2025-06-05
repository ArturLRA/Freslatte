import { useState } from 'react';
import '../App.css';
import logo from '../images/logoNavBar.png';
import { Link, useNavigate } from 'react-router-dom'; 

export default function CadastroPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('usuarioEmail', email);
        alert('Cadastro realizado com sucesso!');
        navigate('/');
      } else {
        alert(data.erro || 'Erro no cadastro');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro na requisição');
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginLeft">
        <h2>
          Olá! Bem-vindo<br />
          Preencha os<br />
          dados para fazer<br />
          o cadastro
        </h2>
        <p>Já possui conta?</p>
        <Link to='/loginpage' style={{ textDecoration: 'none' }}>
          <button className="btnCadastrar">Entrar</button>
        </Link>
      </div>

      <div className="loginRight">
        <img src={logo} alt="Logo" className="loginLogo" />
        <form className="loginForm" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Digite seu email"
            className="loginInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            className="loginInput"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirme sua senha"
            className="loginInput"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
          <div className="LoginbtnWrapper">
            <button className="btnAvancar" type="submit">Avançar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
