import React from 'react';
import Sidebar from '../components/Layouts/SideBar.jsx';
import BarraDePesquisa from '../components/Inputs/BarraDePesquisa.jsx';
import BotoesClientes from '../components/Buttons/Buttons.jsx';

const Colaboradores = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#d6dfeb]">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#093a69]">
            Colaboradores
          </h1>
          <BotoesClientes />
        </div>

        <BarraDePesquisa />

        {/* Conteúdo futuro */}
      </main>
    </div>
  );
};

export default Colaboradores;
