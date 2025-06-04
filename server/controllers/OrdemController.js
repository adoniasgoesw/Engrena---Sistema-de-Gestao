const pool = require('../config/db');

// Cadastrar nova ordem de serviço
const cadastrarOrdem = async (req, res) => {
  const {
    id_cliente,
    id_veiculo,
    status,
    observacoes,
    descricao_cliente,
    data_entrada,
    hora_entrada,
    id_estabelecimento,
  } = req.body;

  // Validação básica
  if (
    !id_cliente ||
    !id_veiculo ||
    !status ||
    !data_entrada ||
    !hora_entrada ||
    !id_estabelecimento
  ) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  try {
    const result = await pool.query(
      `
      INSERT INTO ordem_servico (
        id_cliente,
        id_veiculo,
        status,
        observacoes,
        descricao_cliente,
        data_entrada,
        hora_entrada,
        id_estabelecimento
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
      `,
      [
        id_cliente,
        id_veiculo,
        status,
        observacoes || null,
        descricao_cliente || null,
        data_entrada,
        hora_entrada,
        id_estabelecimento,
      ]
    );

    return res.status(201).json({
      message: 'Ordem de serviço registrada com sucesso.',
      ordem: result.rows[0],
    });
  } catch (error) {
    console.error('Erro ao cadastrar ordem de serviço:', error);
    return res.status(500).json({
      error: 'Erro interno ao cadastrar ordem de serviço.',
    });
  }
};

// Listar ordens de serviço por estabelecimento
const listarOrdensPorEstabelecimento = async (req, res) => {
  const { id_estabelecimento } = req.params;

  if (!id_estabelecimento) {
    return res.status(400).json({
      error: 'ID do estabelecimento é obrigatório.',
    });
  }

  try {
    const resultado = await pool.query(
      `
      SELECT
        o.id,
        o.data_entrada,
        o.hora_entrada,
        o.status,
        o.valor_total,
        cl.nome_completo AS cliente_nome,
        v.placa
      FROM ordem_servico o
      JOIN clientes cl ON cl.id = o.id_cliente
      JOIN veiculos v ON v.id = o.id_veiculo
      WHERE o.id_estabelecimento = $1
      ORDER BY o.data_entrada DESC, o.hora_entrada DESC
      `,
      [id_estabelecimento]
    );

    return res.status(200).json(resultado.rows);
  } catch (error) {
    console.error('Erro ao buscar ordens de serviço:', error);
    return res.status(500).json({
      error: 'Erro interno ao buscar ordens de serviço.',
    });
  }
};

module.exports = {
  cadastrarOrdem,
  listarOrdensPorEstabelecimento,
};
