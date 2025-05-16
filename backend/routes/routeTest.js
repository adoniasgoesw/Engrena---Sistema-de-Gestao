import express from 'express';
import db from '../config/db.js';

const router = express.Router();

router.get('/test-db', (req, res) => {
  db.query('SELECT 1 + 1 AS resultado', (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro na conexão com banco' });
    return res.json({ sucesso: true, resultado: results[0].resultado });
  });
});

export default router;
