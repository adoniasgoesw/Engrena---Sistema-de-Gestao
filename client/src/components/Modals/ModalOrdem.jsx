  import React, { useState, useEffect } from 'react';
  import ModalBasePadrao from './ModalCad';
  import api from '../../services/api';

  const ModalOrdem = ({ isOpen, onClose }) => {
    const [clientes, setClientes] = useState([]);
    const [veiculos, setVeiculos] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState('');
    const [veiculoSelecionado, setVeiculoSelecionado] = useState('');
    const [status, setStatus] = useState('');
    const [observacoes, setObservacoes] = useState('');
    const [descricaoCliente, setDescricaoCliente] = useState('');
    const [dataEntrada, setDataEntrada] = useState('');
    const [horaEntrada, setHoraEntrada] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [messageStatus, setMessageStatus] = useState(null);

    // Mensagem padrão para o cliente
    const mensagemPadraoCliente = 'Sua ordem foi registrada com sucesso. Garantia de 90 dias, consulte condições.';

    useEffect(() => {
      if (!isOpen) return;

      const now = new Date();
      const dataFormatada = now.toISOString().split('T')[0];
      const horaFormatada = now.toTimeString().split(':').slice(0, 2).join(':');

      setDataEntrada(dataFormatada);
      setHoraEntrada(horaFormatada);
      setDescricaoCliente(mensagemPadraoCliente);

      const fetchData = async () => {
        try {
          const token = localStorage.getItem('token');
          const user = JSON.parse(localStorage.getItem('user'));
          const idEstabelecimento = user?.estabelecimento?.id;
          if (!token || !idEstabelecimento) return;

          const clientesRes = await api.get(`/clientes/por-estabelecimento/${idEstabelecimento}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const veiculosRes = await api.get(`/veiculos/por-estabelecimento/${idEstabelecimento}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setClientes(clientesRes.data);
          setVeiculos(veiculosRes.data);
        } catch (error) {
          console.error('Erro ao buscar dados:', error);
        }
      };

      fetchData();
    }, [isOpen]);

    const limparCampos = () => {
      setClienteSelecionado('');
      setVeiculoSelecionado('');
      setStatus('');
      setObservacoes('');
      setDescricaoCliente('');
      setDataEntrada('');
      setHoraEntrada('');
      setMessage(null);
      setMessageStatus(null);
    };

    const handleSave = async () => {
      if (!clienteSelecionado || !veiculoSelecionado || !status) {
        setMessageStatus('error');
        setMessage('Preencha todos os campos obrigatórios.');
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        const id_estabelecimento = user?.estabelecimento?.id;

        const dados = {
          id_cliente: clienteSelecionado,
          id_veiculo: veiculoSelecionado,
          status,
          observacoes,
          descricao_cliente: descricaoCliente,
          data_entrada: dataEntrada,
          hora_entrada: horaEntrada,
          id_estabelecimento,
        };

        setIsLoading(true);
        const response = await api.post('/ordens', dados, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMessageStatus('success');
        setMessage(response.data.message || 'Ordem criada com sucesso!');
        setTimeout(() => {
          setIsLoading(false);
          limparCampos();
          onClose();
        }, 2000);
      } catch (error) {
        setIsLoading(false);
        setMessageStatus('error');
        setMessage(error.response?.data?.error || 'Erro ao criar ordem.');
      }
    };

    const veiculosFiltrados = veiculos.filter(v => v.id_cliente === parseInt(clienteSelecionado));

    return (
      <ModalBasePadrao
        isOpen={isOpen}
        onClose={() => { limparCampos(); onClose(); }}
        onSave={handleSave}
        isLoading={isLoading}
      >
        <h2 className="text-2xl font-semibold text-[#275b9d] mb-4 text-center">Nova Ordem de Serviço</h2>

        {message && (
          <div className={`mb-4 p-2 rounded text-sm text-center font-medium ${messageStatus === 'error' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={clienteSelecionado}
            onChange={(e) => setClienteSelecionado(e.target.value)}
            className="border border-[#cceabe] rounded-lg p-3 text-[#093a69] focus:ring-2 focus:ring-[#74a9ee]"
          >
            <option value="">Selecione um cliente *</option>
            {clientes.map(cliente => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome_completo}
              </option>
            ))}
          </select>

          <select
            value={veiculoSelecionado}
            onChange={(e) => setVeiculoSelecionado(e.target.value)}
            className="border border-[#cceabe] rounded-lg p-3 text-[#093a69] focus:ring-2 focus:ring-[#74a9ee]"
            disabled={!clienteSelecionado}
          >
            <option value="">Selecione um veículo *</option>
            {veiculosFiltrados.map(v => (
              <option key={v.id} value={v.id}>
                {v.placa} - {v.modelo}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-[#cceabe] rounded-lg p-3 text-[#093a69] focus:ring-2 focus:ring-[#74a9ee]"
          >
            <option value="">Status da ordem *</option>
            <option value="Pendente">Pendente</option>
            <option value="Aguardando aprovação">Aguardando aprovação</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Aguardando finalização">Aguardando finalização</option>
            <option value="Finalizada">Finalizada</option>
            <option value="Cancelada">Cancelada</option>
          </select>

          <div className="flex gap-2">
            <input
              type="date"
              value={dataEntrada}
              readOnly
              className="w-1/2 border border-[#cceabe] rounded-lg p-3 text-[#093a69] bg-gray-100 cursor-not-allowed"
            />
            <input
              type="time"
              value={horaEntrada}
              readOnly
              className="w-1/2 border border-[#cceabe] rounded-lg p-3 text-[#093a69] bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        <textarea
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
          placeholder="Observações internas (opcional)"
          className="w-full mt-4 border border-[#cceabe] rounded-lg p-3 text-[#093a69] placeholder:text-[#b3c4d4] focus:ring-2 focus:ring-[#74a9ee] min-h-[80px]"
        />

        <textarea
          value={descricaoCliente}
          onChange={(e) => setDescricaoCliente(e.target.value)}
          placeholder="Mensagem para o cliente"
          className="w-full mt-4 border border-[#cceabe] rounded-lg p-3 text-[#093a69] placeholder:text-[#b3c4d4] focus:ring-2 focus:ring-[#74a9ee] min-h-[80px]"
        />
      </ModalBasePadrao>
    );
  };

  export default ModalOrdem;
