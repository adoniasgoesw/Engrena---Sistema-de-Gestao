import React, { useState } from 'react';
import ModalBasePadrao from './ModalCad';

const ModalVeiculo = ({ isOpen, onClose }) => {
  const [cliente, setCliente] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [cor, setCor] = useState('');
  const [placa, setPlaca] = useState('');

  const clientesFicticios = [
    { id: 1, nome: 'João Silva' },
    { id: 2, nome: 'Maria Souza' },
    { id: 3, nome: 'Pedro Oliveira' },
  ];

  const handleSave = () => {
    const dados = { cliente, marca, modelo, cor, placa };
    console.log('Dados do veículo:', dados);
    onClose();
  };

  return (
    <ModalBasePadrao isOpen={isOpen} onClose={onClose} onSave={handleSave}>
      <h2 className="text-2xl font-semibold text-[#275b9d] mb-4">Cadastro de Veículo</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cliente Dropdown */}
        <select
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          className="w-full border border-[#cceabe] rounded-lg p-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]"
        >
          <option value="">Selecione um cliente</option>
          {clientesFicticios.map((c) => (
            <option key={c.id} value={c.nome}>
              {c.nome}
            </option>
          ))}
        </select>

        {/* Marca */}
        <input
          type="text"
          placeholder="Marca"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          className="w-full border border-[#cceabe] rounded-lg p-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]"
        />

        {/* Modelo */}
        <input
          type="text"
          placeholder="Modelo"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
          className="w-full border border-[#cceabe] rounded-lg p-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]"
        />

        {/* Cor */}
        <input
          type="text"
          placeholder="Cor"
          value={cor}
          onChange={(e) => setCor(e.target.value)}
          className="w-full border border-[#cceabe] rounded-lg p-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]"
        />

        {/* Placa ocupa as duas colunas para ficar maior */}
        <input
          type="text"
          placeholder="Placa"
          value={placa}
          onChange={(e) => setPlaca(e.target.value)}
          className="md:col-span-2 w-full border border-[#cceabe] rounded-lg p-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]"
        />
      </div>
    </ModalBasePadrao>
  );
};

export default ModalVeiculo;
