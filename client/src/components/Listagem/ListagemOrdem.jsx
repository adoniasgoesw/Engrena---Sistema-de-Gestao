import React, { useEffect, useState } from 'react';
import ListagemPadrao from './ListagemPadrao';
import BarraDePesquisa from '../Inputs/BarraDePesquisa';
import api from '../../services/api';

const colunas = ['Cliente', 'Veículo', 'Data', 'Status', 'Valor Total'];
const chaves = ['cliente', 'veiculo', 'data', 'status', 'valor_total'];

// Cores para os status
const coresStatus = {
  'Pendente': '#fce79f',           // amarelo claro
  'Aguardando aprovação': '#f0e5a3', // amarelo mais suave
  'Em andamento': '#fce79f',        // amarelo claro (mesma que pendente)
  'Aguardando finalização': '#d6eaf8', // azul claro suave
  'Finalizada': '#c5eddc',          // verde claro
  'Cancelada': '#efc8c5',           // vermelho claro
};

const ListagemOrdens = () => {
  const [ordens, setOrdens] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [isModalFiltroAberto, setIsModalFiltroAberto] = useState(false);
  const [ordenacao, setOrdenacao] = useState('cliente-asc');

  useEffect(() => {
    const buscarOrdens = async () => {
      try {
        const userJSON = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (!userJSON || !token) {
          console.error('Usuário não autenticado ou token ausente.');
          return;
        }

        const user = JSON.parse(userJSON);
        if (!user?.estabelecimento?.id) {
          console.error('Estabelecimento inválido no localStorage.');
          return;
        }

        const response = await api.get(
          `/ordens/por-estabelecimento/${user.estabelecimento.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const ordensFormatadas = response.data.map((ordem) => {
          const dataObj = new Date(ordem.data_entrada);

          let valorFormatado = 'R$ 0,00';
          if (ordem.valor_total != null) {
            const valorNum = Number(ordem.valor_total);
            if (!isNaN(valorNum)) {
              valorFormatado = `R$ ${valorNum.toFixed(2).replace('.', ',')}`;
            }
          }

          // Cria o componente com cor de fundo para o status
          const statusCor = coresStatus[ordem.status] || '#eee'; // fallback cinza claro
          const statusComCor = (
            <span
              style={{
                backgroundColor: statusCor,
                padding: '2px 8px',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '0.875rem',
                display: 'inline-block',
                color: '#333',
              }}
            >
              {ordem.status}
            </span>
          );

          return {
            id: ordem.id,
            cliente: ordem.cliente_nome,
            veiculo: ordem.placa,
            data: isNaN(dataObj) ? ordem.data_entrada : dataObj.toLocaleDateString('pt-BR'),
            status: statusComCor,
            valor_total: valorFormatado,
          };
        });

        setOrdens(ordensFormatadas);
      } catch (error) {
        console.error('Erro ao buscar ordens de serviço:', error);
      }
    };

    buscarOrdens();
  }, []);

  const filtroLower = filtro.toLowerCase();

  // Função para extrair texto do status que pode ser string ou componente React
  const extrairTextoStatus = (status) => {
    if (typeof status === 'string') {
      return status.toLowerCase();
    }
    if (status && status.props && typeof status.props.children === 'string') {
      return status.props.children.toLowerCase();
    }
    return '';
  };

  const ordensFiltradas = ordens.filter(({ cliente, veiculo, status }) => {
    const statusTexto = extrairTextoStatus(status);
    return (
      (cliente && cliente.toLowerCase().includes(filtroLower)) ||
      (veiculo && veiculo.toLowerCase().includes(filtroLower)) ||
      statusTexto.includes(filtroLower)
    );
  });

  const ordensOrdenadas = [...ordensFiltradas].sort((a, b) => {
    switch (ordenacao) {
      case 'cliente-asc':
        return a.cliente.localeCompare(b.cliente);
      case 'cliente-desc':
        return b.cliente.localeCompare(a.cliente);
      case 'status-asc':
        return extrairTextoStatus(a.status).localeCompare(extrairTextoStatus(b.status));
      case 'status-desc':
        return extrairTextoStatus(b.status).localeCompare(extrairTextoStatus(a.status));
      default:
        return 0;
    }
  });

  const toggleModalFiltro = () => {
    setIsModalFiltroAberto(prev => !prev);
  };

  const selecionarOrdenacao = (tipo) => {
    setOrdenacao(tipo);
    setIsModalFiltroAberto(false);
  };

  return (
    <div className="w-full relative">
      <BarraDePesquisa
        value={filtro}
        onChange={setFiltro}
        placeholder="Buscar por cliente, placa ou status..."
        onFiltroClick={toggleModalFiltro}
      />

      {isModalFiltroAberto && (
        <div className="absolute top-0 right-0 bg-white shadow-lg rounded-md border border-gray-300 p-4 z-50 w-64">
          <h3 className="font-semibold mb-2">Ordenar por:</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <button
                className={`w-full text-left ${ordenacao === 'cliente-asc' ? 'font-bold text-blue-600' : ''}`}
                onClick={() => selecionarOrdenacao('cliente-asc')}
              >
                Cliente A → Z
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left ${ordenacao === 'cliente-desc' ? 'font-bold text-blue-600' : ''}`}
                onClick={() => selecionarOrdenacao('cliente-desc')}
              >
                Cliente Z → A
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left ${ordenacao === 'status-asc' ? 'font-bold text-blue-600' : ''}`}
                onClick={() => selecionarOrdenacao('status-asc')}
              >
                Status A → Z
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left ${ordenacao === 'status-desc' ? 'font-bold text-blue-600' : ''}`}
                onClick={() => selecionarOrdenacao('status-desc')}
              >
                Status Z → A
              </button>
            </li>
          </ul>
        </div>
      )}

      <ListagemPadrao colunas={colunas} chaves={chaves} dados={ordensOrdenadas} />
    </div>
  );
};

export default ListagemOrdens;
