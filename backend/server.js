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

// Favoritar produto
app.post('/favoritar', async (req, res) => {
  const { email, produtoId } = req.body;

  try {
    const usuario = await sql`SELECT favprodutos FROM usuarios WHERE email = ${email}`;
    if (usuario.length === 0) return res.status(404).json({ erro: 'Usuário não encontrado' });

    let favoritos = usuario[0].favprodutos || [];

    if (favoritos.includes(produtoId)) {
      favoritos = favoritos.filter(id => id !== produtoId);
    } else {
      favoritos.push(produtoId);
    }

    if (!email || typeof produtoId !== 'number') {
  return res.status(400).json({ erro: 'Dados inválidos' });
}

    await sql`UPDATE usuarios SET favprodutos = ${sql.array(favoritos, 'int4')} WHERE email = ${email}`;
    res.json({ sucesso: true, favProdutos: favoritos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao atualizar favoritos' });
  }
});

// Buscar favoritos
app.get('/favoritos/:email', async (req, res) => {
  const email = req.params.email;

  try {
    const usuario = await sql`SELECT favprodutos FROM usuarios WHERE email = ${email}`;
    if (usuario.length === 0) return res.status(404).json({ erro: 'Usuário não encontrado' });

    const favIds = usuario[0].favprodutos;
    if (!favIds || favIds.length === 0) return res.json([]);

    const produtos = await sql`SELECT * FROM produtos WHERE id = ANY(${favIds})`;
    res.json(produtos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar favoritos' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});