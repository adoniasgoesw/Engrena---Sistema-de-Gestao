import React, { useState, useEffect } from 'react';
import ModalBasePadrao from './ModalCad';
import api from '../../services/api';

const ModalOrdem = ({ isOpen, onClose }) => {
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState('');
  const [veiculosCliente, setVeiculosCliente] = useState([]);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);

  // Buscar clientes ao abrir modal
  useEffect(() => {
    if (!isOpen) return;

    const fetchClientes = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        const idEstabelecimento = user?.estabelecimento?.id;
        if (!token || !idEstabelecimento) return;

        const response = await api.get(`/clientes/por-estabelecimento/${idEstabelecimento}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClientes(response.data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    fetchClientes();
  }, [isOpen]);

  // Buscar veículos do cliente selecionado
  useEffect(() => {
    if (!clienteSelecionado) return;

    const fetchVeiculos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get(`/veiculos/por-cliente/${clienteSelecionado}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVeiculosCliente(response.data);
      } catch (error) {
        console.error('Erro ao buscar veículos do cliente:', error);
      }
    };

    fetchVeiculos();
  }, [clienteSelecionado]);

  const limparCampos = () => {
    setClienteSelecionado('');
    setVeiculosCliente([]);
    setVeiculoSelecionado('');
    setObservacoes('');
    setMessage(null);
    setStatus(null);
  };

  const handleSave = async () => {
    if (!clienteSelecionado || !veiculoSelecionado) {
      setStatus('error');
      setMessage('Selecione o cliente e o veículo.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      const id_estabelecimento = user?.estabelecimento?.id;

      const dados = {
        id_cliente: clienteSelecionado,
        id_veiculo: veiculoSelecionado,
        observacoes: observacoes || '',
        status: 'Pendente',
        id_estabelecimento,
      };

      setIsLoading(true);

      const response = await api.post('/ordens', dados, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStatus('success');
      setMessage(response.data.message || 'Ordem de serviço criada com sucesso.');

      setTimeout(() => {
        setIsLoading(false);
        limparCampos();
        onClose();
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      setStatus('error');
      setMessage(error.response?.data?.error || 'Erro ao criar ordem de serviço.');
    }
  };

  return (
    <ModalBasePadrao
      isOpen={isOpen}
      onClose={() => { limparCampos(); onClose(); }}
      onSave={handleSave}
      isLoading={isLoading}
    >
      <h2 className="text-2xl font-semibold text-[#275b9d] mb-4 text-center">
        Nova Ordem de Serviço
      </h2>

      {message && (
        <div className={`mb-4 p-2 rounded text-sm text-center font-medium ${status === 'error' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <select
          value={clienteSelecionado}
          onChange={(e) => setClienteSelecionado(e.target.value)}
          className="w-full border rounded-lg p-3"
        >
          <option value="">Selecione um cliente *</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nome_completo}
            </option>
          ))}
        </select>

        <select
          value={veiculoSelecionado}
          onChange={(e) => setVeiculoSelecionado(e.target.value)}
          className="w-full border rounded-lg p-3"
          disabled={!veiculosCliente.length}
        >
          <option value="">Selecione um veículo *</option>
          {veiculosCliente.map((v) => (
            <option key={v.id} value={v.id}>
              {v.placa} - {v.modelo}
            </option>
          ))}
        </select>
      </div>

      <textarea
        placeholder="Observações iniciais (opcional)"
        value={observacoes}
        onChange={(e) => setObservacoes(e.target.value)}
        className="w-full border rounded-lg p-3 min-h-[100px]"
      />
    </ModalBasePadrao>
  );
};

export default ModalOrdem;
