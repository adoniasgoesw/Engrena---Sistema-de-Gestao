import React, { useState } from 'react';
import Sidebar from '../components/Layouts/SideBar.jsx';
import BarraDePesquisa from '../components/Inputs/BarraDePesquisa';
import BotoesClientes from '../components/Buttons/Buttons.jsx';
import { FaBars } from 'react-icons/fa';

const Clientes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#d6dfeb]">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <main className="flex-1 p-4 sm:p-6 md:p-8">
        {/* Cabeçalho com botão e título/botões alinhados */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            {/* Botão hambúrguer no mobile */}
            <button
              className="md:hidden text-white bg-[#275b9d] p-2 rounded-md"
              onClick={toggleSidebar}
            >
              <FaBars size={20} />
            </button>

            <h1 className="text-3xl sm:text-4xl font-bold text-[#093a69]">
              Ordens de Serviços
            </h1>
          </div>

          {/* Botões de ações */}
          <BotoesClientes />
        </div>

        {/* Barra de Pesquisa */}
        <BarraDePesquisa />

        {/* Conteúdo futuro pode ser adicionado aqui */}
      </main>
    </div>
  );
};

export default Clientes;
