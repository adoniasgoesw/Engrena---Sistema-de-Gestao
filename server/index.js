const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db'); // conexão com DB
const AuthRoutes = require('./routes/AuthRoutes');
const path = require('path');

const app = express();

// Verifica conexão com o banco
db.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Erro na conexão:', err);
  } else {
    console.log('Conectado ao banco:', res.rows);
  }
});

// CORS configurado para o domínio do Netlify
app.use(cors({
  origin: 'https://engrena.netlify.app',
  credentials: true
}));

// Middleware para JSON
app.use(express.json());

// Servir arquivos da pasta uploads corretamente
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Prefixo "/api" para as rotas de autenticação e futuras rotas
app.use('/api', AuthRoutes);

// Rota raiz para teste rápido
app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

// Porta de escuta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
