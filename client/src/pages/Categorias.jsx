import React, { useState } from 'react';
import Sidebar from '../components/Layouts/SideBar.jsx';
import { FaBars } from 'react-icons/fa';
import BotoesClientes from '../components/Buttons/Buttons.jsx';
import ModalCategoria from '../components/Modals/ModalCategoria.jsx';
import ListagemCategorias from '../components/Listagem/ListagemCategorias.jsx';

// (Se for usar listagem, importe: import ListagemCategorias from '../components/Listagem/ListagemCategorias.jsx')

const Categorias = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalCategoriaAberto, setModalCategoriaAberto] = useState(false);
  const [filtro, setFiltro] = useState('');

  const toggleSidebar = () => setIsOpen(!isOpen);

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
            <h1 className="text-3xl sm:text-4xl font-bold text-[#093a69]">
              Categorias
            </h1>
          </div>

          <BotoesClientes onCadastrarClick={() => setModalCategoriaAberto(true)} />
        </div>

        <ListagemCategorias />


        <ModalCategoria
          isOpen={modalCategoriaAberto}
          onClose={() => setModalCategoriaAberto(false)}
        />
      </main>
    </div>
  );
};

export default Categorias;
