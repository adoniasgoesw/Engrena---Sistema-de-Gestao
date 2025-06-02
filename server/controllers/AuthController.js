const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  const {
    nomeEstabelecimento,
    cnpj,
    endereco,
    logo,
    nomeCompleto,
    email,
    telefone,
    cpf,
    senha,
    cargo,
  } = req.body;

  // Validação básica
  if (!nomeEstabelecimento || !nomeCompleto || !email || !telefone || !cpf || !senha) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }

  try {
    // Inserir estabelecimento e pegar id gerado
    const resultEst = await pool.query(
      `INSERT INTO estabelecimentos (nome, cnpj, endereco, logo) VALUES ($1, $2, $3, $4) RETURNING id`,
      [nomeEstabelecimento, cnpj, endereco, logo]
    );
    const idEstabelecimento = resultEst.rows[0].id;

    // Hash da senha
    const saltRounds = 10;
    const hashedSenha = await bcrypt.hash(senha, saltRounds);

    // Inserir usuário vinculando ao estabelecimento
    await pool.query(
      `INSERT INTO usuarios (id_estabelecimento, nome_completo, email, telefone, cpf, senha, cargo)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [idEstabelecimento, nomeCompleto, email, telefone, cpf, hashedSenha, cargo || 'adm']
    );

    return res.status(201).json({ message: 'Cadastro realizado com sucesso' });
  } catch (error) {
    console.error('Erro no cadastro:', error);
    return res.status(500).json({ error: 'Erro ao cadastrar usuário e estabelecimento' });
  }
};

const login = async (req, res) => {
  const { cpf, senha } = req.body;

  if (!cpf || !senha) {
    return res.status(400).json({ error: 'CPF e senha são obrigatórios' });
  }

  try {
    const result = await pool.query(
      `SELECT u.id, u.nome_completo, u.email, u.telefone, u.cpf, u.senha, u.cargo,
              e.id as est_id, e.nome as est_nome, e.cnpj, e.endereco, e.logo
       FROM usuarios u
       JOIN estabelecimentos e ON u.id_estabelecimento = e.id
       WHERE u.cpf = $1`,
      [cpf]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'CPF ou senha inválidos' });
    }

    const user = result.rows[0];
    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'CPF ou senha inválidos' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        id_estabelecimento: user.est_id,
        cargo: user.cargo,
      },
      SECRET,
      { expiresIn: '1d' }
    );

    const userData = {
      id: user.id,
      nomeCompleto: user.nome_completo,
      email: user.email,
      telefone: user.telefone,
      cpf: user.cpf,
      cargo: user.cargo,
      id_estabelecimento: user.est_id, // incluído
      estabelecimento: {
        id: user.est_id,
        nome: user.est_nome,
        cnpj: user.cnpj,
        endereco: user.endereco,
        logo: user.logo,
      },
    };

    return res.status(200).json({ message: 'Login realizado com sucesso', user: userData, token });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ error: 'Erro ao fazer login' });
  }
};

module.exports = {
  login,
  register, // seu register já existente
};