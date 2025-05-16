import { useState } from "react";
import api from "../services/api";
import { Button } from "./button";

export default function RegisterModal({ onClose }) {
  const [cadastro, setCadastro] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    senha: "",
    nomeEstabelecimento: ""
  });

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      await api.post("/cadastro", cadastro);
      alert("Cadastro feito com sucesso!");
      onClose();
    } catch (err) {
      if (err.response?.data?.erro) {
        alert("Erro: " + err.response.data.erro);
      } else {
        alert("Erro ao cadastrar.");
      }
      console.error(err);
    }
  };

  return (
    <Modal onClose={onClose} title="Cadastro">
      <form onSubmit={handleCadastro} className="space-y-4">
        <input
          type="text"
          placeholder="Nome completo"
          className="w-full border rounded-lg p-2"
          value={cadastro.nome}
          onChange={e => setCadastro({ ...cadastro, nome: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          className="w-full border rounded-lg p-2"
          value={cadastro.email}
          onChange={e => setCadastro({ ...cadastro, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Número de telefone"
          className="w-full border rounded-lg p-2"
          value={cadastro.telefone}
          onChange={e => setCadastro({ ...cadastro, telefone: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="CPF"
          className="w-full border rounded-lg p-2"
          value={cadastro.cpf}
          onChange={e => setCadastro({ ...cadastro, cpf: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full border rounded-lg p-2"
          value={cadastro.senha}
          onChange={e => setCadastro({ ...cadastro, senha: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Nome do estabelecimento"
          className="w-full border rounded-lg p-2"
          value={cadastro.nomeEstabelecimento}
          onChange={e => setCadastro({ ...cadastro, nomeEstabelecimento: e.target.value })}
          required
        />
        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
          Cadastrar
        </Button>
      </form>
    </Modal>
  );
}

// Modal comum que pode ser reutilizado
function Modal({ children, onClose, title }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur bg-black/40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl">×</button>
        <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
        {children}
      </div>
    </div>
  );
}
