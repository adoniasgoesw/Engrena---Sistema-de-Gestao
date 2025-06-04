import React, { useState } from 'react';
import Sidebar from '../components/Layouts/SideBar.jsx';
import BotoesClientes from '../components/Buttons/Buttons.jsx';
import ModalOrdem from '../components/Modals/ModalOrdem.jsx';
import ListagemOrdens from '../components/Listagem/ListagemOrdem.jsx'; // <-- importando a listagem
import { FaBars } from 'react-icons/fa';

const Ordens = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOrdemAberto, setModalOrdemAberto] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-screen bg-[#d6dfeb]">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-white bg-[#275b9d] p-2 rounded-md"
              onClick={toggleSidebar}
            >
              <FaBars size={20} />
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#093a69]">
              Ordens de Serviço
            </h1>
          </div>

          <BotoesClientes onCadastrarClick={() => setModalOrdemAberto(true)} />
        </div>

        {/* Renderiza a listagem de ordens com barra de pesquisa integrada */}
        <ListagemOrdens />

        <ModalOrdem isOpen={modalOrdemAberto} onClose={() => setModalOrdemAberto(false)} />
      </main>
    </div>
  );
};

export default Ordens;
