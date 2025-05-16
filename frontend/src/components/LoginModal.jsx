import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Button } from "./button";

export default function LoginModal({ onClose }) {
  const [login, setLogin] = useState({ identificador: "", senha: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/login", {
        login: login.identificador,
        senha: login.senha,
      });

      alert(response.data.mensagem);

      // Armazena os dados no localStorage
      localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
      localStorage.setItem("estabelecimento", JSON.stringify(response.data.estabelecimento));

      onClose(); // Fecha o modal
      navigate("/user-profile"); // Redireciona
    } catch (err) {
      const mensagemErro = err.response?.data?.erro || "Erro ao fazer login.";
      setError(mensagemErro);
      console.error("Erro no login:", err);
    }
  };

  return (
    <Modal onClose={onClose} title="Login">
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="CPF ou E-mail"
          className="w-full border rounded-lg p-2"
          value={login.identificador}
          onChange={(e) =>
            setLogin({ ...login, identificador: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full border rounded-lg p-2"
          value={login.senha}
          onChange={(e) =>
            setLogin({ ...login, senha: e.target.value })
          }
          required
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Entrar
        </Button>
      </form>
    </Modal>
  );
}

// Componente Modal reutilizável
function Modal({ children, onClose, title }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur bg-black/40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
        {children}
      </div>
    </div>
  );
}
