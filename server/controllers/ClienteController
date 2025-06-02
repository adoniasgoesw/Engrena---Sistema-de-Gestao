  const pool = require('../config/db');

  const cadastrarCliente = async (req, res) => {
    const { nome, cpf, email, telefone, endereco, id_estabelecimento } = req.body;

    if (!nome || !id_estabelecimento) {
      return res.status(400).json({ error: 'Nome e id_estabelecimento são obrigatórios' });
    }

    try {
      const result = await pool.query(
        `INSERT INTO clientes (nome_completo, cpf, email, telefone, endereco, id_estabelecimento)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [nome, cpf || null, email || null, telefone || null, endereco || null, id_estabelecimento]
      );

      return res.status(201).json({ message: 'Cliente cadastrado com sucesso', cliente: result.rows[0] });
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      return res.status(500).json({ error: 'Erro ao cadastrar cliente' });
    }
  };


  const listarClientesPorEstabelecimento = async (req, res) => {
    const { id_estabelecimento } = req.params;

    if (!id_estabelecimento) {
      return res.status(400).json({ error: 'ID do estabelecimento é obrigatório' });
    }

    try {
      const result = await pool.query(
        'SELECT * FROM clientes WHERE id_estabelecimento = $1',
        [id_estabelecimento]
      );

      return res.status(200).json(result.rows);
    } catch (error) {
      console.error('Erro ao buscar clientes por estabelecimento:', error);
      return res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
  };


  module.exports = {
    cadastrarCliente, listarClientesPorEstabelecimento
  };
