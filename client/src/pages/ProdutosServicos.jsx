import React, { useState } from 'react';
import Sidebar from '../components/Layouts/SideBar.jsx';
import { FaBars } from 'react-icons/fa';
import BotoesClientes from '../components/Buttons/Buttons.jsx';
import ModalItem from '../components/Modals/ModalItem.jsx';
import ListagemItens from '../components/Listagem/ListagemItem.jsx'; // corrigido aqui

const ServicosProdutos = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalItemAberto, setModalItemAberto] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-screen bg-[#d6dfeb] overflow-hidden">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
        {/* Cabeçalho com botão hambúrguer e título */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-white bg-[#275b9d] p-2 rounded-md"
              onClick={toggleSidebar}
            >
              <FaBars size={20} />
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#093a69]">
              Serviços e Produtos
            </h1>
          </div>

          <BotoesClientes onCadastrarClick={() => setModalItemAberto(true)} />
        </div>

        {/* Listagem de produtos e serviços */}
        <ListagemItens />

        {/* Modal para cadastro de itens */}
        <ModalItem
          isOpen={modalItemAberto}
          onClose={() => setModalItemAberto(false)}
        />
      </main>
    </div>
  );
};

export default ServicosProdutos;
