import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const dados = localStorage.getItem('user');
    if (dados) {
      setUsuario(JSON.parse(dados));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md sm:max-w-lg md:max-w-2xl">
        <h1 className="text-3xl font-bold text-[#093a69] mb-6 text-center">
          Bem-vindo{usuario ? `, ${usuario.nomeCompleto}` : ''}!
        </h1>

        {usuario && (
          <div className="space-y-6 text-[#093a69]">
            <div>
              <h2 className="text-xl font-semibold text-[#275b9d] mb-2">Dados do Usuário</h2>
              <p><strong>Nome:</strong> {usuario.nomeCompleto}</p>
              <p><strong>CPF:</strong> {usuario.cpf}</p>
              <p><strong>Email:</strong> {usuario.email}</p>
            </div>

            {usuario.estabelecimento && (
              <div>
                <h2 className="text-xl font-semibold text-[#275b9d] mb-2">Estabelecimento</h2>
                <p><strong>Nome:</strong> {usuario.estabelecimento.nome}</p>
                <p><strong>CNPJ:</strong> {usuario.estabelecimento.cnpj}</p>
                <p><strong>Endereço:</strong> {usuario.estabelecimento.endereco}</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleLogout}
            className="bg-[#ed6363] hover:bg-[#ff4d4d] text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
