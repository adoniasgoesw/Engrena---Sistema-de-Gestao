import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Layouts/SideBar.jsx';
import BotoesClientes from '../components/Buttons/Buttons.jsx';
import { FaBars } from 'react-icons/fa';
import ModalCliente from '../components/Modals/ModalClient.jsx';
import ListagemClientes from '../components/Listagem/ListagemClientes.jsx';
import api from '../services/api';

const Clientes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalClienteAberto, setModalClienteAberto] = useState(false);
  const [clientes, setClientes] = useState([]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const buscarClientes = async () => {
      try {
        const userJSON = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (!userJSON || !token) return;

        const user = JSON.parse(userJSON);
        if (!user?.estabelecimento?.id) return;

        const response = await api.get(
          `/clientes/por-estabelecimento/${user.estabelecimento.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const clientesFormatados = response.data.map((cliente) => ({
          id: cliente.id,
          nome: cliente.nome_completo,
          cpf: cliente.cpf,
          email: cliente.email,
          telefone: cliente.telefone,
          endereco: cliente.endereco,
        }));

        setClientes(clientesFormatados);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    buscarClientes();
  }, []);

  return (
    <div className="flex h-screen bg-[#d6dfeb] overflow-hidden">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-white bg-[#275b9d] p-2 rounded-md"
              onClick={toggleSidebar}
            >
              <FaBars size={20} />
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#093a69]">Clientes</h1>
          </div>

          <BotoesClientes onCadastrarClick={() => setModalClienteAberto(true)} />
        </div>

        {/* Passa os dados brutos, filtro fica dentro do ListagemClientes */}
        <ListagemClientes dadosExternos={clientes} />

        <ModalCliente
          isOpen={modalClienteAberto}
          onClose={() => setModalClienteAberto(false)}
        />
      </main>
    </div>
  );
};

export default Clientes;
