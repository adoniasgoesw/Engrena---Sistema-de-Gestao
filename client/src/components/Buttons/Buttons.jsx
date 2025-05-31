import React from 'react';

const BotoesClientes = ({ onCadastrarClick }) => {
  return (
    <div className="flex gap-3">
      <button
        className="bg-[#5271ff] text-white font-semibold px-4 py-3 rounded-xl shadow-md hover:opacity-90 transition"
        onClick={onCadastrarClick}
      >
        Cadastrar
      </button>
      <button className="bg-[#207880] text-white font-semibold px-4 py-3 rounded-xl shadow-md hover:opacity-90 transition">
        Gerar Relatório
      </button>
    </div>
  );
};

export default BotoesClientes;
