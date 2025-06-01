require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3001;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get('/produtos', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM produtos');
    res.json(resultado.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar produtos' });
  }
});