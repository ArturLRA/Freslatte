require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sql = require('./db');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rota de produtos
app.get('/produtos', async (req, res) => {
  try {
    const resultado = await sql`SELECT * FROM produtos`;
    res.json(resultado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar produtos' });
  }
});

// Rota de clientes
app.get('/clientes', async (req, res) => {
  try {
    const resultado = await sql`SELECT * FROM clientes`;
    res.json(resultado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar clientes' });
  }
});

// Rota de versão
app.get('/versao', async (req, res) => {
  try {
    const result = await sql`SELECT version()`;
    const { version } = result[0];
    res.send(`Versão do banco: ${version}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao obter versão');
  }
});

// Cadastro de usuário
app.post('/cadastrar', async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
  }

  try {
    await sql`INSERT INTO usuarios (email, senha, favprodutos) VALUES (${email}, ${senha}, ARRAY[]::INT[])`;
    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao cadastrar usuário' });
  }
});

// Login de usuário
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const result = await sql`SELECT * FROM usuarios WHERE email = ${email} AND senha = ${senha}`;
    if (result.length > 0) {
      res.status(200).json({ mensagem: 'Login realizado com sucesso' });
    } else {
      res.status(401).json({ erro: 'Email ou senha incorretos' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao fazer login' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});