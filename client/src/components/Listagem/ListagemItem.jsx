import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import BarraDePesquisa from '../../components/Inputs/BarraDePesquisa';
import ListagemPadrao from '../Listagem/ListagemPadrao';

const colunas = ['Nome', 'Tipo', 'Categoria', 'Valor Unitário', 'Estoque/Tempo'];
const chaves = ['nome', 'tipo', 'nome_categoria', 'valor_unitario', 'estoque_ou_tempo'];

const formatarTipoComEstilo = (tipo) => {
  const estilos = {
    produto: 'bg-green-100 text-green-700',
    serviço: 'bg-blue-100 text-blue-700',
    ambos: 'bg-yellow-100 text-yellow-800',
  };

  const tipoLower = tipo.toLowerCase();
  const classe = estilos[tipoLower] || 'bg-gray-100 text-gray-800';

  return (
    <span className={`px-3 py-1 rounded-md text-sm font-semibold ${classe}`}>
      {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
    </span>
  );
};

const ListagemItens = () => {
  const [itens, setItens] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [ordenacao, setOrdenacao] = useState('nome-asc');
  const [isModalFiltroAberto, setIsModalFiltroAberto] = useState(false);

  useEffect(() => {
    const buscarItens = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));

        if (!token || !user?.estabelecimento?.id) return;

        const { data } = await api.get(
          `/itens/por-estabelecimento/${user.estabelecimento.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const itensFormatados = data.map((item) => {
          const estoqueOuTempo =
            item.tipo === 'produto'
              ? item.estoque_atual != null && item.unidade_medida
                ? `${item.estoque_atual} ${item.unidade_medida}`
                : item.estoque_atual ?? '-'
              : item.tempo_estimado_min
              ? `${item.tempo_estimado_min} min`
              : '-';

          return {
            ...item,
            tipo: formatarTipoComEstilo(item.tipo),
            nome_categoria: item.nome_categoria || '-',
            estoque_ou_tempo: estoqueOuTempo,
            valor_unitario: Number(item.valor_unitario).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }),
          };
        });

        setItens(itensFormatados);
      } catch (error) {
        console.error('Erro ao buscar itens:', error);
      }
    };

    buscarItens();
  }, []);

  const itensFiltrados = itens.filter((item) => {
    const textoBusca = filtro.toLowerCase();
    const nomeMatch = item.nome.toLowerCase().includes(textoBusca);
    const categoriaMatch = item.nome_categoria.toLowerCase().includes(textoBusca);
    const tipoTexto = item.tipo?.props?.children?.toLowerCase() || '';
    const tipoMatch = tipoTexto.includes(textoBusca);
    const filtroTipoOk = filtroTipo === '' || tipoTexto === filtroTipo;

    return (nomeMatch || categoriaMatch || tipoMatch) && filtroTipoOk;
  });

  const itensOrdenados = [...itensFiltrados].sort((a, b) => {
    return ordenacao === 'nome-asc'
      ? a.nome.localeCompare(b.nome)
      : b.nome.localeCompare(a.nome);
  });

  return (
    <div className="w-full relative">
      <BarraDePesquisa
        value={filtro}
        onChange={setFiltro}
        onFiltroClick={() => setIsModalFiltroAberto(!isModalFiltroAberto)}
        placeholder="Buscar por nome, tipo ou categoria..."
      />

      {isModalFiltroAberto && (
        <div className="absolute top-0 right-0 bg-white shadow-lg rounded-md p-4 z-50 w-64">
          <h3 className="font-semibold mb-2">Ordenar / Filtrar</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <button
                className={`w-full text-left ${ordenacao === 'nome-asc' && filtroTipo === '' ? 'font-bold text-blue-600' : ''}`}
                onClick={() => {
                  setOrdenacao('nome-asc');
                  setFiltroTipo('');
                  setIsModalFiltroAberto(false);
                }}
              >
                Nome A → Z
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left ${ordenacao === 'nome-desc' && filtroTipo === '' ? 'font-bold text-blue-600' : ''}`}
                onClick={() => {
                  setOrdenacao('nome-desc');
                  setFiltroTipo('');
                  setIsModalFiltroAberto(false);
                }}
              >
                Nome Z → A
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left ${filtroTipo === 'produto' ? 'font-bold text-green-600' : ''}`}
                onClick={() => {
                  setFiltroTipo('produto');
                  setIsModalFiltroAberto(false);
                }}
              >
                Apenas Produtos
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left ${filtroTipo === 'serviço' ? 'font-bold text-blue-600' : ''}`}
                onClick={() => {
                  setFiltroTipo('serviço');
                  setIsModalFiltroAberto(false);
                }}
              >
                Apenas Serviços
              </button>
            </li>
          </ul>
        </div>
      )}

      <ListagemPadrao colunas={colunas} chaves={chaves} dados={itensOrdenados} />
    </div>
  );
};

export default ListagemItens;
