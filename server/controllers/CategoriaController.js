const pool = require('../config/db');
const path = require('path');
const fs = require('fs');

const cadastrarCategoria = async (req, res) => {
  const { nome, tipo = 'produto', id_estabelecimento } = req.body;
  let imagem_url = null;

  if (!nome || !id_estabelecimento) {
    return res.status(400).json({ error: 'Nome e id_estabelecimento são obrigatórios' });
  }

  if (req.file) {
    imagem_url = `/uploads/${req.file.filename}`;
  }

  try {
    const result = await pool.query(
      `INSERT INTO categorias (nome, tipo, id_estabelecimento, imagem_url)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [nome, tipo, id_estabelecimento, imagem_url]
    );

    return res.status(201).json({ message: 'Categoria cadastrada com sucesso', categoria: result.rows[0] });
  } catch (error) {
    console.error('Erro ao cadastrar categoria:', error);

    if (req.file) {
      fs.unlink(path.join(__dirname, '..', req.file.path), (err) => {
        if (err) console.error('Erro ao remover arquivo após falha:', err);
      });
    }

    return res.status(500).json({ error: 'Erro ao cadastrar categoria' });
  }
};

const listarCategoriasPorEstabelecimento = async (req, res) => {
  const { id_estabelecimento } = req.params;

  if (!id_estabelecimento) {
    return res.status(400).json({ error: 'ID do estabelecimento é obrigatório' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM categorias WHERE id_estabelecimento = $1',
      [id_estabelecimento]
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar categorias por estabelecimento:', error);
    return res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
};

module.exports = {
  cadastrarCategoria,
  listarCategoriasPorEstabelecimento,
};
