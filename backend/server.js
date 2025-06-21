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

// Rota de versão do banco
app.get('/versao', async (req, res) => {
  try {
    const result = await sql`SELECT version()`;
    const version = result[0]?.version || 'Desconhecida';
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
    await sql`INSERT INTO usuarios (email, senha, favprodutos) VALUES (${email}, ${senha}, '{}')`;
    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao cadastrar usuário' });
  }
});

// Login de usuário
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
  }

  try {
    const resultado = await sql`
      SELECT * FROM usuarios WHERE email = ${email} AND senha = ${senha}
    `;
    if (resultado.length === 0) {
      return res.status(401).json({ erro: 'Email ou senha inválidos' });
    }

    res.json({ mensagem: 'Login realizado com sucesso', usuario: resultado[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao realizar login' });
  }
});


//Rotas de carrinho
const carrinhoRouter = express.Router();

// GET: Itens do carrinho
carrinhoRouter.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const itens = await sql`
      SELECT p.*, c.quantidade
      FROM carrinho c
      JOIN produtos p ON p.id = c.produto_id
      WHERE c.user_id = ${userId};
    `;
    res.json(itens);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar carrinho' });
  }
});

// POST: Adicionar ou atualizar item no carrinho
carrinhoRouter.post('/', async (req, res) => {
  const { userId, produtoId, quantidade } = req.body;
  if (!userId || !produtoId || !quantidade) {
    return res.status(400).json({ erro: 'Campos obrigatórios ausentes' });
  }

  try {
    await sql`
      INSERT INTO carrinho (user_id, produto_id, quantidade)
      VALUES (${userId}, ${produtoId}, ${quantidade})
      ON CONFLICT (user_id, produto_id)
      DO UPDATE SET quantidade = carrinho.quantidade + EXCLUDED.quantidade;
    `;
    res.status(201).json({ mensagem: 'Produto adicionado/atualizado no carrinho' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao adicionar/atualizar produto' });
  }
});

// DELETE: Remover item
carrinhoRouter.delete('/', async (req, res) => {
  const { userId, produtoId } = req.body;
  if (!userId || !produtoId) {
    return res.status(400).json({ erro: 'userId e produtoId são obrigatórios' });
  }

  try {
    await sql`
      DELETE FROM carrinho
      WHERE user_id = ${userId} AND produto_id = ${produtoId};
    `;
    res.json({ mensagem: 'Item removido' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao remover item' });
  }
});

app.use('/carrinho', carrinhoRouter);


// Rotas de favoritos
const router = express.Router();

// GET: Favoritos de um usuário
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const favoritos = await sql`
      SELECT p.* FROM favoritos f
      JOIN produtos p ON f.produto_id = p.id
      WHERE f.user_id = ${userId};
    `;
    res.json(favoritos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar favoritos' });
  }
});

// POST: Adicionar favorito
router.post('/', async (req, res) => {
  const { userId, produtoId } = req.body;
  if (!userId || !produtoId) {
    return res.status(400).json({ error: 'userId e produtoId são obrigatórios' });
  }

  try {
    await sql`
      INSERT INTO favoritos (user_id, produto_id)
      VALUES (${userId}, ${produtoId})
      ON CONFLICT DO NOTHING;
    `;
    res.status(201).json({ message: 'Favorito adicionado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar favorito' });
  }
});

// DELETE: Remover favorito
router.delete('/', async (req, res) => {
  const { userId, produtoId } = req.body;
  if (!userId || !produtoId) {
    return res.status(400).json({ error: 'userId e produtoId são obrigatórios' });
  }

  try {
    await sql`
      DELETE FROM favoritos
      WHERE user_id = ${userId} AND produto_id = ${produtoId};
    `;
    res.json({ message: 'Favorito removido' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao remover favorito' });
  }
});

app.use('/favoritos', router);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});