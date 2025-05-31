import React, { useState } from 'react';
import Sidebar from '../components/Layouts/SideBar.jsx';
import BarraDePesquisa from '../components/Inputs/BarraDePesquisa';
import BotoesClientes from '../components/Buttons/Buttons.jsx'; // Se for para veículos, renomeie o componente para BotoesVeiculos.jsx
import { FaBars } from 'react-icons/fa';
import ModalVeiculo from '../components/Modals/ModalVeiculo.jsx'; // Correto: ModalVeiculo, não plural

const Veiculos = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalVeiculoAberto, setModalVeiculoAberto] = useState(false); // Correto: singular

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
              Veículos
            </h1>
          </div>

          {/* Renomeie o componente se quiser separá-lo de "Clientes" */}
          <BotoesClientes onCadastrarClick={() => setModalVeiculoAberto(true)} />
        </div>

        <BarraDePesquisa />

        {/* Modal de Cadastro de Veículo */}
        <ModalVeiculo
          isOpen={modalVeiculoAberto}
          onClose={() => setModalVeiculoAberto(false)}
        />
      </main>
    </div>
  );
};

export default Veiculos;
