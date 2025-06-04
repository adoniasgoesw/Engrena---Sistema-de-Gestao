const pool = require('../config/db');

// Cadastrar Item
const cadastrarItem = async (req, res) => {
  const {
    nome,
    descricao,
    unidade_medida,
    tipo,
    id_categoria,
    estoque_atual,
    tempo_estimado,
    valor_unitario,
    id_estabelecimento,
  } = req.body;

  if (!nome || !tipo || !id_categoria || !valor_unitario || !id_estabelecimento) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  if (tipo === 'produto' && (!unidade_medida || unidade_medida.trim() === '')) {
    return res.status(400).json({ error: 'Unidade de medida é obrigatória para produtos.' });
  }

  const tempoEstimadoMin = tipo === 'serviço' && tempo_estimado
    ? parseInt(tempo_estimado, 10)
    : null;

  if (tipo === 'serviço' && tempo_estimado && isNaN(tempoEstimadoMin)) {
    return res.status(400).json({ error: 'Tempo estimado inválido, use número de minutos.' });
  }

  try {
    const result = await pool.query(`
      INSERT INTO itens 
        (nome, descricao, unidade_medida, tipo, categoria_id, estoque_atual, tempo_estimado_min, valor_unitario, id_estabelecimento)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [
        nome,
        descricao || null,
        tipo === 'produto' ? unidade_medida.trim() : null,
        tipo,
        id_categoria,
        tipo === 'produto' ? estoque_atual : null,
        tempoEstimadoMin,
        valor_unitario,
        id_estabelecimento,
      ]
    );

    return res.status(201).json({ message: 'Item cadastrado com sucesso.', item: result.rows[0] });
  } catch (error) {
    console.error('Erro ao cadastrar item:', error);
    return res.status(500).json({ error: 'Erro ao cadastrar item.' });
  }
};

// Listar Itens por Estabelecimento
const listarItensPorEstabelecimento = async (req, res) => {
  const { id_estabelecimento } = req.params;

  try {
    const result = await pool.query(`
      SELECT 
        i.*, 
        c.nome AS nome_categoria
      FROM 
        itens i
      JOIN 
        categorias c ON i.categoria_id = c.id
      WHERE 
        i.id_estabelecimento = $1
    `, [id_estabelecimento]);

    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao listar itens:', error);
    res.status(500).json({ error: 'Erro ao listar itens' });
  }
};

module.exports = {
  cadastrarItem,
  listarItensPorEstabelecimento,
};
