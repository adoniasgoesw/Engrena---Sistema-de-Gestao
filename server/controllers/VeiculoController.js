const pool = require('../config/db');

const cadastrarVeiculo = async (req, res) => {
  const {
    id_cliente,
    marca,
    modelo,
    cor,
    placa,
    ano,
    id_estabelecimento,
  } = req.body;

  if (!id_cliente || !marca || !modelo || !placa || !id_estabelecimento) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO veiculos (id_cliente, id_estabelecimento, marca, modelo, cor, placa, ano)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [id_cliente, id_estabelecimento, marca, modelo, cor || null, placa, ano || null]
    );

    return res.status(201).json({ message: 'Veículo cadastrado com sucesso', veiculo: result.rows[0] });
  } catch (error) {
    console.error('Erro ao cadastrar veículo:', error);
    return res.status(500).json({ error: 'Erro ao cadastrar veículo.' });
  }
};

const listarVeiculosPorEstabelecimento = async (req, res) => {
  const { id_estabelecimento } = req.params;

  if (!id_estabelecimento) {
    return res.status(400).json({ error: 'ID do estabelecimento é obrigatório' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM veiculos WHERE id_estabelecimento = $1',
      [id_estabelecimento]
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar veículos:', error);
    return res.status(500).json({ error: 'Erro ao buscar veículos.' });
  }
};

const listarVeiculosPorCliente = async (req, res) => {
  const { id_cliente } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM veiculos WHERE id_cliente = $1',
      [id_cliente]
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar veículos por cliente:', error);
    return res.status(500).json({ error: 'Erro ao buscar veículos.' });
  }
};

module.exports = {
  cadastrarVeiculo,
  listarVeiculosPorEstabelecimento,
  listarVeiculosPorCliente,
};
