require('dotenv').config();
const express = require('express');
const pool = require('./db');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors())

app.get('/produtos', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM produtos');
    res.json(resultado.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar produtos' });
  }

});

app.get('/clientes', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM clientes');
    res.json(resultado.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar clientes' });
  }
});

pool.connect()
  .then(() => {
    console.log('🟢 Conectado ao banco de dados');
    app.listen(port, () => {
      console.log(`🚀 Servidor rodando na porta ${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar ao banco de dados:', err);
  });