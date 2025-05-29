const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db'); // conexão com DB
const AuthRoutes = require('./routes/AuthRoutes');

db.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Erro na conexão:', err);
  } else {
    console.log('Conectado ao banco:', res.rows);
  }
});

const app = express();
app.use(cors());
app.use(express.json());

// Prefixo "/api" para as rotas de autenticação
app.use('/api', AuthRoutes);

// Teste rápido de rota raiz
app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
