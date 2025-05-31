import React, { useState } from 'react';
import Sidebar from '../components/Layouts/SideBar.jsx';
import BarraDePesquisa from '../components/Inputs/BarraDePesquisa';
import BotoesClientes from '../components/Buttons/Buttons.jsx';
import { FaBars } from 'react-icons/fa';
import ModalCliente from '../components/Modals/ModalClient.jsx'; // IMPORTAÇÃO

const Clientes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalClienteAberto, setModalClienteAberto] = useState(false); // MODAL

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#d6dfeb]">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-white bg-[#275b9d] p-2 rounded-md"
              onClick={toggleSidebar}
            >
              <FaBars size={20} />
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#093a69]">
              Clientes
            </h1>
          </div>

          <BotoesClientes onCadastrarClick={() => setModalClienteAberto(true)} />
        </div>

        <BarraDePesquisa />

        {/* Modal de Cadastro de Cliente */}
        <ModalCliente
          isOpen={modalClienteAberto}
          onClose={() => setModalClienteAberto(false)}
        />
      </main>
    </div>
  );
};

export default Clientes;
