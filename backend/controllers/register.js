import db from "../config/db.js";
import validarCPF from "../utils/validerCpf.js";

// LOGIN
export async function loginHandler(req, res) {
  const { login, senha } = req.body;

  try {
    const [usuarios] = await db.execute(
      "SELECT * FROM usuarios WHERE (cpf = ? OR email = ?) AND senha = ?",
      [login, login, senha]
    );

    if (usuarios.length === 0) {
      return res.status(401).json({ erro: "CPF, e-mail ou senha incorretos." });
    }

    const usuario = usuarios[0];

    const [estabelecimentos] = await db.execute(
      "SELECT * FROM estabelecimentos WHERE id = ?",
      [usuario.estabelecimento_id]
    );

    const estabelecimento = estabelecimentos[0] || null;

    return res.json({
      mensagem: "Login realizado com sucesso!",
      usuario,
      estabelecimento
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ erro: "Erro interno do servidor." });
  }
}

// CADASTRO
export async function cadastroHandler(req, res) {
  const { nome, email, cpf, senha, nomeEstabelecimento } = req.body;

  if (!nome || !email || !cpf || !senha || !nomeEstabelecimento) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
  }

  if (!validarCPF(cpf)) {
    return res.status(400).json({ erro: "CPF inválido." });
  }

  try {
    const [usuarios] = await db.execute(
      "SELECT * FROM usuarios WHERE email = ? OR cpf = ?",
      [email, cpf]
    );

    if (usuarios.length > 0) {
      return res.status(409).json({ erro: "E-mail ou CPF já cadastrados." });
    }

    const [estabResult] = await db.execute(
      "INSERT INTO estabelecimentos (nome) VALUES (?)",
      [nomeEstabelecimento]
    );

    const estabelecimentoId = estabResult.insertId;

    await db.execute(
      "INSERT INTO usuarios (nome, cpf, email, senha, tipo, estabelecimento_id) VALUES (?, ?, ?, ?, ?, ?)",
      [nome, cpf, email, senha, "admin", estabelecimentoId]
    );

    res.status(201).json({ mensagem: "Cadastro realizado com sucesso!" });
  } catch (error) {
    console.error("Erro no cadastro:", error);
    res.status(500).json({ erro: "Erro interno no servidor." });
  }
}
