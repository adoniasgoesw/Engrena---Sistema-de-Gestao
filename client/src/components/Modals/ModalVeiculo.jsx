import React, { useState, useEffect } from 'react';
import ModalBasePadrao from './ModalCad';
import api from '../../services/api';

const ModalVeiculo = ({ isOpen, onClose }) => {
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [cor, setCor] = useState('');
  const [placa, setPlaca] = useState('');
  const [ano, setAno] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    const buscarClientes = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        const idEstabelecimento = user?.estabelecimento?.id;

        if (!token || !idEstabelecimento) return;

        const response = await api.get(`/clientes/por-estabelecimento/${idEstabelecimento}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const clientesList = response.data.map((cliente) => ({
          id: cliente.id,
          nome: cliente.nome_completo,
        }));

        setClientes(clientesList);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    buscarClientes();
  }, [isOpen]);

  const limparCampos = () => {
    setClienteSelecionado('');
    setMarca('');
    setModelo('');
    setCor('');
    setPlaca('');
    setAno('');
    setMessage(null);
    setStatus(null);
  };

  const handleSave = async () => {
    if (!clienteSelecionado || !marca || !modelo || !placa) {
      setStatus('error');
      setMessage('Preencha os campos obrigatórios.');
      return;
    }

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const id_estabelecimento = user?.estabelecimento?.id;

    if (!id_estabelecimento) {
      setStatus('error');
      setMessage('Estabelecimento não identificado.');
      return;
    }

    const dados = {
      id_cliente: clienteSelecionado,
      marca,
      modelo,
      cor,
      placa,
      ano,
      id_estabelecimento,
    };

    setIsLoading(true);
    setMessage(null);
    setStatus(null);

    try {
      const response = await api.post('/veiculos', dados, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStatus('success');
      setMessage(response.data.message || 'Veículo cadastrado com sucesso.');

      setTimeout(() => {
        setIsLoading(false);
        limparCampos();
        onClose();
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      setStatus('error');
      setMessage(error.response?.data?.error || 'Erro ao cadastrar veículo.');
    }
  };

  return (
    <ModalBasePadrao isOpen={isOpen} onClose={() => { limparCampos(); onClose(); }} onSave={handleSave}>
      <h2 className="text-2xl font-semibold text-[#275b9d] mb-4 text-center">Cadastro de Veículo</h2>

      {message && (
        <div className={`mb-4 p-2 rounded text-sm text-center font-medium ${status === 'error' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          value={clienteSelecionado}
          onChange={(e) => setClienteSelecionado(e.target.value)}
          className="w-full border border-[#cceabe] rounded-lg p-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]"
        >
          <option value="">Selecione um cliente *</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Marca *"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          className="w-full border border-[#cceabe] rounded-lg p-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]"
        />
        <input
          type="text"
          placeholder="Modelo *"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
          className="w-full border border-[#cceabe] rounded-lg p-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]"
        />
        <input
          type="text"
          placeholder="Cor"
          value={cor}
          onChange={(e) => setCor(e.target.value)}
          className="w-full border border-[#cceabe] rounded-lg p-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]"
        />
        <input
          type="number"
          placeholder="Ano"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          className="w-full border border-[#cceabe] rounded-lg p-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]"
        />
        <input
          type="text"
          placeholder="Placa *"
          value={placa}
          onChange={(e) => setPlaca(e.target.value)}
          className="w-full md:col-span-2 border border-[#cceabe] rounded-lg p-3 text-[#093a69] placeholder:text-[#d7e1ee] focus:outline-none focus:ring-2 focus:ring-[#74a9ee]"
        />
      </div>
    </ModalBasePadrao>
  );
};

export default ModalVeiculo;
